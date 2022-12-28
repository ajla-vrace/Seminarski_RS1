import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MojConfig} from "../moj-config";

@Component({
  selector: 'app-recenzije',
  templateUrl: './recenzije.component.html',
  styleUrls: ['./recenzije.component.css']
})
export class RecenzijeComponent implements OnInit {
   komentariPodaci: any;
  pretraga: any;
  constructor(private httpKlijent: HttpClient, private router: Router, private route:ActivatedRoute) {
  }
  fetchProdavnice() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "Prodavnica/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.komentariPodaci = x;
    });
  }
  fetchKomentari() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Komentar/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.komentariPodaci = x;
    });
  }

  admin_id:any;

  ngOnInit(): void {
    this.fetchKomentari();
    this.fetchProdavnice();

    this.route.params.subscribe(s=>{
      this.admin_id=+s["id"];
    })
  }
  get_podaci_filtrirano() {
    if (this.komentariPodaci == null)
      return [];

    return this.komentariPodaci.filter(
      (a:any)=>(!this.pretraga) || (a.prodavnica).toLowerCase().startsWith(this.pretraga.toLowerCase()));
  }


  brisi_komenatar(s:any) {
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Komentar/Delete/" + s.id,null, MojConfig.http_opcije())
      .subscribe((povratnaVrijednost:any) =>{
        const index = this.komentariPodaci.indexOf(s);
        if (index > -1) {
          this.komentariPodaci.splice(index, 1);
        }

      });


    this.httpKlijent.post(MojConfig.adresa_servera+ "/Komentar/GetAll",MojConfig.http_opcije()).subscribe(x=>{
      this.komentariPodaci = x;
    });

  }
}
