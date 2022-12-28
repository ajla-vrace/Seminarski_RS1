import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";

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
    })

    //this.getSlikuZaposlenika();
  }

  getZaposlenika(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Zaposlenik/id?id="+this.zaposlenik_id)
      .subscribe((x:any)=>{
        this.podaci_zaposlenika=x;
        console.log(this.podaci_zaposlenika);
      })
  }
/*
  getSlikuZaposlenika(){
    //  /api/Zaposlenik/slikaKorisnika?id=5
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Zaposlenik/slikaKorisnika?id="+this.zaposlenik_id)
      .subscribe((x:any)=>{
        this.slika_zaposlenika=x;
        console.log(this.slika_zaposlenika);
      })
  }*/


  kliknuoDodajSliku:boolean=false;
  slika_obj:any;

  dodajSliku() {
    this.kliknuoDodajSliku=true;

    this.slika_obj={
      idZaposl:this.zaposlenik_id,
      slika_nova:""
    }
  }

  slika:any;

  snimi_sliku() {
    this.kliknuoDodajSliku=false;

    this.httpKlijent.post(MojConfig.adresa_servera+"/api/Zaposlenik/promijeni_sliku", this.slika_obj)
      .subscribe(x=>{
        console.log(this.slika_obj);
        this.slika=this.slika_obj.slika_nova;
        this.slika_obj=null;

      });
  }



  get_slika_novi_request_FS() {
    var data=`${MojConfig.adresa_servera}/api/Zaposlenik/id_fs?id=${this.zaposlenik_id}"`;
    console.log(data);
    return data;
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
}
