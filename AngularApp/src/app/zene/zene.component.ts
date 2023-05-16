import {Component, Input, OnInit} from '@angular/core';
import {LoginInformacije} from "../helpers/login-informacije";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MojConfig} from "../moj-config";

export class Color {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

@Component({
  selector: 'app-zene',
  templateUrl: './zene.component.html',
  styleUrls: ['./zene.component.css']
})
export class ZeneComponent implements OnInit {
  kupac_id: any;
  proizvodiZPodaci: any;

  kategorijeZenePodaci: any;
  podkategorijeZenePodaci: any;

   noviFavorit: any ;
   favoritiPodaci: any;
   proizvod_id: any;

   dodanoUFavorite: any=false;
   vecDodanFavorit: any=false;
   novaKorpa: any;
   korpePodaci: any;
   korpaStavka: any;
   korpaStavkePodaci: any;
korpaID:any;
   korpastavkaId: any;

   nadjenaKorpa: any=false;
   korpePodaciKupacId: any;

  defaultPriceRange: any;



   kategorijePodaci: any;
   PodkategorijePodaci: any;
   bojePodaci: any;
   colors: any;
   selectedColorIds1: any;
  constructor(private httpKlijent: HttpClient, private router: Router,
              private route: ActivatedRoute) {}

  fetchProizvodi() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Proizvod/datumOpadajuci", MojConfig.http_opcije()).subscribe(x=>{
      this.proizvodiZPodaci = x;
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

