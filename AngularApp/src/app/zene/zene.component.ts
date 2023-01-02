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

  constructor(private httpKlijent: HttpClient, private router: Router,
              private route: ActivatedRoute) {}

  fetchProizvodi() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Proizvod/datumOpadajuci", MojConfig.http_opcije()).subscribe(x=>{
      this.proizvodiZPodaci = x;
    });
  }

  ngOnInit(): void {

    this.fetchProizvodi();
    this.fetchKategorijeZene();
    this.fetchPodKategorijeZene();

  }

  getZProizvodi() {
    if (this.proizvodiZPodaci == null)
      return [];
    return this.proizvodiZPodaci;
  }
  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }
  dodajUFavorite() {

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
}
