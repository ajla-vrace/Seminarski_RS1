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

  constructor(private httpKlijent: HttpClient, private router: Router,
              private route: ActivatedRoute) {}

  fetchProizvodi() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Proizvod/datumOpadajuci", MojConfig.http_opcije()).subscribe(x=>{
      this.proizvodiMPodaci = x;
    });
  }

  ngOnInit(): void {

    this.fetchProizvodi();
this.fetchKategorije();
this.fetchPodKategorije();

  }

  getMProizvodi() {
    if (this.proizvodiMPodaci == null)
      return [];
    return this.proizvodiMPodaci;
  }
  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }
  dodajUFavorite() {

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
}
