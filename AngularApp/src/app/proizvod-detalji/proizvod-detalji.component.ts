import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MojConfig} from "../moj-config";
import {HttpClient} from "@angular/common/http";
import {LoginInformacije} from "../helpers/login-informacije";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";


@Component({
  selector: 'app-proizvod-detalji',
  templateUrl: './proizvod-detalji.component.html',
  styleUrls: ['./proizvod-detalji.component.css']
})
export class ProizvodDetaljiComponent implements OnInit {
  kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
  proizvod_id:any;
  proizvodiPodaciDetalji: any;
   proizvodiPodaciSlika: any;
   favoritiPodaci: any;
   korpePodaci: any;
   korpaID: any;
   korpaStavkePodaci: any;
   novaKorpa: any;
   korpastavkaId: any;
   korpaStavka: any;
   vecDodanFavorit: any=false;
   noviFavorit: any;
   dodanoUFavorite: any=false;
  odabranavelicina: any;
   zvjezdicePodaci: any;
   novaZvjezdica: any;
   prikaziDiv:any=false;
   SveKorpePodaci: any;
   korpaPodatak: any;
   korpaStavkePodaciSve: any;
   prikaziDivKorpa: any=false;
   dodanFav:any=false;
   imeKorpe: any;
   KorpePodaciIme:any;




