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
  kupac_id: any=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
  proizvodiZPodaci: any;
  srceZOboji: any;
  kategorijeZenePodaci: any;
  podkategorijeZenePodaci: any;
  prikaziPodM: any=false;
   noviFavorit: any ;
   favoritiPodaci: any;
   proizvod_id: any;
   proizvodiPodaciSlika: any;
   dodanoUFavorite: any=false;
   vecDodanFavorit: any=false;
   novaKorpa: any;
   korpePodaci: any;
   korpaStavka: any;
   korpaStavkePodaci: any;
korpaID:any;
   korpastavkaId: any;
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
    this.fetchKorpe();
    this.fetchKorpstavke();
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
    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    for(let i=0;i<this.favoritiPodaci.length;i++){
      if(this.favoritiPodaci[i].kupacId==this.kupac_id && this.favoritiPodaci[i].proizvodId==p){
        this.vecDodanFavorit=true;
        return;
      }
    }
    this.noviFavorit = {
      id: 0,
      kupacId: this.kupac_id,
      proizvodId: p,
    }
    this.httpKlijent.post(`${MojConfig.adresa_servera}/Favorit/Add`, this.noviFavorit, MojConfig.http_opcije()).subscribe(x => {
      this.fetchFavoriti();
this.dodanoUFavorite=true;
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

  prikaziDetaljeProizvoda(proizvod:any) {
    this.proizvod_id=proizvod;
    this.router.navigate(['proizvod-detalji',this.proizvod_id]);
  }


  private fetchKorpe() {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Korpa/GetByIdKupac/"+this.loginInfo().autentifikacijaToken.korisnickiNalogId, MojConfig.http_opcije()).subscribe(x=>{
      this.korpePodaci = x;
    });
  }
  getKorpe(id:number) {
    if (this.korpePodaci == null)
      return [];
    return this.korpePodaci;
  }


  private fetchKorpstavke() {
    if(this.korpaID!=undefined) {
      this.httpKlijent.get(MojConfig.adresa_servera + "/KorpaStavke/GetByName/" +"Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId , MojConfig.http_opcije()).subscribe(x => {
        this.korpaStavkePodaci = x;
      });
    }
  }
  getKorpaStavke() {
    if (this.korpaStavkePodaci == null)
      return [];
    return this.korpaStavkePodaci;
  }


  dodajUKorpu(p:number) {
    for(let k of this.korpePodaci) {
      if (k.naziv.startsWith("Korpa" + this.loginInfo().autentifikacijaToken.korisnickiNalogId)) {
        this.korpaID = k.id;
       // alert("nasao korpu i id korpe je " + this.korpaID);

        console.log("nasao korpu a njen id je " + this.korpaID);
        console.log("ima ovoliko korpa do sada: " + this.korpePodaci.length);
        console.log("ovo je naziv nadjene korpe" + k.naziv);
        break;
      }
      else {
        this.novaKorpa = {
          id: 0,
          naziv: "Korpa" + this.loginInfo().autentifikacijaToken.korisnickiNalogId,
          kupacId: this.loginInfo().autentifikacijaToken.korisnickiNalogId,
          total: 0,
          ukupnoProizvoda: 0
        }
        this.httpKlijent.post(`${MojConfig.adresa_servera}/Korpa/Add`, this.novaKorpa, MojConfig.http_opcije()).subscribe(x => {
          this.fetchKorpe();

        });
        this.korpaID = this.novaKorpa.id;
        console.log("korpa id nove je : " + this.korpaID);
        alert("napravljena korpa");
      }
    }
  /*  for(let x of this.korpaStavkePodaci){
      if(x.proizvodId==p){
        console.log("ova stavka je vec dodana"+this.korpaID+" i ovo je id proizvoda "+p);
        return;
      }
    }*/
      this.korpaStavka={
        id:0,
        proizvodId:p,
        korpaId:this.korpaID,
        kolicina:1,
      }
      this.httpKlijent.post(`${MojConfig.adresa_servera}/KorpaStavka/Add`, this.korpaStavka, MojConfig.http_opcije()).subscribe(x => {
        this.fetchKorpstavke();
this.korpastavkaId=this.korpaStavka.id;
      });
      alert("uspjesno dodana stavka");
      console.log("ododana stavka je "+"ovo je id stavke"+this.korpastavkaId+" ovo je id korpe"+this.korpaStavka.korpaId)
    }

}



