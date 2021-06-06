import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  displayPager: number[];

  currentPage: number = 1;
  @Input() setSlic = true;
  @Input() pager: number[];
  @Input() totalPages: number;
  @Output() clickSetPage = new EventEmitter();
  constructor() { }

  ngOnInit() {
    if (this.setSlic) this.changePage();

  }
  setPage(page: number) {
    this.clickSetPage.emit(page);
    this.currentPage = page;
    this.changePage();
  }
  async changePage() {
    this.displayPager = this.pager.slice(
      Math.max(0, this.currentPage - 5),
      Math.min(this.currentPage + 5, this.totalPages),
    );
  }

}
