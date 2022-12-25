import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "./moj-config";
import {AutentifikacijaHelper} from "./helpers/autentifikacija-helper";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'AngularApp';
potvrda:any=false;
  constructor(private router:Router, private httpKlijent:HttpClient) {
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

//odjava
  logoutButton() {
    // @ts-ignore
    AutentifikacijaHelper.setLoginInfo(null);

    this.httpKlijent.post(MojConfig.adresa_servera + "/api/Autentifikacija", null, MojConfig.http_opcije())
      .subscribe((x: any) => {
        this.router.navigateByUrl("/pocetna");
        alert("Uspješno ste se odjavili.");
      });
  }
}
