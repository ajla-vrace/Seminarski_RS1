import { Component, OnInit } from '@angular/core';
import {LoginInformacije} from "../helpers/login-informacije";
import {MojConfig} from "../moj-config";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private httpKlijent:HttpClient, private router:Router) { }

  txtLozinka: any;
  txtKorisnickoIme: any;


  ngOnInit(): void {
  }


  btnLogin() {
    let saljemo = {
      username:this.txtKorisnickoIme,
      password: this.txtLozinka
    };
    this.httpKlijent.post<LoginInformacije>(MojConfig.adresa_servera+ "/api/Autentifikacija/x", saljemo)
      .subscribe((x:LoginInformacije) =>{
        console.log(x);
        if (x.isLogiran) {
          // porukaSuccess("uspjesan login");

          console.log(x.autentifikacijaToken.korisnickiNalog.isAdmin,
            x.autentifikacijaToken.korisnickiNalog.isKupac,
            x.autentifikacijaToken.korisnickiNalog.isZaposlenik)

          if(x.autentifikacijaToken.korisnickiNalog.isAdmin==true){
            AutentifikacijaHelper.setLoginInfo(x)
            this.router.navigate(['/admin-pocetna']);
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
