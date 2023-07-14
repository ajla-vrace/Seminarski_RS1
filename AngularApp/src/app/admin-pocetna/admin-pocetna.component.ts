import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";

@Component({
  selector: 'app-admin-pocetna',
  templateUrl: './admin-pocetna.component.html',
  styleUrls: ['./admin-pocetna.component.css']
})
export class AdminPocetnaComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router,
              private httpKlijent:HttpClient, private afDB:AngularFireDatabase) { }

  admin_id:any;
  adminIme:any=AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.ime;
  brPreuzimanja: any;
  naslovKataloga: any="Neki naslov kataloga";
  brPosjeta: any;
  brNar: any;
  brojPretpl: any;
  brojReg: any;
  brNarMjesecno: any;
  statistika:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.admin_id=+s["id"];
    })
    this.getBestsellers();
    this.getProdavnice();
    this.getStatistika();
    this.getBrojPosjeta();
    this.getKod();
  }


  brojPosjetaUpdate:any;
  brojPregleda:any;
  brojPosjetaRef?:any;

  getBrojPosjeta(){
    this.brojPosjetaRef=this.afDB.object('Varijable').valueChanges().subscribe
    ((x:any)=>{
      this.brojPosjetaUpdate=x;
      console.log("brojposjeta:",this.brojPosjetaUpdate);
      this.brojPregleda=this.brojPosjetaUpdate.brojPregleda;
      console.log(this.brojPregleda);
    });
  }



  getStatistika(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Admin/statistika")
      .subscribe((x:any)=>{
        this.statistika=x;
        this.brojReg=this.statistika?.brReg;
        this.brojPretpl=this.statistika?.brPretpl;
        this.brNar=this.statistika?.brNarDnevno;
        this.brNarMjesecno=this.statistika?.brNarMjesecno;
        console.log(this.statistika);
      })
  }

  bestsellers:any;

  getBestsellers(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Admin/bestsellers")
      .subscribe((x:any)=>{
        this.bestsellers=x;
        console.log(this.bestsellers);

      })
  }

  prodavnice:any;
  getProdavnice(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Admin/best_prodavnice")
      .subscribe((x:any)=>{
        this.prodavnice=x;
        console.log(this.prodavnice);

      })
  }

  slike_by_proizvodId:any; //moram imati 3 razlicita objekta

  getSlikeByProizvodId(p:number){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/ProizvodSlika/slikaByProizvodId?id="
      +p).subscribe((x:any)=>{
        if(x.length>0)
         this.slike_by_proizvodId=x[0];
      console.log(this.slike_by_proizvodId);
    })
  }


  get_slika_FS(p: any) {
    return "data:image/jpg;base64,"+p.fileContents;
  }


  get_slika_base64_FS(s:any) {
    if(s!=null && s.slika_postojeca!=null)
      return "data:image/jpg;base64,"+ s?.slika_postojeca;
    return this.noimage;
    // return "data:image/jpg;base64,"+s.slika_postojeca;
  }

  noimage:any="data:@file/jpeg;base64,/9j/4AAQSkZJRgABAQAAZABkAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wgALCADIAN8BAREA/8QAGwABAAMBAQEBAAAAAAAAAAAAAAUGBwMBBAL/2gAIAQEAAAAA24AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAi/i8Ak/vAABXbEOf57eQFgAABXbE59M+idX8gLAAACu2Ks5bsEpxjZuAsAAAK7zyHn9mw55Wtd7WAAAFOy3ke+Ouv2QAAEPXgFpkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//EADoQAAEDAQMGCwgCAwEAAAAAAAECAwQFAAYREiEwMUDREBMWF1FUVmGRkrIHFCI1NkFzdCCBFTJScf/aAAgBAQABPwDazth2w7YdsO2HbDth2w6Ks1lNHRHxivSFyHOLQhrDEnDH725SzOzlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUszs5U/Knfaj1RFYpyJjbS2kqUpOQvWCDhoTory/MqB+8PSf4vPNR2i684httOtSzgBaNMjTG+MjPtvIGbFtQI4DqNrl/TqPzO+s6E6K8vzKgfvD0nhS+yp9bCXUF1ABUgHOAdWI4PaeZXFQcnK90+LKw1Zf2x/q3s4965Qr4rK934o8d0d3948B1G1y/p1H5nfWdCdFeX5lQP3h6TwXsvY1QY5YYKXJ6x8KdYQOk7rRK3Ph1b/JNyFGSVYrUo45fSD3Wu9eGLeCCHmiEPJzOtE50ndZ5hqS0Wn20ONq1pWMQbNswaVFWptpmKwgZSylISB3m1EvVTq7Jfjx1FLjZOSlebjE/9Cx1G1y/p1H5nfWdCdFeX5lQP3h6Ta9l7GaFHLDBS5PWPhT9kDpO60iQ9KkLffcU46s4qUo5yeCmVOVSZyJcRwocSdX2UOg91qJeeDWKYqXxiWVNJxfQo/wCnf/5a917nK48YsVSkQEHMNRcPSe7utHkPRJCH2HFNuoOKVJOcG11b1tV6NxLxS3ObT8SPssdI3WuX9OI/M76zoTovaBMdp8Wmy2cONaklScRmxyTaRIelyFvvuKcdWcVKUcST/ALUkKCVEBQwIB1jhjyHYj6H2HFNuoOKVJOBBtcRZXdSOtWdSnHCfMdCdFeG77F4YrTD7zjQbXlgoAz5sPvbmxp/X5Pgm3NjT+vyfBNubGn9fk+Cbc2NP6/J8E25saf1+T4JtzY0/r8nwTbmxp/X5Pgm3NjT+vyfBNqLSm6LTG4LTinEIJIUrXnOOhO2HbDth2w7YdsO2HbDtht//9k=";


  kliknuoDetalji:boolean=false;
  odabrani_proizvod:any;
  kliknuoGetSlika:boolean=false;


  detaljiBestsellera(p:any){
    this.odabrani_proizvod=p;
    this.kliknuoDetalji=true;
  }

  zaokruziNaDvijeDecimale(broj:any){
    return broj.toFixed(2);
  }


  objOtkljucan:any;
  getKod(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Autentifikacija/kod",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.objOtkljucan=x;
        console.log("admin pocetna:",this.objOtkljucan);
      })
  }


}
