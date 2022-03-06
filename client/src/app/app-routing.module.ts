import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DiscoverComponent } from "./discover/discover.component";
import { GameDetailComponent } from "./game-detail/game-detail.component";

const routes: Routes = [
  { path: "discover", component: DiscoverComponent },
  { path: "detail/:id", component: GameDetailComponent },
  { path: "", redirectTo: "discover", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
