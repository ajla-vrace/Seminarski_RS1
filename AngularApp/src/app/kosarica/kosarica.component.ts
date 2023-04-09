import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {LoginInformacije} from "../helpers/login-informacije";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";

@Component({
  selector: 'app-kosarica',
  templateUrl: './kosarica.component.html',
  styleUrls: ['./kosarica.component.css']
})
export class KosaricaComponent implements OnInit {

  kupac_id:any;
  korpaStavkePodaci1: any;
  novaKorpa: any;
  imeKorpe: any="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;
  total:any;
  jedan: any;
  odabranaStavka: any;
  korpaId:any;
  pogledajUkupno: any=false;
  ukupno: any;
   korpaStavkePodaci: any;
   KorpePodaci: any;
   KorpePodaciIme: any;
   sveUkupno: number=0;
   modifikovano: any=false;
brisano:any=false;
   korpa: any;
  constructor(private httpKlijent: HttpClient,private router: Router, private route:ActivatedRoute) {
  }
  private fetchKorpaStavke() {
    //this.imeKorpe="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;

    this.httpKlijent.get(MojConfig.adresa_servera+ "/KorpaStavka/GetByName/"+"Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId, MojConfig.http_opcije()).subscribe(x=>{
      this.korpaStavkePodaci = x;
    });

  }

  private fetchKorpe() {
this.imeKorpe="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Korpa/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.KorpePodaci = x;
    });
    // this.ukupno=this.KorpaPodatak[0].total;
  }

  private fetchKorpaIme() {
    this.imeKorpe="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Korpa/GetByName/"+this.imeKorpe, MojConfig.http_opcije()).subscribe(x=>{
      this.KorpePodaciIme = x;
    });
    // this.ukupno=this.KorpaPodatak[0].total;
  }
  getKorpaIme(){
    this.imeKorpe="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    if (this.KorpePodaciIme == null)
      return [];
    return this.KorpePodaciIme.filter((a:any)=>a.naziv.startsWith(this.imeKorpe));
  }
  ngOnInit(): void {

    /*this.route.params.subscribe(s=>{
      this.kupac_id=+s["id"];
    })*/
    this.fetchKorpe();
    this.fetchKorpaIme();
    this.fetchKorpaStavke();



  }
  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }

  getKorpe(){
    this.imeKorpe="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    if (this.KorpePodaci == null)
      return [];
    return this.KorpePodaci.filter((a:any)=>a.naziv.startsWith(this.imeKorpe));
  }
  getKorpaStavke() {
    this.imeKorpe="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    if (this.korpaStavkePodaci == null)
      return [];
    return this.korpaStavkePodaci.filter((a:any)=>a.korpaIme==this.imeKorpe);
  }
  izracunaj(){
    /*this.fetchKorpstavke();
        for(let i=0;i<(this.korpaStavkePodaci1.length);i++){
    console.log(this.korpaStavkePodaci1[i].id+"ovo je id stavke");
          this.total+=this.korpaStavkePodaci1[i].total;
          console.log(this.korpaStavkePodaci1[i].total+"total jedne stavke");
          console.log(this.total+" ovo je total a ovo je total stavke: "+this.korpaStavkePodaci1[i].total+"ukupno ih ima: "+this.korpaStavkePodaci1.length);
        }

        return this.total;

     */
  }
  UkloniIzKorpe(s:any) {
    this.korpa=this.KorpePodaciIme[0];
    console.log("korpa: "+this.korpa.id+" korpa naziv:" +this.korpa.naziv+"total "+this.korpa.total+
      "ukupno proizvoda: "+this.korpa.ukupnoProizvoda);
    this.httpKlijent.post(MojConfig.adresa_servera+ "/KorpaStavka/Delete/" + s.id,null, MojConfig.http_opcije())
      .subscribe((povratnaVrijednost:any) =>{
        /*const index = this.korpaStavkePodaci.indexOf(s);
        if (index > -1) {
          this.korpaStavkePodaci.splice(index, 1);
        }*/
       this.ngOnInit();
      });
this.brisano=true;
    setTimeout( ()=>{
      this.httpKlijent.post(`${MojConfig.adresa_servera}/Korpa/Add`, this.korpa, MojConfig.http_opcije()).subscribe(x => {
        this.fetchKorpaIme();
        this.korpa=this.KorpePodaciIme[0];
       /* console.log("korpa update :" +this.korpa);
        console.log("korpa poslije: "+this.korpa.id+" korpa naziv:" +this.korpa.naziv+"total "+this.korpa.total+
          "ukupno proizvoda: "+this.korpa.ukupnoProizvoda);*/
        /*this.ngOnInit();*/
      });
    }, 2000);


    /*this.httpKlijent.get(MojConfig.adresa_servera+ "/KorpaStavka/GetByKupacId/"+this.loginInfo().autentifikacijaToken.korisnickiNalogId, MojConfig.http_opcije()).subscribe(x=>{
      this.korpaStavkePodaci1 = x;
    });
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Korpa/GetByIdKupac/"+this.loginInfo().autentifikacijaToken.korisnickiNalogId, MojConfig.http_opcije()).subscribe(x=>{
      this.KorpaPodatak = x;
    });*/
    //this.fetchKorpe();
   // this.getKorpe();
   // this.getKorpaStavke();
   // this.fetchKorpaIme();
    //console.log(this.KorpePodaci);
   //this.fetchKorpaStavke();
    //alert("Odabrani proizvod je uklonjen  iz korpe!");
  }
