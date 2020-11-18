import {IIdentityCreate} from '../interfaces/identity'
import {Identity} from '../models'

async function create(options: IIdentityCreate): Promise<any> {
  try {
    await Identity.create(options)
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      throw new Error('already_in_use')
    }
    throw e
  }
}

export {create}
