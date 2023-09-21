import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {NgControl, NgModel} from "@angular/forms";

declare function porukaInfo(a: string):any;

@Component({
  selector: 'app-sez-kol',
  templateUrl: './sez-kol.component.html',
  styleUrls: ['./sez-kol.component.css']
})
export class SezKolComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router, private httpKlijent:HttpClient) { }

  admin_id:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.admin_id=+s["id"];

      this.getSezone();
      this.getKolekcije();
      this.getSezoneAktivne();
    })
  }

  naslov:any="";

  obj_sezona:any;
  obj_kolekcija:any;

  sezone:any;
  kolekcije:any;


  sezona_id:any;

  kliknuoEditSezona:boolean=false;
  kliknuoEditKolekcija:boolean=false;

  totalLength1:any;
  page1:any;
  totalLength2:any;
  page2:any;

  getKolekcije(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Kolekcija/kolekcija",MojConfig.http_opcije()).subscribe((x:any)=>{
      this.kolekcije=x;
      this.totalLength1=this.kolekcije?.length;
     // this.sezona_id=this.kolekcije[0].sezonaId;
      console.log(this.kolekcije,"sezonaID:",this.sezona_id);
    })
  }

  getSezone(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Sezona/sezone",MojConfig.http_opcije()).subscribe((x:any)=>{
      this.sezone=x;
      this.totalLength2=this.sezone?.length;
      this.sezona_id=this.sezone[0]?.id;
      console.log("sezone",this.sezone);
    })
  }

  sezone_aktivne:any;
  sezona_id2:any;
  getSezoneAktivne(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Sezona/sezone_aktivne",MojConfig.http_opcije()).subscribe((x:any)=>{
      this.sezone_aktivne=x;
      this.totalLength2=this.sezone_aktivne?.length;
      this.sezona_id2=this.sezone_aktivne[0]?.id;
      console.log("sezone aktivne",this.sezone_aktivne);
    })
  }

  spasi_sezonu(){

    console.log(this.obj_sezona);

    this.httpKlijent.post(MojConfig.adresa_servera+"/api/Sezona",this.obj_sezona,MojConfig.http_opcije()).subscribe((x:any)=>{
      if(this.kliknuoEditSezona==false)
        porukaInfo("Uspješno ste dodali sezonu.");
      else
        porukaInfo("Uspješno ste izmijenili sezonu.");

      this.kliknuoEditSezona=false;
      this.getSezone();
      this.getSezoneAktivne();
      this.getKolekcije();


      this.obj_sezona=null;
    })
  }

  spasi_kolekciju(){

    console.log(this.obj_kolekcija);

    this.httpKlijent.post(MojConfig.adresa_servera+"/api/Kolekcija",this.obj_kolekcija,MojConfig.http_opcije()).subscribe((x:any)=>{
      if(this.kliknuoEditKolekcija==false)
         porukaInfo("Uspješno ste dodali kolekciju.");
      else
        porukaInfo("Uspješno ste izmijenili kolekciju.");

      this.kliknuoEditKolekcija=false;
      this.getKolekcije();

      this.obj_kolekcija=null;
    })

  }

  jelOmogucenSaveSezone(naziv: any, doba: any, godina: any) {
    if(naziv.valid && doba.valid && godina.valid && !this.postojiIstaSezona(naziv.value))
       return true;
    return false;
  }

  editSezona(s: any) {
    this.kliknuoEditSezona=true;
    this.obj_sezona=s;
    this.naslov="Izmjeni sezonu";
  }


  objekat_za_obrisati:any;
  kliknuoObrisi:boolean=false;
  jelSezona:boolean=false;
  jelKolekcija:boolean=false;

  deleteSezona(s: any) {
    this.kliknuoEditSezona=false;

    /*
      "Brisanjem ovog zapisa, brišete sve kolekcije i poništava se ova sezona koju imaju neki od proizvoda." +
      "Jeste li sigurni da želite obrisati ovaj zapis?"
    */
/*
    if(confirm("Brisanjem ovog zapisa, brišete sve kolekcije i proizvode koje koriste ovaj zapis. " +
      "Savjetujemo Vam da umjesto brisanja izvršite modifikaciju zapisa. Ako ste sigurni da želite " +
      "obrisati, molimo Vas da potvrdite sa OK."))
 */
    {
      this.httpKlijent.delete(MojConfig.adresa_servera+"/api/Sezona?id="+s.id,MojConfig.http_opcije())
        .subscribe((x:any)=>{
          this.getSezone();
          porukaInfo("Zapis je uspješno obrisan.");
        })
    }

    this.kliknuoObrisi=false;
    this.jelSezona=false;
    this.jelKolekcija=false;
    this.objekat_za_obrisati=null;
  }

  editKolekcija(k: any) {
    this.kliknuoEditKolekcija=true;
    this.obj_kolekcija=k;
    this.naslov="Izmjeni kolekciju";
  }

  deleteKolekcija(k: any) {
    this.kliknuoEditKolekcija=false;

    /*
      Brisanjem ovog zapisa, poništava se ova kolekcija koja je zastupljena kod nekih proizvoda. " +
      "Jeste li sigurni da želite obrisati ovaj zapis?
      */
/*
    if(confirm("Brisanjem ovog zapisa, brišete sve proizvode koje koriste ovaj zapis. " +
      "Savjetujemo Vam da umjesto brisanja izvršite modifikaciju zapisa. Ako ste sigurni da želite " +
      "obrisati, molimo Vas da potvrdite sa OK."))
 */
    {
      this.httpKlijent.delete(MojConfig.adresa_servera+"/api/Kolekcija?id="+k.id,MojConfig.http_opcije())
        .subscribe((x:any)=>{
          this.getKolekcije();
          porukaInfo("Zapis je uspješno obrisan.");
        })
    }

    this.kliknuoObrisi=false;
    this.jelSezona=false;
    this.jelKolekcija=false;
    this.objekat_za_obrisati=null;
  }

  jelOmogucenSaveKolekcije(nazivControll: NgModel, sezonaIdControll: NgModel, godinaControll: NgModel) {
    if(nazivControll.valid && sezonaIdControll.valid && godinaControll.valid && !this.postojiIstaKolekcija(nazivControll.value))
      return true;
    return false;
  }

  dodajSezonu() {
    this.naslov="Dodaj sezonu";
    this.obj_sezona={
      id:0,
      naziv:"",
      doba:"",
      godina:"",
      aktivna:true
    };
  }

  dodajKolekciju(){
    this.naslov="Dodaj kolekciju";
    this.obj_kolekcija={
      id:0,
      sezonaId:this.sezona_id2,
      sezonaOpis:"",
      naziv:"",
      godina:"",
      aktivna:true
    };
  }



  postojiIstaSezona(sez:string){
    for(let i of this.sezone){
      if(i.naziv===sez && i.id!==this.obj_sezona.id)
        return true;
    }
    return false;
  }

  postojiIstaKolekcija(kol:string){
    for(let i of this.kolekcije){
      if(i.naziv===kol && i.id!==this.obj_kolekcija.id) //&& i.sezonaId==this.obj_kolekcija.sezonaId
        return true;
    }
    return false;
  }

  filter_kolekcija:any="";
  filter_sezona:any="";
  select_aktivne:any="Aktivne";

  getFilterKolekcije(){
    var podaci=this.kolekcije?.filter((x:any)=>(
      this.filter_kolekcija?
      x.naziv.toLowerCase().includes(this.filter_kolekcija.toLowerCase())
      || x.sezonaOpis.toLowerCase().includes(this.filter_kolekcija.toLowerCase())
        || (x.aktivna==true?"aktivna":"neaktivna").startsWith(this.filter_kolekcija.toLowerCase()) : this.kolekcije
    ))

    this.totalLength1=podaci?.length;
    return podaci;
  }

  getFilterKolekcijeAktivnost(){
    if(this.select_aktivne=="Aktivne"){
      return this.getFilterKolekcije()?.filter((x:any)=>(x.aktivna==true));
    }
    else if(this.select_aktivne=="Neaktivne"){
      return this.getFilterKolekcije()?.filter((x:any)=>(x.aktivna==false));
    }
    else return this.getFilterKolekcije();
  }

  getFilterSezone(){
    var podaci=this.sezone?.filter((x:any)=>(
      this.filter_sezona ? x.naziv.toLowerCase().includes(this.filter_sezona.toLowerCase())
      || (x.aktivna==true?"aktivna":"neaktivna").startsWith(this.filter_sezona.toLowerCase()) : this.sezone
    ))

    this.totalLength2=podaci?.length;
    return podaci;
  }
}
