import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "./moj-config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  ngOnInit(): void {
      throw new Error('Method not implemented.');
  }

  title = 'AngularApp';
potvrda:any=false;
  constructor(private router:Router) {
  }
  reloadPage(){
    window.location.reload()
  }

  pocetna() {

    this.router.navigate(['/pocetna']);
  }

  otvoriFaq() {
    this.potvrda=true;
    this.router.navigate(['/faq']);
  }

  otvoriHelp() {
    this.potvrda=true;
this.router.navigate(['/help1']);
  }

  prikaziZene() {
    this.potvrda=true;
    this.router.navigate(['/zene']);
  }

  prikaziMuskarce() {
    this.potvrda=true;
    this.router.navigate(['/muskarci']);
  }

  prikaziPrijava() {
    this.potvrda=true;
    this.router.navigate(['prijava']);
  }

  prikaziFavorite() {
    this.potvrda=true;
    this.router.navigate(['/favoriti']);
  }

  prikaziKosaricu() {
    this.potvrda=true;
    this.router.navigate(['/kosarica']);
  }


  prikaziPravila() {
    this.potvrda=true;
    this.router.navigate(['/pravila-privatnosti']);
  }

  prikaziKontakt() {
    this.potvrda=true;
    this.router.navigate(['/kontakt']);
  }

  prikaziProdavnice() {
    this.potvrda=true;
    this.router.navigate(['/prodavnice']);
  }

  submit_newsletter() {

  }
}
