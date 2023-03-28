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


  ngOnInit(): void {

   this.route.params.subscribe(s=>{
      this.proizvod_id=+s["id"];
    })
    //this.fetchFavoriti();
    this.fetchKorpe();
    this.fetchProizvodiDetalji();
this.fetchFavoriti();

  this.fetchStavkeKorpe();

/*this.jeLiFavorit(this.proizvod_id);*/
  }

  ngAfterViewInit(){
    setTimeout( ()=>{
      this.jeLiFavorit(this.proizvod_id);
      this.fetchKorpe();
    }, 300)
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
    //this.fetchKorpeSve();
   /* if(this.odabranavelicina==undefined){
      console.log("odabrana velicina: "+this.odabranavelicina);
      alert("Trebate odabrati velicinu!");
      return;
    }
*/
    for(let i=0;i<this.korpePodaci.length-1;i++){
      console.log("for petlja s i:"+i);
      console.log("id:" +this.korpePodaci[i].id);
      console.log("naziv:" +this.korpePodaci[i].naziv);
      console.log("id kupac:" +this.korpePodaci[i].kupacId);
    }
    for (let k of this.korpePodaci) {
     /* console.log(k.id, "id korpe", k.naziv, "naziv korpe");*/
      console.log(" u for petlja je: ");

      if (k.naziv.startsWith("Korpa" + this.loginInfo().autentifikacijaToken.korisnickiNalogId)) {
        console.log("id korpe je :(k.id)"+k.id)
        this.korpaID = k.id;
       console.log("id korpe je: "+this.korpaID);
        this.nasaoKorpu = true;
        console.log("nasao korpu: "+this.korpaID);
       /* alert("nasao korpu i id korpe je " + this.korpaID);*/
        break;
      }
    }
for (let ks of this.korpaStavkePodaci){
  console.log("for petlja za stavke: ");
  if(ks.proizvodId==p && this.korpaID==ks.korpaId && ks.velicina==velicina){
    this.vecDodanUKorpu=true;
    console.log("nasao stavku: vec dodana u korpu");
    return;
  }
}

this.prikaziDivKorpa=true;

console.log("KORPA id je:(prije dodavanja stavke)"+this.korpaID);
   if(this.korpaID!=undefined){
     this.korpaStavka={
       id:0,
       proizvodId:p,
       korpaId:this.korpaID,
       kolicina:1,
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
   // alert("uspjesno dodana stavka");

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
}
