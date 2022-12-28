import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-neregistrovan',
  templateUrl: './neregistrovan.component.html',
  styleUrls: ['./neregistrovan.component.css']
})
export class NeregistrovanComponent implements OnInit {

  potvrda: any = false;

  constructor(private router: Router, private httpKlijent: HttpClient) {
  }
  ngOnInit(): void {
  }
  reloadPage() {
    window.location.reload()
  }

  pocetna() {
    this.potvrda=false;
    this.router.navigate(['/pocetna']);
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
    this.router.navigate(['/zene']);
  }

  prikaziMuskarce() {
    this.potvrda = true;
    this.router.navigate(['/muskarci']);
  }

  prikaziPrijava() {
    this.potvrda = true;
    this.router.navigate(['prijava']);
  }

  prikaziFavorite() {
    this.potvrda = true;
    this.router.navigate(['/favoriti']);
  }

  prikaziKosaricu() {
    this.potvrda = true;
    this.router.navigate(['/kosarica']);
  }



}
