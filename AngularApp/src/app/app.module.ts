import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { AppComponent } from './app.component';
import { FaqComponent } from './faq/faq.component';
import { Help1Component } from './help1/help1.component';
import { ZeneComponent } from './zene/zene.component';
import { MuskarciComponent } from './muskarci/muskarci.component';
import { PrijaviSeComponent } from './prijavi-se/prijavi-se.component';
import { FavoritiComponent } from './favoriti/favoriti.component';
import { KosaricaComponent } from './kosarica/kosarica.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PravilaPrivatnostiComponent } from './pravila-privatnosti/pravila-privatnosti.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { ProdavniceComponent } from './prodavnice/prodavnice.component';


@NgModule({
  declarations: [
    AppComponent,
    FaqComponent,
    Help1Component,
    ZeneComponent,
    MuskarciComponent,
    PrijaviSeComponent,
    FavoritiComponent,
    KosaricaComponent,
    RegistracijaComponent,
    PocetnaComponent,
    PravilaPrivatnostiComponent,
    KontaktComponent,
    ProdavniceComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'pocetna', component: PocetnaComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'help1', component: Help1Component},
      {path: 'favoriti', component: FavoritiComponent},
      {path: 'kosarica', component: KosaricaComponent},
      {path: 'prijaviSe', component: PrijaviSeComponent},
      {path: 'registracija', component: RegistracijaComponent},
      {path: 'zene', component: ZeneComponent},
      {path: 'muskarci', component: MuskarciComponent},
      {path: 'pravila-privatnosti', component: PravilaPrivatnostiComponent},
      {path: 'kontakt', component: KontaktComponent},
      {path: 'prodavnice', component: ProdavniceComponent},

  ]),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
