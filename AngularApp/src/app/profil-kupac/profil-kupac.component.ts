import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MojConfig} from "../moj-config";
import {HttpClient} from "@angular/common/http";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";
import {LoginInformacije} from "../helpers/login-informacije";
import {NgModel} from "@angular/forms";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-profil-kupac',
  templateUrl: './profil-kupac.component.html',
  styleUrls: ['./profil-kupac.component.css']
})
export class ProfilKupacComponent implements OnInit {
komm:any=false;
  kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
kupac_podaci:any;
   komentariPodaci1: any;
  odabranikomentar: any=null;
   komentariPodaciMoji: any;
   ocjeneProdavnica: any;
   ocjene: any=false;
   ocjeneProdavnicaMoje: any;
  ocjeneProizvoda: any;
   ocjeneProizvodaMoje: any;
  ocjeneProizvodaBool:any=false;
   prikaziDiv: any=false;
  kupac: any;
   brojTel: any;
  promjena: any=false;
  promjeniIme: any=false;
  promjeniBroj: any=false;
  promjeniPrezime: any=false;
   kupciPodaci: any;
  promjeniLozinku: any;
  novaLozinka: any;
  novaLozinkaPonovo:any;
  sadasnjaLozinka: any;
   ime: any="";
   prezime: any="";
   lozinka: any="";
  brojTelefona:any="";
  email:any="";
  username:any="";
  pretplata:any="";
   prikaziNarudzbe: any=false;
   narudzbeKupcaPodaci: any;
   jeLiPodaci:any=true;
   jeLiNarudzbe:any=false;
   prikazPodataka: any=false;
  prikazKomentara: any=false;
  PrikazOcjena: any=false;





  slika_objekat:any;
   kupciPodaci1: any;



