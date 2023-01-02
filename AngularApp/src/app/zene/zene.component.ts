import { Component, OnInit } from '@angular/core';
import {LoginInformacije} from "../helpers/login-informacije";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MojConfig} from "../moj-config";

@Component({
  selector: 'app-zene',
  templateUrl: './zene.component.html',
  styleUrls: ['./zene.component.css']
})
export class ZeneComponent implements OnInit {
  kupac_id: any;
  proizvodiZPodaci: any;
  srceZOboji: any;
  kategorijeZenePodaci: any;
  podkategorijeZenePodaci: any;
  prikaziPodM: any=false;
   noviFavorit: any ;
   favoritiPodaci: any;

  constructor(private httpKlijent: HttpClient, private router: Router,
              private route: ActivatedRoute) {}

  fetchProizvodi() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Proizvod/datumOpadajuci", MojConfig.http_opcije()).subscribe(x=>{
      this.proizvodiZPodaci = x;
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
    this.fetchKategorijeZene();
    this.fetchPodKategorijeZene();
this.fetchFavoriti();
  }

  getZProizvodi() {
    if (this.proizvodiZPodaci == null)
      return [];
    return this.proizvodiZPodaci;
  }
  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }
  dodajUFavorite(p:any) {
    this.noviFavorit = {
      id: 0,
      kupacId: 59,
      proizvodId: p,
    }
    this.httpKlijent.post(`${MojConfig.adresa_servera}/Favorit/Add`, this.noviFavorit, MojConfig.http_opcije()).subscribe(x => {
      this.fetchFavoriti();

    });
  }
  getKategorijeZene() {
    if (this.kategorijeZenePodaci == null)
      return [];
    return this.kategorijeZenePodaci;
  }

  private fetchKategorijeZene() {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Kategorija", MojConfig.http_opcije()).subscribe(x=>{
      this.kategorijeZenePodaci = x;
    });
  }
  getPodKategorijeZene(id:number) {
    if (this.podkategorijeZenePodaci == null)
      return [];
    return this.podkategorijeZenePodaci.filter((a:any)=>(a.kategorijaID)==id);
  }

  private fetchPodKategorijeZene() {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Podkategorija", MojConfig.http_opcije()).subscribe(x=>{
      this.podkategorijeZenePodaci = x;
    });
  }

  prikaziDetaljeProizvoda() {
    this.router.navigate(['proizvod-detalji']);
  }

  dodajUKorpu() {

  }
}



