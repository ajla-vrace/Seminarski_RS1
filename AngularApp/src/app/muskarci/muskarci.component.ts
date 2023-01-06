import { Component, OnInit } from '@angular/core';
import {LoginInformacije} from "../helpers/login-informacije";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MojConfig} from "../moj-config";

@Component({
  selector: 'app-muskarci',
  templateUrl: './muskarci.component.html',
  styleUrls: ['./muskarci.component.css']
})
export class MuskarciComponent implements OnInit {
  kupac_id: any;
   proizvodiMPodaci: any;
  srceMOboji: any;
   kategorijeMuskarciPodaci: any;
   podkategorijeMuskarciPodaci: any;
  prikaziPodM: any=false;
   favoritiPodaci: any;
   noviFavorit: any;
  dodanoUFavorite: any;

  constructor(private httpKlijent: HttpClient, private router: Router,
              private route: ActivatedRoute) {}

  fetchProizvodi() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Proizvod/datumOpadajuci", MojConfig.http_opcije()).subscribe(x=>{
      this.proizvodiMPodaci = x;
    });
  }
  fetchFavoriti() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Favorit/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.favoritiPodaci = x;
    });
  }
  ngOnInit(): void {

    this.fetchProizvodi();
this.fetchKategorije();
this.fetchPodKategorije();
this.fetchFavoriti();
  }

  getMProizvodi() {
    if (this.proizvodiMPodaci == null)
      return [];
    return this.proizvodiMPodaci;
  }
  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }
  dodajUFavorite(p:any) {
    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    this.noviFavorit = {
      id: 0,
      kupacId: this.kupac_id,
      proizvodId: p,
    }
    this.httpKlijent.post(`${MojConfig.adresa_servera}/Favorit/Add`, this.noviFavorit, MojConfig.http_opcije()).subscribe(x => {
      this.fetchFavoriti();

    });
    this.dodanoUFavorite=true;
  }
  getKategorije() {
    if (this.kategorijeMuskarciPodaci == null)
      return [];
    return this.kategorijeMuskarciPodaci;
  }

  private fetchKategorije() {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Kategorija", MojConfig.http_opcije()).subscribe(x=>{
      this.kategorijeMuskarciPodaci = x;
    });
  }
  getPodKategorijeMuskarci(id:number) {
    if (this.podkategorijeMuskarciPodaci == null)
      return [];
    return this.podkategorijeMuskarciPodaci.filter((a:any)=>(a.kategorijaID)==id);
  }

  private fetchPodKategorije() {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Podkategorija", MojConfig.http_opcije()).subscribe(x=>{
      this.podkategorijeMuskarciPodaci = x;
    });
  }

  dodajUKorpu() {

  }
}
