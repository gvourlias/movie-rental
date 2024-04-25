import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-category-bubbles',
  templateUrl: './category-bubbles.component.html',
  styleUrls: ['./category-bubbles.component.scss'],
})
export class CategoryBubblesComponent implements OnInit {
  @Input() set categories(categories: string[]) {
    if (!categories) {
      return;
    }
    categories.forEach((category) => {
      this.categoriesModel.push({
        name: category,
        isClicked: false,
      });
    });
  }

  @Input() areClickable: boolean = false;
  @Output() categoryClicked = new EventEmitter<string>();

  public categoriesModel: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  bubbleClicked(category: any) {
    const found = this.categoriesModel.find(
      (categoryIt) => categoryIt.name === category.name
    );
    found.isClicked = !found.isClicked;
    this.categoryClicked.emit(category.name);
  }
}
