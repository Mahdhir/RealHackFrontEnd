import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './question/question.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'question/:id', component: QuestionComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
