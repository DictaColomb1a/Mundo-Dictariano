import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanetaComponent } from './components/planeta/planeta.component';

const routes: Routes = [
  {
    path: '',
    component: PlanetaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
