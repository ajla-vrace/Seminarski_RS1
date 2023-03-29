import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-profil-zaposlenik',
  templateUrl: './profil-zaposlenik.component.html',
  styleUrls: ['./profil-zaposlenik.component.css']
})
export class ProfilZaposlenikComponent implements OnInit {

  constructor(private route: ActivatedRoute, private httpKlijent:HttpClient,
              private router:Router) { }

  zaposlenik_id:any;
  podaci_zaposlenika:any;
  slika_zaposlenika:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.zaposlenik_id=+s["id"];
      this.getZaposlenika();
      this.getSlikuZaposlenika();
    })

    //this.getSlikuZaposlenika();
  }

  getZaposlenika(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Zaposlenik/id?id="+this.zaposlenik_id)
      .subscribe((x:any)=>{
        this.podaci_zaposlenika=x;
        this.podaci_zaposlenika.datumRodjenja=formatDate(this.podaci_zaposlenika.datumRodjenja,'dd/MM/yyyy','en-US');
        this.podaci_zaposlenika.datumRegistracije=formatDate(this.podaci_zaposlenika.datumRegistracije,'dd/MM/yyyy','en-US')
        this.podaci_zaposlenika.datumZaposlenja=formatDate(this.podaci_zaposlenika.datumZaposlenja,'dd/MM/yyyy','en-US')


        this.slika_zaposlenika_postojeca_fs=x.slika_zaposlenika_postojeca_FS;
        this.slika_zaposlenika_postojeca_db=x.slika_zaposlenika_postojeca_DB;

      //  console.log(this.slika_zaposlenika_postojeca_fs,"\n",this.slika_zaposlenika_postojeca_db);

        console.log("PODACI: ",this.podaci_zaposlenika);
      })
  }

  slika_zaposlenika_postojeca_fs:any;
  slika_zaposlenika_postojeca_db:any;


  getSlikuZaposlenika(){
    //  /api/Zaposlenik/slikaKorisnika?id=5
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Zaposlenik/slikaKorisnika?id="+this.zaposlenik_id)
      .subscribe((x:any)=>{
        if(x!=null) {
          this.slika_zaposlenika = x;
          console.log(this.slika_zaposlenika);

        }
      })
  }


  kliknuoDodajSliku:boolean=false;
  slika_obj:any;

  dodajSliku() {
    this.kliknuoDodajSliku=true;

    this.slika_obj={
      idZaposl:this.zaposlenik_id,
      slika_nova:"",
      slika_zaposlenika_postojeca_DB:""
    }
  }

  slika:any;

  snimi_sliku() {
    this.kliknuoDodajSliku=false;

    this.httpKlijent.post(MojConfig.adresa_servera+"/api/Zaposlenik/promijeni_sliku", this.slika_obj)
      .subscribe(x=>{
        console.log(this.slika_obj);
        console.log(this.podaci_zaposlenika);
        this.slika=this.slika_obj.slika_nova;

        this.getZaposlenika();
        console.log(this.podaci_zaposlenika);
        this.get_slika_novi_request_FS();
        this.get_slika_base64_FS(this.podaci_zaposlenika);
       // this.reloadPage();
       // this.slika_obj=null;

      });
  }


  ukloniSliku(){
    if("data:@file/jpeg;base64,"+this.slika_zaposlenika_postojeca_fs!=this.noimage ){
      if (confirm("Da li stvarno želite ukloniti sliku?")) {
        this.slika_obj = {
          idZaposl: this.zaposlenik_id,
          slika_nova: this.noimage,
          slika_zaposlenika_postojeca_DB: ""
        }
        this.httpKlijent.post(MojConfig.adresa_servera + "/api/Zaposlenik/promijeni_sliku", this.slika_obj)
          .subscribe((x: any) => {
            this.slika=this.noimage;
            this.getZaposlenika();
          })
      }
    }
  }

