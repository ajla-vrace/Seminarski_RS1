import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MojConfig} from "../moj-config";
import {HttpClient} from "@angular/common/http";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";
import {LoginInformacije} from "../helpers/login-informacije";
import {NgModel} from "@angular/forms";

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
   prikaziNarudzbe: any=false;
   narudzbeKupcaPodaci: any;
   jeLiPodaci:any=true;
   jeLiNarudzbe:any=false;
   prikazPodataka: any=false;
  constructor(private route: ActivatedRoute, private httpKlijent:HttpClient) { }
  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }
  getKupca(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/Kupac/GetById?id="+this.kupac_id)
      .subscribe((x:any)=>{
        this.kupac_podaci=x;
        console.log(this.kupac_podaci);
        setTimeout( ()=>{
         /* this.ime=this.kupac_podaci[0].ime;
          this.prezime=this.kupac_podaci[0].prezime;
          this.lozinka=this.kupac_podaci[0].lozinka;*/
        }, 400);

      })
  }
  ngOnInit(): void {
    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;

   /* this.route.params.subscribe(s=>{
      this.kupac_id=+s["id"];
    })*/
    this.fetchKupci();
    this.getKupca();
    this.fetchKomentari();
    this.fetchKomentariMoji();
    this.fetchOcjeneProdavnice();
    this.fetchOcjeneProdavniceMoje();
    this.fetchOcjeneProizvoda();
    this.fetchOcjeneProizvodaMoje();
this.fetchNarudzbeKupca();
  }



  fetchKupci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/Kupac/GetAll")
      .subscribe((x:any)=>{
        this.kupciPodaci=x;
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
    this.komm = true;
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
    this.ocjene = true;
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


  }

  prikaziPodatke() {
    this.prikazPodataka=true;
  }
}
