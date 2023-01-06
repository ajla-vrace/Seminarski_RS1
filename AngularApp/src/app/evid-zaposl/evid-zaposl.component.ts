import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-evid-zaposl',
  templateUrl: './evid-zaposl.component.html',
  styleUrls: ['./evid-zaposl.component.css']
})
export class EvidZaposlComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router, private httpKlijent:HttpClient) { }

  admin_id:any;
  zaposlenici:any;
  zaposlenik_obj:any;
  spolovi:any;
  prodavnice:any;
  korisnicka_imena:any;
  emailovi:any;


  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.admin_id=+s["id"];
      this.getZaposlenike();
      this.getSpolovi();
      this.getProdavnice();
      this.getKorisnickaImena();
      this.getEmailove();
    })
  }

  getKorisnickaImena(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Admin/korImena")
      .subscribe((x:any)=>{
        this.korisnicka_imena=x;
      })
  }

  getEmailove(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Admin/emailovi")
      .subscribe((x:any)=>{
        this.emailovi=x;
      })
  }

  vidiDetaljeZaposlenika(z_id: number) {
    this.router.navigate(['zaposlenik-detalji',z_id]);
  }

  getZaposlenike(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Zaposlenik/sve")
      .subscribe((x:any)=>{
        this.zaposlenici=x;
        console.log(this.zaposlenici);
      })
  }

  getFilterZaposlenike(filter:string){

    if(this.kliknuoPretrazi==true){
      let podaci=this.zaposlenici?.filter((x:any)=>(
        ( x.ime.toLowerCase().startsWith(filter.toLowerCase()))
        ||
        (x.prezime.toLowerCase().startsWith(filter.toLowerCase()))
      ));
      return podaci;
    }
    else {
       return this.zaposlenici;
    }

  }

  prodavnica_id:any;  //ovo ce biti prva prodavnica u nizu
  spol_id:any; //prvi spol u nizu
  kliknuoPretrazi: boolean=false;
  ponovo_loz: string="";

  getProdavnice(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/Prodavnica/GetAll")
      .subscribe((x:any)=>{
        this.prodavnice=x;
        this.prodavnica_id=this.prodavnice[0].id;
      })
  }

  getSpolovi(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/Spol/GetAll")
      .subscribe((x:any)=>{
        this.spolovi=x;
        this.spol_id=this.spolovi[0].id;
      })
  }

  dodajZaposlenika() {
    this.zaposlenik_obj={
      "id": 0,
      "ime": "",
      "prezime": "",
      "username": "",
      "lozinka": "",
      "email": "",
      "brojTelefona": "",
      "spolId": this.spol_id,
      "spolOpis": "",
      "datumZaposlenja": "2023-01-03T18:09:32.916",
      "datumOtkaza": "2023-01-03T18:09:32.916",
      "adresaStanovanja": "",
      "datumRodjenja": "",
      "jmbg": "",
      "prodavnicaOpis": "",
      "prodavnicaId": this.prodavnica_id,
      datumRegistracije:"2023-01-03T18:09:32.916"
    }
  }

  snimiDugme() {
    this.httpKlijent.post(MojConfig.adresa_servera+"/api/Zaposlenik", this.zaposlenik_obj)
      .subscribe((x:any)=>{
      this.getZaposlenike();

      this.zaposlenik_obj=null;

      //this.zaposlnik_obj.datumZaposlenja= this.zaposlnik_obj.datumZaposlenja + "T00:00:00.000"
        //ili promijeniti datetime u date u vs
        //nema potrebe za tim, i ovako prolazi
      })
  }

  obrisiZaposlenika(z: any) {
    if(confirm("Da li ste sigurni da želite izbrisati ovog zaposlenika?")){
      this.httpKlijent.delete(MojConfig.adresa_servera+"/api/Zaposlenik?id="+z.id)
        .subscribe((x:any)=>{
          this.getZaposlenike();
        })
    }
  }

  postojiKorIme(korIme: string) {
    for (let k of this.korisnicka_imena){
      if(k===korIme)
        return true;
    }
    return false;
  }

  postojiMail(mail:string){
    for (let k of this.emailovi){
      if(k===mail)
        return true;
    }
    return false;
  }

  jelDozvoljenSave(ime: NgModel, prezime: NgModel, jmbg: NgModel, dtmRod: NgModel, adresa: NgModel, email: NgModel, dtmZaposl: NgModel, korIme: NgModel, loz: NgModel, lozPonovo: NgModel) {
    if(ime.valid && prezime.valid && jmbg.valid && dtmRod.valid && adresa.valid && email.valid && !this.postojiMail(email.value)
    && dtmZaposl.valid && korIme.valid && loz.valid && lozPonovo.valid && !this.postojiKorIme(korIme.value)){
      return true;
    }

    return false;
  }
}
