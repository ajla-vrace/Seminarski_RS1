import { NgModule } from '@angular/core';
import {NgxPaginationModule} from "ngx-pagination";
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
import { NavbarZaposlenikComponent } from './navbar-zaposlenik/navbar-zaposlenik.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { NarudzbeComponent } from './narudzbe/narudzbe.component';
import { ProizvodiComponent } from './proizvodi/proizvodi.component';
import { SkladisteComponent } from './skladiste/skladiste.component';
import { ProfilZaposlenikComponent } from './profil-zaposlenik/profil-zaposlenik.component';
import { EvidZaposlComponent } from './evid-zaposl/evid-zaposl.component';
import { RecenzijeComponent } from './recenzije/recenzije.component';
import { KataloziComponent } from './katalozi/katalozi.component';
import { SezKolComponent } from './sez-kol/sez-kol.component';
import { SpecPonComponent } from './spec-pon/spec-pon.component';
import { KatPodkatComponent } from './kat-podkat/kat-podkat.component';
import { StatistikaComponent } from './statistika/statistika.component';
import { ProfilAdminComponent } from './profil-admin/profil-admin.component';
import {ReactiveFormsModule} from "@angular/forms";
import { VodiczavelicineComponent } from './vodiczavelicine/vodiczavelicine.component';
import { KupacPocetnaComponent } from './kupac-pocetna/kupac-pocetna.component';
import { NavKupacComponent } from './nav-kupac/nav-kupac.component';
import { NeregistrovanComponent } from './neregistrovan/neregistrovan.component';
import { ProfilKupacComponent } from './profil-kupac/profil-kupac.component';
import { NarudzbaDetaljiComponent } from './narudzba-detalji/narudzba-detalji.component';
import { ProizvodDetaljiComponent } from './proizvod-detalji/proizvod-detalji.component';
import { ZaposlenikDetaljiComponent } from './zaposlenik-detalji/zaposlenik-detalji.component';
import { IzvjestajiComponent } from './izvjestaji/izvjestaji.component';
import { OcjeneProizvodaComponent } from './ocjene-proizvoda/ocjene-proizvoda.component';
import { SpecijalnePonudeComponent } from './specijalne-ponude/specijalne-ponude.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { KreiranjeNarudzbeComponent } from './kreiranje-narudzbe/kreiranje-narudzbe.component';

import {DatePipe} from "@angular/common";
import { PostavkePorukeComponent } from './postavke-poruke/postavke-poruke.component';

import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from "@angular/material/slider";
import { OtkljucajComponent } from './otkljucaj/otkljucaj.component';
import {AutorizacijaLoginProvjera} from "./guards/autorizacija-login-provjera.service";

export const firebaseConfig = {
  apiKey: "AIzaSyDfrQ_BHWj1HHt4wLaQDO9feLtEF3xKZwc",
  authDomain: "demo2-e3683.firebaseapp.com",
  databaseURL: "https://demo2-e3683-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "demo2-e3683",
  storageBucket: "demo2-e3683.appspot.com",
  messagingSenderId: "848732733588",
  appId: "1:848732733588:web:69b2601f6d5e7f119b3481"
};


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
    NavbarZaposlenikComponent,
    NavbarAdminComponent,
    NarudzbeComponent,
    ProizvodiComponent,
    SkladisteComponent,
    ProfilZaposlenikComponent,
    EvidZaposlComponent,
    RecenzijeComponent,
    KataloziComponent,
    SezKolComponent,
    SpecPonComponent,
    KatPodkatComponent,
    StatistikaComponent,
    ProfilAdminComponent,
    VodiczavelicineComponent,
    KupacPocetnaComponent,
   PravilaPrivatnostiComponent,
   NavKupacComponent,
   NeregistrovanComponent,
   ProfilKupacComponent,
   NarudzbaDetaljiComponent,
   ProizvodDetaljiComponent,
   ZaposlenikDetaljiComponent,
   IzvjestajiComponent,
   OcjeneProizvodaComponent,
   SpecijalnePonudeComponent,
   PretragaComponent,
   KreiranjeNarudzbeComponent,
   PostavkePorukeComponent,
   OtkljucajComponent,



  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    MatSliderModule,
    MatSlideToggleModule,



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
      {path: 'prodavnice/:id', component: ProdavniceComponent},
      {path: 'zaposlenik-pocetna/:id', component:ZaposlenikPocetnaComponent},
      {path: 'admin-pocetna/:id',component:AdminPocetnaComponent, canActivate: [AutorizacijaLoginProvjera]},
      {path: 'prijava', component:PrijavaComponent},
      {path: 'navbar-zaposlenik/:id', component:NavbarZaposlenikComponent},
      {path: 'navbar-admin/:id', component:NavbarAdminComponent},
      {path: 'narudzbe/:id', component:NarudzbeComponent},
      {path: 'skladiste/:id', component:SkladisteComponent},
      {path: 'profil-zaposlenik/:id', component:ProfilZaposlenikComponent},
      {path: 'proizvodi/:id', component:ProizvodiComponent},
      {path: 'evid-zaposl/:id', component:EvidZaposlComponent},
      {path: 'recenzije/:id', component:RecenzijeComponent},
      {path: 'katalozi/:id', component:KataloziComponent},
      {path: 'sez-kol/:id', component:SezKolComponent},
      {path: 'spec-pon/:id', component:SpecPonComponent},
      {path: 'kat-podkat/:id', component:KatPodkatComponent},
      {path: 'statistika/:id', component:StatistikaComponent},
      {path: 'profil-admin/:id', component:ProfilAdminComponent},
      {path: 'vodiczavelicine', component:VodiczavelicineComponent},
      {path: 'kupac-pocetna/:id', component:KupacPocetnaComponent},
      {path: 'pravila-privatnosti', component:PravilaPrivatnostiComponent},
      {path:'nav-kupac/:id', component: NavKupacComponent},
      {path:'neregistrovan', component: NeregistrovanComponent},
      {path:'profil-kupac', component:ProfilKupacComponent},
      {path:'narudzba-detalji/:id', component:NarudzbaDetaljiComponent},
      {path:'proizvod-detalji/:id', component:ProizvodDetaljiComponent},
      {path:'zaposlenik-detalji/:id', component:ZaposlenikDetaljiComponent},
      {path:'ocjene-proizvoda/:id', component:OcjeneProizvodaComponent},
      {path:'kreiranje-narudzbe', component:KreiranjeNarudzbeComponent},
      {path:'postavke-poruke', component:PostavkePorukeComponent},
      {path:'otkljucaj',component:OtkljucajComponent}
  ]),
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

  ],
  providers: [
    AutorizacijaLoginProvjera,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