/*
  get_slika_novi_request_FS() {
    var data=`${MojConfig.adresa_servera}/api/Zaposlenik/id_fs?id=${this.zaposlenik_id}"`;
    console.log(data);
    return data;
  }*/

  get_slika_FS(p: any) {
   // return "data:image/jpg;base64,"+p.fileContents;
    return p.fileContents;

    console.log("FILE CONTENTS: ",p.fileContents);
  }

  get_slika_FS_2(){
    return this.slika_zaposlenika?.fileContents;
  }


   get_slika_base64_FS(s:any) {
    if(s!=null && s.slika_zaposlenika_postojeca_FS!=null)
      return "data:image/jpg;base64,"+ s?.slika_zaposlenika_postojeca_FS;
    return this.noimage;
   // return "data:image/jpg;base64,"+this.slika_zaposlenika_postojeca_fs;
  }

  get_slika_novi_request_FS() {
    return `${MojConfig.adresa_servera}/api/Zaposlenik/id_fs?id=`+this.zaposlenik_id;
  }



  get_slika_novi_request_DB(s: any) {
    return `${MojConfig.adresa_servera}/api/Zaposlenik/id_db?id=`+s.id;
  }

  get_slika_base64_DB() {
    return "data:image/jpg;base64,"+ this?.slika_zaposlenika_postojeca_db;
  }


  generisi_preview() {
    // @ts-ignore
    var file = document.getElementById("slika-input").files[0];
    if (file) {
      var reader = new FileReader();
      let this2 = this;
      reader.onload = function () {
        this2.slika_obj.slika_nova = reader.result?.toString();
      }
      console.log("file: ", file);
      reader.readAsDataURL(file);
    }
  }

  odjaviSe() {
    // @ts-ignore
    AutentifikacijaHelper.setLoginInfo(null);

    this.httpKlijent.post(MojConfig.adresa_servera + "/api/Autentifikacija", null, MojConfig.http_opcije())
      .subscribe((x: any) => {
        this.router.navigateByUrl("/pocetna");
        alert("Uspješno ste se odjavili.");
      });
  }


  reloadPage() {
    location.reload();
  }

  noimage:any="data:@file/jpeg;base64,/9j/4AAQSkZJRgABAQAAZABkAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wgALCADIAN8BAREA/8QAGwABAAMBAQEBAAAAAAAAAAAAAAUGBwMBBAL/2gAIAQEAAAAA24AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAi/i8Ak/vAABXbEOf57eQFgAABXbE59M+idX8gLAAACu2Ks5bsEpxjZuAsAAAK7zyHn9mw55Wtd7WAAAFOy3ke+Ouv2QAAEPXgFpkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//EADoQAAEDAQMGCwgCAwEAAAAAAAECAwQFAAYREiEwMUDREBMWF1FUVmGRkrIHFCI1NkFzdCCBFTJScf/aAAgBAQABPwDazth2w7YdsO2HbDth2w6Ks1lNHRHxivSFyHOLQhrDEnDH725SzOzlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUszs5U/Knfaj1RFYpyJjbS2kqUpOQvWCDhoTory/MqB+8PSf4vPNR2i684httOtSzgBaNMjTG+MjPtvIGbFtQI4DqNrl/TqPzO+s6E6K8vzKgfvD0nhS+yp9bCXUF1ABUgHOAdWI4PaeZXFQcnK90+LKw1Zf2x/q3s4965Qr4rK934o8d0d3948B1G1y/p1H5nfWdCdFeX5lQP3h6TwXsvY1QY5YYKXJ6x8KdYQOk7rRK3Ph1b/JNyFGSVYrUo45fSD3Wu9eGLeCCHmiEPJzOtE50ndZ5hqS0Wn20ONq1pWMQbNswaVFWptpmKwgZSylISB3m1EvVTq7Jfjx1FLjZOSlebjE/9Cx1G1y/p1H5nfWdCdFeX5lQP3h6Ta9l7GaFHLDBS5PWPhT9kDpO60iQ9KkLffcU46s4qUo5yeCmVOVSZyJcRwocSdX2UOg91qJeeDWKYqXxiWVNJxfQo/wCnf/5a917nK48YsVSkQEHMNRcPSe7utHkPRJCH2HFNuoOKVJOcG11b1tV6NxLxS3ObT8SPssdI3WuX9OI/M76zoTovaBMdp8Wmy2cONaklScRmxyTaRIelyFvvuKcdWcVKUcST/ALUkKCVEBQwIB1jhjyHYj6H2HFNuoOKVJOBBtcRZXdSOtWdSnHCfMdCdFeG77F4YrTD7zjQbXlgoAz5sPvbmxp/X5Pgm3NjT+vyfBNubGn9fk+Cbc2NP6/J8E25saf1+T4JtzY0/r8nwTbmxp/X5Pgm3NjT+vyfBNqLSm6LTG4LTinEIJIUrXnOOhO2HbDth2w7YdsO2HbDtht//9k=";

}
