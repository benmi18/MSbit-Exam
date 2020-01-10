import { Component, OnInit, Input } from "@angular/core";
import { ProductModal } from "src/app/modals/product.modal";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent {
  @Input() product: ProductModal;
}