  /*fetchSpecijalneZene() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/SpecijalnaPonudaProizvod/Specijalne_ponude_proizvod", MojConfig.http_opcije()).subscribe(x=>{
      this.SpecijalneZene = x;
    });
  }*/
 /* getSpecijalneZene(){
    if (this.SpecijalneZene == null)
      return [];
    console.log(this.SpecijalneZene.length);
    return this.SpecijalneZene.filter((a:any)=>a.specijalnaPonudaId==1);
  }*/
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
  private fetchKorpaByKupacId() {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Korpa/GetByIdKupac/"+
      this.loginInfo().autentifikacijaToken.korisnickiNalogId, MojConfig.http_opcije()).subscribe(x=>{
      this.korpePodaciKupacId = x;
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
    this.fetchKategorijeZene();
    this.fetchPodKategorijeZene();
    this.fetchFavoriti();
    this.fetchKorpe();
    this.fetchKorpstavke();
    this.fetchKategorije();
    this.fetchBoje();
    this.fetchSezone();


    setTimeout( ()=>{
      this.selectedPriceRange = this.defaultPriceRange;

    }, 400);


    //this.fetchPodkategorijeByKategorija();
   // this.fetchSpecijalneZene();
   // console.log("proslijei je :"+this.proslijedi);
  }
  ngAfterViewInit(){
   //this.fetchProizvodi();
    setTimeout( ()=>{
      console.log("TIMER =>");
      this.maxCijena=0;
      if(this.proizvodiZPodaci!=null) {
        //console.log("u suslovu smo(!=null)");
        for (let k of this.proizvodiZPodaci) {
         // console.log("U petlji smo"+"cijena je :"+k.cijena+"max price je :"+this.maxPrice);
          if (k.cijena > this.maxCijena) {
           // console.log("u uslovu smo: vece");
            this.maxCijena = k.cijena;

           // console.log("max price: "+this.maxCijena+" cijena: "+k.cijena);
          }
        }
        this.maxPrice=this.maxCijena;
        this.defaultPriceRange=this.maxPrice/2;
        console.log("max price: "+this.maxPrice);
        console.log("max cijena: "+this.maxCijena);
        console.log("default: "+this.defaultPriceRange);
      }

    }, 500);
  }


  maxCijena:Number=0;
  getZProizvodi() {
    this.maxCijena=0;
    if(this.proizvodiZPodaci!=null) {
     // console.log("u suslovu smo(!=null)");
      for (let k of this.proizvodiZPodaci) {
       // console.log("U petlji smo"+"cijena je :"+k.cijena+"max price je :"+this.maxPrice);
        if (k.cijena > this.maxCijena) {
        //  console.log("u uslovu smo: vece");
          this.maxCijena = k.cijena;

         // console.log("max price: "+this.maxCijena+" cijena: "+k.cijena);
        }
      }
      this.maxPrice=this.maxCijena;
      this.defaultPriceRange=this.maxPrice/2;
     // console.log("max price: "+this.maxPrice);
     // console.log("max cijena: "+this.maxCijena);
     // console.log("default: "+this.defaultPriceRange);
    }



    if (this.proizvodiZPodaci == null)
      return [];




    /*else if(this.idkategorije=="" && this.idPodkategorije=="")
      return this.proizvodiZPodaci;*/
    else if(this.idkategorije!="" && this.idPodkategorije=="" && this.selectedPriceRange>0)
      return this.proizvodiZPodaci.filter((a:any)=>a.kategorijaId==this.idkategorije && a.cijena<=this.selectedPriceRange);
    else if(this.idkategorije!="" && this.idPodkategorije!="" && this.selectedPriceRange>0)
      return this.proizvodiZPodaci.filter((a:any)=>a.podkategorijaId==this.idPodkategorije && a.cijena<=this.selectedPriceRange);
    else if(this.idkategorije=="" && this.idPodkategorije=="" && this.selectedPriceRange>0)
      return this.proizvodiZPodaci.filter((a:any)=>a.cijena<=this.selectedPriceRange);


  }
 /* getProizvodiPoKategoriji(id:any) {
    if (this.proizvodiZPodaci == null)
      return [];
    return this.proizvodiZPodaci.filter((a:any)=>a.kategorijaId==id);
  }*/
  odabranaKategorija: any=false;
  idPodkategorije: any="";
  sveKategorije: any="Sve kategorije";
  svePodkategorije: any="Sve podkategorije";
  prikaziDiv: any=false;
  sezonePodaci: any;


fetchKategorije(){

    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Kategorija", MojConfig.http_opcije()).subscribe(x=>{
      this.kategorijePodaci = x;
    });
    /* console.log(this.kategorijePodaci.length);*/

}
  fetchPodkategorije(){

    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Podkategorija", MojConfig.http_opcije()).subscribe(x=>{
      this.PodkategorijePodaci = x;
    });
    /* console.log(this.kategorijePodaci.length);*/

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
  dodajUFavorite(p:any) {
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
  getKategorijeZene() {
    if (this.kategorijeZenePodaci == null)
      return [];
    return this.kategorijeZenePodaci;
  }

  private fetchKategorijeZene() {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Kategorija", MojConfig.http_opcije()).subscribe(x=>{
      this.kategorijeZenePodaci = x;
    });
  }
  getPodKategorijeZene(id:number) {
    if (this.podkategorijeZenePodaci == null)
      return [];
    return this.podkategorijeZenePodaci.filter((a:any)=>(a.kategorijaID)==id);
  }

  private fetchPodKategorijeZene() {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/api/Podkategorija", MojConfig.http_opcije()).subscribe(x=>{
      this.podkategorijeZenePodaci = x;
    });
  }

  prikaziDetaljeProizvoda(proizvod:any) {
    this.proizvod_id=proizvod;
    this.napraviIliNadjiKorpu();
    this.router.navigate(['proizvod-detalji',this.proizvod_id]);
  }



  getKorpe(id:number) {
    if (this.korpePodaci == null)
      return [];
    return this.korpePodaci;
  }



  getKorpaStavke() {
    if (this.korpaStavkePodaci == null)
      return [];
    return this.korpaStavkePodaci;
  }


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
/*this.ngOnInit();*/
        });
        this.korpaID = this.novaKorpa.id;
        console.log("korpa id nove je : " + this.korpaID);
        alert("napravljena korpa");
      }
    }
  /*  for(let x of this.korpaStavkePodaci){
      if(x.proizvodId==p){
        console.log("ova stavka je vec dodana"+this.korpaID+" i ovo je id proizvoda "+p);
        return;
      }
    }*/
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

  prikaziFiltere() {

  }

  skloniDiv() {
this.prikaziDiv=false;
  }



  selectedColors: Color[] = [];

  updateSelectedColors(event: any) {
    const checkbox = event.target;
    const id = checkbox.value;
    const selectedColor = this.colors.find((color: Color) => color.id === id);
    if (!selectedColor) {
      console.error(`Color with id ${id} not found.`);
      return;
    }
    const color = new Color(selectedColor.id, selectedColor.name);
    if (checkbox.checked) {
      this.selectedColors.push(color);
    } else {
      const index = this.selectedColors.indexOf(color);
      if (index >= 0) {
        this.selectedColors.splice(index, 1);
      }
    }
    if (this.selectedColors.length > 0) {
      console.log("Selected colors:");
      for (let selectedColor of this.selectedColors) {
        console.log(selectedColor.name);
      }
    }
  }

  showSelectedColors() {
    if (this.selectedColors.length > 0) {
      console.log("Selected colors:");
      this.selectedColors.forEach(color => console.log(color.name));
    } else {
      console.log("No colors selected.");
    }
  }
  displaySelectedColors() {
    if (this.selectedColors.length > 0) {
      for(let k of this.selectedColors){
        console.log(k.name ? k.name : 'undefined');
      }
    }
  }

  selectedColorIds: number[] = [];
  updateSelectedColors1(event: any) {
    const checkbox = event.target;
    const id = Number(checkbox.value);

    if (checkbox.checked) {
      // add the color ID to the selectedColorIds array if it's not already there
      if (!this.selectedColorIds.includes(id)) {
        this.selectedColorIds.push(id);
      }
    } else {
      // remove the color ID from the selectedColorIds array if it's there
      const index = this.selectedColorIds.indexOf(id);
      if (index >= 0) {
        this.selectedColorIds.splice(index, 1);
      }
    }

    if (this.selectedColorIds.length > 0) {
      console.log('Selected color IDs:', this.selectedColorIds);
    }
    this.selectedColorIds1 = "";
    for (let i = 0; i < this.selectedColors.length; i++) {
      this.selectedColorIds1 += this.selectedColors[i].id + " ";
    }
  }

  /*getSelectedColors(): Color[] {
    return this.colors.filter((color: Color) => this.selectedColorIds.includes(color.id));
  }*/
  minPrice: any=0;
  maxPrice: any;




  selectedPriceRange: any ;

  updateSelectedPriceRange(event:Event) {
    const value = (event.target as HTMLInputElement).value;
    this.selectedPriceRange = Number(value);

  }







}





