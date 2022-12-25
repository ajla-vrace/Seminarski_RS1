import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginInformacije} from "../helpers/login-informacije";
import {Router} from "@angular/router";
import {MojConfig} from "../moj-config";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";

@Component({
  selector: 'app-prijavi-se',
  templateUrl: './prijavi-se.component.html',
  styleUrls: ['./prijavi-se.component.css']
})
export class PrijaviSeComponent implements OnInit {



  txtLozinka: any;
  txtKorisnickoIme: any;

  constructor(private httpKlijent: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
  }

  btnLogin() {
    let saljemo = {
      korisnickoIme:this.txtKorisnickoIme,
      lozinka: this.txtLozinka
    };
    this.httpKlijent.post<LoginInformacije>(MojConfig.adresa_servera+ "/Autentifikacija/Login/", saljemo)
      .subscribe((x:LoginInformacije) =>{
        if (x.isLogiran) {
          // porukaSuccess("uspjesan login");

          console.log(x.autentifikacijaToken.korisnickiNalog.isAdmin,
            x.autentifikacijaToken.korisnickiNalog.isKupac,
            x.autentifikacijaToken.korisnickiNalog.isZaposlenik)

          if(x.autentifikacijaToken.korisnickiNalog.isAdmin==true){
            AutentifikacijaHelper.setLoginInfo(x)
            this.router.navigate(['/admin-pocetna',x.autentifikacijaToken.korisnickiNalog.id]);
          }
          else if(x.autentifikacijaToken.korisnickiNalog.isKupac==true){
            AutentifikacijaHelper.setLoginInfo(x)
            this.router.navigateByUrl("/pocetna");
          }
          else if(x.autentifikacijaToken.korisnickiNalog.isZaposlenik==true){
            AutentifikacijaHelper.setLoginInfo(x)
            this.router.navigateByUrl("/zaposlenik-pocetna");
          }
          else{
            AutentifikacijaHelper.setLoginInfo(x)
            this.router.navigateByUrl("/pocetna");
          }

        }
        else
        {
          // @ts-ignore
          AutentifikacijaHelper.setLoginInfo(null)
          // porukaError("neispravan login");
        }
      });
  }
}
