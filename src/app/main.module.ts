import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './in-memory-data.service';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { HelloComponent } from './hello.component';
import { ProduktyComponent } from './produkty/produkty.component';
import { NaglowekComponent } from './naglowek/naglowek.component';
import { ProduktComponent } from './produkty/produkt/produkt.component';
import { NewProductComponent } from './produkty/new-product/new-product.component';
import { KoszykComponent } from './koszyk/koszyk.component';
import { KoszykViewComponent } from './koszyk-view/koszyk-view.component';
import { MessageServiceService } from './message-service.service';
import { ProduktServisService } from './produkt-servis.service';
import { PotwierdzenieComponent } from './potwierdzenie/potwierdzenie.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { OrdersComponent } from './orders/orders.component';
import { ProductBaseComponent } from './product-base/product-base.component';
import { ClientSiteComponent } from './client-site/client-site.component'; 
import { OrderService } from './order.service';
import { EditProductComponent } from './product-base/edit-product/edit-product.component';
import { FirebaseActionsComponent } from './firebase-actions/firebase-actions.component';
import { FirebaseServiceService } from './firebase-service.service';
import { OrderComponent } from './orders/order/order.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PromotionsComponent } from './promotions/promotions.component';

@NgModule({
  declarations: [
    HelloComponent,
    ProduktyComponent,
    NaglowekComponent,
    ProduktComponent,
    NewProductComponent,
    KoszykComponent,
    KoszykViewComponent,
    PotwierdzenieComponent,
    LoginComponent,
    AdminComponent,
    OrdersComponent,
    ProductBaseComponent,
    ClientSiteComponent,
    EditProductComponent,
    FirebaseActionsComponent,
    OrderComponent,
    PageNotFoundComponent,
    PromotionsComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, {dataEncapsulation: false}
    // ),
    // NgbModule,
    // NgbModule.forRoot()
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [ProduktServisService, OrderService, FirebaseServiceService],
  bootstrap: [HelloComponent]
})
export class MainModule { }
