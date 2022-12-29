import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MojConfig} from "../moj-config";

@Component({
  selector: 'app-prodavnice',
  templateUrl: './prodavnice.component.html',
  styleUrls: ['./prodavnice.component.css']
})
export class ProdavniceComponent implements OnInit {
  prodavnicePodaci: any;
  pretraga: any;
  komentariPodaci: any;
  opis:any;
  kupac:any;
  prod:any;
  noviKomentar: any;
  komentarisi: any;


  kupac_id:any;
  ocjena: any;
  novaOcjena: any;
   ocjenePodaci: any;

  constructor(private httpKlijent: HttpClient, private router: Router,
              private route: ActivatedRoute) {}

  fetchKomentari() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Komentar/Get5", MojConfig.http_opcije()).subscribe(x=>{
      this.komentariPodaci = x;
    });
  }
  fetchProdavnice() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Prodavnica/GetByAll", MojConfig.http_opcije()).subscribe(x=>{
      this.prodavnicePodaci = x;
    });
  }
  fetchOcjene() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Ocjena/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.ocjenePodaci = x;
    });
  }
  ngOnInit(): void {
    this.fetchProdavnice();
    this.fetchKomentari();

    this.route.params.subscribe(s=>{
      this.kupac_id=+s["id"];
    })
  }
  pregledKomentara() {
    if (this.komentariPodaci == null)
      return [];
    return this.komentariPodaci;
  }

  getProdavnice() {
    if (this.prodavnicePodaci == null)
      return [];
    return this.prodavnicePodaci;
  }
  dodaj_komentar(p:any){
    this.komentarisi=true;
}
  postavi_komentar(opis_input:any, s:any) {

    this.noviKomentar={
      id:0,
      opis:opis_input.value,
      kupacId:this.kupac_id,
      prodavnicaId:s,

    }

    this.httpKlijent.post(`${MojConfig.adresa_servera}/Komentar/Add`, this.noviKomentar, MojConfig.http_opcije()).subscribe(x => {
      this.fetchKomentari();

    });

  }

  postavi_ocjenu(a:any, s:any) {

    this.novaOcjena={
      id:0,
      ocjena:s,
      kupacId:this.kupac_id,
      prodavnicaId:a,

    }


    this.httpKlijent.post(`${MojConfig.adresa_servera}/Ocjena/Add`, this.novaOcjena, MojConfig.http_opcije()).subscribe(x => {
      this.fetchOcjene();

    });
  alert("uspjesno");
  }





}
