import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "./moj-config";
import {AutentifikacijaHelper} from "./helpers/autentifikacija-helper";
import {LoginInformacije} from "./helpers/login-informacije";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {SignalRService} from "./_servisi/SignalRServis";
declare function porukaSuccess(a: string):any;
declare function porukaError(a: string):any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  title = 'AngularApp';
  potvrda: any = false;
  primljenaPoruka: string = '';
  constructor(private router: Router, private httpKlijent: HttpClient,  private afDB:AngularFireDatabase,
              private signalRService: SignalRService  ) {
    //this.getBrojPosjeta();

  }



  reloadPage() {
    window.location.reload()
  }

  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }

  jel_otkljucan:any;

  getKod(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Autentifikacija/kod",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.jel_otkljucan=x?.jelOtkljucan;
        console.log("jel otkljucan", this.jel_otkljucan);
        console.log("app component: ",x);
        this.pocetna();
      })
  }

  pocetna() {
    if(this.loginInfo().isLogiran==false)
       this.router.navigate(['/pocetna']);
    else if(this.loginInfo().autentifikacijaToken.korisnickiNalog.isAdmin)
      this.router.navigate(['/admin-pocetna',this.loginInfo().autentifikacijaToken.korisnickiNalog.id]);
    else if(this.loginInfo().autentifikacijaToken.korisnickiNalog.isZaposlenik)
      this.router.navigate(['/zaposlenik-pocetna',this.loginInfo().autentifikacijaToken.korisnickiNalog.id]);
    else if(this.loginInfo().autentifikacijaToken.korisnickiNalog.isKupac)
      this.router.navigate(['/kupac-pocetna',this.loginInfo().autentifikacijaToken.korisnickiNalog.id]);

   // else this.router.navigate(['/prijava']);
   // else  //ovo promijeniti
   //   this.router.navigate(['/admin-pocetna',this.loginInfo().autentifikacijaToken.korisnickiNalog.id]);

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



  email: string = '';
  isSubscribed: boolean = false;
  errorMessage: string = '';
  successMessage:string='';
  urlNewsletter='https://localhost:7043/api/EmailPretplata/Pretplata?email=';
   encodedEmail = encodeURIComponent(this.email);
  submit_newsletter() {
    if (this.email) {

      this.httpKlijent.post(this.urlNewsletter+this.email, {}, { responseType: 'text' }).subscribe(
        () => {
          this.isSubscribed = true;
          this.errorMessage = '';
          this.successMessage = 'Uspješna pretplata.';
console.log("Uspjesan jedan mail");
        },
        (error) => {
          this.isSubscribed = false;
          this.errorMessage = error.error?.message || 'Neuspješno.';
console.log("nesupjesna pretplata.");
        }
      );
    }
    setTimeout( ()=>{
     this.email='';
    }, 400);
  }

  subscribe() {/*
    if (this.email) {
      this.httpKlijent.post<any>(this.urlNewsletter, { email: this.email }).subscribe(
        response => {
          this.isSubscribed = true;
          this.errorMessage = '';
        },
        error => {
          this.isSubscribed = false;
          this.errorMessage = error.error;
        }
      );
    }*/
  }

  funkcija(){
    porukaSuccess("Uspjesno");
  }




    odjaviSe()

    {
      let token=MojConfig.http_opcije();
      // @ts-ignore
      // @ts-ignore
      AutentifikacijaHelper.setLoginInfo(null);

      this.httpKlijent.post(MojConfig.adresa_servera + "/api/Autentifikacija", null, token)
        .subscribe((x: any) => {
          alert("Uspješno ste se odjavili.");
        });
      this.router.navigateByUrl("/pocetna");
    }





  ngOnInit(): void {

   /* if(this.loginInfo().isLogiran==true){
      this.getKod();
    }
    */

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


  posalji_specijalne_ponude_mail() {
    this.httpKlijent.post(MojConfig.adresa_servera + "/api/EmailPretplata/PosaljiSpecijalnePonude", {},
      { responseType: 'text' })
      .subscribe((povratnaVrijednost: any) => {
        console.log("Uspješno poslani mailovi.", povratnaVrijednost);
        // Handle success
      }, error => {
        console.error("Greška pri slanju mailova:", error);
        // Handle error
      });
  }

  posalji_Specijalne_ponude_mail() {
    const url = 'https://localhost:7043/api/EmailPretplata/PosaljiSpecijalnePonude'; // Replace with your backend API endpoint

    this.httpKlijent.post(url, {}).subscribe(
      response => {
        console.log('Newsletter sent successfully');
        // Handle success, e.g., show a success message
      },
      error => {
        console.error('Error sending newsletter:', error);
        // Handle error, e.g., show an error message
      }
    );
  }




}



