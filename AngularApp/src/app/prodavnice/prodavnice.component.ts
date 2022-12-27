import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MojConfig} from "../moj-config";

@Component({
  selector: 'app-prodavnice',
  templateUrl: './prodavnice.component.html',
  styleUrls: ['./prodavnice.component.css']
})
export class ProdavniceComponent implements OnInit {
prodavnicePodaci:any;
komentariPodaci: any;
constructor(private httpKlijent: HttpClient, private router: Router) {
  }

  fetchKomentari() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Komentar/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.komentariPodaci = x;
    });
  }
  fetchProdavnice() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Prodavnica/GetByAll", MojConfig.http_opcije()).subscribe(x=>{
      this.prodavnicePodaci = x;
    });
  }

  ngOnInit(): void {
  this.fetchProdavnice();
  this.fetchKomentari();
  }


  pregledKomentara() {
    if (this.komentariPodaci == null)
      return [];
    return this.komentariPodaci;
  }

  getProdavnice() {
    if (this.prodavnicePodaci == null){
      return [];
    }
    return this.prodavnicePodaci;
  }

  pogledaj_komentare() {
    if (this.komentariPodaci == null)
      return [];
    return this.komentariPodaci;
  }

  pogledaj_ocjene(s:any) {

  }

  dodaj_komentar() {

  }
}
