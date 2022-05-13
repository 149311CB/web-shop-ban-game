import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowseComponent } from "./browse.component";
import { RouterModule } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { SharesModule } from "../shares/shares.module";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [BrowseComponent],
  imports: [
    CommonModule,
    SharesModule,
    NgxPaginationModule,
    SharesModule,
    MatIconModule,
    RouterModule.forChild([{ path: "browse", component: BrowseComponent }]),
  ],
})
export class BrowseModule {}
