import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddArticleComponent} from "./add-article/add-article.component";
import {DetailArticleComponent} from "./detail-article/detail-article.component";
import {EditArticleComponent} from "./edit-article/edit-article.component";
import {OverviewComponent} from "./overview/overview.component";
import {AboutComponent} from "./about/about.component";

const routes: Routes = [
  {
    path: "",
    component: AboutComponent,
    pathMatch: 'full'
  },
  {
    path: "overview",
    component: OverviewComponent,
    pathMatch: 'full'
  },
  {
    path: "add-article",
    component: AddArticleComponent
  },
  {
    path: "detail-article/:id",
    component: DetailArticleComponent
  },
  {
    path: "edit-article/:id",
    component: EditArticleComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
