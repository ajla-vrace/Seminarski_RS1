import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {NgModel} from "@angular/forms";

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
    })


    this.obj_sezona={
      id:0,
      naziv:"",
      doba:"",
      godina:""
    };

    this.obj_kolekcija={
      id:0,
      sezonaId:this.sezona_id,
      sezonaOpis:"",
      naziv:"",
      godina:""
    };

  }

  obj_sezona:any;
  obj_kolekcija:any;

  sezone:any;
  kolekcije:any;


  sezona_id:number=1;

  kliknuoEditSezona:boolean=false;
  kliknuoEditKolekcija:boolean=false;

  getKolekcije(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Kolekcija/kolekcija").subscribe((x:any)=>{
      this.kolekcije=x;
      this.sezona_id=this.kolekcije[0].sezonaId;
      console.log(this.kolekcije);
    })
  }

  getSezone(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Sezona/sezone").subscribe((x:any)=>{
      this.sezone=x;
      console.log(this.sezone);
    })
  }

  spasi_sezonu(){

    console.log(this.obj_sezona);

    this.httpKlijent.post(MojConfig.adresa_servera+"/api/Sezona",this.obj_sezona).subscribe((x:any)=>{
      if(this.kliknuoEditSezona==false)
        alert("Uspješno ste dodali sezonu.");
      else
        alert("Uspješno ste izmijenili sezonu.");

      this.kliknuoEditSezona=false;
      this.getKolekcije();
      this.getSezone();
      this.obj_sezona={
        id:0,
        naziv:"",
        doba:"",
        godina:""
      };
    })
  }

  spasi_kolekciju(){

    console.log(this.obj_kolekcija);

    this.httpKlijent.post(MojConfig.adresa_servera+"/api/Kolekcija",this.obj_kolekcija).subscribe((x:any)=>{
      if(this.kliknuoEditKolekcija==false)
         alert("Uspješno ste dodali kolekciju.");
      else
        alert("Uspješno ste izmijenili kolekciju.");

      this.kliknuoEditKolekcija=false;
      this.getKolekcije();
      this.obj_kolekcija={
        id:0,
        sezonaId:1,
        sezonaOpis:"",
        naziv:"",
        godina:""
      };
    })

  }

  jelOmogucenSaveSezone(naziv: any, doba: any, godina: any) {
    if(naziv.valid && doba.valid && godina.valid)
       return true;
    return false;
  }

  editSezona(s: any) {
    this.kliknuoEditSezona=true;
    this.obj_sezona=s;
  }

  deleteSezona(s: any) {
    this.kliknuoEditSezona=false;

    if(confirm("Brisanjem ovog zapisa, brišete sve kolekcije i proizvode koje koriste ovaj zapis. " +
      "Savjetujemo Vam da umjesto brisanja izvršite modifikaciju zapisa. Ako ste sigurni da želite " +
      "obrisati, molimo Vas da potvrdite sa OK.")){

      this.httpKlijent.delete(MojConfig.adresa_servera+"/api/Sezona?id="+s.id)
        .subscribe((x:any)=>{
          this.getSezone();
        })
    }
  }

  editKolekcija(k: any) {
    this.kliknuoEditKolekcija=true;
    this.obj_kolekcija=k;
  }

  deleteKolekcija(k: any) {
    this.kliknuoEditKolekcija=false;

    if(confirm("Brisanjem ovog zapisa, brišete sve proizvode koje koriste ovaj zapis. " +
      "Savjetujemo Vam da umjesto brisanja izvršite modifikaciju zapisa. Ako ste sigurni da želite " +
      "obrisati, molimo Vas da potvrdite sa OK.")){

      this.httpKlijent.delete(MojConfig.adresa_servera+"/api/Kolekcija?id="+k.id)
        .subscribe((x:any)=>{
          this.getKolekcije();
        })
    }
  }

  jelOmogucenSaveKolekcije(nazivControll: NgModel, sezonaIdControll: NgModel, godinaControll: NgModel) {
    if(nazivControll.valid && sezonaIdControll.valid && godinaControll.valid)
      return true;
    return false;
  }
}
