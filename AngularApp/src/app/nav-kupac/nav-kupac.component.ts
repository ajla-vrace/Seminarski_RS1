import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-nav-kupac',
  templateUrl: './nav-kupac.component.html',
  styleUrls: ['./nav-kupac.component.css']
})
export class NavKupacComponent implements OnInit {

  potvrda: any = false;

  kupac_id:any;

  constructor(private router: Router, private httpKlijent: HttpClient, private route:ActivatedRoute) {
  }
  ngOnInit(): void {

   /* this.route.params.subscribe(s=>{
      this.kupac_id=+s["id"];
    })*/

  }
  reloadPage() {
    window.location.reload()
  }


  otvoriFaq() {
    this.potvrda = true;
    this.router.navigate(['/faq']);
  }

  otvoriHelp() {
    this.potvrda = true;
    this.router.navigate(['/help1']);
  }

  prikaziZene() {
    this.potvrda = true;
    this.router.navigate(['zene']);
  }

  prikaziMuskarce() {
    this.potvrda = true;
    this.router.navigate(['muskarci']);
  }

  prikaziFavorite() {
    this.potvrda = true;
    this.router.navigate(['favoriti']);
  }

  prikaziKosaricu() {
    this.potvrda = true;
    this.router.navigate(['kosarica']);
  }


  prikaziProfil() {
    this.potvrda = true;

    this.router.navigate(['/profil-kupac']);
  }
}
