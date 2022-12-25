import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar-zaposlenik',
  templateUrl: './navbar-zaposlenik.component.html',
  styleUrls: ['./navbar-zaposlenik.component.css']
})
export class NavbarZaposlenikComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  narudzbe() {

    this.router.navigate(['/narudzbe'])
  }

  pocetna() {

    this.router.navigate(['/zaposlenik-pocetna'])
  }

  proizvodi(){

    this.router.navigate(['/proizvodi'])
  }

  profil(){

    this.router.navigate(['/profil-zaposlenik'])
  }

  skladiste(){

    this.router.navigate(['/skladiste'])
  }
}
