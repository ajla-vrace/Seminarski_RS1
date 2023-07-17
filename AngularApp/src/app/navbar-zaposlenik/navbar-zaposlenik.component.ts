import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoginInformacije} from "../helpers/login-informacije";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";

@Component({
  selector: 'app-navbar-zaposlenik',
  templateUrl: './navbar-zaposlenik.component.html',
  styleUrls: ['./navbar-zaposlenik.component.css']
})
export class NavbarZaposlenikComponent implements OnInit {


  constructor(private router: Router, private route:ActivatedRoute) { }

  zaposlenik_id:any;

  loginId:any=AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.id;

  ImePrezime:any=AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.ime + " "+
    AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.prezime;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.zaposlenik_id=+s["id"];
    })
  }

  kliknuoNarudzbe:boolean=false;
  kliknuoSkladiste:boolean=false;
  kliknuoProizvodi:boolean=false;
  kliknuoProfil:boolean=false;



  narudzbe() {

    //this.kliknuoNarudzbe=true;
    //this.kliknuoProfil=false;
    //this.kliknuoProizvodi=false;
    //this.kliknuoSkladiste=false;
    this.router.navigate(['/narudzbe',this.loginId])
  }

  pocetna() {

    this.router.navigate(['/zaposlenik-pocetna',this.loginId])
  }

  proizvodi(){

    //this.kliknuoNarudzbe=false;
    //this.kliknuoProfil=false;
    //this.kliknuoProizvodi=true;
    //this.kliknuoSkladiste=false;
    this.router.navigate(['/proizvodi',this.loginId])
  }

  profil(){

   // this.kliknuoNarudzbe=false;
   // this.kliknuoProfil=true;
   // this.kliknuoProizvodi=false;
   // this.kliknuoSkladiste=false;
    this.router.navigate(['/profil-zaposlenik',this.loginId])
  }

  skladiste(){

   // this.kliknuoNarudzbe=false;
   // this.kliknuoProfil=false;
   // this.kliknuoProizvodi=false;
   // this.kliknuoSkladiste=true;
    this.router.navigate(['/skladiste',this.loginId])
  }

  postavke() {
    this.router.navigate(['/postavke-poruke'])
  }

  getWeight(){
    if(this.kliknuoNarudzbe==true)
      return "700";
    else if(this.kliknuoNarudzbe==false) return "400"
    if(this.kliknuoSkladiste==true)
      return "700"
    else if(this.kliknuoSkladiste==false) return "400";
    if(this.kliknuoProfil==true)
      return "700";
    else return "400";
    if(this.kliknuoProizvodi==true)
      return "700";
    else return "400";
  }
}
