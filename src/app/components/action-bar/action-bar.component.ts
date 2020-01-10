import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { SortType } from "src/app/enums/sortType.enum";

@Component({
  selector: "app-action-bar",
  templateUrl: "./action-bar.component.html",
  styleUrls: ["./action-bar.component.scss"]
})
export class ActionBarComponent {
  @Output() sortBy: EventEmitter<SortType> = new EventEmitter();
  @Output() search: EventEmitter<string> = new EventEmitter();

  public onSortChange(sortBy: SortType) {
    this.sortBy.emit(sortBy);
  }

  public onSearch(search: string) {
    this.search.emit(search);
  }
}