  constructor(private route: ActivatedRoute, private httpKlijent:HttpClient) { }
  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }
  getKupca1(){
    /*this.httpKlijent.get(MojConfig.adresa_servera+"/Kupac/GetById?id="+this.kupac_id)
      .subscribe((x:any)=>{
        this.kupac_podaci=x;
        console.log("getkupaca1: "+this.kupac_podaci[0].ime);


      })*/
  }
  ngOnInit(): void {
    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;

   /* this.route.params.subscribe(s=>{
      this.kupac_id=+s["id"];
    })*/
    this.fetchKupci();
    this.getKupca1();
this.fetchKupci1();
    this.getKupca();

   // this.fetchKomentari();
    this.fetchKomentariMoji();
    this.fetchOcjeneProdavnice();
    this.fetchOcjeneProdavniceMoje();
    this.fetchOcjeneProizvoda();
    this.fetchOcjeneProizvodaMoje();
this.fetchNarudzbeKupca();
this.getSlikuKupca();
  }



  fetchKupci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/Kupac/GetAll")
      .subscribe((x:any)=>{
        this.kupciPodaci=x;
      })
  }
  fetchKupci1(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/Kupac/GetAll1")
      .subscribe((x:any)=>{
        this.kupciPodaci1=x;
      })
  }
  fetchKomentari() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Komentar/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.komentariPodaci1 = x;
    });
  }

  fetchKomentariMoji() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Komentar/GetById/"+this.kupac_id, MojConfig.http_opcije()).subscribe(x=>{
      this.komentariPodaci1 = x;
    });
  }

  fetchOcjeneProdavnice() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Ocjena/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.ocjeneProdavnica = x;
    });
  }
  fetchOcjeneProizvoda() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Zvjezdica/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.ocjeneProizvoda = x;
    });
  }
  fetchNarudzbeKupca()
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Narudzba/GetByIdKupca?kupacId="+this.loginInfo().autentifikacijaToken.korisnickiNalogId, MojConfig.http_opcije()).subscribe(x=>{
      this.narudzbeKupcaPodaci = x;
    });

  }





  fetchOcjeneProdavniceMoje() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Ocjena/GetById/"+this.kupac_id, MojConfig.http_opcije()).subscribe(x=>{
      this.ocjeneProdavnicaMoje = x;
    });
  }
  fetchOcjeneProizvodaMoje() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Zvjezdica/GetById/"+this.kupac_id, MojConfig.http_opcije()).subscribe(x=>{
      this.ocjeneProizvodaMoje = x;
    });
  }


  prikaziMojeKomentare() {
    if (this.komentariPodaci1 == null)
      return [];
    return this.komentariPodaci1.filter((a:any)=>a.kupacId==this.kupac_id);
  }

  prikazKomm() {
    this.prikazKomentara = true;
    this.prikazPodataka=false;
    this.prikaziNarudzbe=false;
    this.PrikazOcjena=false;
    this.ocjeneProizvodaBool=false;
  }

  prikaziMojeOcjeneProdavnica() {
    if (this.ocjeneProdavnica == null)
      return [];
    return this.ocjeneProdavnica.filter((a:any)=>a.kupacId==this.kupac_id);
  }

  prikaziMojeOcjeneProizvoda() {
    if (this.ocjeneProizvoda == null)
      return [];
    return this.ocjeneProizvoda.filter((a:any)=>a.kupacId==this.kupac_id);
  }

  prikazOcjene() {
    this.PrikazOcjena = true;
    this.prikazKomentara = false;
    this.prikazPodataka=false;
    this.prikaziNarudzbe=false;
    this.ocjeneProizvodaBool=false;
  }

  brisikomm(s: any) {
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Komentar/Delete/" + s.id,null, MojConfig.http_opcije())
      .subscribe((povratnaVrijednost:any) =>{
        const index = this.komentariPodaci1.indexOf(s);
        if (index > -1) {
          this.komentariPodaci1.splice(index, 1);
        }

      });


   /* this.httpKlijent.post(MojConfig.adresa_servera+ "/Komentar/GetById?id="+s.id,MojConfig.http_opcije()).subscribe(x=>{
      this.komentariPodaci1= x;
    });*/
    alert("Odabrani komentar je obrisan!");
  }

  modifikuj(s: any) {
this.odabranikomentar=s;
  }

  modifikuj1(odabranikomentar: any) {
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Komentar/Update/" + this.odabranikomentar.id, this.odabranikomentar)
      .subscribe((a:any) =>{
      });

this.odabranikomentar=null;
}


  brisiOcjenu(s: any) {
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Ocjena/Delete/" + s.id,null, MojConfig.http_opcije())
      .subscribe((povratnaVrijednost:any) =>{
        const index = this.ocjeneProdavnica.indexOf(s);
        if (index > -1) {
          this.ocjeneProdavnica.splice(index, 1);
        }

      });


   /* this.httpKlijent.post(MojConfig.adresa_servera+ "/Ocjena/GetById/"+s.id,MojConfig.http_opcije()).subscribe(x=>{
      this.ocjeneProdavnica= x;
    });
    */
    alert("Odabrani ocjena je obrisana!");
  }

  prikazOcjeneProizvoda() {
    this.ocjeneProizvodaBool=true;
    this.prikazPodataka=false;
    this.prikaziNarudzbe=false;
    this.prikazKomentara=false;
    this.PrikazOcjena=false;
  }



  brisiOcjenuProizvoda(o: any) {
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Zvjezdica/Delete/"+ o.id,null, MojConfig.http_opcije())
      .subscribe((povratnaVrijednost2:any) =>{
        const index = this.ocjeneProizvoda.indexOf(o);
        if (index > -1) {
          this.ocjeneProizvoda.splice(index, 1);
        }

      });

   /* this.httpKlijent.post(MojConfig.adresa_servera+ "/Zvjezdica/GetById/"+this.kupac_id,MojConfig.http_opcije()).subscribe(x=>{
      this.ocjeneProizvodaMoje= x;
    });*/
   // this.fetchOcjeneProizvodaMoje();
    alert("Odabrani ocjena je obrisana!");
  }

  prikazDiva() {
    this.prikaziDiv=true;
  }

  skloniDiv() {
    this.prikaziDiv=false;
  }

  editBrojTelefona() {
this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    this.httpKlijent.put(MojConfig.adresa_servera+ "/Kupac/EditTelefon/"+this.kupac_id+"?brojTelefona="+this.kupac.brojTelefona,null, MojConfig.http_opcije())
      .subscribe((a:any) =>{
       this.getKupca();
       this.kupac=null;
       this.promjeniBroj=false;
      });
}


  editImeKupca() {
    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    this.httpKlijent.put(MojConfig.adresa_servera+ "/Kupac/EditIme/"+this.kupac_id+"?ime="+this.kupac.ime,null, MojConfig.http_opcije())
      .subscribe((a:any) =>{
        this.getKupca();
        this.kupac=null;
        this.promjeniIme=false;
      });


  }

  brojTelPromjena() {
    this.getKupca();

    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    for(let x of this.kupciPodaci){
      if(x.id==this.kupac_id){
        this.kupac=x;
      }
    }
      this.promjeniBroj=true;


  }
