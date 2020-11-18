import {IReportCreate} from '../interfaces/report'
import {Report} from '../models'

async function create(options: IReportCreate): Promise<void> {
  try {
    return await Report.create(options)
  } catch (e) {
    throw e
  }
}

export {create}
