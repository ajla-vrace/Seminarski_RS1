import { Component, OnInit } from '@angular/core';
import {LoginInformacije} from "../helpers/login-informacije";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MojConfig} from "../moj-config";

@Component({
  selector: 'app-muskarci',
  templateUrl: './muskarci.component.html',
  styleUrls: ['./muskarci.component.css']
})
export class MuskarciComponent implements OnInit {
  kupac_id: any;
  proizvodiMPodaci: any;

  kategorijeMuskarciPodaci: any;
  podkategorijeMuskarciPodaci: any;

  //noviFavorit: any ;
  favoritiPodaci: any;
  proizvod_id: any;

  //dodanoUFavorite: any=false;
  //vecDodanFavorit: any=false;
  novaKorpa: any;
  korpePodaci: any;
  //korpaStavka: any;
  korpaStavkePodaci: any;
  korpaID:any;
  // korpastavkaId: any;

  nadjenaKorpa: any=false;
  //korpePodaciKupacId: any;





  kategorijePodaci: any;
  PodkategorijePodaci: any;
  bojePodaci: any;
  colors: any;

  proizvodiSvi: any;
  kolekcijePodaci: any;

  constructor(private httpKlijent: HttpClient, private router: Router,
              private route: ActivatedRoute) {}

  fetchProizvodi()
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Proizvod/byOdjel?odjel=2", MojConfig.http_opcije()).subscribe(x=>{
      this.proizvodiMPodaci = x;
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
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Kolekcija/kolekcija", MojConfig.http_opcije()).subscribe(x=>{
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
    this.fetchKategorijeMuskarci();
    this.fetchPodKategorijeMuskarci();
    this.fetchFavoriti();
    this.fetchKorpe();
    this.fetchKorpstavke();
    this.fetchKategorijeByOdjel();
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


  getMProizvodi() {
    let filtriraniProizvodi = this.proizvodiSvi;

    if (this.odabraneBoje.length > 0) {
      filtriraniProizvodi = filtriraniProizvodi.filter((a: any) =>
        this.odabraneBoje.includes(a.bojaOpis)
      );
    }


    if (this.minPrice >= 0 && this.maxPrice > 0) {
      filtriraniProizvodi = filtriraniProizvodi.filter((a: any) =>
        a.cijena >= this.minPrice && a.cijena <= this.maxPrice
      );
    }


    if (this.idkategorije !== '') {
      filtriraniProizvodi = filtriraniProizvodi.filter((a: any) =>
        a.kategorijaId === this.idkategorije
      );
    }


    if (this.idPodkategorije !== '') {
      filtriraniProizvodi = filtriraniProizvodi.filter((a: any) =>
        a.podkategorijaId === this.idPodkategorije
      );
    }


    if (this.odabranaKolekcija !== '') {
      filtriraniProizvodi = filtriraniProizvodi.filter((a: any) =>
        a.kolekcijaOpis === this.odabranaKolekcija
      );
    }
    if (this.pretragaPoNazivu.trim() !== '') {
      filtriraniProizvodi = filtriraniProizvodi.filter((a: any) =>
        a.naziv.toLowerCase().includes(this.pretragaPoNazivu.toLowerCase())
      );
    }


    this.proizvodiMPodaci = filtriraniProizvodi;
    return this.proizvodiMPodaci;
  }
  odabranaKategorija: any=false;
  idPodkategorije: any="";

  svePodkategorije: any="Sve podkategorije";
  prikaziDiv: any=false;
  sezonePodaci: any;


  fetchKategorijeByOdjel(){

    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Kategorija/2", MojConfig.http_opcije()).subscribe(x=>{
      this.kategorijePodaci = x;
    });


  }

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


  private fetchKategorijeMuskarci() {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Kategorija", MojConfig.http_opcije()).subscribe(x=>{
      this.kategorijeMuskarciPodaci = x;
    });
  }


  private fetchPodKategorijeMuskarci() {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Podkategorija", MojConfig.http_opcije()).subscribe(x=>{
      this.podkategorijeMuskarciPodaci = x;
    });
  }

  prikaziDetaljeProizvoda(proizvod:any) {
    this.proizvod_id=proizvod;
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
    console.log("id kupca je : "+this.loginInfo().autentifikacijaToken.korisnickiNalogId);
    for(let k of this.korpePodaci) {
      if (k.naziv.startsWith("Korpa" + this.loginInfo().autentifikacijaToken.korisnickiNalogId)) {
        this.korpaID = k.id;
        this.nadjenaKorpa=true;
        /*alert("nasao korpu i id korpe je " + this.korpaID);*/

        console.log("nasao korpu a njen id je " + this.korpaID);
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
      console.log("korpa id nove je : " + this.korpaID);
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
    console.log("boje: "+this.odabraneBoje);
    this.filterByColor();
  }

  filterByColor() {

    if (this.odabraneBoje.length > 0) {
      this.proizvodiMPodaci = this.proizvodiSvi.filter((a:any) => {
        return this.odabraneBoje.some(color => color === a.bojaOpis) /*&& a.cijena<=this.selectedPriceRange*/;
      });
    } else {
      this.proizvodiMPodaci = this.proizvodiSvi;
    }






  }






  //selectedCollection: any = null;
  odabranaKolekcija:any="";
  isButtonActive: any;
  pretragaPoNazivu: any="";
  updateSelectedCollection(collection: any) {
    this.odabranaKolekcija=collection;

    this.getMProizvodi();
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
    console.log("boje: "+this.odabraneBoje);

    this.getMProizvodi();

  }
}
