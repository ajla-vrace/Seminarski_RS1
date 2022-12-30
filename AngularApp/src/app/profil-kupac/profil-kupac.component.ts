import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MojConfig} from "../moj-config";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-profil-kupac',
  templateUrl: './profil-kupac.component.html',
  styleUrls: ['./profil-kupac.component.css']
})
export class ProfilKupacComponent implements OnInit {
komm:any=false;
  kupac_id:any;
kupac_podaci:any;
   komentariPodaci1: any;
  odabranikomentar: any=null;
   komentariPodaciMoji: any;
   ocjeneProdavnica: any;
   ocjene: any=false;
   ocjeneProdavnicaMoje: any;

  constructor(private route: ActivatedRoute, private httpKlijent:HttpClient) { }

  ngOnInit(): void {

    this.route.params.subscribe(s=>{
      this.kupac_id=+s["id"];
    })
    this.getKupca();
    this.fetchKomentari();
    this.fetchKomentariMoji();
    this.fetchOcjeneProdavnice();
    this.fetchOcjeneProdavniceMoje();
  }


  getKupca(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/Kupac/GetById?id="+this.kupac_id)
      .subscribe((x:any)=>{
        this.kupac_podaci=x;
        console.log(this.kupac_podaci);
      })
  }
  fetchKomentari() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Komentar/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.komentariPodaci1 = x;
    });
  }

  fetchKomentariMoji() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Komentar/GetById/"+this.kupac_id, MojConfig.http_opcije()).subscribe(x=>{
      this.komentariPodaci1 = x;
    });
  }

  fetchOcjeneProdavnice() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Ocjena/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.ocjeneProdavnica = x;
    });
  }





  fetchOcjeneProdavniceMoje() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Ocjena/GetById/"+this.kupac_id, MojConfig.http_opcije()).subscribe(x=>{
      this.ocjeneProdavnicaMoje = x;
    });
  }

  prikaziMojeKomentare() {
    if (this.komentariPodaci1 == null)
      return [];
    return this.komentariPodaci1.filter((a:any)=>a.kupacId==this.kupac_id);
  }

  prikazKomm() {
    this.komm = true;
  }

  prikaziMojeOcjeneProdavnica() {
    if (this.ocjeneProdavnica == null)
      return [];
    return this.ocjeneProdavnica.filter((a:any)=>a.kupacId==this.kupac_id);
  }

  prikazOcjene() {
    this.ocjene = true;
  }

  brisikomm(s: any) {
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Komentar/Delete/" + s.id,null, MojConfig.http_opcije())
      .subscribe((povratnaVrijednost:any) =>{
        const index = this.komentariPodaci1.indexOf(s);
        if (index > -1) {
          this.komentariPodaci1.splice(index, 1);
        }

      });


    this.httpKlijent.post(MojConfig.adresa_servera+ "/Komentar/GetById?id="+s.id,MojConfig.http_opcije()).subscribe(x=>{
      this.komentariPodaci1= x;
    });
    alert("Odabrani komentar je obrisan!");
  }

  modifikuj(s: any) {
this.odabranikomentar=s;
  }

  modifikuj1(odabranikomentar: any) {
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Komentar/Update/" + this.odabranikomentar.id, this.odabranikomentar)
      .subscribe((povratnaVrijednost:any) =>{
      });

this.odabranikomentar=null;
}


  brisiOcjenu(s: any) {
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Ocjena/Delete/" + s.id,null, MojConfig.http_opcije())
      .subscribe((povratnaVrijednost:any) =>{
        const index = this.ocjeneProdavnica.indexOf(s);
        if (index > -1) {
          this.ocjeneProdavnica.splice(index, 1);
        }

      });


    this.httpKlijent.post(MojConfig.adresa_servera+ "/Ocjena/GetById/"+s.id,MojConfig.http_opcije()).subscribe(x=>{
      this.ocjeneProdavnica= x;
    });
    alert("Odabrani ocjena je obrisana!");
  }
}
