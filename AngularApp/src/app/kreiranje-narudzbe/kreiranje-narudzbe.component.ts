import { Component, OnInit } from '@angular/core';
import {LoginInformacije} from "../helpers/login-informacije";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MojConfig} from "../moj-config";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-kreiranje-narudzbe',
  templateUrl: './kreiranje-narudzbe.component.html',
  styleUrls: ['./kreiranje-narudzbe.component.css']
})
export class KreiranjeNarudzbeComponent implements OnInit {
kupac_id:any;
  korpaStavkePodaci: any;
   narudzbaStavka: any;
  narudzbaStavkaPodaci: any;
  pregledNarudzbe:any=true;
  odabirProdavnice: any=false;
  zakljucivanjeNarudzbe: any=false;
   prodavnicePodaci: any;
   narudzba: any;
   narudzbaPodaci: any;
   korpePodaci: any;

  constructor(private httpKlijent: HttpClient,private router: Router, private route:ActivatedRoute,private datePipe:DatePipe) {
  }

  ngOnInit(): void {
    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    this.fetchKorpaStavke();
    this.fetchProdavnice();
    this.fetchNarudzbe();
    this.fetchNarudzbaStavke();
    this.fetchKorpe();


  }
  datum:any=this.datePipe.transform(new Date(),"dd-MM-yyyy");
   narudzbaID: any;
  kreiranaNarudzba: any=false;
  prodId: any;
  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }
  ngAfterViewInit(){
   /* setTimeout( ()=>{
     this.pretvoriStavkeKorpeUStavkeNarudzbe();
    }, 300)*/
    setTimeout( ()=>{
      this.prodId=this.prodavnicePodaci[0]?.id;
      this.prodavnicaAdresa=this.prodavnicePodaci.filter((a:any)=>a.id==this.prodId);
      console.log("adrwsa je ngoninit"+this.prodavnicaAdresa[0]?.adresa);
    }, 400);
  }
   fetchKorpaStavke() {
    //this.imeKorpe="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;

    this.httpKlijent.get(MojConfig.adresa_servera+ "/KorpaStavka/GetByName/"+"Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId, MojConfig.http_opcije()).subscribe(x=>{
      this.korpaStavkePodaci = x;
    });

  }

  fetchProdavnice() {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Prodavnica/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.prodavnicePodaci = x;
    });

  }
  fetchNarudzbe() {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Narudzba/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.narudzbaPodaci = x;
    });
  }
   fetchNarudzbaStavke() {
    //this.imeKorpe="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;

    this.httpKlijent.get(MojConfig.adresa_servera+ "/NarudzbaStavka/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.narudzbaStavkaPodaci = x;
    });

  }
  narudzba_id:any;
  stavkeJedneNarudzbePodaci:any

nazivProdavnice(){
    this.prodavnicaAdresa=this.prodavnicePodaci.filter((a:any)=>a.id==this.prodId);
}

  fetchKorpe() {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Korpa/GetByIdKupac/"+this.loginInfo().autentifikacijaToken.korisnickiNalogId, MojConfig.http_opcije()).subscribe(x=>{
      this.korpePodaci = x;
    });

  }
  noimage:any="data:@file/jpeg;base64,/9j/4AAQSkZJRgABAQAAZABkAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wgALCADIAN8BAREA/8QAGwABAAMBAQEBAAAAAAAAAAAAAAUGBwMBBAL/2gAIAQEAAAAA24AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAi/i8Ak/vAABXbEOf57eQFgAABXbE59M+idX8gLAAACu2Ks5bsEpxjZuAsAAAK7zyHn9mw55Wtd7WAAAFOy3ke+Ouv2QAAEPXgFpkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//EADoQAAEDAQMGCwgCAwEAAAAAAAECAwQFAAYREiEwMUDREBMWF1FUVmGRkrIHFCI1NkFzdCCBFTJScf/aAAgBAQABPwDazth2w7YdsO2HbDth2w6Ks1lNHRHxivSFyHOLQhrDEnDH725SzOzlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUszs5U/Knfaj1RFYpyJjbS2kqUpOQvWCDhoTory/MqB+8PSf4vPNR2i684httOtSzgBaNMjTG+MjPtvIGbFtQI4DqNrl/TqPzO+s6E6K8vzKgfvD0nhS+yp9bCXUF1ABUgHOAdWI4PaeZXFQcnK90+LKw1Zf2x/q3s4965Qr4rK934o8d0d3948B1G1y/p1H5nfWdCdFeX5lQP3h6TwXsvY1QY5YYKXJ6x8KdYQOk7rRK3Ph1b/JNyFGSVYrUo45fSD3Wu9eGLeCCHmiEPJzOtE50ndZ5hqS0Wn20ONq1pWMQbNswaVFWptpmKwgZSylISB3m1EvVTq7Jfjx1FLjZOSlebjE/9Cx1G1y/p1H5nfWdCdFeX5lQP3h6Ta9l7GaFHLDBS5PWPhT9kDpO60iQ9KkLffcU46s4qUo5yeCmVOVSZyJcRwocSdX2UOg91qJeeDWKYqXxiWVNJxfQo/wCnf/5a917nK48YsVSkQEHMNRcPSe7utHkPRJCH2HFNuoOKVJOcG11b1tV6NxLxS3ObT8SPssdI3WuX9OI/M76zoTovaBMdp8Wmy2cONaklScRmxyTaRIelyFvvuKcdWcVKUcST/ALUkKCVEBQwIB1jhjyHYj6H2HFNuoOKVJOBBtcRZXdSOtWdSnHCfMdCdFeG77F4YrTD7zjQbXlgoAz5sPvbmxp/X5Pgm3NjT+vyfBNubGn9fk+Cbc2NP6/J8E25saf1+T4JtzY0/r8nwTbmxp/X5Pgm3NjT+vyfBNqLSm6LTG4LTinEIJIUrXnOOhO2HbDth2w7YdsO2HbDtht//9k=";

  /*get_slika_base64_FS(s:any) {
    if(s!=null && s.slika_postojeca!=null)
      return "data:image/jpg;base64,"+ s?.slika_postojeca;
    return this.noimage;
    // return "data:image/jpg;base64,"+s.slika_postojeca;
  }*/
  get_slika_base64_FS(slika:any) {
    if(slika!=null)
      return "data:image/jpg;base64,"+ slika;
    return this.noimage;
// return "data:image/jpg;base64,"+slika;
  }
  pretvoriStavkeKorpeUStavkeNarudzbe(narudzba:any){
    this.fetchKorpaStavke();
    for(let ks of this.korpaStavkePodaci){
      this.narudzbaStavka={
        id:0,
        proizvodId:ks.proizvodId,
        cijena:ks.cijena,
        kolicina:ks.kolicina,
        velicina:ks.velicina,
        total:ks.total,
        narudzbaId:narudzba,
      }
      this.httpKlijent.post(`${MojConfig.adresa_servera}/NarudzbaStavka/Add`, this.narudzbaStavka, MojConfig.http_opcije()).subscribe(x => {
        this.fetchNarudzbaStavke();

        console.log("narudzba stavka dodano:" +this.narudzbaStavka.id);
        /*this.ngOnInit();*/
      });
    }

/*this.fetchNarudzbaStavke();*/
   /* this.httpKlijent.post(`${MojConfig.adresa_servera}/NarudzbaStavka/Add`, this.narudzbaStavka, MojConfig.http_opcije()).subscribe(x => {
      this.fetchNarudzbaStavke();

      console.log("narudzba stavka dodano:" +this.narudzbaStavka.id);
      /*this.ngOnInit();*/
    /*});*/
  }
