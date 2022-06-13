import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./header/header.component";
import { CarouselComponent } from "./homepage/carousel/carousel.component";
import { HttpClientModule } from "@angular/common/http";
import { CategoryComponent } from "./homepage/category/category.component";
import { CategoriesComponent } from "./homepage/categories/categories.component";
import { DiscoverComponent } from "./homepage/discover/discover.component";
import { GameDetailModule } from "./game-detail/game-detail.module";
import { CartDropdownComponent } from "./header/cart-dropdown/cart-dropdown.component";
import { CartModule } from "./cart/cart.module";
import { SharesModule } from "./shares/shares.module";
import { CheckoutModule } from "./checkout/checkout.module";
import { BrowseModule } from "./browse/browse.module";
import { SearchComponent } from './header/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CarouselComponent,
    CategoriesComponent,
    CategoryComponent,
    DiscoverComponent,
    CartDropdownComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    GameDetailModule,
    CartModule,
    SharesModule,
    CheckoutModule,
    BrowseModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