vratiNaFalse(){
    this.kupac=null;
    this.promjeniIme=false;
    this.promjeniBroj=false;
    this.promjeniPrezime=false;
    this.promjeniLozinku=false;
}

  promjenaPrezimena() {
    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    for(let x of this.kupciPodaci){
      if(x.id==this.kupac_id){
        this.kupac=x;
      }
    }
    this.promjeniPrezime=true;
  }
  promjenaLozinke() {
    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    for(let x of this.kupciPodaci){
      if(x.id==this.kupac_id){
        this.kupac=x;
      }
    }
    this.promjeniLozinku=true;
  }
  promjenaImena() {
    /*this.kupac=this.loginInfo().autentifikacijaToken.korisnickiNalog;*/
    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    for(let x of this.kupciPodaci){
      if(x.id==this.kupac_id){
        this.kupac=x;
      }
    }
    this.promjeniIme=true;
    console.log("ime: "+this.kupac.ime);
  }

  editPrezimeKupca() {
    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    this.httpKlijent.put(MojConfig.adresa_servera+ "/Kupac/EditPrezime/"+this.kupac_id+"?prezime="+this.kupac.prezime,null, MojConfig.http_opcije())
      .subscribe((a:any) =>{
        this.getKupca();
        this.kupac=null;
        this.promjeniPrezime=false;
      });
  }
  jeLiOmoguceno(sadasnja:NgModel, nova:NgModel,ponovljena :NgModel){
   /* this.getKupca();*/

      if(this.kupac_podaci.lozinka!=undefined)
      {
       /* console.log(this.kupac_podaci.lozinka);*/
        if(this.sadasnjaLozinka==this.kupac_podaci.lozinka && this.novaLozinka===this.novaLozinkaPonovo
          && this.sadasnjaLozinka!=="" && this.novaLozinka!==""
          && sadasnja.valid && nova.valid && ponovljena.valid){
          return true;
        }
        else{
          return false; }
      }
      else {
       return false;
      }


}




  editLozinkeKupca() {
    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
   /* console.log("novalozinka: "+this.novaLozinka);*/


      this.httpKlijent.put(MojConfig.adresa_servera+ "/Kupac/EditLozinka/"+this.kupac_id+"?lozinka="+this.novaLozinka,null, MojConfig.http_opcije())
        .subscribe((a:any) =>{
          this.getKupca();
          this.kupac=null;
          this.promjeniLozinku=false;
          this.novaLozinka="";
          this.novaLozinkaPonovo="";
          this.sadasnjaLozinka="";
        });
  }


  prikazNarudzbi() {
    this.prikazPodataka=false;
    this.prikaziNarudzbe=true;
this.prikazKomentara=false;
    this.PrikazOcjena=false;
    this.ocjeneProizvodaBool=false;

  }

  prikaziPodatke() {
    this.prikazPodataka=true;
    this.prikaziNarudzbe=false;
    this.prikazKomentara=false;
    this.PrikazOcjena=false;
    this.ocjeneProizvodaBool=false;
  }

 /* dodajSliku() {
    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    for(let x of this.kupciPodaci){
      if(x.id==this.kupac_id){
        this.kupac=x;
      }
    }
  }*/
