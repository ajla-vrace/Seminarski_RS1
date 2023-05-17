import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "./moj-config";
import {AutentifikacijaHelper} from "./helpers/autentifikacija-helper";
import {LoginInformacije} from "./helpers/login-informacije";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  title = 'AngularApp';
  potvrda: any = false;

  constructor(private router: Router, private httpKlijent: HttpClient,  private afDB:AngularFireDatabase) {
    //this.getBrojPosjeta();
  }

  reloadPage() {
    window.location.reload()
  }

  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }

  pocetna() {
    if(this.loginInfo().isLogiran==false)
       this.router.navigate(['/pocetna']);
    else if(this.loginInfo().autentifikacijaToken.korisnickiNalog.isAdmin)
      this.router.navigate(['/admin-pocetna',this.loginInfo().autentifikacijaToken.korisnickiNalog.id]);
    else if(this.loginInfo().autentifikacijaToken.korisnickiNalog.isZaposlenik)
      this.router.navigate(['/zaposlenik-pocetna',this.loginInfo().autentifikacijaToken.korisnickiNalog.id]);
    else
      this.router.navigate(['/kupac-pocetna',this.loginInfo().autentifikacijaToken.korisnickiNalog.id]);
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


  prikaziPravila() {
    this.potvrda = true;
    this.router.navigate(['/pravila-privatnosti']);
  }

  prikaziKontakt() {
    this.potvrda = true;
    this.router.navigate(['/kontakt']);
  }

  prikaziProdavnice() {
    this.potvrda = true;

    if(this.loginInfo().isLogiran==true &&
      this.loginInfo().autentifikacijaToken.korisnickiNalog.isKupac)
       this.router.navigate(['/prodavnice',this.loginInfo().autentifikacijaToken.korisnickiNalog.id]);
  }




  submit_newsletter() {}



    odjaviSe()

    {
      let token=MojConfig.http_opcije();
      // @ts-ignore
      AutentifikacijaHelper.setLoginInfo(null);

      this.httpKlijent.post(MojConfig.adresa_servera + "/api/Autentifikacija", null, token)
        .subscribe((x: any) => {
          alert("Uspješno ste se odjavili.");
        });
      this.router.navigateByUrl("/pocetna");
    }





  ngOnInit(): void {
    this.pocetna();
   // this.getBrojPosjeta();
  }


  brojPosjetaUpdate:any;
  brojPregled:any;
  brojPosjetaRef?:any;
  counter:any=0;

  update_varijable(){
    console.log("update se desio");
    if(this.counter<1) {
      this.afDB.object('Varijable/').update({brojPregleda:++this.brojPregled});
      this.counter++;
    }
  }

  getBrojPosjeta(){
    this.brojPosjetaRef=this.afDB.object('Varijable').valueChanges().subscribe
    ((x:any)=>{
      this.brojPosjetaUpdate=x;
      console.log("brojposjeta:",this.brojPosjetaUpdate);
      this.brojPregled=this.brojPosjetaUpdate.brojPregleda;
      console.log(this.brojPregled);

      this.update_varijable();
    });
  }


}