  constructor(private httpKlijent: HttpClient,private router: Router, private route:ActivatedRoute) {
  }
  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }
  fetchProizvodiDetalji() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Proizvod/datumOpadajuci", MojConfig.http_opcije()).subscribe(x=>{
      this.proizvodiPodaciDetalji = x;
    });
  }
  fetchProizvodSlika(idSlika:any){
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/ProizvodSlika/slikaByProizvodId?id="+idSlika, MojConfig.http_opcije()).subscribe(x=>{
      this.proizvodiPodaciSlika = x;
    });
  }
  fetchFavoriti()
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Favorit/GetById/"+this.loginInfo().autentifikacijaToken.korisnickiNalogId, MojConfig.http_opcije()).subscribe(x=>{
      this.favoritiPodaci = x;
    });
  }
  fetchZvjezdice() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Ocjena/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.zvjezdicePodaci = x;
    });
  }

  fetchKorpe() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Korpa/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.korpePodaci = x;
    });
  }
  fetchStavkeKorpe() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/KorpaStavka/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.korpaStavkePodaci = x;
    });
  }
  private fetchKorpaIme() {
    this.imeKorpe="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Korpa/GetByName/"+this.imeKorpe, MojConfig.http_opcije()).subscribe(x=>{
      this.KorpePodaciIme = x;
    });
  }

  ngOnInit(): void {

   this.route.params.subscribe(s=>{
      this.proizvod_id=+s["id"];
    })
    //this.fetchFavoriti();
    this.fetchKorpe();
    this.fetchProizvodiDetalji();
this.fetchFavoriti();

  this.fetchStavkeKorpe();
this.fetchKorpaIme();
/*this.jeLiFavorit(this.proizvod_id);*/


    this.provjera_stanja_na_skladistu();
  }

  ngAfterViewInit(){
    setTimeout( ()=>{
      this.jeLiFavorit(this.proizvod_id);
      this.fetchKorpe();
    }, 400)
  }
  getProizvodiDetalji() {
    if (this.proizvodiPodaciDetalji == null)
      return [];
    return this.proizvodiPodaciDetalji;
  }
  /*getProizvodislika(idSlika:number) {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/ProizvodSlika/slikaByProizvodId?id="+idSlika, MojConfig.http_opcije()).subscribe(x=>{
      this.proizvodiPodaciSlika = x;
    });
    return this.proizvodiPodaciSlika;
  }
  getSlika(slika: any) {
    return "data:image/png;base64,"+slika.fileContents;
  }
*/
   dodanoUKorpu: any;
  nadjen: any=false;
   nasaoKorpu: any=false;
  vecDodanUKorpu: any=false;
  isFavorit: any=false;
   korpa: any;
   proizvod: any;



  getKorpe(){
    if (this.korpePodaci == null)
      return [];
    return this.korpePodaci;
  }



  getKorpaStavke() {
    if (this.korpaStavkePodaci == null)
      return [];
    return this.korpaStavkePodaci.filter((a:any)=>a.korpaId==this.korpaID);
  }

  postaviVelicinu(s: any) {
    this.odabranavelicina=s;
  }


  traziKorpu() {

  }
  dodajUKorpu(p:number,velicina:any) {
this.fetchKorpe();
    for (let k of this.korpePodaci) {
      if (k.naziv.startsWith("Korpa" + this.loginInfo().autentifikacijaToken.korisnickiNalogId)) {
        this.korpaID = k.id;
        this.nasaoKorpu = true;
        break;
      }
    }
for (let ks of this.korpaStavkePodaci){

  if(ks.proizvodId==p && this.korpaID==ks.korpaId && ks.velicina==velicina){
    this.vecDodanUKorpu=true;
    return;
  }
}

this.prikaziDivKorpa=true;
/*this.fetchKorpaIme();*/
    this.korpa=this.KorpePodaciIme[0];
  console.log("korpa prije dodavanja: "+this.korpa.id+" korpa naziv:" +this.korpa.naziv+"total "+this.korpa.total+
  "ukupno proizvoda: "+this.korpa.ukupnoProizvoda);

for(let x of this.proizvodiPodaciDetalji){
  if(x.id==this.proizvod_id){
    this.proizvod=x;
    console.log("nasao s istim id "+this.proizvod.id+" naziv"+this.proizvod.naziv+"total "+this.proizvod.total);
  }
}
console.log("KORPA id je:(prije dodavanja stavke)"+this.korpaID);
   if(this.korpaID!=undefined){
     console.log("odabrana velicina: "+this.odabranavelicina);
     this.korpaStavka={
       id:0,
       proizvodId:p,
       korpaId:this.korpaID,
       kolicina:1,

       cijena:this.proizvod.cijena,
       velicina:this.odabranavelicina,
     }
     this.httpKlijent.post(`${MojConfig.adresa_servera}/KorpaStavka/Add`, this.korpaStavka, MojConfig.http_opcije()).subscribe(x => {
       this.fetchStavkeKorpe();

       console.log("korpa stavka dodano:" +this.korpastavkaId);
       /*this.ngOnInit();*/
     });
     this.korpastavkaId=this.korpaStavka.id;
console.log("korpa stavka je : "+this.korpaStavka.id+" "+"za korpu "+this.korpaStavka.korpaId);
   }

     this.dodanoUKorpu=true;

    setTimeout( ()=>{
      console.log("usao u timer: ");
      this.httpKlijent.post(`${MojConfig.adresa_servera}/Korpa/Add`, this.korpa, MojConfig.http_opcije()).subscribe(x => {
        this.fetchKorpaIme();
        this.korpa=this.KorpePodaciIme[0];
        /*console.log("korpaupdate :" +this.korpa);
        console.log("korpa poslije dodavanja: "+this.korpa.id+" korpa naziv:" +this.korpa.naziv+"total "+this.korpa.total+
          "ukupno proizvoda: "+this.korpa.ukupnoProizvoda);
*/
        /*this.ngOnInit();*/
      });
    }, 2000);

  }
  dodajUFavorite(p:any) {

    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;

    for(let i=0;i<this.favoritiPodaci.length;i++){
      if(this.favoritiPodaci[i].kupacId==this.kupac_id && this.favoritiPodaci[i].proizvodId==p){
        this.vecDodanFavorit=true;
        return;
      }
    }
    this.prikaziDiv=true;
    this.noviFavorit = {
      id: 0,
      kupacId: this.kupac_id,
      proizvodId: p,
    }
    this.httpKlijent.post(`${MojConfig.adresa_servera}/Favorit/Add`, this.noviFavorit, MojConfig.http_opcije()).subscribe(x => {
      this.fetchFavoriti();
      this.dodanoUFavorite=true;
      this.prikaziDiv=true;
     /* this.prikaziDiv();*/
    });
    this.ngAfterViewInit();
  }


  prikaziOcjeneProizvoda() {
    this.router.navigate(['ocjene-proizvoda',this.proizvod_id]);
  }

  skloniDiv() {
    this.prikaziDiv=false;
    this.vecDodanFavorit=false;
    this.prikaziDivKorpa=false;
    this.vecDodanUKorpu=false;
  }

  prikazDiva() {
    this.prikaziDiv=true;
  }
  prikazDivakorpa() {
    this.prikaziDivKorpa=true;
  }

  vidiFavorite() {
    this.router.navigate(['favoriti']);
  }

  vidiKorpu() {
    this.router.navigate(['kosarica']);
  }
   jeLiFavorit(proizvodId: any){


    if(this.favoritiPodaci!=undefined){
      for(let i=0;i<this.favoritiPodaci.length;i++){
        if(this.favoritiPodaci[i].proizvodId==proizvodId &&
          this.favoritiPodaci[i].kupacId==this.loginInfo().autentifikacijaToken.korisnickiNalogId){
          this.isFavorit=true;
          console.log("fp:"+ this.favoritiPodaci[i].proizvodId+ " fp kupacid: "+ this.favoritiPodaci[i].kupacId);
          return;
        }
      }
    }
console.log("ptovjera favorita");


  }

  noimage:any="data:@file/jpeg;base64,/9j/4AAQSkZJRgABAQAAZABkAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wgALCADIAN8BAREA/8QAGwABAAMBAQEBAAAAAAAAAAAAAAUGBwMBBAL/2gAIAQEAAAAA24AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAi/i8Ak/vAABXbEOf57eQFgAABXbE59M+idX8gLAAACu2Ks5bsEpxjZuAsAAAK7zyHn9mw55Wtd7WAAAFOy3ke+Ouv2QAAEPXgFpkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//EADoQAAEDAQMGCwgCAwEAAAAAAAECAwQFAAYREiEwMUDREBMWF1FUVmGRkrIHFCI1NkFzdCCBFTJScf/aAAgBAQABPwDazth2w7YdsO2HbDth2w6Ks1lNHRHxivSFyHOLQhrDEnDH725SzOzlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUszs5U/Knfaj1RFYpyJjbS2kqUpOQvWCDhoTory/MqB+8PSf4vPNR2i684httOtSzgBaNMjTG+MjPtvIGbFtQI4DqNrl/TqPzO+s6E6K8vzKgfvD0nhS+yp9bCXUF1ABUgHOAdWI4PaeZXFQcnK90+LKw1Zf2x/q3s4965Qr4rK934o8d0d3948B1G1y/p1H5nfWdCdFeX5lQP3h6TwXsvY1QY5YYKXJ6x8KdYQOk7rRK3Ph1b/JNyFGSVYrUo45fSD3Wu9eGLeCCHmiEPJzOtE50ndZ5hqS0Wn20ONq1pWMQbNswaVFWptpmKwgZSylISB3m1EvVTq7Jfjx1FLjZOSlebjE/9Cx1G1y/p1H5nfWdCdFeX5lQP3h6Ta9l7GaFHLDBS5PWPhT9kDpO60iQ9KkLffcU46s4qUo5yeCmVOVSZyJcRwocSdX2UOg91qJeeDWKYqXxiWVNJxfQo/wCnf/5a917nK48YsVSkQEHMNRcPSe7utHkPRJCH2HFNuoOKVJOcG11b1tV6NxLxS3ObT8SPssdI3WuX9OI/M76zoTovaBMdp8Wmy2cONaklScRmxyTaRIelyFvvuKcdWcVKUcST/ALUkKCVEBQwIB1jhjyHYj6H2HFNuoOKVJOBBtcRZXdSOtWdSnHCfMdCdFeG77F4YrTD7zjQbXlgoAz5sPvbmxp/X5Pgm3NjT+vyfBNubGn9fk+Cbc2NP6/J8E25saf1+T4JtzY0/r8nwTbmxp/X5Pgm3NjT+vyfBNqLSm6LTG4LTinEIJIUrXnOOhO2HbDth2w7YdsO2HbDtht//9k=";
  kliknuoGetSlika: any=false;


  get_slika_base64_FS(s:any) {
    if(s!=null && s.slika_postojeca!=null)
      return "data:image/jpg;base64,"+ s?.slika_postojeca;
    return this.noimage;
    // return "data:image/jpg;base64,"+s.slika_postojeca;
  }









  stanje_na_skladistu:any;
  provjera_stanja_na_skladistu(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SkladisteProizvod/provjeri_stanje?proizvodId="+this.proizvod_id)
      .subscribe((x:any)=>{
        this.stanje_na_skladistu=x;
        console.log("STANJE NA SKLADISTU: ",this.stanje_na_skladistu);
      })
  }

  sadrzi_li_velicinu(vel:any){
    for(let i of this.stanje_na_skladistu){
      if(i?.velicina?.contains(vel))
        return true;
    }
    return false;
  }


}
