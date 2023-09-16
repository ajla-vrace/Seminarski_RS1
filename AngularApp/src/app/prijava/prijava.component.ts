import { Component, OnInit } from '@angular/core';
import {LoginInformacije} from "../helpers/login-informacije";
import {MojConfig} from "../moj-config";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private httpKlijent:HttpClient, private router:Router, private afDB:AngularFireDatabase) { }


  brojPosjetaUpdate:any;
  brojPregled:any;
  brojNoviPregledi:any;
  brojPosjetaRef?:any;
  counter:any=0;

  update_varijable(){
    console.log("update se desio");
    if(this.counter<1) {
      this.afDB.object('Varijable/').update({brojPregleda:++this.brojPregled});
      this.afDB.object('Varijable/').update({noviPregledi:++this.brojNoviPregledi});
      this.counter++;
    }
  }

  getBrojPosjeta(){
    this.brojPosjetaRef=this.afDB.object('Varijable').valueChanges().subscribe
    ((x:any)=>{
      this.brojPosjetaUpdate=x;
      console.log("brojposjeta:",this.brojPosjetaUpdate);
      this.brojPregled=this.brojPosjetaUpdate.brojPregleda;
      this.brojNoviPregledi=this.brojPosjetaUpdate.noviPregledi;
      console.log(this.brojPregled, this.brojNoviPregledi);
      console.log("kupac pocetna");
      this.update_varijable();
    });
  }



  txtLozinka: any;
  txtKorisnickoIme: any;


  ngOnInit(): void {
  }
  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
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

          console.log(x.autentifikacijaToken.korisnickiNalog.id);


          if(x.autentifikacijaToken.korisnickiNalog.isAdmin==true){
            AutentifikacijaHelper.setLoginInfo(x)
            this.router.navigate(['/otkljucaj']);
           // this.router.navigate(['/admin-pocetna',x.autentifikacijaToken.korisnickiNalog.id]);
           // this.router.navigate(['navbar-admin',x.autentifikacijaToken.korisnickiNalog.id])
          }
          else if(x.autentifikacijaToken.korisnickiNalog.isKupac==true){
            AutentifikacijaHelper.setLoginInfo(x)
            //this.router.navigate(['nav-kupac',x.autentifikacijaToken.korisnickiNalog.id]);
            this.getBrojPosjeta();
            this.router.navigate(['kupac-pocetna',x.autentifikacijaToken.korisnickiNalog.id]);
          }
          else if(x.autentifikacijaToken.korisnickiNalog.isZaposlenik==true){
            AutentifikacijaHelper.setLoginInfo(x)
            this.router.navigate(["/zaposlenik-pocetna",x.autentifikacijaToken.korisnickiNalog.id]);
           // this.router.navigate(['navbar-zaposlenik',x.autentifikacijaToken.korisnickiNalog.id])
          }
          else{
            AutentifikacijaHelper.setLoginInfo(x)
            this.router.navigateByUrl("/neregistrovan");
          }

        }
        else
        {
          // @ts-ignore
          AutentifikacijaHelper.setLoginInfo(null)
          // porukaError("neispravan login");
          alert("Pogrešno korisničko ime ili lozinka.");
          //this.txtKorisnickoIme="";
          this.txtLozinka="";
        }


      });
  }
}
