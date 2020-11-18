import {Response} from 'express'
import {ReportService} from '../../../../services'

async function postReports(req: IRequest, res: Response, next: Function): Promise<any> {
  try {
    const {target, type, userId, content} = req.options
    const ret = await ReportService.create({target, type, userId: req.userId, content: JSON.stringify(content)})
    res.status(201).json(ret)
  } catch (e) {
    if (e.message === 'not_found') e.status = 404
    next(e)
  }
}

export {postReports}
