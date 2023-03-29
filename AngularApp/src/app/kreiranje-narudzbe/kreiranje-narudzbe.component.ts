import { Component, OnInit } from '@angular/core';
import {LoginInformacije} from "../helpers/login-informacije";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MojConfig} from "../moj-config";

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
  constructor(private httpKlijent: HttpClient,private router: Router, private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    this.fetchKorpaStavke();
  }
  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }
  ngAfterViewInit(){
    setTimeout( ()=>{
     this.pretvoriStavkeKorpeUStavkeNarudzbe();
    }, 300)
  }
   fetchKorpaStavke() {
    //this.imeKorpe="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;

    this.httpKlijent.get(MojConfig.adresa_servera+ "/KorpaStavka/GetByName/"+"Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId, MojConfig.http_opcije()).subscribe(x=>{
      this.korpaStavkePodaci = x;
    });

  }
   fetchNarudzbaStavke() {
    //this.imeKorpe="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;

    this.httpKlijent.get(MojConfig.adresa_servera+ "/NarudzbaStavka/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.narudzbaStavkaPodaci = x;
    });

  }
  pretvoriStavkeKorpeUStavkeNarudzbe(){
    this.fetchKorpaStavke();
    for(let ks of this.korpaStavkePodaci){
      this.narudzbaStavka={
        id:ks.id,
        proizvodId:ks.proizvodId,
        cijena:ks.cijena,
        kolicina:ks.kolicina,
        total:ks.total,
      }
      this.httpKlijent.post(`${MojConfig.adresa_servera}/NarudzbaStavka/Add`, this.narudzbaStavka, MojConfig.http_opcije()).subscribe(x => {
        this.fetchNarudzbaStavke();

        console.log("narudzba stavka dodano:" +this.narudzbaStavka.id);
        /*this.ngOnInit();*/
      });
    }
this.fetchNarudzbaStavke();
   /* this.httpKlijent.post(`${MojConfig.adresa_servera}/NarudzbaStavka/Add`, this.narudzbaStavka, MojConfig.http_opcije()).subscribe(x => {
      this.fetchNarudzbaStavke();

      console.log("narudzba stavka dodano:" +this.narudzbaStavka.id);
      /*this.ngOnInit();*/
    /*});*/
  }
}
