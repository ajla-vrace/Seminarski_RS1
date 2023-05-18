import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MojConfig} from "../moj-config";
import {HttpClient} from "@angular/common/http";
import {LoginInformacije} from "../helpers/login-informacije";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";

@Component({
  selector: 'app-favoriti',
  templateUrl: './favoriti.component.html',
  styleUrls: ['./favoriti.component.css']
})
export class FavoritiComponent implements OnInit {

  kupac_id:any;
   favoritiPodaci: any;
  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }
  constructor(private httpKlijent: HttpClient,private router: Router, private route:ActivatedRoute) {
  }









  page = 1;
  pageSize = 2;
  totalCount: any;
  totalPages: any;
  colors: any[]=[];

  getColors() {
    const url = `/api/Boja/boja?page=${this.page}&pageSize=${this.pageSize}`;
    this.httpKlijent.get<any>(MojConfig.adresa_servera+url).subscribe(data => {
      this.totalCount = data.totalCount;
      this.totalPages = data.totalPages;
      this.colors = data.colors;
    });
  }
  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  goToPage(page: number) {
    this.page = page;
    this.getColors();
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getColors();
    }
  }
  getBoje() {
    if (this.colors == null)
      return [];

    return this.colors;
  }
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.getColors();
    }
  }












  fetchFavoriti() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Favorit/GetById/"+this.loginInfo().autentifikacijaToken.korisnickiNalogId, MojConfig.http_opcije()).subscribe(x=>{
      this.favoritiPodaci = x;
    });
  }
  ngOnInit(): void {

    this.route.params.subscribe(s=>{
      this.kupac_id=+s["id"];
    })
    this.fetchFavoriti();


    this.getColors();
  }

  getFavoriti() {
    if (this.favoritiPodaci == null)
      return [];
    return this.favoritiPodaci;
  }

  UkloniFavorit(s:any) {
    /*this.httpKlijent.post(MojConfig.adresa_servera+ "/Favorit/Delete/" + s.id,null, MojConfig.http_opcije())
      .subscribe((povratnaVrijednost:any) =>{
        const index = this.favoritiPodaci.indexOf(s);
        if (index > -1) {
          this.favoritiPodaci.splice(index, 1);
        }
      });*/
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Favorit/Delete/" + s.id,null, MojConfig.http_opcije())
      .subscribe((povratnaVrijednost:any) =>{
       this.fetchFavoriti();

      });
   /* this.httpKlijent.post(MojConfig.adresa_servera+ "/Favorit/GetById/"+this.loginInfo().autentifikacijaToken.korisnickiNalogId,MojConfig.http_opcije()).subscribe(x=>{
      this.favoritiPodaci = x;
    });*/
    //alert("Odabrani favorit je obrisan!");
  }

  vratiNaPocetnu() {
    this.router.navigate(['zene']);
  }
}
