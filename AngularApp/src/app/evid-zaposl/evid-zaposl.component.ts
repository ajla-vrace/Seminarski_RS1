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
    this.naslov="Dodaj zaposlenika";
    this.jel_edit=false;
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
      "datumZaposlenja": "",
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
    this.jel_edit=false;

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

  jmbgs:any;
  postojiJMBG(jmbg:string){
    for (let k of this.zaposlenici){
      if(k.jmbg===jmbg)
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

  noimage:any="data:@file/jpeg;base64,/9j/4AAQSkZJRgABAQAAZABkAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wgALCADIAN8BAREA/8QAGwABAAMBAQEBAAAAAAAAAAAAAAUGBwMBBAL/2gAIAQEAAAAA24AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAi/i8Ak/vAABXbEOf57eQFgAABXbE59M+idX8gLAAACu2Ks5bsEpxjZuAsAAAK7zyHn9mw55Wtd7WAAAFOy3ke+Ouv2QAAEPXgFpkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//EADoQAAEDAQMGCwgCAwEAAAAAAAECAwQFAAYREiEwMUDREBMWF1FUVmGRkrIHFCI1NkFzdCCBFTJScf/aAAgBAQABPwDazth2w7YdsO2HbDth2w6Ks1lNHRHxivSFyHOLQhrDEnDH725SzOzlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUszs5U/Knfaj1RFYpyJjbS2kqUpOQvWCDhoTory/MqB+8PSf4vPNR2i684httOtSzgBaNMjTG+MjPtvIGbFtQI4DqNrl/TqPzO+s6E6K8vzKgfvD0nhS+yp9bCXUF1ABUgHOAdWI4PaeZXFQcnK90+LKw1Zf2x/q3s4965Qr4rK934o8d0d3948B1G1y/p1H5nfWdCdFeX5lQP3h6TwXsvY1QY5YYKXJ6x8KdYQOk7rRK3Ph1b/JNyFGSVYrUo45fSD3Wu9eGLeCCHmiEPJzOtE50ndZ5hqS0Wn20ONq1pWMQbNswaVFWptpmKwgZSylISB3m1EvVTq7Jfjx1FLjZOSlebjE/9Cx1G1y/p1H5nfWdCdFeX5lQP3h6Ta9l7GaFHLDBS5PWPhT9kDpO60iQ9KkLffcU46s4qUo5yeCmVOVSZyJcRwocSdX2UOg91qJeeDWKYqXxiWVNJxfQo/wCnf/5a917nK48YsVSkQEHMNRcPSe7utHkPRJCH2HFNuoOKVJOcG11b1tV6NxLxS3ObT8SPssdI3WuX9OI/M76zoTovaBMdp8Wmy2cONaklScRmxyTaRIelyFvvuKcdWcVKUcST/ALUkKCVEBQwIB1jhjyHYj6H2HFNuoOKVJOBBtcRZXdSOtWdSnHCfMdCdFeG77F4YrTD7zjQbXlgoAz5sPvbmxp/X5Pgm3NjT+vyfBNubGn9fk+Cbc2NP6/J8E25saf1+T4JtzY0/r8nwTbmxp/X5Pgm3NjT+vyfBNqLSm6LTG4LTinEIJIUrXnOOhO2HbDth2w7YdsO2HbDtht//9k=";


  get_slika_base64_FS(s:any) {
    if(s!=null && s.slika_zaposlenika_postojeca_FS!=null)
      return "data:image/jpg;base64,"+ s?.slika_zaposlenika_postojeca_FS;
    return this.noimage;

  }

  jel_edit:boolean=false;
  naslov:any="";
  urediZaposlenika(z: any) {
    this.zaposlenik_obj=z;
    this.naslov="Uredi zaposlenika";
    this.jel_edit=true;
  }


}
