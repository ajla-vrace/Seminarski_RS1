import { Component, OnInit } from '@angular/core';
import {LoginInformacije} from "../helpers/login-informacije";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MojConfig} from "../moj-config";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-kreiranje-narudzbe',
  templateUrl: './kreiranje-narudzbe.component.html',
  styleUrls: ['./kreiranje-narudzbe.component.css']
})
export class KreiranjeNarudzbeComponent implements OnInit {
kupac_id:any;
  korpaStavkePodaci: any;
   narudzbaStavka: any;
  narudzbaStavkaPodaci: any;
  pregledNarudzbe:any=true;
  odabirProdavnice: any=false;
  zakljucivanjeNarudzbe: any=false;
   prodavnicePodaci: any;
   narudzba: any;
   narudzbaPodaci: any;
   korpePodaci: any;
  constructor(private httpKlijent: HttpClient,private router: Router, private route:ActivatedRoute,private datePipe:DatePipe) {
  }

  ngOnInit(): void {
    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    this.fetchKorpaStavke();
    this.fetchProdavnice();
    this.fetchNarudzbe();
    this.fetchNarudzbaStavke();
    this.fetchKorpe();
  }
  datum:any=this.datePipe.transform(new Date(),"dd-MM-yyyy");
   narudzbaID: any;
  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }
  ngAfterViewInit(){
   /* setTimeout( ()=>{
     this.pretvoriStavkeKorpeUStavkeNarudzbe();
    }, 300)*/
  }
   fetchKorpaStavke() {
    //this.imeKorpe="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;

    this.httpKlijent.get(MojConfig.adresa_servera+ "/KorpaStavka/GetByName/"+"Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId, MojConfig.http_opcije()).subscribe(x=>{
      this.korpaStavkePodaci = x;
    });

  }
  fetchProdavnice() {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Prodavnica/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.prodavnicePodaci = x;
    });

  }
  fetchNarudzbe() {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Narudzba/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.narudzbaPodaci = x;
    });
  }
   fetchNarudzbaStavke() {
    //this.imeKorpe="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;

    this.httpKlijent.get(MojConfig.adresa_servera+ "/NarudzbaStavka/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.narudzbaStavkaPodaci = x;
    });

  }
  fetchKorpe() {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Korpa/GetByIdKupac/"+this.loginInfo().autentifikacijaToken.korisnickiNalogId, MojConfig.http_opcije()).subscribe(x=>{
      this.korpePodaci = x;
    });

  }

  pretvoriStavkeKorpeUStavkeNarudzbe(narudzba:any){
    this.fetchKorpaStavke();
    for(let ks of this.korpaStavkePodaci){
      this.narudzbaStavka={
        id:0,
        proizvodId:ks.proizvodId,
        cijena:ks.cijena,
        kolicina:ks.kolicina,
        total:ks.total,
        narudzbaId:narudzba,
      }
      this.httpKlijent.post(`${MojConfig.adresa_servera}/NarudzbaStavka/Add`, this.narudzbaStavka, MojConfig.http_opcije()).subscribe(x => {
        this.fetchNarudzbaStavke();

        console.log("narudzba stavka dodano:" +this.narudzbaStavka.id);
        /*this.ngOnInit();*/
      });
    }

/*this.fetchNarudzbaStavke();*/
   /* this.httpKlijent.post(`${MojConfig.adresa_servera}/NarudzbaStavka/Add`, this.narudzbaStavka, MojConfig.http_opcije()).subscribe(x => {
      this.fetchNarudzbaStavke();

      console.log("narudzba stavka dodano:" +this.narudzbaStavka.id);
      /*this.ngOnInit();*/
    /*});*/
  }
brisiSveIzKorpe(idKorpe:any){
  this.httpKlijent.post(MojConfig.adresa_servera+ "/KorpaStavka/DeleteSveIzKorpe/" + idKorpe,null, MojConfig.http_opcije())
    .subscribe((povratnaVrijednost:any) =>{
      this.fetchKorpaStavke();
    });

}

  kreirajNarudzbu() {
    this.narudzba={
      id:0,
      ukupno:0,
      ukupnoProizvoda:0,
      kupacId:this.loginInfo().autentifikacijaToken.korisnickiNalogId,
      status:"Nova",
      prodavnicaId:1,
      evidentirao:"",
    }
    console.log(this.narudzba);
    this.httpKlijent.post(`${MojConfig.adresa_servera}/Narudzba/Add`, this.narudzba, MojConfig.http_opcije()).subscribe(x => {
      this.fetchNarudzbe();


      /*this.ngOnInit();*/
    });
  }
funkcija(){
  this.kreirajNarudzbu();
  this.fetchNarudzbe();
  this.narudzbaID=this.narudzbaPodaci[0].id;
  console.log("narudzba id:"+this.narudzbaID);
  this.pretvoriStavkeKorpeUStavkeNarudzbe(this.narudzbaID);
  this.fetchNarudzbaStavke();
  this.brisiSveIzKorpe(2);
}



   SveOkoNarudzbe() {
     this.kreirajNarudzbu();
     setTimeout( ()=>{
       this.fetchNarudzbe();
       this.narudzbaID=this.narudzbaPodaci[0].id;
       console.log("narudzba id:"+this.narudzbaID);
       this.pretvoriStavkeKorpeUStavkeNarudzbe(this.narudzbaID);
       this.fetchNarudzbaStavke();
       console.log("id korpe: "+this.korpePodaci[0].id);
       this.brisiSveIzKorpe(this.korpePodaci[0].id);
     }, 500);



/*this.brisiSveIzKorpe(2);*/

  }
}
