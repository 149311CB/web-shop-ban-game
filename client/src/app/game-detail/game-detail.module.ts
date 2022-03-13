import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GameDetailComponent } from "./game-detail.component";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { GameCarouselComponent } from './game-carousel/game-carousel.component';
import { BriefInfoComponent } from './brief-info/brief-info.component';
import { GameCardComponent } from './game-card/game-card.component';
import { BaseGameOptionsComponent } from './base-game-options/base-game-options.component';

@NgModule({
  declarations: [GameDetailComponent, GameCarouselComponent, BriefInfoComponent, GameCardComponent, BaseGameOptionsComponent],
  imports: [
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    RouterModule.forChild([
      { path: "detail/:id", component: GameDetailComponent },
    ]),
  ],
})
export class GameDetailModule {}
