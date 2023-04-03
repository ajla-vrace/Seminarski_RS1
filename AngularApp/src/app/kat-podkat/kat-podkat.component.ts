import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-kat-podkat',
  templateUrl: './kat-podkat.component.html',
  styleUrls: ['./kat-podkat.component.css']
})
export class KatPodkatComponent implements OnInit {

  constructor(private httpKlijent:HttpClient, private route:ActivatedRoute) { }

  podaci_podkategorije:any;
  podaci_kategorije:any;

  nova_kategorija:any;
  nova_podkategorija:any;


  admin_id:any;

  totalLength:number=0;
  page:number=1;

  totalLenght2:number=0;
  page_2:number=1;

  kat_id:any;


  timeLeft: number = 10;
  interval:any;

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        console.log(this.timeLeft);
      } else {
       // this.timeLeft = 60;
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  ngOnInit(): void {

    this.getPodkategorije();
    this.getKategorije();

    this.route.params.subscribe(s => {
      this.admin_id = +s["id"];
    })
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
        x.naziv.toLowerCase().startsWith(pretraga.toLowerCase())));

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

    this.httpKlijent.post(MojConfig.adresa_servera+"/api/Kategorija",this.nova_kategorija)
      .subscribe((x:any)=>{

        this.getKategorije();

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
    this.httpKlijent.post(MojConfig.adresa_servera+"/api/Podkategorija/nova_p",this.nova_podkategorija)
      .subscribe((x:any)=>{
        this.getPodkategorije();

        this.nova_podkategorija=null;

        this.jel_edit=false;
        console.log(this.nova_podkategorija);
      })


  }

  obrisiPodkat(p:any) {
    this.jel_edit=false;
    if (confirm("Da li želite obrisati ovaj podatak?")){
      this.httpKlijent.delete(MojConfig.adresa_servera+"/api/Podkategorija?id="+p.id)
        .subscribe((x:any)=>{
          this.getPodkategorije();
          alert("Uspješno obrisano.");
        })
    }

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
    if (confirm("Da li želite obrisati ovaj podatak?")){
      this.httpKlijent.delete(MojConfig.adresa_servera+"/api/Kategorija?id="+p.id)
        .subscribe((x:any)=>{
          this.getKategorije();
          alert("Uspješno obrisano.");
        })
    }
  }
}
