import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MojConfig} from "../moj-config";

import { CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import {Chart} from 'chart.js'


declare function porukaSuccess(a: string):any;
declare function porukaError(a: string):any;
interface IzvjestajKomentari {
  mjesec: string;
  ukupnoKomentara: number;
}



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
   komentariPodaci1: any;


  //mjeseci
  public months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "Mart" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
   /* { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }*/
    // Dodajte ostale mjesece
  ];


  chartInstance!: Chart;





  constructor(private httpKlijent: HttpClient, private router: Router, private route:ActivatedRoute) {
  }
  fetchProdavnice()
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Prodavnica/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.prodavnice = x;
    });
  }
  fetchKomentari1() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Komentar/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.komentariPodaci1 = x;
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
   // this.fetchKomentari();
    this.fetchProdavnice();
    this.fetchOcjene();
    this.fetchOcjeneProizvoda();
    this.route.params.subscribe(s=>{
      this.admin_id=+s["id"];
    })
    this.getKomentare();
    this.fetchKomentari1();
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
    alert("Odabrani komentar je obrisan!");
  }

  getBrojKom(){
    return this.komentariPodaci1?.length;
  }


  getBrojOcjena(){
    return this.ocjenePodaci?.length;
  }
  getBrojOcjenaProizvoda(){
    return this.ocjeneProizvodaPodaci?.length;
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
    alert("Odabrani ocjena je obrisana!");
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
    alert("Odabrani ocjena je obrisana!");
  }


  modifikuj() {

  }








  page = 1;
  pageSize = 10;
  totalCount: any;
  totalPages: any;
 // komentariPodaci: any[]=[];

  getKomentare() {
   // const url = `/api/Komentar/komentar?page=${this.page}&pageSize=${this.pageSize}`;
    this.httpKlijent.get<any>(MojConfig.adresa_servera+`/Komentar/GetKomentare/komentar?page=${this.page}&pageSize=${this.pageSize}`)
      .subscribe(data => {
      this.totalCount = data.totalCount;
      this.totalPages = data.totalPages;
      this.komentariPodaci = data.komentari;
    });
    //return this.komentariPodaci;
  }


 /* fetchKomentari() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Komentar/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.komentariPodaci = x;
    });
  }*/
  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  goToPage(page: number) {
    this.page = page;
    this.getKomentare();
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getKomentare();
    }
  }
  /*getBoje() {
    if (this.colors == null)
      return [];

    return this.colors;
  }*/
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.getKomentare();
    }
  }


  izvjestaj: IzvjestajKomentari[] = [];
  izvjestajKomentari: IzvjestajKomentari[] = [];
  isKiliknuto: any=false;
mjesec:any='';
  getPodatkeZaIzvjestaj(){
    this.httpKlijent.get<IzvjestajKomentari[]>(MojConfig.adresa_servera+"/Komentar/GetIzvjestajKomentari")
      .subscribe(data => {
        this.izvjestaj = data;
        //console.log("Izvjesta podaci: "+this.izvjestaj);
        //console.log(JSON.stringify(this.izvjestaj));
        /*setTimeout( ()=>{
          this.prikaziGrafikon();
        }, 5000);*/
        this.prikaziGrafikon();
      });

  }
  getPodatkeZaIzvjestajParametri(){
    this.httpKlijent.get<IzvjestajKomentari[]>
    (MojConfig.adresa_servera+"/Komentar/GetIzvjestajKomentariParametar?mjesec="+this.mjesec)
      .subscribe(data => {
        this.izvjestaj = data;
       // console.log("izvjestaj",this.izvjestaj);
      //  console.log("mjesec je : "+this.mjesec);
        this.prikaziGrafikon();
      });
  }
  getIzvjestajKomentari() {
    this.httpKlijent.get<IzvjestajKomentari[]>(MojConfig.adresa_servera+"/Komentar/GetIzvjestajKomentari")
      .subscribe(data => {
        this.izvjestaj = data;
        this.prikaziGrafikon();
      });
  }




  prikaziGrafikon() {
    Chart.register(CategoryScale, LinearScale, BarController, BarElement);

    const canvas = document.getElementById('myChart') as HTMLCanvasElement;

    if (!canvas) {
      console.error('Element canvas s identifikatorom "myChart" nije pronađen.');
      return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Kontekst za crtanje nije dostupan.');
      return;
    }





    if (this.chartInstance) {
      this.chartInstance.destroy();
    }







    if (!this.izvjestaj || this.izvjestaj.length === 0) {
      console.warn('Nema dostupnih podataka za prikaz grafikona.');
      porukaError("Nema dostupnih podataka za prikaz grafikona.");
      return;
    }
    /*
        const labels = this.izvjestaj.map(item => item.mjesec);
        labels.sort((a, b) => {
          const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          return months.indexOf(a) - months.indexOf(b);
        });

        console.log("labels: ", labels);

        const data = this.izvjestaj.map(item => item.ukupnoKomentara);
        console.log("data: "+data);
    */



    const sortedData = this.izvjestaj.sort((a, b) => {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const indexA = months.indexOf(a.mjesec);
      const indexB = months.indexOf(b.mjesec);

      return indexA - indexB;
    });

    const labels = sortedData.map(item => item.mjesec);
    const data = sortedData.map(item => item.ukupnoKomentara);




    this.chartInstance= new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Broj komentara',
            data: data,
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderColor: 'rgb(0,0,0)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }

      }


    });
  }












}
