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


  ngOnInit(): void {

    this.nova_podkategorija={
      id:0,
      naziv:"",
      kategorijaID:1,
      kategorijaOpis:"",
      datum_kreiranja:"2022-12-26T10:48:35.045Z",
      datum_modifikacije:"2022-12-26T10:48:35.045Z"
    }


    this.nova_kategorija={
      id:0,
      naziv:"",
      datum_kreiranja: "2022-12-25T00:00:00",
      datum_modifikacije: "2022-12-25T00:00:00"
    }


    this.getPodkategorije();
    this.getKategorije();

    this.route.params.subscribe(s=>{
      this.admin_id=+s["id"];
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
        console.log(this.podaci_kategorije)
      })
  }


  kliknuoPretrazi:boolean=false;

  getFilterPodkategorije(pretraga:string){
    if(pretraga==null) pretraga="";

    if(this.kliknuoPretrazi){
      let filtriraniPodaci= this.podaci_podkategorije?.filter((x:any)=>(
        x.naziv.toLowerCase().startsWith(pretraga.toLowerCase())));

      this.totalLength=filtriraniPodaci?.length==0?0:filtriraniPodaci?.length;

      return filtriraniPodaci;
    }
    else{
      this.totalLength=this.podaci_podkategorije?.length==0?0:this.podaci_podkategorije?.length;
      return this.podaci_podkategorije;
    }


  }

  dodajKategoriju() {
    /*
    this.nova_kategorija={
      id:0,
      naziv:nazivKat,
      datum_kreiranja: "2022-12-25T00:00:00",
      datum_modifikacije: "2022-12-25T00:00:00"
    }
*/
    this.httpKlijent.post(MojConfig.adresa_servera+"/api/Kategorija",this.nova_kategorija)
      .subscribe((x:any)=>{

        this.getKategorije();

        this.nova_kategorija={
          id:0,
          naziv:"",
          datum_kreiranja: "2022-12-25T00:00:00",
          datum_modifikacije: "2022-12-25T00:00:00"
        }

        console.log(this.nova_kategorija);

        console.log(this.podaci_kategorije);


      })

  }


  dodajPodkategoriju() {

    console.log(this.nova_podkategorija);
    this.httpKlijent.post(MojConfig.adresa_servera+"/api/Podkategorija/nova_p",this.nova_podkategorija)
      .subscribe((x:any)=>{
        this.getPodkategorije();

        this.nova_podkategorija={
          id:0,
          naziv:"",
          kategorijaID:1,
          kategorijaOpis:"",
          datum_kreiranja:"2022-12-26T10:48:35.045Z",
          datum_modifikacije:"2022-12-26T10:48:35.045Z"
        }

        console.log(this.nova_podkategorija);
      })
  }


  obrisiPodkat(p:any) {
    if (confirm("Da li želite obrisati ovaj podatak?")){
      this.httpKlijent.delete(MojConfig.adresa_servera+"/api/Podkategorija?id="+p.id)
        .subscribe((x:any)=>{
          this.getPodkategorije();
          alert("Uspješno obrisano.");
        })
    }

  }


}
