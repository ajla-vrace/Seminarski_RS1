import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MojConfig} from "../moj-config";
import {HttpClient} from "@angular/common/http";
import {LoginInformacije} from "../helpers/login-informacije";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";

@Component({
  selector: 'app-favoriti',
  templateUrl: './favoriti.component.html',
  styleUrls: ['./favoriti.component.css']
})
export class FavoritiComponent implements OnInit {

  kupac_id:any;
   favoritiPodaci: any;
  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }
  constructor(private httpKlijent: HttpClient,private router: Router, private route:ActivatedRoute) {
  }
  fetchFavoriti() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Favorit/GetById/"+this.loginInfo().autentifikacijaToken.korisnickiNalogId, MojConfig.http_opcije()).subscribe(x=>{
      this.favoritiPodaci = x;
    });
  }
  ngOnInit(): void {

    this.route.params.subscribe(s=>{
      this.kupac_id=+s["id"];
    })
    this.fetchFavoriti();
  }

  getFavoriti() {
    if (this.favoritiPodaci == null)
      return [];
    return this.favoritiPodaci;
  }

  UkloniFavorit(s:any) {
    /*this.httpKlijent.post(MojConfig.adresa_servera+ "/Favorit/Delete/" + s.id,null, MojConfig.http_opcije())
      .subscribe((povratnaVrijednost:any) =>{
        const index = this.favoritiPodaci.indexOf(s);
        if (index > -1) {
          this.favoritiPodaci.splice(index, 1);
        }
      });*/
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Favorit/Delete/" + s.id,null, MojConfig.http_opcije())
      .subscribe((povratnaVrijednost:any) =>{
       this.fetchFavoriti();

      });
   /* this.httpKlijent.post(MojConfig.adresa_servera+ "/Favorit/GetById/"+this.loginInfo().autentifikacijaToken.korisnickiNalogId,MojConfig.http_opcije()).subscribe(x=>{
      this.favoritiPodaci = x;
    });*/
    //alert("Odabrani favorit je obrisan!");
  }

  vratiNaPocetnu() {
    this.router.navigate(['zene']);
  }
}
