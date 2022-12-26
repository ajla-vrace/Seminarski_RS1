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
ime:any;
prezime:any;
username:any;
email:any;
lozinka:any;
datumregistracije:any;
iskupac:boolean=true;
   spolid: any;
  constructor(private httpKlijent: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.fetchKorisnici();
  }
validacija(){

}
  btn_registracija(ime_input:any,prezime_input:any,
                   username_input:any, lozinka_input:any,email_input:any) {

    this.noviKorisnik={
      id:0,
      ime:ime_input.value,
      prezime:prezime_input.value,
      email:email_input.value,
      username:username_input.value,
      lozinka:lozinka_input.value,
      iskupac:true,
      spolid:3,
    }

    this.httpKlijent.post(`${MojConfig.adresa_servera}/Korisnik/Add`, this.noviKorisnik, MojConfig.http_opcije()).subscribe(x => {
      this.fetchKorisnici();

    });

  }

  fetchKorisnici() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Korisnik/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.korisniciPodaci = x;

    });

  }


  onSubmit() {

  }
}
