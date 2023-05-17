import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";

@Component({
  selector: 'app-zaposlenik-pocetna',
  templateUrl: './zaposlenik-pocetna.component.html',
  styleUrls: ['./zaposlenik-pocetna.component.css']
})
export class ZaposlenikPocetnaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router:Router, private httpKlijent:HttpClient) { }

  zaposlenik_id:any;
  poruka:any="";
  brojNovihNarudzbi:any=0;

  totalLength:number=0;
  _page:any;

  totalLength2:number=0;
  _page2:any;

  totalLength3:number=0;
  _page3:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.zaposlenik_id=+s["id"];
    })
    this.getProizvodeDatum();
    this.getProizvodeKolicina();
    this.getProizvodeBezKolicine();
    this.getBrojNovihNarudzbi();
  }

  getBrojNovihNarudzbi(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/Narudzba/BrojNovihNarudzbi")
      .subscribe((x:any)=>{
        this.poruka=x?.poruka;
        this.brojNovihNarudzbi=x?.broj;
        console.log(x);
      })
  }

  getBoja(){
    if(this.brojNovihNarudzbi==0)
      return "rgba(237,163,205,0.45)";
    else
      return "#ffc61c";
  }

  proizvodi_datumi:any;
  proizvodi_kolicina:any;
  proizvodi_bezkolicine:any;
  kliknuoDetalji:boolean=false;

  getProizvodeKolicina(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Proizvod/proizvodiMinKolicina").subscribe((x:any)=>{
      this.proizvodi_kolicina=x;
      console.log(this.proizvodi_kolicina);
      this.totalLength2=this.proizvodi_kolicina?.length;
    })
  }

  getProizvodeDatum(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Proizvod/posljednjeDodaniProizvodi").subscribe((x:any)=>{
      this.proizvodi_datumi=x;
      console.log(this.proizvodi_datumi);
      this.totalLength=this.proizvodi_datumi?.length;
    })
  }

  getProizvodeBezKolicine(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Proizvod/proizvodi_bezkolicine").subscribe((x:any)=>{
      this.proizvodi_bezkolicine=x;
      console.log(this.proizvodi_bezkolicine);
      this.totalLength3=this.proizvodi_bezkolicine?.length;
    })
  }

  odabrani_proizvod:any;

  detalji(p:any){
    this.odabrani_proizvod=p;
    this.kliknuoDetalji=true;
  }

  stranicaProizvodi(){
    this.router.navigate(['/proizvodi',this.zaposlenik_id])
  }

  get_slika_base64_FS(s:any) {
    if(s!=null && s.slika_postojeca!=null)
      return "data:image/jpg;base64,"+ s?.slika_postojeca;
    return this.noimage;
    // return "data:image/jpg;base64,"+s.slika_postojeca;
  }

  noimage:any="data:@file/jpeg;base64,/9j/4AAQSkZJRgABAQAAZABkAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wgALCADIAN8BAREA/8QAGwABAAMBAQEBAAAAAAAAAAAAAAUGBwMBBAL/2gAIAQEAAAAA24AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAi/i8Ak/vAABXbEOf57eQFgAABXbE59M+idX8gLAAACu2Ks5bsEpxjZuAsAAAK7zyHn9mw55Wtd7WAAAFOy3ke+Ouv2QAAEPXgFpkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//EADoQAAEDAQMGCwgCAwEAAAAAAAECAwQFAAYREiEwMUDREBMWF1FUVmGRkrIHFCI1NkFzdCCBFTJScf/aAAgBAQABPwDazth2w7YdsO2HbDth2w6Ks1lNHRHxivSFyHOLQhrDEnDH725SzOzlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUszs5U/Knfaj1RFYpyJjbS2kqUpOQvWCDhoTory/MqB+8PSf4vPNR2i684httOtSzgBaNMjTG+MjPtvIGbFtQI4DqNrl/TqPzO+s6E6K8vzKgfvD0nhS+yp9bCXUF1ABUgHOAdWI4PaeZXFQcnK90+LKw1Zf2x/q3s4965Qr4rK934o8d0d3948B1G1y/p1H5nfWdCdFeX5lQP3h6TwXsvY1QY5YYKXJ6x8KdYQOk7rRK3Ph1b/JNyFGSVYrUo45fSD3Wu9eGLeCCHmiEPJzOtE50ndZ5hqS0Wn20ONq1pWMQbNswaVFWptpmKwgZSylISB3m1EvVTq7Jfjx1FLjZOSlebjE/9Cx1G1y/p1H5nfWdCdFeX5lQP3h6Ta9l7GaFHLDBS5PWPhT9kDpO60iQ9KkLffcU46s4qUo5yeCmVOVSZyJcRwocSdX2UOg91qJeeDWKYqXxiWVNJxfQo/wCnf/5a917nK48YsVSkQEHMNRcPSe7utHkPRJCH2HFNuoOKVJOcG11b1tV6NxLxS3ObT8SPssdI3WuX9OI/M76zoTovaBMdp8Wmy2cONaklScRmxyTaRIelyFvvuKcdWcVKUcST/ALUkKCVEBQwIB1jhjyHYj6H2HFNuoOKVJOBBtcRZXdSOtWdSnHCfMdCdFeG77F4YrTD7zjQbXlgoAz5sPvbmxp/X5Pgm3NjT+vyfBNubGn9fk+Cbc2NP6/J8E25saf1+T4JtzY0/r8nwTbmxp/X5Pgm3NjT+vyfBNqLSm6LTG4LTinEIJIUrXnOOhO2HbDth2w7YdsO2HbDtht//9k=";


  kliknuoGetSlika:boolean=false;



}
