import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { take, map } from "rxjs/operators";
import { ProductModal, ApiProductModal } from "../modals/product.modal";
import { ProductType } from "../enums/productType.enum";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}

  public getProducts() {
    return this.http
      .get(
        "https://msbit-exam-products-store.firebaseio.com/deliveryProducts/products.json"
      )
      .pipe(
        take(1),
        map((products: ApiProductModal[]) => {
          const formatedProductsArr: ProductModal[] = [];

          for (const product of products) {
            if (product.type === ProductType.UPS) {
              formatedProductsArr.push(
                ...product.ups.map(ups => ({ ...ups, type: product.type }))
              );
            } else if (product.type === ProductType.FEDEX) {
              formatedProductsArr.push({
                ...product.fedex,
                type: product.type
              });
            } else {
              formatedProductsArr.push({
                creationDate: product.creationDate,
                description: product.description,
                id: product.id,
                name: product.name,
                price: product.price,
                thumbnailUrl: product.thumbnailUrl,
                url: product.url,
                type: product.type
              });
            }
          }
          return formatedProductsArr;
        })
      );
  }
}
