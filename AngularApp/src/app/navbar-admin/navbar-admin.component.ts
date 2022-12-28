import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router) { }

  admin_id:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.admin_id=+s["id"];
    })
  }

  profil_admin() {
    this.router.navigate(['/profil-admin',this.admin_id])
  }

  statistika() {
    this.router.navigate(['/statistika',this.admin_id])
  }

  recenzije() {
    this.router.navigate(['/recenzije',this.admin_id])
  }

  katalozi() {
    this.router.navigate(['/katalozi',this.admin_id])
  }

  kat_podkat() {
    this.router.navigate(['/kat-podkat',this.admin_id])
  }

  spec_pon() {
    this.router.navigate(['/spec-pon',this.admin_id])
  }

  sez_kol() {
    this.router.navigate(['/sez-kol',this.admin_id])
  }

  evid_zaposl() {
    this.router.navigate(['/evid-zaposl',this.admin_id])
  }

  admin_pocetna() {
    this.router.navigate(['/admin-pocetna',this.admin_id])
  }
}