brisiSveIzKorpe(idKorpe:any){
  this.httpKlijent.post(MojConfig.adresa_servera+ "/KorpaStavka/DeleteSveIzKorpe/" + idKorpe,null, MojConfig.http_opcije())
    .subscribe((povratnaVrijednost:any) =>{
      this.fetchKorpaStavke();
    });

}
  prodavnicaAdresa:any;
  kreirajNarudzbu() {
    this.narudzba={
      id:0,
      ukupno:0,
      ukupnoProizvoda:0,
      kupacId:this.loginInfo().autentifikacijaToken.korisnickiNalogId,
      status:"Nova",
      prodavnicaId:this.prodId,
      evidentirao:"",
    }
    console.log(this.narudzba);
    this.httpKlijent.post(`${MojConfig.adresa_servera}/Narudzba/Add`, this.narudzba, MojConfig.http_opcije()).subscribe(x => {
      this.fetchNarudzbe();


      /*this.ngOnInit();*/
    });
  }
funkcija(){
  this.kreirajNarudzbu();
  this.fetchNarudzbe();
  this.narudzbaID=this.narudzbaPodaci[0].id;
  console.log("narudzba id:"+this.narudzbaID);
  this.pretvoriStavkeKorpeUStavkeNarudzbe(this.narudzbaID);
  this.fetchNarudzbaStavke();
  this.brisiSveIzKorpe(2);
}



   SveOkoNarudzbe() {
     this.kreirajNarudzbu();
     setTimeout( ()=>{
       this.fetchNarudzbe();
       this.narudzbaID=this.narudzbaPodaci[0].id;
       console.log("narudzba id:"+this.narudzbaID);
       this.pretvoriStavkeKorpeUStavkeNarudzbe(this.narudzbaID);
       this.fetchNarudzbaStavke();
       console.log("id korpe: "+this.korpePodaci[0].id);
       this.brisiSveIzKorpe(this.korpePodaci[0].id);
     }, 1000);

this.kreiranaNarudzba=true;

/*this.brisiSveIzKorpe(2);*/

  }

  otvoriPocetnu() {
    this.router.navigate(['/kupac-pocetna/',this.loginInfo().autentifikacijaToken.korisnickiNalogId]);
  }

  otvoriProfilKupca() {
    this.router.navigate(['profil-kupac']);
  }

  ispisi() {
this.prodavnicaAdresa=this.prodavnicePodaci.filter((a:any)=>a.id==this.prodId);

    console.log("Vrijednost proId: "+this.prodId);
    console.log("lenght: "+this.prodavnicePodaci?.length);
   // this.prodavnicaAdresa=this.prodavnicePodaci?.filter((a:any)=>a.id==this.prodId);
   // console.log("adresa je "+this.prodavnicaAdresa[0]?.adresa);

  }
}
