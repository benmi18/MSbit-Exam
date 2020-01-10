import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductModal } from "src/app/modals/product.modal";
import { SortType } from "src/app/enums/sortType.enum";
import { Subject, Observable, of } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-main-container",
  templateUrl: "./main-container.component.html",
  styleUrls: ["./main-container.component.scss"]
})
export class MainContainerComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  public products: ProductModal[];
  public searchedProducts: Observable<ProductModal[]> = of([]);
  public selectedProduct: ProductModal;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(products => {
        this.products = products;
        this.searchedProducts = of(products);
      });
  }

  public onSelectedProduct(selectedProduct: ProductModal) {
    this.selectedProduct = selectedProduct;
  }

  public onSearch(search: string) {
    this.searchedProducts = of(
      this.products.filter(product => product.name.includes(search))
    );
  }

  public onSort(sortBy: SortType) {
    if (sortBy === SortType.PRICE) {
      this.products.sort((a, b) => (a.price > b.price ? 1 : -1));
    } else if (sortBy === SortType.NAME) {
      this.products.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else {
      this.products.sort((a, b) => (a.id > b.id ? 1 : -1));
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