snimiSliku(){
  this.httpKlijent.post(`${MojConfig.adresa_servera}/Kupac/Add`, this.kupac, MojConfig.http_opcije()).subscribe(x => {
    this.fetchKupci();
    console.log(this.kupac);
    console.log(this.kupac.slikaKupca);

  });
}
  /*ukloniSliku() {
   /* if("data:@file/jpeg;base64,"+this.slika_zaposlenika_postojeca_fs!=this.noimage ){
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
  }*/
datumRegistracije:any="";
isPretplacen:any="";
  getKupca(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/Kupac/GetById?id="+this.kupac_id)
      .subscribe((x:any)=>{
        this.kupac_podaci=x;
        this.ime=this.kupac_podaci[0].ime;
        console.log("ime je : "+this.ime);
        this.prezime=this.kupac_podaci[0].prezime;
        this.username=this.kupac_podaci[0].username;
        this.lozinka=this.kupac_podaci[0].lozinka;
        this.email=this.kupac_podaci[0].email;
        this.username=this.kupac_podaci[0].username;
        this.brojTelefona=this.kupac_podaci[0].brojTelefona;
        this.datumRegistracije=formatDate(this.kupac_podaci[0].datumRegistracije,'dd-MM-yyyy','en-US');
        this.isPretplacen=this.kupac_podaci[0].isPretplacen;
        console.log("get kupca po id: ",this.kupac_podaci);
        this.slika_kupca_postojeca_fs=x.slika_kupca_postojeca_FS;
        this.slika_kupca_postojeca_db=x.slika_kupca_postojeca_DB;

      })


      console.log(" fs malo: "+this.slika_kupca_postojeca_fs,"\n","db malo: "+this.slika_kupca_postojeca_db);

    console.log("PODACI: ",this.kupac_podaci);
  }

  slika_kupca_postojeca_fs:any;
  slika_kupca_postojeca_db:any;

