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
   prodavnice:any;
  pretraga: any;
  ocjenePodaci: any;
   ocjeneProizvodaPodaci: any;
  constructor(private httpKlijent: HttpClient, private router: Router, private route:ActivatedRoute) {
  }
  fetchProdavnice() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "Prodavnica/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.prodavnice = x;
    });
  }
  fetchKomentari() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Komentar/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.komentariPodaci = x;
    });
  }

  fetchOcjene() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Ocjena/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.ocjenePodaci = x;
    });
  }

  fetchOcjeneProizvoda() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Zvjezdica/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.ocjeneProizvodaPodaci = x;
    });
  }




  admin_id:any;
   k: any;
  o: any;
  pretragaOcjena: any;
  pretragaOcjenaProizvoda: any;
  odabranikomentar: any;
  ngOnInit(): void {
    this.fetchKomentari();
    this.fetchProdavnice();
    this.fetchOcjene();
    this.fetchOcjeneProizvoda();
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

  getBrojKom(){
    return this.komentariPodaci.length;
  }


  getBrojOcjena(){
    return this.ocjenePodaci.length;
  }
  getBrojOcjenaProizvoda(){
    return this.ocjeneProizvodaPodaci.length;
  }


  getOcjene() {
    if (this.ocjenePodaci == null)
      return [];

    return this.ocjenePodaci.filter(
      (a:any)=>(!this.pretragaOcjena) || (a.prodavnica).toLowerCase().startsWith(this.pretragaOcjena.toLowerCase()));
  }

  brisi_ocjenu(s: any) {
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Ocjena/Delete/" + s.id,null, MojConfig.http_opcije())
      .subscribe((povratnaVrijednost:any) =>{
        const index = this.ocjenePodaci.indexOf(s);
        if (index > -1) {
          this.ocjenePodaci.splice(index, 1);
        }
      });
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Ocjens/GetAll",MojConfig.http_opcije()).subscribe(x=>{
      this.ocjenePodaci = x;
    });
  }









  getOcjeneProizvoda() {
    if (this.ocjeneProizvodaPodaci == null)
      return [];

    return this.ocjeneProizvodaPodaci.filter(
      (a:any)=>(!this.pretragaOcjenaProizvoda) || (a.proizvod).toLowerCase().startsWith(this.pretragaOcjenaProizvoda.toLowerCase()));
  }

  brisi_ocjenuProizvoda(s: any) {
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Zvjezdica/Delete/" + s.id,null, MojConfig.http_opcije())
      .subscribe((povratnaVrijednost:any) =>{
        const index = this.ocjeneProizvodaPodaci.indexOf(s);
        if (index > -1) {
          this.ocjeneProizvodaPodaci.splice(index, 1);
        }
      });
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Zvjezdica/GetAll",MojConfig.http_opcije()).subscribe(x=>{
      this.ocjeneProizvodaPodaci = x;
    });
  }


  modifikuj() {

  }
}
