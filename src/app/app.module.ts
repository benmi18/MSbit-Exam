import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgxPaginationModule } from "ngx-pagination";
import { ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { MainContainerComponent } from "./components/main-container/main-container.component";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { ActionBarComponent } from "./components/action-bar/action-bar.component";
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainContainerComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    ActionBarComponent,
    ProductsListComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
