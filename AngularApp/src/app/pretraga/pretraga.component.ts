import { Component, OnInit } from '@angular/core';
import {LoginInformacije} from "../helpers/login-informacije";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";
import {MojConfig} from "../moj-config";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-pretraga',
  templateUrl: './pretraga.component.html',
  styleUrls: ['./pretraga.component.css']
})
export class PretragaComponent implements OnInit {
  kupac_id: any;
  proizvodiPodaci: any;

  kategorijePodaci: any;
  podkategorijePodaci: any;


  favoritiPodaci: any;
  proizvod_id: any;


  novaKorpa: any;
  korpePodaci: any;

  korpaStavkePodaci: any;
  korpaID:any;


  nadjenaKorpa: any=false;






  //kategorijePodaci: any;
  PodkategorijePodaci: any;
  bojePodaci: any;
  colors: any;

  proizvodiSvi: any;
  kolekcijePodaci: any;

  constructor(private httpKlijent: HttpClient, private router: Router,
              private route: ActivatedRoute) {}

  fetchProizvodi()
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Proizvod/datumOpadajuci", MojConfig.http_opcije()).subscribe(x=>{
      this.proizvodiPodaci = x;
      this.proizvodiSvi=x;
    });
  }

  fetchBoje()
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Boja", MojConfig.http_opcije()).subscribe(x=>{
      this.bojePodaci = x;
      this.colors = x;

    });
  }

  fetchSezone()
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Sezona/sezone", MojConfig.http_opcije()).subscribe(x=>{
      this.sezonePodaci = x;
    });
  }
  fetchKolekcije()
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Kolekcija/aktivna", MojConfig.http_opcije()).subscribe(x=>{
      this.kolekcijePodaci = x;
    });
  }


  idkategorije: any="";
  fetchFavoriti() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Favorit/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.favoritiPodaci = x;
    });
  }
  private fetchKorpe() {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Korpa/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.korpePodaci = x;
    });
  }

  private fetchKorpstavke() {
    if(this.korpaID!=undefined) {
      this.httpKlijent.get(MojConfig.adresa_servera + "/KorpaStavke/GetByName/" +"Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId , MojConfig.http_opcije()).subscribe(x => {
        this.korpaStavkePodaci = x;
      });
    }
  }
  ngOnInit(): void {
    this.fetchProizvodi();
    this.fetchKategorije();
   // this.fetchPodKategorije();
    this.fetchFavoriti();
    this.fetchKorpe();
    this.fetchKorpstavke();
    //this.fetchKategorijeByOdjel();
    this.fetchBoje();
    this.fetchSezone();
    this.fetchKolekcije();

    /* setTimeout( ()=>{
       this.selectedPriceRange = this.defaultPriceRange;

     }, 400);*/



  }
  /*ngAfterViewInit(){
    console.log("max i min:" +this.minPrice+" "+this.maxPrice);

  }
*/



  minPrice: number = 0;
  maxPrice: number = 0;
   filtriraniProizvodi: any;


  getProizvodi() {

     this.filtriraniProizvodi = this.proizvodiSvi;



    if (this.pretragaPoNazivu.trim() !== '') {
      this.filtriraniProizvodi = this.filtriraniProizvodi.filter((a: any) =>
        a.naziv.toLowerCase().includes(this.pretragaPoNazivu.toLowerCase())
      );
    }



    this.proizvodiPodaci = this.filtriraniProizvodi;
   // console.log("proizvodi duzina: "+this.proizvodiPodaci.length);
    return this.proizvodiPodaci;
  }
  odabranaKategorija: any=false;
  idPodkategorije: any="";

  svePodkategorije: any="Sve podkategorije";
  prikaziDiv: any=false;
  sezonePodaci: any;


  fetchKategorije(){

    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Kategorija", MojConfig.http_opcije()).subscribe(x=>{
      this.kategorijePodaci = x;
    });


  }
 /* fetchKategorijeByOdjel(){

    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Kategorija/1", MojConfig.http_opcije()).subscribe(x=>{
      this.kategorijePodaci = x;
    });


  }
*/
  fetchPodkategorijeByKategorija(){

    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Kategorija/GetPodkategorije?katID="+this.idkategorije, MojConfig.http_opcije()).subscribe(x=>{
      this.PodkategorijePodaci = x;
    });


  }
  prikaziPodkategorije(){
    this.fetchPodkategorijeByKategorija();
  }

  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }
  /*dodajUFavorite(p:any) {
    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    for(let i=0;i<this.favoritiPodaci.length;i++){
      if(this.favoritiPodaci[i].kupacId==this.kupac_id && this.favoritiPodaci[i].proizvodId==p){
        this.vecDodanFavorit=true;
        return;
      }
    }
    this.noviFavorit = {
      id: 0,
      kupacId: this.kupac_id,
      proizvodId: p,
    }
    this.httpKlijent.post(`${MojConfig.adresa_servera}/Favorit/Add`, this.noviFavorit, MojConfig.http_opcije()).subscribe(x => {
      this.fetchFavoriti();
this.dodanoUFavorite=true;
    });
  }

   */


  /*private fetchKategorijeZene() {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Kategorija", MojConfig.http_opcije()).subscribe(x=>{
      this.kategorijeZenePodaci = x;
    });
  }


  private fetchPodKategorijeZene() {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Podkategorija", MojConfig.http_opcije()).subscribe(x=>{
      this.podkategorijeZenePodaci = x;
    });
  }
*/
  prikaziDetaljeProizvoda(proizvod:any) {
    this.proizvod_id=proizvod;
    if (this.loginInfo().isLogiran==true)
    this.napraviIliNadjiKorpu();
    this.router.navigate(['proizvod-detalji',this.proizvod_id]);
  }





  /*
    dodajUKorpu(p:number) {
      this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId
      for(let k of this.korpePodaci) {
        if (k.naziv.startsWith("Korpa" + this.loginInfo().autentifikacijaToken.korisnickiNalogId)) {
          this.korpaID = k.id;
         // alert("nasao korpu i id korpe je " + this.korpaID);

          console.log("nasao korpu a njen id je " + this.korpaID);
          console.log("ima ovoliko korpa do sada: " + this.korpePodaci.length);
          console.log("ovo je naziv nadjene korpe" + k.naziv);
          break;
        }
        else {
          this.novaKorpa = {
            id: 0,
            naziv: "Korpa" + this.loginInfo().autentifikacijaToken.korisnickiNalogId,
            kupacId: this.loginInfo().autentifikacijaToken.korisnickiNalogId,
            total: 0,
            ukupnoProizvoda: 0
          }
          this.httpKlijent.post(`${MojConfig.adresa_servera}/Korpa/Add`, this.novaKorpa, MojConfig.http_opcije()).subscribe(x => {
            this.fetchKorpe();
  //this.ngOnInit();
          });
          this.korpaID = this.novaKorpa.id;
          console.log("korpa id nove je : " + this.korpaID);
          alert("napravljena korpa");
        }
      }
    /* for(let x of this.korpaStavkePodaci){
        if(x.proizvodId==p){
          console.log("ova stavka je vec dodana"+this.korpaID+" i ovo je id proizvoda "+p);
          return;
        }
      }*/
  /*
      this.korpaStavka={
        id:0,
        proizvodId:p,
        korpaId:this.korpaID,
        kolicina:1,
      }
      this.httpKlijent.post(`${MojConfig.adresa_servera}/KorpaStavka/Add`, this.korpaStavka, MojConfig.http_opcije()).subscribe(x => {
        this.fetchKorpstavke();
this.korpastavkaId=this.korpaStavka.id;
      });
      alert("uspjesno dodana stavka");
      console.log("ododana stavka je "+"ovo je id stavke"+this.korpastavkaId+" ovo je id korpe"+this.korpaStavka.korpaId)
    }
*/
  napraviIliNadjiKorpu() {
    this.kupac_id =this.loginInfo().autentifikacijaToken.korisnickiNalogId;
   // console.log("id kupca je : "+this.loginInfo().autentifikacijaToken.korisnickiNalogId);
    for(let k of this.korpePodaci) {
      if (k.naziv.startsWith("Korpa" + this.loginInfo().autentifikacijaToken.korisnickiNalogId)) {
        this.korpaID = k.id;
        this.nadjenaKorpa=true;
        /*alert("nasao korpu i id korpe je " + this.korpaID);*/

       // console.log("nasao korpu a njen id je " + this.korpaID);
        /* console.log("ima ovoliko korpa do sada: " + this.korpePodaci.length);
         console.log("ovo je naziv nadjene korpe" + k.naziv);
         console.log("nadjenjakorpa bool:"+this.nadjenaKorpa);

         */
        break;
      }
    }
    if(this.nadjenaKorpa==false){
      this.novaKorpa = {
        id: 0,
        naziv: "Korpa" + this.loginInfo().autentifikacijaToken.korisnickiNalogId,
        kupacId: this.loginInfo().autentifikacijaToken.korisnickiNalogId,
        total: 0,
        ukupnoProizvoda: 0
      }
      this.httpKlijent.post(`${MojConfig.adresa_servera}/Korpa/Add`, this.novaKorpa, MojConfig.http_opcije()).subscribe(x => {
        this.fetchKorpe();

      });
      this.korpaID = this.novaKorpa.id;
     // console.log("korpa id nove je : " + this.korpaID);
      /* alert("napravljena korpa");*/
    }
  }



  skloniDiv() {
    this.prikaziDiv=false;
  }



  odabraneBoje: string[] = [];



  updateSelectedColors(event: any, color: string) {
    if (event.target.checked) {
      this.odabraneBoje.push(color);
    } else {
      const index = this.odabraneBoje.indexOf(color);
      if (index >= 0) {
        this.odabraneBoje.splice(index, 1);
      }
    }
   // console.log("boje: "+this.odabraneBoje);
    this.filterByColor();
  }

  filterByColor() {

    if (this.odabraneBoje.length > 0) {
      this.proizvodiPodaci = this.proizvodiSvi.filter((a:any) => {
        return this.odabraneBoje.some(color => color === a.bojaOpis) /*&& a.cijena<=this.selectedPriceRange*/;
      });
    } else {
      this.proizvodiPodaci = this.proizvodiSvi;
    }






  }






  //selectedCollection: any = null;
  odabranaKolekcija:any="";
  isButtonActive: any;
  pretragaPoNazivu: any="";
  kliknuto: any=false;
  updateSelectedCollection(collection: any) {
    this.odabranaKolekcija=collection;

    this.getProizvodi();
  }



  ponistiFiltere() {
    this.idkategorije="";
    this.idPodkategorije="";
    this.odabranaKolekcija="";
    this.odabranaKategorija="";
    this.odabraneBoje=[];
    this.colors.forEach((color: any) => {
      color.checked = false;
    });

    this.minPrice=0;
    this.maxPrice=0;


    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // @ts-ignore
    checkboxes.forEach((checkbox: HTMLInputElement) => {
      checkbox.checked = false;
    });
   // console.log("boje: "+this.odabraneBoje);

    this.getProizvodi();

  }
  noimage:any="data:@file/jpeg;base64,/9j/4AAQSkZJRgABAQAAZABkAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wgALCADIAN8BAREA/8QAGwABAAMBAQEBAAAAAAAAAAAAAAUGBwMBBAL/2gAIAQEAAAAA24AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAi/i8Ak/vAABXbEOf57eQFgAABXbE59M+idX8gLAAACu2Ks5bsEpxjZuAsAAAK7zyHn9mw55Wtd7WAAAFOy3ke+Ouv2QAAEPXgFpkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//EADoQAAEDAQMGCwgCAwEAAAAAAAECAwQFAAYREiEwMUDREBMWF1FUVmGRkrIHFCI1NkFzdCCBFTJScf/aAAgBAQABPwDazth2w7YdsO2HbDth2w6Ks1lNHRHxivSFyHOLQhrDEnDH725SzOzlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUszs5U/Knfaj1RFYpyJjbS2kqUpOQvWCDhoTory/MqB+8PSf4vPNR2i684httOtSzgBaNMjTG+MjPtvIGbFtQI4DqNrl/TqPzO+s6E6K8vzKgfvD0nhS+yp9bCXUF1ABUgHOAdWI4PaeZXFQcnK90+LKw1Zf2x/q3s4965Qr4rK934o8d0d3948B1G1y/p1H5nfWdCdFeX5lQP3h6TwXsvY1QY5YYKXJ6x8KdYQOk7rRK3Ph1b/JNyFGSVYrUo45fSD3Wu9eGLeCCHmiEPJzOtE50ndZ5hqS0Wn20ONq1pWMQbNswaVFWptpmKwgZSylISB3m1EvVTq7Jfjx1FLjZOSlebjE/9Cx1G1y/p1H5nfWdCdFeX5lQP3h6Ta9l7GaFHLDBS5PWPhT9kDpO60iQ9KkLffcU46s4qUo5yeCmVOVSZyJcRwocSdX2UOg91qJeeDWKYqXxiWVNJxfQo/wCnf/5a917nK48YsVSkQEHMNRcPSe7utHkPRJCH2HFNuoOKVJOcG11b1tV6NxLxS3ObT8SPssdI3WuX9OI/M76zoTovaBMdp8Wmy2cONaklScRmxyTaRIelyFvvuKcdWcVKUcST/ALUkKCVEBQwIB1jhjyHYj6H2HFNuoOKVJOBBtcRZXdSOtWdSnHCfMdCdFeG77F4YrTD7zjQbXlgoAz5sPvbmxp/X5Pgm3NjT+vyfBNubGn9fk+Cbc2NP6/J8E25saf1+T4JtzY0/r8nwTbmxp/X5Pgm3NjT+vyfBNqLSm6LTG4LTinEIJIUrXnOOhO2HbDth2w7YdsO2HbDtht//9k=";

  get_slika_base64_FS(s:any) {
    if(s!=null && s.slika_postojeca!=null)
      return "data:image/jpg;base64,"+ s?.slika_postojeca;
    return this.noimage;
    // return "data:image/jpg;base64,"+s.slika_postojeca;
  }

  cijena:any;
  getCijena(p:any){
    this.httpKlijent.get(MojConfig.adresa_servera+ "/KorpaStavka/GetCijena?id="+p.id, MojConfig.http_opcije()).subscribe(x=>{
      this.cijena = x;
    });
    return this.cijena;
  }


}
