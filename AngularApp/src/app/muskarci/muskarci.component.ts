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
   korpePodaciM: any;
   korpaID: any;
   korpaStavkaM: any;
   korpaStavkePodaciM: any;
   novaKorpaM: any;
   korpaStavkaId: any;
   proizvod_id: any;

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
this.fetchKorpe();
this.fetchKorpstavke();
  }

  getMProizvodi() {
    if (this.proizvodiMPodaci == null)
      return [];
    return this.proizvodiMPodaci;
  }
  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }
  prikaziDetaljeProizvoda(proizvod:any) {
    this.proizvod_id=proizvod;
    this.router.navigate(['proizvod-detalji',this.proizvod_id]);
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


  private fetchKorpe() {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Korpa/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.korpePodaciM = x;
    });
  }
  getKorpe(id:number) {
    if (this.korpePodaciM == null)
      return [];
    return this.korpePodaciM;
  }


  private fetchKorpstavke() {
    if(this.korpaID!=undefined) {
      this.httpKlijent.get(MojConfig.adresa_servera + "/Korpastavke/GetByAll/" + this.korpaID, MojConfig.http_opcije()).subscribe(x => {
        this.korpaStavkePodaciM = x;
      });
    }
  }
  getKorpaStavke() {
    if (this.korpaStavkePodaciM == null)
      return [];
    return this.korpaStavkePodaciM;
  }


  dodajUKorpu(p:number) {
    for(let k of this.korpePodaciM) {
      if (k.naziv.startsWith("Korpa" + this.loginInfo().autentifikacijaToken.korisnickiNalogId)) {
        this.korpaID = k.id;
        // alert("nasao korpu i id korpe je " + this.korpaID);

        console.log("nasao korpu a njen id je " + this.korpaID);
        console.log("ima ovoliko korpa do sada: " + this.korpePodaciM.length);
        console.log("ovo je naziv nadjene korpe" + k.naziv);
        break;
      }
      else {
        this.novaKorpaM = {
          id: 0,
          naziv: "Korpa" + this.loginInfo().autentifikacijaToken.korisnickiNalogId,
          kupacId: this.loginInfo().autentifikacijaToken.korisnickiNalogId,
          total: 0,
          ukupnoProizvoda: 0
        }
        this.httpKlijent.post(`${MojConfig.adresa_servera}/Korpa/Add`, this.novaKorpaM, MojConfig.http_opcije()).subscribe(x => {
          this.fetchKorpe();

        });
        this.korpaID = this.novaKorpaM.id;
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
    this.korpaStavkaM={
      id:0,
      proizvodId:p,
      korpaId:this.korpaID,
      kolicina:1,
    }
    this.httpKlijent.post(`${MojConfig.adresa_servera}/KorpaStavka/Add`, this.korpaStavkaM, MojConfig.http_opcije()).subscribe(x => {
      this.fetchKorpstavke();
      this.korpaStavkaId=this.korpaStavkaM.id;
    });
   // alert("uspjesno dodana stavka");
    console.log("ododana stavka je "+"ovo je id stavke"+this.korpaStavkaId+" ovo je id korpe"+this.korpaStavkaM.korpaId)
  }
}
