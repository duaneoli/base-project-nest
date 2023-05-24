import { isEmpty } from '../helpers/IsEmpty'

export class PagedDataDTO {
  currentPage?: number
  pageSize?: number
  totalPages?: number
  totalElements?: number

  constructor(page: number, pageSize: number, totalElements: number) {
    if (!isEmpty(page) && !isEmpty(pageSize)) this.currentPage = page / pageSize + 1
    if (!isEmpty(pageSize)) this.pageSize = Number(pageSize)
    if (!isEmpty(totalElements) && !isEmpty(pageSize)) this.totalPages = Math.ceil(totalElements / pageSize)
    if (!isEmpty(totalElements)) this.totalElements = totalElements
  }
}
