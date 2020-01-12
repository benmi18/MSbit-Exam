import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { ProductModal } from "src/app/modals/product.modal";
import VanillaTilt from "vanilla-tilt";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent implements OnInit {
  @Input() product: ProductModal;

  ngOnInit() {
    const elements = [];
    document.querySelectorAll(".card-container").forEach(el => elements.push(el))
    VanillaTilt.init(elements, {
      max: 20,
      speed: 700
    });
  }
}
