import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { FaqComponent } from './faq/faq.component';
import { Help1Component } from './help1/help1.component';
import { ZeneComponent } from './zene/zene.component';
import { MuskarciComponent } from './muskarci/muskarci.component';
import { FavoritiComponent } from './favoriti/favoriti.component';
import { KosaricaComponent } from './kosarica/kosarica.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PravilaPrivatnostiComponent } from './pravila-privatnosti/pravila-privatnosti.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { ProdavniceComponent } from './prodavnice/prodavnice.component';
import { ZaposlenikPocetnaComponent } from './zaposlenik-pocetna/zaposlenik-pocetna.component';
import { AdminPocetnaComponent } from './admin-pocetna/admin-pocetna.component';
import { PrijavaComponent } from './prijava/prijava.component';



@NgModule({
  declarations: [
    AppComponent,
    FaqComponent,
    Help1Component,
    ZeneComponent,
    MuskarciComponent,
    FavoritiComponent,
    KosaricaComponent,
    RegistracijaComponent,
    PocetnaComponent,
    PravilaPrivatnostiComponent,
    KontaktComponent,
    ProdavniceComponent,
    ZaposlenikPocetnaComponent,
    AdminPocetnaComponent,
    PrijavaComponent,



  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'pocetna', component: PocetnaComponent},
      {path: 'faq', component: FaqComponent},
      {path: 'help1', component: Help1Component},
      {path: 'favoriti', component: FavoritiComponent},
      {path: 'kosarica', component: KosaricaComponent},
      {path: 'registracija', component: RegistracijaComponent},
      {path: 'zene', component: ZeneComponent},
      {path: 'muskarci', component: MuskarciComponent},
      {path: 'pravila-privatnosti', component: PravilaPrivatnostiComponent},
      {path: 'kontakt', component: KontaktComponent},
      {path: 'prodavnice', component: ProdavniceComponent},
      {path: 'zaposlenik-pocetna', component:ZaposlenikPocetnaComponent},
      {path: 'admin-pocetna',component:AdminPocetnaComponent},
      {path: 'prijava', component:PrijavaComponent}

  ]),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
