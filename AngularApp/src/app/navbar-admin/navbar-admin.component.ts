import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoginInformacije} from "../helpers/login-informacije";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router) { }

  count:any=1;

  admin_id:any;

  ngOnInit(): void {
    this.count++;
    this.route.params.subscribe(s=>{
      this.admin_id=+s["id"];
    })
  }
  loginId:any=AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.id;

  profil_admin() {
    this.router.navigate(['/profil-admin',this.loginId])
  }

  statistika() {
    this.router.navigate(['/statistika',this.loginId])
  }

  recenzije() {
    this.router.navigate(['/recenzije',this.loginId])
  }

  katalozi() {
    this.router.navigate(['/katalozi',this.loginId])
  }

  kat_podkat() {
    this.router.navigate(['/kat-podkat',this.loginId])
  }

  spec_pon() {
    this.router.navigate(['/spec-pon',this.loginId])
  }

  sez_kol() {
    this.router.navigate(['/sez-kol',this.loginId])
  }

  evid_zaposl() {
    this.router.navigate(['/evid-zaposl',this.loginId])
  }

  admin_pocetna() {
    this.router.navigate(['/admin-pocetna',this.loginId])
  }
}
