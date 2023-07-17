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
/*
  getColors() {
    const url = `/api/Boja/boja?page=${this.page}&pageSize=${this.pageSize}`;
    this.httpKlijent.get<any>(MojConfig.adresa_servera+url).subscribe(data => {
      this.totalCount = data.totalCount;
      this.totalPages = data.totalPages;
      this.colors = data.colors;
    });
  }*/
  /*
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


*/









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


   // this.getColors();
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
  noimage:any="data:@file/jpeg;base64,/9j/4AAQSkZJRgABAQAAZABkAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wgALCADIAN8BAREA/8QAGwABAAMBAQEBAAAAAAAAAAAAAAUGBwMBBAL/2gAIAQEAAAAA24AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAi/i8Ak/vAABXbEOf57eQFgAABXbE59M+idX8gLAAACu2Ks5bsEpxjZuAsAAAK7zyHn9mw55Wtd7WAAAFOy3ke+Ouv2QAAEPXgFpkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//EADoQAAEDAQMGCwgCAwEAAAAAAAECAwQFAAYREiEwMUDREBMWF1FUVmGRkrIHFCI1NkFzdCCBFTJScf/aAAgBAQABPwDazth2w7YdsO2HbDth2w6Ks1lNHRHxivSFyHOLQhrDEnDH725SzOzlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUszs5U/Knfaj1RFYpyJjbS2kqUpOQvWCDhoTory/MqB+8PSf4vPNR2i684httOtSzgBaNMjTG+MjPtvIGbFtQI4DqNrl/TqPzO+s6E6K8vzKgfvD0nhS+yp9bCXUF1ABUgHOAdWI4PaeZXFQcnK90+LKw1Zf2x/q3s4965Qr4rK934o8d0d3948B1G1y/p1H5nfWdCdFeX5lQP3h6TwXsvY1QY5YYKXJ6x8KdYQOk7rRK3Ph1b/JNyFGSVYrUo45fSD3Wu9eGLeCCHmiEPJzOtE50ndZ5hqS0Wn20ONq1pWMQbNswaVFWptpmKwgZSylISB3m1EvVTq7Jfjx1FLjZOSlebjE/9Cx1G1y/p1H5nfWdCdFeX5lQP3h6Ta9l7GaFHLDBS5PWPhT9kDpO60iQ9KkLffcU46s4qUo5yeCmVOVSZyJcRwocSdX2UOg91qJeeDWKYqXxiWVNJxfQo/wCnf/5a917nK48YsVSkQEHMNRcPSe7utHkPRJCH2HFNuoOKVJOcG11b1tV6NxLxS3ObT8SPssdI3WuX9OI/M76zoTovaBMdp8Wmy2cONaklScRmxyTaRIelyFvvuKcdWcVKUcST/ALUkKCVEBQwIB1jhjyHYj6H2HFNuoOKVJOBBtcRZXdSOtWdSnHCfMdCdFeG77F4YrTD7zjQbXlgoAz5sPvbmxp/X5Pgm3NjT+vyfBNubGn9fk+Cbc2NP6/J8E25saf1+T4JtzY0/r8nwTbmxp/X5Pgm3NjT+vyfBNqLSm6LTG4LTinEIJIUrXnOOhO2HbDth2w7YdsO2HbDtht//9k=";

  get_slika_base64_FS(s:any) {
    if(s!=null && s.slika_postojeca!=null)
      return "data:image/jpg;base64,"+ s?.slika_postojeca;
    return this.noimage;
    // return "data:image/jpg;base64,"+s.slika_postojeca;
  }
}
