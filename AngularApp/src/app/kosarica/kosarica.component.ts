import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {LoginInformacije} from "../helpers/login-informacije";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";

@Component({
  selector: 'app-kosarica',
  templateUrl: './kosarica.component.html',
  styleUrls: ['./kosarica.component.css']
})
export class KosaricaComponent implements OnInit {

  kupac_id:any;
  korpaStavkePodaci1: any;
  imeKorpe: any="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;
  total:any;
  odabranaStavka: any;
  korpaId:any;
  pogledajUkupno: any=false;
  ukupno: any;
   korpaStavkePodaci: any;
   KorpePodaci: any;
   KorpePodaciIme: any;
   modifikovano: any=false;
brisano:any=false;
   korpa: any;
  constructor(private httpKlijent: HttpClient,private router: Router, private route:ActivatedRoute) {
  }
  private fetchKorpaStavke() {
    //this.imeKorpe="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;

    this.httpKlijent.get(MojConfig.adresa_servera+ "/KorpaStavka/GetByName/"+"Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId, MojConfig.http_opcije()).subscribe(x=>{
      this.korpaStavkePodaci = x;
    });

  }
proizvodiPodaci:any;
  private fetchProizvodi() {
    //this.imeKorpe="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;

    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Proizvod", MojConfig.http_opcije()).subscribe(x=>{
      this.proizvodiPodaci = x;
    });

  }


  private fetchKorpe() {
this.imeKorpe="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Korpa/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.KorpePodaci = x;
    });
    // this.ukupno=this.KorpaPodatak[0].total;
  }

  private fetchKorpaIme() {
    this.imeKorpe="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Korpa/GetByName/"+this.imeKorpe, MojConfig.http_opcije()).subscribe(x=>{
      this.KorpePodaciIme = x;
    });
    // this.ukupno=this.KorpaPodatak[0].total;
  }
  getKorpaIme(){
    this.imeKorpe="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    if (this.KorpePodaciIme == null)
      return [];
    return this.KorpePodaciIme.filter((a:any)=>a.naziv.startsWith(this.imeKorpe));
  }
  ngOnInit(): void {

    /*this.route.params.subscribe(s=>{
      this.kupac_id=+s["id"];
    })*/
    this.fetchKorpe();
    this.fetchKorpaIme();
    this.fetchKorpaStavke();
this.fetchProizvodi();


  }
  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }

  getKorpe(){
    this.imeKorpe="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    if (this.KorpePodaci == null)
      return [];
    return this.KorpePodaci.filter((a:any)=>a.naziv.startsWith(this.imeKorpe));
  }
  getKorpaStavke() {
    this.imeKorpe="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    if (this.korpaStavkePodaci == null)
      return [];
    return this.korpaStavkePodaci.filter((a:any)=>a.korpaIme==this.imeKorpe);
  }
  izracunaj(){
    /*this.fetchKorpstavke();
        for(let i=0;i<(this.korpaStavkePodaci1.length);i++){
    console.log(this.korpaStavkePodaci1[i].id+"ovo je id stavke");
          this.total+=this.korpaStavkePodaci1[i].total;
          console.log(this.korpaStavkePodaci1[i].total+"total jedne stavke");
          console.log(this.total+" ovo je total a ovo je total stavke: "+this.korpaStavkePodaci1[i].total+"ukupno ih ima: "+this.korpaStavkePodaci1.length);
        }

        return this.total;

     */
  }
  UkloniIzKorpe(s:any) {
    this.korpa=this.KorpePodaciIme[0];
    console.log("korpa: "+this.korpa.id+" korpa naziv:" +this.korpa.naziv+"total "+this.korpa.total+
      "ukupno proizvoda: "+this.korpa.ukupnoProizvoda);
    this.httpKlijent.post(MojConfig.adresa_servera+ "/KorpaStavka/Delete/" + s.id,null, MojConfig.http_opcije())
      .subscribe((povratnaVrijednost:any) =>{
        /*const index = this.korpaStavkePodaci.indexOf(s);
        if (index > -1) {
          this.korpaStavkePodaci.splice(index, 1);
        }*/
       this.ngOnInit();
      });
this.brisano=true;
    setTimeout( ()=>{
      this.httpKlijent.post(`${MojConfig.adresa_servera}/Korpa/Add`, this.korpa, MojConfig.http_opcije()).subscribe(x => {
        this.fetchKorpaIme();
        this.korpa=this.KorpePodaciIme[0];
       /* console.log("korpa update :" +this.korpa);
        console.log("korpa poslije: "+this.korpa.id+" korpa naziv:" +this.korpa.naziv+"total "+this.korpa.total+
          "ukupno proizvoda: "+this.korpa.ukupnoProizvoda);*/
        /*this.ngOnInit();*/
      });
    }, 2000);


    /*this.httpKlijent.get(MojConfig.adresa_servera+ "/KorpaStavka/GetByKupacId/"+this.loginInfo().autentifikacijaToken.korisnickiNalogId, MojConfig.http_opcije()).subscribe(x=>{
      this.korpaStavkePodaci1 = x;
    });
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Korpa/GetByIdKupac/"+this.loginInfo().autentifikacijaToken.korisnickiNalogId, MojConfig.http_opcije()).subscribe(x=>{
      this.KorpaPodatak = x;
    });*/
    //this.fetchKorpe();
   // this.getKorpe();
   // this.getKorpaStavke();
   // this.fetchKorpaIme();
    //console.log(this.KorpePodaci);
   //this.fetchKorpaStavke();
    //alert("Odabrani proizvod je uklonjen  iz korpe!");
  }
