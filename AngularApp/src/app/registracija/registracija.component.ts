import { Component, OnInit } from '@angular/core';
import {MojConfig} from "../moj-config";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {
   korisniciPodaci: any;
  noviKorisnik:any ;
/*ime:any;
prezime:any;
username:any;
email:any;
lozinka:any;*/
datumregistracije:any;
iskupac:boolean=true;
   spolid: any;
  constructor(private httpKlijent: HttpClient, private router: Router) {
  }
greska:any;
   obavezna: any=false;
   postojiUserName: any=false;
  txtjos: any;
  name: any;
  myForm: any;
  txtIme: any;
  txtPrezime: any;
  txtEmail: any;
  txtUsername: any;
  txtLozinkaR: any;

  fetchKorisnici() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera + "/Kupac/GetAll", MojConfig.http_opcije()).subscribe(x => {
      this.korisniciPodaci = x;

    });

  }
  ngOnInit(): void {
    this.fetchKorisnici();
  }
validacija(){
    if(this.txtIme==undefined)
    {
      console.log("und");
    }
console.log(this.txtIme);
  }



  onSubmit() {

  }

  btn_registracija() {

    for (let korisnik of this.korisniciPodaci) {
      console.log(korisnik.username);
      if (korisnik.username == this.txtUsername) {
        this.postojiUserName = true;
        return;
      }
      else {
        this.postojiUserName = false;
      }
    }



    this.noviKorisnik = {
      id: 0,
      ime: this.txtIme,
      prezime: this.txtPrezime,
      email: this.txtEmail,
      username: this.txtUsername,
      lozinka: this.txtLozinkaR,
      iskupac: true,
      spolid: 3,
    }
    this.httpKlijent.post(`${MojConfig.adresa_servera}/Kupac/Add`, this.noviKorisnik, MojConfig.http_opcije()).subscribe(x => {
      this.fetchKorisnici();

    });
    this.router.navigate(['prijava']);

  }
}
