import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GameCardComponent } from "./game-card/game-card.component";
import { RouterModule } from "@angular/router";
import { ExpandInputComponent } from "./expand-input/expand-input.component";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [GameCardComponent, ExpandInputComponent],
  imports: [CommonModule, RouterModule, MatInputModule, MatIconModule],
  exports: [GameCardComponent, ExpandInputComponent],
})
export class SharesModule {}
