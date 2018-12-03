import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProduktyComponent } from './produkty/produkty.component';
import { KoszykComponent } from './koszyk/koszyk.component';
import { KoszykViewComponent } from './koszyk-view/koszyk-view.component';
import { PotwierdzenieComponent } from './potwierdzenie/potwierdzenie.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './authGuard';

const routes: Routes = [
  { path: '', component: ProduktyComponent},
  { path: 'koszyk', component: KoszykComponent},
  { path: 'koszykv', component: KoszykViewComponent},
  { path: 'confirm', component: PotwierdzenieComponent},
  { path: 'login', component: LoginComponent},
  { path: 'admin', component: AdminComponent}// canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
