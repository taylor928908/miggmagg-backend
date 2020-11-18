import {escape} from 'mysql'
import {
  IStoreFindAll,
  IStoreFindAllMap,
  IStoreFindOne,
  IStoreDetail,
  IStoreList,
  Weekday,
  IStoreFindAllLike,
  IStoreFindAllVisit,
  IStoreLikeList,
  IStoreVisitList
} from '../interfaces/store'
import {db} from '../loaders'

const tableName = 'Stores'
const tableStoreMission = 'StoresMissions'
const tableUserStoreMission = 'Users-StoresMissions'
const tableUserStore = 'Users-Stores'
const tableStoreReview = 'StoresReviews'
const tableStoreUser = 'StoresUsers'

const MONDAY = 1
const TUESDAY = 2
const WEDNESDAY = 4
const THURSDAY = 8
const FRIDAY = 16
const SATURDAY = 32
const SUNDAY = 64

function convertWeekdays(arr: Weekday[]): number {
  let ret = 0
  arr.forEach((day) => {
    if (day === 'mon') ret += MONDAY
    else if (day === 'tue') ret += TUESDAY
    else if (day === 'wed') ret += WEDNESDAY
    else if (day === 'thu') ret += THURSDAY
    else if (day === 'fri') ret += FRIDAY
    else if (day === 'sat') ret += SATURDAY
    else if (day === 'sun') ret += SUNDAY
  })
  return ret
}

function getWeekdays(bit: number): Weekday[] {
  const ret: Weekday[] = []
  if (bit & SUNDAY) ret.push('sun')
  if (bit & MONDAY) ret.push('mon')
  if (bit & TUESDAY) ret.push('tue')
  if (bit & WEDNESDAY) ret.push('wed')
  if (bit & THURSDAY) ret.push('thu')
  if (bit & FRIDAY) ret.push('fri')
  if (bit & SATURDAY) ret.push('sat')
  return ret
}

async function findAll(options: IStoreFindAll): Promise<IStoreList> {
  try {
    const {lat, lon, type, search, categoryId, userId, start, perPage} = options
    const where = []
    if (search) where.push(`t.name like CONCAT('%', ${escape(search)}, '%') `)
    let orderBySql = ``
    let likeSql = ``
    if (type === 'keyword' && categoryId) where.push(`t.categoryId = ${categoryId}`)
    else if (type === 'star') orderBySql = `ORDER BY star DESC`
    else if (type === 'like') likeSql += `AND t4.userId =  ${escape(userId)}`
    const rows = await db.query({
      sql: `SELECT t.id, t.name, t.address, t.images, t.createdAt,
            ST_Distance_Sphere(location, POINT(${escape(lon)}, ${escape(lat)})) as distance,
            COUNT(t1.storeId) as missionCount, 
            IF(su.storeId, su.obtainablePoint, SUM(t1.point)) as obtainablePoint,
            IF(t4.userId, true, false) as isLike,
            IFNULL(AVG(t5.star), 0) as star,
            IF(su.storeId, su.isMission, false) isMission
            FROM ?? t
            LEFT JOIN ?? t1 ON t1.storeId = t.id
            ${type === 'like' ? `` : `LEFT`} JOIN ?? t4 ON t4.storeId = t.id AND t4.userId = ${escape(userId)}
            LEFT JOIN ?? t5 ON t5.storeId = t.id
            LEFT JOIN ?? su ON su.storeId = t.id AND su.userId = ${escape(userId)}
            ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
            GROUP BY t.id
            ${orderBySql}
            LIMIT ${escape(start)}, ${escape(perPage)}`,
      values: [tableName, tableStoreMission, tableUserStore, tableStoreReview, tableStoreUser, search]
    })
    const [rowTotal] = await db.query({
      sql: `SELECT COUNT(t.id) as total FROM ?? t
      ${type === 'like' ? `JOIN ?? t4 ON t4.storeId = t.id AND t4.userId = ${escape(userId)}` : ``} 
      ${where.length ? `WHERE ${where.join(' AND ')}` : ''}`,
      values: [tableName, tableUserStore]
    })
    return {data: rows, total: rowTotal ? rowTotal.total : 0}
  } catch (e) {
    throw e
  }
}

async function findAllMap(options: IStoreFindAllMap): Promise<IStoreList> {
  try {
    const {lat, lon, categoryId, userId, orderBy, distance} = options
    const where = []
    if (categoryId) where.push(`t.categoryId = ${categoryId}`)
    let orderBySql = `ORDER BY `
    if (orderBy === 'review') orderBySql += `reviewCount DESC`
    else if (orderBy === 'point') orderBySql += `obtainablePoint DESC`
    else if (orderBy === 'register') orderBySql += `createdAt DESC`
    else orderBySql += `distance ASC`
    const rows = await db.query({
      sql: `SELECT t.id, t.name, t.address, t.images, t.createdAt, t.location,
            ST_Distance_Sphere(location, POINT(${escape(lon)}, ${escape(lat)})) as distance,
            COUNT(t1.storeId) as missionCount,
            IF(su.storeId, su.obtainablePoint, SUM(t1.point)) as obtainablePoint,
            IF(t4.userId, true, false) as isLike,
            IFNULL(AVG(t5.star), 0) as star,
            IF(su.storeId, su.isMission, false) isMission
            ${orderBy === 'review' ? `, SUM(t5.storeId) as reviewCount` : ``}
            FROM ?? t
            LEFT JOIN ?? t1 ON t1.storeId = t.id
            LEFT JOIN ?? t4 ON t4.storeId = t.id AND t4.userId = ${escape(userId)}
            LEFT JOIN ?? t5 ON t5.storeId = t.id
            LEFT JOIN ?? su ON su.storeId = t.id AND su.userId = ${escape(userId)}
            ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
            GROUP BY t.id
            HAVING distance <= ${escape(distance)}
            ${orderBySql}
            LIMIT 0, 1000
            `,
      values: [
        tableName,
        tableStoreMission,
        tableUserStore,
        tableStoreReview,
        tableStoreUser
      ]
    })
    const [rowTotal] = await db.query({
      sql: `SELECT COUNT(t.id) as total FROM ?? t
      ${where.length ? `WHERE ${where.join(' AND ')}` : ''}`,
      values: [tableName]
    })
    return {data: rows, total: rowTotal ? rowTotal.total : 0}
  } catch (e) {
    throw e
  }
}

