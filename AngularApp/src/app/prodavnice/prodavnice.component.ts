import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MojConfig} from "../moj-config";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@Component({
  selector: 'app-prodavnice',
  templateUrl: './prodavnice.component.html',
  styleUrls: ['./prodavnice.component.css']
})
export class ProdavniceComponent implements OnInit {
  prodavnicePodaci: any;
  pretraga: any;
  komentariPodaci: any;
  opis: any;
  kupac: any;
  prod: any;
  noviKomentar: any;
  kupac_id: any;
  ocjena: any;
  novaOcjena: any;
  ocjenePodaci: any;

  prodavnicaId: any = 0;
  prodavnicaIdFilter: any = 0;
  faliPodataka: any = false;
  uspjesanKomentar: any = false;
  uspjesnaOcjena: any = false;

  dodanKomentar: any = false;
  opisK: any;
  ocjenaPostavljena: any = false;
  ovajOcjena: any;
   prosjeciPodaci: any;


  constructor(private httpKlijent: HttpClient, private router: Router,
              private route: ActivatedRoute) {
  }

  fetchKomentari(): void {
    this.httpKlijent.get(MojConfig.adresa_servera + "/Komentar/GetAll", MojConfig.http_opcije()).subscribe(x => {
      this.komentariPodaci = x;
    });
  }

  fetchProdavnice(): void {
    this.httpKlijent.get(MojConfig.adresa_servera + "/Prodavnica/GetByAll", MojConfig.http_opcije()).subscribe(x => {
      this.prodavnicePodaci = x;
    });
  }

  fetchOcjene(): void {
    this.httpKlijent.get(MojConfig.adresa_servera + "/Ocjena/GetAll", MojConfig.http_opcije()).subscribe(x => {
      this.ocjenePodaci = x;
    });
  }
  fetchProsjekProdavnica() {
    this.httpKlijent.get(MojConfig.adresa_servera + "/Prodavnica/GetAllProsjek", MojConfig.http_opcije()).subscribe(x => {
      this.prosjeciPodaci = x;
    });
  }
  getProsjekByProdavnicaId(id: number): number {/*
    const prosjekData = this.prosjeciPodaci.find(data => data.prodavnicaId === prodavnicaId);
    return prosjekData ? prosjekData.prosjek : 0;*/
    /*if(this.prosjeciPodaci==null)
      return 0;
    return this.prosjeciPodaci.filter((a:any)=>a.prodavnicaId==id).prosjek;*/
    const prosjekData = this.prosjeciPodaci?.find((a:any) => a.prodavnicaId === id);
    return prosjekData ? prosjekData.prosjek : 0;
  }
  ngOnInit(): void {

    this.fetchProdavnice();
    this.fetchKomentari();

    this.route.params.subscribe(s => {
      this.kupac_id = +s["id"];
    })
    this.fetchProsjekProdavnica();
  }

  ngAfterViewInit() {
    /*this.prodavnicaId=this.prodavnicePodaci.length > 0 ? this.prodavnicePodaci[0].id : 0;*/
  }

  pregledKomentara() {

    if (this.komentariPodaci == null)
      return [];
    if (this.prodavnicaIdFilter == 0)
      return this.komentariPodaci;
    return this.komentariPodaci.filter((a: any) => a.prodavnicaId == this.prodavnicaIdFilter);
  }








  getProdavnice() {
    if (this.prodavnicePodaci == null)
      return [];
    return this.prodavnicePodaci;
  }

  postavi_komentar(opis_input:any, s:any) {
    if(opis_input.value!="" && this.prodavnicaId!=0) {

        this.noviKomentar = {
          id: 0,
          opis: opis_input.value,
          kupacId: this.kupac_id,
          prodavnicaId: s,

        }
        this.httpKlijent.post(`${MojConfig.adresa_servera}/Komentar/Add`, this.noviKomentar, MojConfig.http_opcije()).subscribe(x => {
          this.fetchKomentari();
        });


     // this.httpKlijent.post(`${MojConfig.adresa_servera}/Komentar/Add`, this.noviKomentar, MojConfig.http_opcije()).subscribe(x => {
       // this.fetchKomentari();
     // });
this.uspjesanKomentar=true;
      this.ocistiInput(opis_input);
      this.prodavnicaId=0;
      return;
    }
    else{
      this.faliPodataka=true;
      //alert("Nije moguce dodati prazan komentar!");


}

  }

  private ocistiInput(s:any) {
    s.value="";
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
      this.fetchProsjekProdavnica();
    });

    //alert("Uspješno dodana ocjena");
    this.uspjesnaOcjena=true;
  }




  skloniDiv() {
    this.faliPodataka=false;
    this.uspjesanKomentar=false;
    this.uspjesnaOcjena=false;
  }


  ispisi() {

  }
}
