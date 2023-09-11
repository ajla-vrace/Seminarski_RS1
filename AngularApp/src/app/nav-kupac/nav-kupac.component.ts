import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {AngularFireDatabase} from "@angular/fire/compat/database";
//import {firebaseServis} "../_servisi/firebaseServis";
declare function porukaSuccess(a: string):any;
declare function porukaError(a: string):any;
@Component({
  selector: 'app-nav-kupac',
  templateUrl: './nav-kupac.component.html',
  styleUrls: ['./nav-kupac.component.css']
})
export class NavKupacComponent implements OnInit {

  potvrda: any = false;

  kupac_id:any;
  prikaziKat: any=false;
   kategorijePodaci: any;
  podkategorijePodaci: any;
  broj: any;
  prikaz: any=false;
  boldirano: any=false;

  constructor(private router: Router, private httpKlijent: HttpClient, private route:ActivatedRoute,
              private afDB:AngularFireDatabase) {
  }
  prikaziKategorije(){

    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Kategorija", MojConfig.http_opcije()).subscribe(x=>{
      this.kategorijePodaci = x;
    });
   /* console.log(this.kategorijePodaci.length);*/
  }
  prikaziPodkat(x:any) {

      this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Kategorija/GetPodkategorije?katID="+x.id, MojConfig.http_opcije()).subscribe(x=>{
        this.podkategorijePodaci = x;
      });
   /* console.log(this.podkategorijePodaci.length);*/
  }
  prikaziPodkat1() {

    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Kategorija/GetPodkategorije", MojConfig.http_opcije()).subscribe(x=>{
      this.podkategorijePodaci = x;
    });
    /*console.log(this.podkategorijePodaci.length);*/
  }

  ngOnInit(): void {




/*
if(this.notifikacija==1){
  porukaSuccess("Dodan je nova specijalna ponuda. Pogledajte je!");
}*/
//porukaSuccess("Dodan je nova specijalna ponuda. Pogledajte je!");
   /* this.route.params.subscribe(s=>{
      this.kupac_id=+s["id"];
    })*/
this.prikaziKategorije();
this.prikaziPodkat1();
  }
  reloadPage() {
    window.location.reload()
  }
promjeniNaJedan(){
  this.afDB.object('/notifikacija').set(1).then(() => {
    console.log('Vrijednost cvora notifikacija promijenjena na 1.');
  });
  porukaSuccess("Dodana je nova specijalna ponuda. Pogledajte je!");
}
  promjeniNaNula(){
    this.afDB.object('/notifikacija').set(0).then(() => {
      console.log('Vrijednost cvora notifikacija promijenjena na 0.');
    });

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


  vrijednost(value: any) {
    this.broj=value;
  }
prikazPodkat:any=false;
  podkategorija:any;
  objekat_proslijedi:any;
  prikaziPodkategoriju(id:any) {
    /*this.prikazPodkat = true;
    this.podkategorija=id;
    console.log("id je :"+this.podkategorija);
    this.objekat_proslijedi=this.podkategorija;*/
  }

  idiNaPretragu() {
    this.router.navigate(['/pretraga']);
  }
}