/*racun(){
  console.log("pocetak");
  this.sveUkupno=0;
    for(let k of this.getKorpaStavke()){

      this.sveUkupno+=k.total;
      console.log(this.sveUkupno+" +"+k.total);
      console.log("poslije n: iteracije : "+this.sveUkupno);
      console.log(k.total+" ukupno stavka");
    }

    console.log(this.sveUkupno+" ukupno sve");
    return this.sveUkupno;
}*/
  vratiNaPocetnu() {
    this.router.navigate(['zene']);
  }




  ModifikacijaKorpaStavke(ks:any) {

    console.log("ks: ",ks);
    this.httpKlijent.post(MojConfig.adresa_servera+ "/KorpaStavka/Update", ks)
      .subscribe((povratnaVrijednost:any) =>{
        this.fetchKorpaStavke();
        console.log("ks: ",ks);

       /* this.ngOnInit();*/
      });

    this.odabranaStavka=null;
    this.modifikovano=true;



    /*this.httpKlijent.get(MojConfig.adresa_servera+ "/Korpa/GetByIdKupac/"+this.loginInfo().autentifikacijaToken.korisnickiNalogId, MojConfig.http_opcije()).subscribe(x=>{
      this.KorpaPodatak = x;
    });
    */

    /* this.httpKlijent.get(MojConfig.adresa_servera+ "/KorpaStavka/GetByName/"+this.imeKorpe, MojConfig.http_opcije()).subscribe(x=>{
       this.korpaStavkePodaci1 = x;
     });
 */
    //this.fetchKorpstavke();

    /*this.fetchKorpe();
    this.getKorpe();*/
    //this.getKorpaStavke();
    //this.fetchKorpaIme();

    /*console.log("ovo je korpa stavke: "+this.korpaStavkePodaci);
    console.log(this.KorpePodaci);
    console.log(this.KorpePodaci[0]);*/
   // this.racun();
    //this.fetchKorpaStavke();





this.korpa=this.KorpePodaciIme[0];
    console.log("korpa: "+this.korpa.id+" korpa naziv:" +this.korpa.naziv+"total "+this.korpa.total+
      "ukupno proizvoda: "+this.korpa.ukupnoProizvoda);

  /*  this.httpKlijent.post(MojConfig.adresa_servera+ "/KorpaStavka/Update", ks)
      .subscribe((a:any) =>{
        /*this.ngOnInit();*/
    /*  });
*/
    setTimeout( ()=>{
      this.httpKlijent.post(`${MojConfig.adresa_servera}/Korpa/Add`, this.korpa, MojConfig.http_opcije()).subscribe(x => {
        this.fetchKorpaIme();
this.korpa=this.KorpePodaciIme[0];
        console.log("korpa update :" +this.korpa);
        console.log("korpa poslije: "+this.korpa.id+" korpa naziv:" +this.korpa.naziv+"total "+this.korpa.total+
          "ukupno proizvoda: "+this.korpa.ukupnoProizvoda);
        /*this.ngOnInit();*/
      });
    }, 2000);
  }

  Modifikacija(ks: any) {
    this.odabranaStavka=ks;
    this.updateKolicina(ks.proizvodId);
    this.fetchDostupneVelicine(ks.proizvodId)
  }

  onKeyPress(event: KeyboardEvent) {
    // Kod za onemogućavanje unosa točke (.)
    if (event.key === '.') {
      event.preventDefault();
    }
  }



  KreirajNarudzbu() {
this.router.navigate(['kreiranje-narudzbe']);
  }

  noimage:any="data:@file/jpeg;base64,/9j/4AAQSkZJRgABAQAAZABkAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wgALCADIAN8BAREA/8QAGwABAAMBAQEBAAAAAAAAAAAAAAUGBwMBBAL/2gAIAQEAAAAA24AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAi/i8Ak/vAABXbEOf57eQFgAABXbE59M+idX8gLAAACu2Ks5bsEpxjZuAsAAAK7zyHn9mw55Wtd7WAAAFOy3ke+Ouv2QAAEPXgFpkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//EADoQAAEDAQMGCwgCAwEAAAAAAAECAwQFAAYREiEwMUDREBMWF1FUVmGRkrIHFCI1NkFzdCCBFTJScf/aAAgBAQABPwDazth2w7YdsO2HbDth2w6Ks1lNHRHxivSFyHOLQhrDEnDH725SzOzlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUszs5U/Knfaj1RFYpyJjbS2kqUpOQvWCDhoTory/MqB+8PSf4vPNR2i684httOtSzgBaNMjTG+MjPtvIGbFtQI4DqNrl/TqPzO+s6E6K8vzKgfvD0nhS+yp9bCXUF1ABUgHOAdWI4PaeZXFQcnK90+LKw1Zf2x/q3s4965Qr4rK934o8d0d3948B1G1y/p1H5nfWdCdFeX5lQP3h6TwXsvY1QY5YYKXJ6x8KdYQOk7rRK3Ph1b/JNyFGSVYrUo45fSD3Wu9eGLeCCHmiEPJzOtE50ndZ5hqS0Wn20ONq1pWMQbNswaVFWptpmKwgZSylISB3m1EvVTq7Jfjx1FLjZOSlebjE/9Cx1G1y/p1H5nfWdCdFeX5lQP3h6Ta9l7GaFHLDBS5PWPhT9kDpO60iQ9KkLffcU46s4qUo5yeCmVOVSZyJcRwocSdX2UOg91qJeeDWKYqXxiWVNJxfQo/wCnf/5a917nK48YsVSkQEHMNRcPSe7utHkPRJCH2HFNuoOKVJOcG11b1tV6NxLxS3ObT8SPssdI3WuX9OI/M76zoTovaBMdp8Wmy2cONaklScRmxyTaRIelyFvvuKcdWcVKUcST/ALUkKCVEBQwIB1jhjyHYj6H2HFNuoOKVJOBBtcRZXdSOtWdSnHCfMdCdFeG77F4YrTD7zjQbXlgoAz5sPvbmxp/X5Pgm3NjT+vyfBNubGn9fk+Cbc2NP6/J8E25saf1+T4JtzY0/r8nwTbmxp/X5Pgm3NjT+vyfBNqLSm6LTG4LTinEIJIUrXnOOhO2HbDth2w7YdsO2HbDtht//9k=";

