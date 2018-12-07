import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProduktyComponent } from './produkty/produkty.component';
import { KoszykComponent } from './koszyk/koszyk.component';
import { KoszykViewComponent } from './koszyk-view/koszyk-view.component';
import { PotwierdzenieComponent } from './potwierdzenie/potwierdzenie.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './authGuard';
import { ClientSiteComponent } from './client-site/client-site.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductBaseComponent } from './product-base/product-base.component';

const routes: Routes = [
  { path: '', component: ClientSiteComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full'},
      { path: 'products', component: ProduktyComponent},
      { path: 'koszyk', component: KoszykComponent},
      { path: 'confirm', component: PotwierdzenieComponent}
    ]
  },
  { path: 'login', component: LoginComponent},
  { path: 'admin', component: AdminComponent,  canActivate: [AuthGuard],
    children: [
      { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
      { path: 'productBase', component:ProductBaseComponent, canActivate: [AuthGuard]}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
