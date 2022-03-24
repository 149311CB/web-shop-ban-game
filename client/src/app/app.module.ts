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
import { ExpandInputComponent } from "./expand-input/expand-input.component";
import { HeaderComponent } from "./header/header.component";
import { CarouselComponent } from "./homepage/carousel/carousel.component";
import { HttpClientModule } from "@angular/common/http";
import { CategoryComponent } from "./homepage/category/category.component";
import { CategoriesComponent } from "./homepage/categories/categories.component";
import { GameCardComponent } from "./homepage/game-card/game-card.component";
import { DiscoverComponent } from "./homepage/discover/discover.component";
import { GameDetailModule } from "./game-detail/game-detail.module";
import { CartDropdownComponent } from "./header/cart-dropdown/cart-dropdown.component";

@NgModule({
  declarations: [
    AppComponent,
    ExpandInputComponent,
    ExpandInputComponent,
    HeaderComponent,
    CarouselComponent,
    CategoriesComponent,
    CategoryComponent,
    GameCardComponent,
    DiscoverComponent,
    CartDropdownComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