slika_kupca:any;
  getSlikuKupca(){
    //  /api/Zaposlenik/slikaKorisnika?id=5
    this.httpKlijent.get(MojConfig.adresa_servera+"/Kupac/Slika/slikaKorisnika?id="+this.kupac_id)
      .subscribe((x:any)=>{
        if(x!=null) {
          this.slika_kupca = x;
          console.log(this.slika_kupca);

        }
      })
  }


  kliknuoDodajSliku:boolean=false;
  slika_obj:any;

  dodajSliku() {
    this.kliknuoDodajSliku=true;
console.log("u dodajSliku funkciji idkupca je: "+this.kupac_id);
    this.slika_obj={
      idKupac:this.kupac_id,
      slika_nova:"",
      slika_kupca_postojeca_DB:""
    }
  }

  slika:any;

  snimi_sliku() {
    this.kliknuoDodajSliku=false;
console.log("slika obj idkupac: "+this.slika_obj.idKupac+ " slika nova: "+this.slika_obj.slika_nova+
  " slika nova db: "+this.slika_obj.slika_kupca_postojeca_DB);
    this.httpKlijent.post(MojConfig.adresa_servera+"/Kupac/PromijeniSlikuKupca/promijeni_sliku", this.slika_obj)
      .subscribe(x=>{
        console.log("slika db je: **********"+this.slika_obj.slika_kupca_postojeca_DB);
        console.log(this.kupac_podaci);
        this.slika=this.slika_obj.slika_nova;
this.getKupca1();
        this.getKupca();
        console.log("promjena slike kupca: "+this.kupac_podaci);
        this.get_slika_novi_request_DB(this.kupac_podaci);
        this.get_slika_base64_DB();
        this.get_slika_novi_request_FS();
        this.get_slika_base64_FS(this.kupac_podaci);
        // this.reloadPage();
        // this.slika_obj=null;

      });
    setTimeout( ()=>{
  console.log("slika timer: "+this.slika_obj.slika_kupca_postojeca_DB);
    }, 500);
  }


  ukloniSliku(){
    if("data:@file/jpeg;base64,"+this.slika_kupca_postojeca_fs!=this.noimage ){
      if (confirm("Da li stvarno želite ukloniti sliku?")) {
        this.slika_obj = {
          idKupac: this.kupac_id,
          slika_nova: this.noimage,
          slika_kupca_postojeca_DB: ""
        }
        this.httpKlijent.post(MojConfig.adresa_servera + "/Kupac/PromijeniSlikuKupca/promijeni_sliku", this.slika_obj)
          .subscribe((x: any) => {
            this.slika=this.noimage;
            this.getKupca();
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
    return this.slika_kupca?.fileContents;
  }


  get_slika_base64_FS(s:any) {
    if(s!=null && s.slika_kupca_postojeca_FS!=null)
      return "data:image/jpg;base64,"+ s?.slika_kupca_postojeca_FS;
    return this.noimage;
    // return "data:image/jpg;base64,"+this.slika_zaposlenika_postojeca_fs;
  }

  get_slika_novi_request_FS() {
    return `${MojConfig.adresa_servera}/Kupac/GetSlikaFS/id_fs?id=`+this.kupac_id;
  }



  get_slika_novi_request_DB(s: any) {
    return `${MojConfig.adresa_servera}/Kupac/GetSlikaDB/id_db?id=`+s.id;
  }

  get_slika_base64_DB() {
    return "data:image/jpg;base64,"+ this?.slika_kupca_postojeca_db;
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




  reloadPage() {
    location.reload();
  }

  noimage:any="data:@file/jpeg;base64,/9j/4AAQSkZJRgABAQAAZABkAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wgALCADIAN8BAREA/8QAGwABAAMBAQEBAAAAAAAAAAAAAAUGBwMBBAL/2gAIAQEAAAAA24AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAi/i8Ak/vAABXbEOf57eQFgAABXbE59M+idX8gLAAACu2Ks5bsEpxjZuAsAAAK7zyHn9mw55Wtd7WAAAFOy3ke+Ouv2QAAEPXgFpkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//EADoQAAEDAQMGCwgCAwEAAAAAAAECAwQFAAYREiEwMUDREBMWF1FUVmGRkrIHFCI1NkFzdCCBFTJScf/aAAgBAQABPwDazth2w7YdsO2HbDth2w6Ks1lNHRHxivSFyHOLQhrDEnDH725SzOzlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUszs5U/Knfaj1RFYpyJjbS2kqUpOQvWCDhoTory/MqB+8PSf4vPNR2i684httOtSzgBaNMjTG+MjPtvIGbFtQI4DqNrl/TqPzO+s6E6K8vzKgfvD0nhS+yp9bCXUF1ABUgHOAdWI4PaeZXFQcnK90+LKw1Zf2x/q3s4965Qr4rK934o8d0d3948B1G1y/p1H5nfWdCdFeX5lQP3h6TwXsvY1QY5YYKXJ6x8KdYQOk7rRK3Ph1b/JNyFGSVYrUo45fSD3Wu9eGLeCCHmiEPJzOtE50ndZ5hqS0Wn20ONq1pWMQbNswaVFWptpmKwgZSylISB3m1EvVTq7Jfjx1FLjZOSlebjE/9Cx1G1y/p1H5nfWdCdFeX5lQP3h6Ta9l7GaFHLDBS5PWPhT9kDpO60iQ9KkLffcU46s4qUo5yeCmVOVSZyJcRwocSdX2UOg91qJeeDWKYqXxiWVNJxfQo/wCnf/5a917nK48YsVSkQEHMNRcPSe7utHkPRJCH2HFNuoOKVJOcG11b1tV6NxLxS3ObT8SPssdI3WuX9OI/M76zoTovaBMdp8Wmy2cONaklScRmxyTaRIelyFvvuKcdWcVKUcST/ALUkKCVEBQwIB1jhjyHYj6H2HFNuoOKVJOBBtcRZXdSOtWdSnHCfMdCdFeG77F4YrTD7zjQbXlgoAz5sPvbmxp/X5Pgm3NjT+vyfBNubGn9fk+Cbc2NP6/J8E25saf1+T4JtzY0/r8nwTbmxp/X5Pgm3NjT+vyfBNqLSm6LTG4LTinEIJIUrXnOOhO2HbDth2w7YdsO2HbDtht//9k=";







}
