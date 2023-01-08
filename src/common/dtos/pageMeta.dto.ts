import { IPageMetaDTO } from 'src/common/interfaces/page.interface';

export class PageMetaDTO {
  currentPage: number;

  currentPageItem: number;

  itemsPerPage: number;

  totalItems: number;

  totalPages: number;

  previousPage: boolean;

  nextPage: boolean;

  constructor({ page, pageSize, currentPageItems, totalItems }: IPageMetaDTO) {
    this.currentPage = page;
    this.currentPageItem = currentPageItems;
    this.itemsPerPage = pageSize;
    this.totalItems = totalItems;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.previousPage = this.currentPage > 1;
    this.nextPage = this.currentPage < this.totalPages;
  }
}
