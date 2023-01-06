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

  kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
   korpaStavkePodaci1: any;
   novaKorpa: any;
   imeKorpe: any;
total:any;
   jedan: any;
  constructor(private httpKlijent: HttpClient,private router: Router, private route:ActivatedRoute) {
  }
  ngOnInit(): void {

    this.route.params.subscribe(s=>{
      this.kupac_id=+s["id"];
    })
this.fetchKorpstavke();
  }
  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }
  private fetchKorpstavke() {
    this.imeKorpe="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    this.httpKlijent.get(MojConfig.adresa_servera+ "/KorpaStavka/GetByName/"+this.imeKorpe, MojConfig.http_opcije()).subscribe(x=>{
      this.korpaStavkePodaci1 = x;
    });
  }
  getKorpaStavke() {
    if (this.korpaStavkePodaci1 == null)
      return [];
    return this.korpaStavkePodaci1;
  }
  izracunaj(){

    for(let x of this.korpaStavkePodaci1){

      this.total=this.total+(x.cijena*x.kolicina);
    }
    console.log(this.total);
    return this.total;
}
  UkloniIzKorpe(s:any) {
    this.httpKlijent.post(MojConfig.adresa_servera+ "/KorpaStavka/Delete/" + s.id,null, MojConfig.http_opcije())
      .subscribe((povratnaVrijednost:any) =>{
        const index = this.korpaStavkePodaci1.indexOf(s);
        if (index > -1) {
          this.korpaStavkePodaci1.splice(index, 1);
        }
      });
    this.httpKlijent.post(MojConfig.adresa_servera+ "/KorpaStavka/GetByName","Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId,MojConfig.http_opcije()).subscribe(x=>{
      this.korpaStavkePodaci1 = x;
    });
    //alert("Odabrani proizvod je uklonjen  iz korpe!");
  }

  vratiNaPocetnu() {
    this.router.navigate(['pocetna']);
  }
}