async function findAllLike(options: IStoreFindAllLike): Promise<IStoreLikeList> {
  try {
    const {lat, lon, userId, start, perPage} = options
    const where = []
    const rows = await db.query({
      sql: `SELECT t.id, t.name, t.address, t.images, t.createdAt,
            ST_Distance_Sphere(location, POINT(${escape(lon)}, ${escape(lat)})) as distance,
            COUNT(t1.storeId) as missionCount, 
            IF(su.storeId, su.obtainablePoint, SUM(t1.point)) as obtainablePoint,
            IF(t4.userId, true, false) as isLike,
            IFNULL(AVG(t5.star), 0) as star
            FROM ?? t
            LEFT JOIN ?? t1 ON t1.storeId = t.id
            JOIN ?? t4 ON t4.storeId = t.id AND t4.userId = ${escape(userId)}
            LEFT JOIN ?? t5 ON t5.storeId = t.id
            LEFT JOIN ?? su ON su.storeId = t.id AND su.userId = ${escape(userId)}
            ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
            GROUP BY t.id
            LIMIT ${escape(start)}, ${escape(perPage)}`,
      values: [
        tableName,
        tableStoreMission,
        tableUserStore,
        tableStoreReview,
        tableStoreUser
      ]
    })
    const [rowTotal] = await db.query({
      sql: `SELECT COUNT(t.id) as total FROM ?? t
      JOIN ?? t4 ON t4.storeId = t.id AND t4.userId = ${escape(userId)} 
      ${where.length ? `WHERE ${where.join(' AND ')}` : ''}`,
      values: [tableName, tableUserStore]
    })
    return {data: rows, total: rowTotal ? rowTotal.total : 0}
  } catch (e) {
    throw e
  }
}

async function findAllVisit(options: IStoreFindAllVisit): Promise<IStoreVisitList> {
  try {
    const {lat, lon, userId, start, perPage} = options
    const where = []
    const rows = await db.query({
      sql: `SELECT t.id, t.name, t.address, t.images, t.createdAt,
            ST_Distance_Sphere(location, POINT(${escape(lon)}, ${escape(lat)})) as distance,
            COUNT(t1.storeId) as missionCount,
            IF(su.storeId, su.obtainablePoint, SUM(t1.point)) as obtainablePoint,
            IF(t4.userId, true, false) as isLike,
            IFNULL(AVG(t5.star), 0) as star,
            t6.createdAt as visitedAt
            FROM ?? t
            JOIN ?? t1 ON t1.storeId = t.id AND t1.type = 'checkIn'
            LEFT JOIN ?? t4 ON t4.storeId = t.id AND t4.userId = ${escape(userId)}
            LEFT JOIN ?? t5 ON t5.storeId = t.id
            JOIN ?? t6 ON t6.storesMissionsId = t1.id AND t6.userId = ${escape(userId)}
            LEFT JOIN ?? su ON su.storeId = t.id AND su.userId = ${escape(userId)}
            ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
            GROUP BY t.id
            ORDER BY t6.createdAt DESC
            LIMIT ${escape(start)}, ${escape(perPage)}`,
      values: [
        tableName,
        tableStoreMission,
        tableUserStore,
        tableStoreReview,
        tableUserStoreMission,
        tableStoreUser
      ]
    })
    const [rowTotal] = await db.query({
      sql: `SELECT COUNT(t.id) as total FROM ?? t
      JOIN ?? sm ON sm.storeId = t.id AND sm.type = 'checkIn'
      JOIN ?? usm on usm.storesMissionsId= sm.id AND usm.userId = ${escape(userId)}
      ${where.length ? `WHERE ${where.join(' AND ')}` : ''}`,
      values: [tableName, tableStoreMission, tableUserStoreMission]
    })
    return {data: rows, total: rowTotal ? rowTotal.total : 0}
  } catch (e) {
    throw e
  }
}

async function findOne(options: IStoreFindOne): Promise<IStoreDetail> {
  try {
    const {id, lat, lon, userId} = options
    const where = [`t.id = ${escape(id)}`]
    const [row] = await db.query({
      sql: `SELECT t.id, t.name, t.description, t.address, t.owner, t.businessNumber, t.location,
            t.operationTime, t.readyTime, t.holiday, t.tel, t.images,
            ST_Distance_Sphere(t.location, POINT(${escape(lon)}, ${escape(lat)})) as distance,
            IF(su.storeId, su.obtainablePoint, SUM(sm.point)) as obtainablePoint,
            IF(us.userId, true, false) as isLike
            FROM ?? t
            LEFT JOIN ?? us ON us.storeId = t.id AND us.userId = ${escape(userId)}
            LEFT JOIN ?? sm ON sm.storeId = t.id
            LEFT JOIN ?? su ON su.storeId = t.id AND su.userId = ${escape(userId)}
            ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
            `,
      values: [tableName, tableUserStore, tableStoreMission, tableStoreUser]
    })
    row.holiday = getWeekdays(row.holiday)
    return row
  } catch (e) {
    throw e
  }
}

export {tableName, findAll, findAllMap, findAllLike, findAllVisit, findOne}