getProzivodi1(s:any){
  console.log("s je : ",s);

  return this.proizvodiPodaci.filter((a:any)=> a.id==s);
}
  get_slika_base64_FS1(s:any) {
   // console.log("s je : ",s );
//this.getProzivodi(s);
    setTimeout( ()=>{
      console.log("proizvod podatak:",this.proizvodiPodaci);
      return "data:image/jpg;base64,"+ this.proizvodiPodaci[0]?.slika_postojeca;
    }, 9000);

   /* if(s!=null && s[0]?.slika_postojeca!=null)
      return "data:image/jpg;base64,"+ s?.slika_postojeca;
    return this.noimage;*/
    // return "data:image/jpg;base64,"+s.slika_postojeca;
  }


  /*getProzivodi(s: any): Promise<any[]> {
    return Promise.resolve(this.proizvodiPodaci.filter((a: any) => a.id == s));
  }

  async get_slika_base64_FS(s: any) {
    //console.log("s je: ", s);
    await this.getProzivodi(s);
   // console.log("proizvod podatak:", this.proizvodiPodaci);
    return "data:image/jpg;base64," + this.proizvodiPodaci[0]?.slika_postojeca;
  }
*/

  get_slika_base64_FS3(s:any) {
    if(s!=null && s.slika_postojeca!=null)
      return "data:image/jpg;base64,"+ s?.slika_postojeca;
    return this.noimage;
    // return "data:image/jpg;base64,"+s.slika_postojeca;
  }

  get_slika_base64_FS(slika:any) {
    if(slika!=null)
      return "data:image/jpg;base64,"+ slika;
    return this.noimage;
// return "data:image/jpg;base64,"+slika;
  }
  dostupneVelicine:any;
  fetchDostupneVelicine(id:any)
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/KorpaStavka/GetDostupneVelicine?proizvodId="+id, MojConfig.http_opcije()).subscribe(x=>{
      this.dostupneVelicine = x;
      console.log("proizvod id :"+id);
      console.log("dostupne velicine:",this.dostupneVelicine);
    });
  }

dostupnaKolicina:any;
  updateKolicina(id:any) {

      this.httpKlijent.get(MojConfig.adresa_servera+ "/KorpaStavka/GetDostupnuKolicinu?proizvodId="+id+"&velicina="+this.odabranaStavka.velicina, MojConfig.http_opcije()).subscribe(x=>{
        this.dostupnaKolicina = x;
        console.log("proizvod id :"+id+" velicina"+this.odabranaStavka.velicina);
        console.log("dostupne velicine:",this.dostupnaKolicina);
      });
      //return this.dostupnaKolicina;
  }
}
