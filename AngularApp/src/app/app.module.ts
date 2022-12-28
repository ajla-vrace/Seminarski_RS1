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
      {path: 'zaposlenik-pocetna/:id', component:ZaposlenikPocetnaComponent},
      {path: 'admin-pocetna/:id',component:AdminPocetnaComponent},
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
  ]),
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
