import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatToolbarModule } from "@angular/material/toolbar";
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ExpandInputComponent } from "./expand-input/expand-input.component";
import { HeaderComponent } from "./header/header.component";
import { CarouselComponent } from "./carousel/carousel.component";
import { HttpClientModule } from "@angular/common/http";
import { CategoryComponent } from "./category/category.component";
import { CategoriesComponent } from "./categories/categories.component";
import { GameCardComponent } from "./game-card/game-card.component";
import { GameDetailComponent } from "./game-detail/game-detail.component";
import { DiscoverComponent } from "./discover/discover.component";

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
    GameDetailComponent,
    DiscoverComponent,
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
    MatButtonModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "outline" },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
