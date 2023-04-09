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

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.zaposlenik_id=+s["id"];
    })

  }

  narudzbe() {

    this.router.navigate(['/narudzbe',this.loginId])
  }

  pocetna() {

    this.router.navigate(['/zaposlenik-pocetna',this.loginId])
  }

  proizvodi(){

    this.router.navigate(['/proizvodi',this.loginId])
  }

  profil(){

    this.router.navigate(['/profil-zaposlenik',this.loginId])
  }

  skladiste(){

    this.router.navigate(['/skladiste',this.loginId])
  }

  postavke() {
    this.router.navigate(['/postavke-poruke'])
  }
}
