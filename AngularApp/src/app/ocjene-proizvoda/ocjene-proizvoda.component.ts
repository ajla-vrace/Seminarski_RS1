import { Component, OnInit } from '@angular/core';
import {LoginInformacije} from "../helpers/login-informacije";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";
import {MojConfig} from "../moj-config";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-ocjene-proizvoda',
  templateUrl: './ocjene-proizvoda.component.html',
  styleUrls: ['./ocjene-proizvoda.component.css']
})
export class OcjeneProizvodaComponent implements OnInit {
   ocjeneProizvodaPodaci: any;
   proizvod_id: any;
   novaZvjezdica: any;
   kupac_id:any=this.loginInfo().autentifikacijaToken.korisnickiNalogId;


  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }




  constructor(private httpKlijent: HttpClient,private router: Router, private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.proizvod_id=+s["id"];
    })
    this.fetchOcjeneProizvoda();
  }
  private fetchOcjeneProizvoda() {

    this.httpKlijent.get(MojConfig.adresa_servera+ "/Zvjezdica/GetByProizvodId/"+this.proizvod_id, MojConfig.http_opcije()).subscribe(x=>{
      this.ocjeneProizvodaPodaci = x;
    });
  }

  getOcjeneProizvoda(){
    if (this.ocjeneProizvodaPodaci == null)
      return [];
    return this.ocjeneProizvodaPodaci;
  }


  ocjeniProizvod(proizvodid:any, ocjena1:number) {
    console.log("proizvodid: "+proizvodid);
    console.log("ocjena: "+ocjena1);
    this.novaZvjezdica={
      id:0,
      ocjenaBrojcano:ocjena1,
      kupacId:this.kupac_id,
      proizvodId:proizvodid,
      //datumKreiranja: "2023-01-08T21:07:09.653Z",
    }
    this.httpKlijent.post(`${MojConfig.adresa_servera}/Zvjezdica/Add`, this.novaZvjezdica, MojConfig.http_opcije()).subscribe(x => {
      this.fetchOcjeneProizvoda();
    });
    console.log("ocjena iz zvjzdice: "+this.novaZvjezdica.ocjenaBrojcano);
    console.log("ocjena: "+ocjena1);
    console.log("ocjena: "+typeof (ocjena1));
    alert("Uspješno dodana zvjezdica");

  }

}
