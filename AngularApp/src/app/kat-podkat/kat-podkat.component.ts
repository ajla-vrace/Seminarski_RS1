import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {ActivatedRoute} from "@angular/router";

declare function porukaInfo(a: string):any;

@Component({
  selector: 'app-kat-podkat',
  templateUrl: './kat-podkat.component.html',
  styleUrls: ['./kat-podkat.component.css']
})
export class KatPodkatComponent implements OnInit {

  constructor(private httpKlijent: HttpClient, private route: ActivatedRoute) {
  }

  podaci_podkategorije: any;
  podaci_kategorije: any;

  nova_kategorija: any;
  nova_podkategorija: any;


  admin_id: any;

  totalLength: number = 0;
  page: number = 1;

  totalLenght2: number = 0;
  page_2: number = 1;

  kat_id: any;


  timeLeft: number = 10;
  interval: any;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        console.log(this.timeLeft);
      } else {
        // this.timeLeft = 60;
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  ngOnInit(): void {

    this.getPodkategorije(); //zbog validacije naziva
    this.getKategorije(); //isto
    this.getPodkategorijePaged();
    this.getKategorijePaged();

    this.route.params.subscribe(s => {
      this.admin_id = +s["id"];
    })
  }

  podkatPaged: any;
  naziv_filter: any = "";
  trenutnaStr: any = 1;

  getPodkategorijePaged() {
    this.httpKlijent.get(MojConfig.adresa_servera +
      "/api/Podkategorija/paging?naziv=" + this.naziv_filter + "&trenutnaStr=" + this.trenutnaStr + "&brojPodataka=5")
      .subscribe((x: any) => {
        this.podkatPaged = x;
        console.log("PODKAT PAGED:", this.podkatPaged)
      })
  }

  katPaged: any;
  naziv_kat_filter: any = "";
  trenutnaStr_kat: any = 1;

  getKategorijePaged() {
    this.httpKlijent.get(MojConfig.adresa_servera +
      "/api/Podkategorija/paging_kat?naziv=" + this.naziv_kat_filter + "&trenutnaStr=" + this.trenutnaStr_kat + "&brojPodataka=5")
      .subscribe((x: any) => {
        this.katPaged = x;
        console.log("KAT PAGED:", this.katPaged)
      })
  }


  broj1p: any = 1;
  broj2p: any = 2;
  broj3p: any = 3;
  broj4p: any = 4;

  pomjeriBrojeveUdesno() {
    this.broj1p++;
    this.broj2p++;
    this.broj3p++;
    this.broj4p++;
  }

  pomjeniBrojeveUlijevo() {
    this.broj1p--;
    this.broj2p--;
    this.broj3p--;
    this.broj4p--;
  }

  postaviStraniceDefaultno() {
    this.broj1p = 1;
    this.broj2p = 2;
    this.broj3p = 3;
    this.broj4p = 4;
  }

  uslovSljedecaPodkat() {
    console.log("trenutnaStr", this.trenutnaStr);
    if (this.trenutnaStr == this.podkatPaged?.ukupnoStranica) {
      this.trenutnaStr = this.podkatPaged?.ukupnoStranica;
    } else {
      this.trenutnaStr++;
    }
    /*   if(this.trenutnaStr>=4 && this.trenutnaStr<this.podkatPaged?.ukupnoStranica){
         this.pomjeriBrojeveUdesno();
       }
     */
    this.getPodkategorijePaged();
  }

  uslovSljedecaKat() {
    if (this.trenutnaStr_kat == this.katPaged?.ukupnoStranica) {
      this.trenutnaStr_kat = this.katPaged?.ukupnoStranica;
    } else {
      this.trenutnaStr_kat++;
    }
    this.getKategorijePaged();
  }

  uslovPrethodnaPodkat() {
    if (this.trenutnaStr > 1) {
      this.trenutnaStr = this.trenutnaStr - 1;
      //  this.pomjeniBrojeveUlijevo();
    } else {
      this.trenutnaStr = 1;
    }
    this.getPodkategorijePaged();
  }


  uslovPrethodnaKat() {
    if (this.trenutnaStr_kat > 1) {
      this.trenutnaStr_kat = this.trenutnaStr_kat - 1;
    } else {
      this.trenutnaStr_kat = 1;
    }
    this.getKategorijePaged();
  }


  getPodkategorije(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Podkategorija")
      .subscribe((x:any)=>{
        this.podaci_podkategorije=x;
        console.log(this.podaci_podkategorije)
      })
  }

  getKategorije(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Kategorija")
      .subscribe((x:any)=>{
        this.podaci_kategorije=x;
        this.kat_id=this.podaci_kategorije[0]?.id;
        console.log(this.podaci_kategorije,"kat id:",this.kat_id);
      })
  }


  kliknuoPretrazi:boolean=false;

  getFilterPodkategorije(pretraga:string){
    if(pretraga==null) pretraga="";

    if(this.kliknuoPretrazi){
      let filtriraniPodaci = this.podaci_podkategorije?.filter((x:any)=>(
        x.naziv.toLowerCase().startsWith(pretraga.toLowerCase())
        || x.kategorijaOpis.toLowerCase().startsWith(pretraga.toLowerCase())));

      this.totalLength=filtriraniPodaci?.length==0?0:filtriraniPodaci?.length;

      return filtriraniPodaci;
    }
    else{
      this.totalLength=this.podaci_podkategorije?.length==0?0:this.podaci_podkategorije?.length;
      return this.podaci_podkategorije;
    }

  }

  getFilterKategorije(pretraga:string){
    if(pretraga!=null){
      let filtriraniPodaci = this.podaci_kategorije?.filter((x:any)=>(x.naziv.toLowerCase().startsWith(pretraga?.toLowerCase())));
      this.totalLenght2=filtriraniPodaci?.length==0?0:filtriraniPodaci?.length;
      return filtriraniPodaci;
    }
   else{
      this.totalLenght2=this.podaci_podkategorije?.length==0?0:this.podaci_podkategorije?.length;
      return this.podaci_kategorije;
    }
  }

  naslov:any="";

  dodajKategoriju() {

    this.naslov="Dodaj kategoriju";

    this.nova_kategorija = {
      id: 0,
      naziv: "",
      datum_kreiranja: "2022-12-25T00:00:00",
      datum_modifikacije: "2022-12-25T00:00:00"
    }

    console.log(this.nova_kategorija);
  }

  spasi_kat(){

    this.httpKlijent.post(MojConfig.adresa_servera+"/api/Kategorija",this.nova_kategorija,MojConfig.http_opcije())
      .subscribe((x:any)=>{

        this.getKategorije();
        this.getKategorijePaged();

        if(this.jel_edit_kat==false)
          porukaInfo("Uspješno ste dodali kategoriju.");
        else porukaInfo("Uspješno ste modifikovali zapis.");

        this.nova_kategorija=null;

        console.log(this.nova_kategorija);

        console.log(this.podaci_kategorije);

        this.jel_edit_kat=false;

      })

  }


  dodajPodkategoriju() {
    this.naslov="Dodaj podkategoriju";

    this.nova_podkategorija = {
      id: 0,
      naziv: "",
      kategorijaID: this.kat_id,
      kategorijaOpis: "",
      datum_kreiranja: "2022-12-26T10:48:35.045Z",
      datum_modifikacije: "2022-12-26T10:48:35.045Z"
    }

    console.log(this.nova_podkategorija);
  }


  spasi_podkat(){
    console.log(this.nova_podkategorija);
    this.httpKlijent.post(MojConfig.adresa_servera+"/api/Podkategorija/nova_p",this.nova_podkategorija, MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.getPodkategorije();
        this.getPodkategorijePaged();

        if(this.jel_edit==false)
          porukaInfo("Uspješno ste dodali podkategoriju.");
        else porukaInfo("Uspješno ste modifikovali zapis.");

        this.nova_podkategorija=null;

        this.jel_edit=false;

        console.log(this.nova_podkategorija);
      })


  }


  objekat_za_obrisati:any;
  kliknuoObrisi:boolean=false;
  jelKategorija:boolean=false;
  jelPodkategorija:boolean=false;

  obrisiPodkat(p:any) {
    this.jel_edit=false;
  //  if (confirm("Brisanjem ovog podatka brišete i sve proizvode koji sadrže ovaj podatak." +
    //  "Da li želite izvršiti brisanje?"))
    {
      this.httpKlijent.delete(MojConfig.adresa_servera+"/api/Podkategorija?id="+p.id)
        .subscribe((x:any)=>{
          this.getPodkategorije();
          this.getPodkategorijePaged();
         porukaInfo("Uspješno obrisan zapis.");
        })
    }
    this.objekat_za_obrisati=null;
    this.kliknuoObrisi=false;
    this.jelKategorija=false;
    this.jelPodkategorija=false;

  }


  jel_edit:boolean=false;
  urediPodkat(p: any) {
    this.nova_podkategorija=p;
    this.jel_edit=true;
    this.naslov="Uredi podkategoriju";
  }

  jel_edit_kat:boolean=false;
  uredi_kat(k:any){
    this.nova_kategorija=k;
    this.jel_edit_kat=true;
    this.naslov="Uredi kategoriju";
  }

  obrisiKat(p: any) {
    this.jel_edit_kat=false;
  //  if (confirm("Brisanjem ovog podatka brišete sve proizvode i podkategorije koje sadrže ovaj podatak." +
    //  "Da li želite izvršiti brisanje?"))
    {
      this.httpKlijent.delete(MojConfig.adresa_servera+"/api/Kategorija?id="+p.id)
        .subscribe((x:any)=>{
          this.getKategorije();
          this.getKategorijePaged();
          //alert("Uspješno obrisano.");
          porukaInfo("Uspješno obrisan zapis.");
        })
    }
    this.objekat_za_obrisati=null;
    this.kliknuoObrisi=false;
    this.jelKategorija=false;
    this.jelPodkategorija=false;
  }


  postojiKategorija(kat:string){
      for (let i of this.podaci_kategorije){
        if(i.naziv===kat && i.id!==this.nova_kategorija.id)
          return true;
      }
      return false;
  }

  //ne smiju postojati dvije iste podkategorije!
  postojiPodkategorija(podkat:string){
      for (let i of this.podaci_podkategorije){
        if(i.naziv===podkat && i.id!==this.nova_podkategorija.id && i.kategorijaID==this.nova_podkategorija.kategorijaID)
          return true;
      }
      return false;
  }
}
