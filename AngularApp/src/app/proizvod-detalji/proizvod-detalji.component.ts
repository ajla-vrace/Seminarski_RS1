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
   korpastavkaId: any;
   korpaStavka: any;
   vecDodanFavorit: any=false;
   noviFavorit: any;
   dodanoUFavorite: any=false;
  odabranavelicina: any;
   zvjezdicePodaci: any;
   prikaziDiv:any=false;
   prikaziDivKorpa: any=false;
   imeKorpe: any;
   KorpePodaciIme:any;
   korpaPrijavljenogKupca: any;




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
   nasaoKorpu: any=false;
  vecDodanUKorpu: any=false;
  isFavorit: any=false;
   korpa: any;
   proizvod: any;






  getKorpaStavke() {
    if (this.korpaStavkePodaci == null)
      return [];
    return this.korpaStavkePodaci.filter((a:any)=>a.korpaId==this.korpaID);
  }

  postaviVelicinu(s: any) {
    this.odabranavelicina=s;
  }

  dodajUKorpu(p:number,velicina:any) {
   /* this.httpKlijent.get(MojConfig.adresa_servera+ "/Korpa/GetByIdKupac/"+this.kupac_id, MojConfig.http_opcije()).subscribe(x=>{
      this.korpaPrijavljenogKupca = x;
      console.log("korpa prijavljenog kupca: (hvatamo korpe))",this.korpaPrijavljenogKupca);
    });
*/
    console.log("dodaj u korpu funkcija pocetak");
    console.log("korpa prijavljenog korisnika id: "+this.korpaPrijavljenogKupca[0].id);
    /*for (let ks of this.korpaStavkePodaci){

      if(ks.proizvodId==p && this.korpaID==ks.korpaId && ks.velicina==velicina){
        console.log("u ifu: proizvodid: "+ks.proizvodId+" korpaid: "+this.korpaID+" ks.korpa id : "+ks.korpaId+" velicina: "+velicina);
        this.vecDodanUKorpu=true;
        return;
      }

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


      })}


*/


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
        return true;
    }
    return false;
  }

novaKorpa:any;
  napraviIliNadjiKorpu() {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Korpa/GetByIdKupac/"+this.kupac_id, MojConfig.http_opcije()).subscribe(x=>{
      this.korpaPrijavljenogKupca = x;
      console.log("korpa prijavljenog kupca: ovdje ",this.korpaPrijavljenogKupca);
    });

    setTimeout( ()=>{
      if(this.korpaPrijavljenogKupca?.length==0){
        console.log("nema korpe, pravimo je sada");
        console.log("u if pocetak: ");
        this.novaKorpa = {
          id: 0,
          naziv: "Korpa" + this.loginInfo().autentifikacijaToken.korisnickiNalogId,
          kupacId: this.loginInfo().autentifikacijaToken.korisnickiNalogId,
          total: 0,
          ukupnoProizvoda: 0
        }
        this.httpKlijent.post(`${MojConfig.adresa_servera}/Korpa/Add`, this.novaKorpa, MojConfig.http_opcije()).subscribe(x => {
          this.fetchKorpe();
          this.korpaID = this.novaKorpa.id;
        });
        this.korpaID = this.novaKorpa.id;
        //console.log("korpa id nove je : " + this.korpaID);
        /* alert("napravljena korpa");*/
      }

      else{
        console.log("u else ovdje bi trebala biti napravljena korpa : ",this.korpaPrijavljenogKupca);
      }

    }, 400);














  }
}
