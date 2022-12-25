import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";

@Component({
  selector: 'app-kat-podkat',
  templateUrl: './kat-podkat.component.html',
  styleUrls: ['./kat-podkat.component.css']
})
export class KatPodkatComponent implements OnInit {

  constructor(private httpKlijent:HttpClient) { }

  podaci_podkategorije:any;
  podaci_kategorije:any;

  nova_kategorija:any;
  nova_podkategorija:any;

  ngOnInit(): void {
    this.getPodkategorije();
    this.getKategorije();
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

  dodajKategoriju(nazivKat: string) {
   this.nova_kategorija={
     id:0,
     naziv:nazivKat
   }

   ///api/Kategorija
    this.httpKlijent.post(MojConfig.adresa_servera+"/api/Kategorija",this.nova_kategorija)
      .subscribe((x:any)=>{
        console.log(this.podaci_kategorije)
      })

  }

  kat_id:any;

  dodajPodkategoriju(nazivP: string) {
    /*
    this.nova_podkategorija={
      id:0,
      naziv:nazivP,
      kaategorijaId:this.kat_id
    }

    this.httpKlijent.post(MojConfig.adresa_servera+"/api/Podkategorija",this.nova_podkategorija)
      .subscribe((x:any)=>{
        this.getPodkategorije();
      })

    */
  }




}