/*racun(){
  console.log("pocetak");
  this.sveUkupno=0;
    for(let k of this.getKorpaStavke()){

      this.sveUkupno+=k.total;
      console.log(this.sveUkupno+" +"+k.total);
      console.log("poslije n: iteracije : "+this.sveUkupno);
      console.log(k.total+" ukupno stavka");
    }

    console.log(this.sveUkupno+" ukupno sve");
    return this.sveUkupno;
}*/
  vratiNaPocetnu() {
    this.router.navigate(['zene']);
  }

  kolicinaVelicinaModifikacija(ks: any){

  }


  ModifikacijaKorpaStavke(ks:any) {
    this.httpKlijent.post(MojConfig.adresa_servera+ "/KorpaStavka/Update/" + ks.id, ks)
      .subscribe((povratnaVrijednost:any) =>{
        this.ngOnInit();
      });

    this.odabranaStavka=null;
    this.modifikovano=true;



    /*this.httpKlijent.get(MojConfig.adresa_servera+ "/Korpa/GetByIdKupac/"+this.loginInfo().autentifikacijaToken.korisnickiNalogId, MojConfig.http_opcije()).subscribe(x=>{
      this.KorpaPodatak = x;
    });
    */

    /* this.httpKlijent.get(MojConfig.adresa_servera+ "/KorpaStavka/GetByName/"+this.imeKorpe, MojConfig.http_opcije()).subscribe(x=>{
       this.korpaStavkePodaci1 = x;
     });
 */
    //this.fetchKorpstavke();

    /*this.fetchKorpe();
    this.getKorpe();*/
    //this.getKorpaStavke();
    //this.fetchKorpaIme();

    /*console.log("ovo je korpa stavke: "+this.korpaStavkePodaci);
    console.log(this.KorpePodaci);
    console.log(this.KorpePodaci[0]);*/
   // this.racun();
    //this.fetchKorpaStavke();
this.korpa=this.KorpePodaciIme[0];
    console.log("korpa: "+this.korpa.id+" korpa naziv:" +this.korpa.naziv+"total "+this.korpa.total+
      "ukupno proizvoda: "+this.korpa.ukupnoProizvoda);

    this.httpKlijent.post(MojConfig.adresa_servera+ "/KorpaStavka/Update/" + ks.id, ks)
      .subscribe((a:any) =>{
        /*this.ngOnInit();*/
      });

    setTimeout( ()=>{
      this.httpKlijent.post(`${MojConfig.adresa_servera}/Korpa/Add`, this.korpa, MojConfig.http_opcije()).subscribe(x => {
        this.fetchKorpaIme();
this.korpa=this.KorpePodaciIme[0];
       /* console.log("korpa update :" +this.korpa);
        console.log("korpa poslije: "+this.korpa.id+" korpa naziv:" +this.korpa.naziv+"total "+this.korpa.total+
          "ukupno proizvoda: "+this.korpa.ukupnoProizvoda);*/
        /*this.ngOnInit();*/
      });
    }, 2000);
  }

  Modifikacija(ks: any) {
    this.odabranaStavka=ks;
  }

  ukupnoStavki() {
    return  this.korpaStavkePodaci1.length;
  }

  pogledajCijenu() {
    this.pogledajUkupno=true;
  }

  KreirajNarudzbu() {
this.router.navigate(['kreiranje-narudzbe']);
  }
}
