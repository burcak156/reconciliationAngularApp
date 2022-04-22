import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReconInfoComponent } from './recon-info/recon-info.component';

const routes: Routes = [
  //{path: '', redirectTo: 'recon-info', pathMatch: 'full'},
  {path: 'recon-info', component: ReconInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
