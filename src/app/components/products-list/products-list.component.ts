import { Component, Output, EventEmitter, Input } from "@angular/core";
import { ProductModal } from "src/app/modals/product.modal";
import { SortType } from "src/app/enums/sortType.enum";
import { ErrorType } from "src/app/enums/errorType.enum";
import { Observable } from "rxjs";

@Component({
  selector: "app-products-list",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.scss"]
})
export class ProductsListComponent {
  @Output() selectedProduct: EventEmitter<ProductModal> = new EventEmitter();
  @Output() search: EventEmitter<string> = new EventEmitter();
  @Output() sort: EventEmitter<SortType> = new EventEmitter();

  @Input() products: Observable<ProductModal[]>;

  public selectedProductId: number;
  public errorType = ErrorType["GENERAL-ERROR"];

  public ocClick(product: ProductModal) {
    this.selectedProductId = product.id;
    this.selectedProduct.emit(product);
  }

  public onSortProducts(sortBy: SortType) {
    this.sort.emit(sortBy);
  }

  public onSearch(search: string) {
    this.search.emit(search);
  }
}
