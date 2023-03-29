import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-zaposlenik-detalji',
  templateUrl: './zaposlenik-detalji.component.html',
  styleUrls: ['./zaposlenik-detalji.component.css']
})
export class ZaposlenikDetaljiComponent implements OnInit {

  constructor(private route:ActivatedRoute, private httpKlijent:HttpClient) { }

  zaposlenik_id:any;
  jelDisabledInput: boolean=true;
  kliknuoEdit: boolean=false;
  jelDisabledEdit: boolean=false;
  obj_zaposlenik:any;
  copy_obj_zaposlenik:any;
  jelKliknuoPromijeniLoz: boolean=false;
  jelKliknuoPromijeniUsername: boolean=false;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.zaposlenik_id=+s["id"];
      this.getZaposlenika();
      this.getKorisnickaImena();
    })
  }

  datum_rodj:any;
  datum_zaposl:any;
  datum_reg:any;
  _jmbg:any;

  telefon:any="";
  getZaposlenika(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Zaposlenik/id?id="
    +this.zaposlenik_id).subscribe((x:any)=>{
      this.obj_zaposlenik=x;
      console.log(this.obj_zaposlenik);

      this._jmbg=this.obj_zaposlenik?.jmbg;
      this.datum_rodj=this.obj_zaposlenik?.datumRodjenja;
      this.datum_zaposl=this.obj_zaposlenik?.datumZaposlenja;
      this.datum_reg=this.obj_zaposlenik?.datumRegistracije;

      this.telefon=this.obj_zaposlenik?.brojTelefona;
      /*
      this.copy_obj_zaposlenik=this.obj_zaposlenik;
      console.log(this.copy_obj_zaposlenik);
      console.log(this.obj_zaposlenik);*/
    })
  }

  UrediPodatke() {
     this.jelDisabledInput=false;
     this.jelDisabledEdit=true;
     this.kliknuoEdit=true;
  }

  snimi() {
    this.jelDisabledInput=true;
    this.jelDisabledEdit=false;

    this.httpKlijent.post(MojConfig.adresa_servera+"/api/Zaposlenik", this.obj_zaposlenik)
      .subscribe((x:any)=>{
        this.getZaposlenika();
        alert("Uspješno ste spasili promjene.");
      })

    this.kliknuoEdit=false;
  }


  ponisti() {
    this.obj_zaposlenik=this.copy_obj_zaposlenik;

    console.log(this.obj_zaposlenik);

    this.kliknuoEdit=false;
    this.jelDisabledInput=true;
    this.jelDisabledEdit=false;
  }






  spasi_promjene_loz() {


    this.httpKlijent.put(MojConfig.adresa_servera+"/api/Admin/lozinka?novaLozinka="+ this.nova_lozinka+ "&id="+
      this.zaposlenik_id,this.obj_zaposlenik)
      .subscribe((x:any)=>{
        this.jelKliknuoPromijeniLoz=false;
        this.getZaposlenika();

        console.log(this.obj_zaposlenik);

        this.sadasnja_lozinka="";
        this.nova_lozinka="";
        this.ponovo_nova_lozinka="";

        alert("Uspješno ste promijenili lozinku.");

      })
  }

  spasi_promjene_username() {

    this.httpKlijent.put(MojConfig.adresa_servera+"/api/Admin/korIme?novoKorIme="
      +this.novo_korIme+ "&id="+
      this.zaposlenik_id, this.obj_zaposlenik)
      .subscribe((x:any)=>{

        this.jelKliknuoPromijeniUsername=false;
        this.getZaposlenika();

        console.log(this.obj_zaposlenik);

        this.novo_korIme="";
        this.ponovo_korIme="";

        alert("Uspješno ste promijenili korisničko ime.");
      })
  }

  nova_lozinka:string="";
  ponovo_nova_lozinka:string="";
  sadasnja_lozinka:string="";

  jelOmogucenSaveLozinka(sadasnjaLoz: NgModel, novaLoz: NgModel, ponovoNovaLoz: NgModel){

    if(this.sadasnja_lozinka==this.obj_zaposlenik.lozinka && this.nova_lozinka==this.ponovo_nova_lozinka
      && this.sadasnja_lozinka!=="" && this.nova_lozinka!=="" &&
      sadasnjaLoz.valid && novaLoz.valid && ponovoNovaLoz.valid) {
      return true;
    }
    return false;
  }

  novo_korIme:string="";
  ponovo_korIme:string="";

  jelOmogucenSaveKorIme(novoKorIme: NgModel, ponovoNovoKorIme: NgModel){

    if(this.novo_korIme==this.ponovo_korIme && this.novo_korIme!==this.obj_zaposlenik.username
      && this.novo_korIme!=="" && novoKorIme.valid && ponovoNovoKorIme.valid){
      for (let x of this.korisnicka_imena){
        if(x===this.novo_korIme)
          return false;
      }
      return true;
    }
    return false;

  }

  korisnicka_imena:any;

  getKorisnickaImena(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Admin/korImena")
      .subscribe((x:any)=>{
        this.korisnicka_imena=x;
      })
  }


  noimage:any="data:@file/jpeg;base64,/9j/4AAQSkZJRgABAQAAZABkAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wgALCADIAN8BAREA/8QAGwABAAMBAQEBAAAAAAAAAAAAAAUGBwMBBAL/2gAIAQEAAAAA24AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAi/i8Ak/vAABXbEOf57eQFgAABXbE59M+idX8gLAAACu2Ks5bsEpxjZuAsAAAK7zyHn9mw55Wtd7WAAAFOy3ke+Ouv2QAAEPXgFpkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//EADoQAAEDAQMGCwgCAwEAAAAAAAECAwQFAAYREiEwMUDREBMWF1FUVmGRkrIHFCI1NkFzdCCBFTJScf/aAAgBAQABPwDazth2w7YdsO2HbDth2w6Ks1lNHRHxivSFyHOLQhrDEnDH725SzOzlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUszs5U/Knfaj1RFYpyJjbS2kqUpOQvWCDhoTory/MqB+8PSf4vPNR2i684httOtSzgBaNMjTG+MjPtvIGbFtQI4DqNrl/TqPzO+s6E6K8vzKgfvD0nhS+yp9bCXUF1ABUgHOAdWI4PaeZXFQcnK90+LKw1Zf2x/q3s4965Qr4rK934o8d0d3948B1G1y/p1H5nfWdCdFeX5lQP3h6TwXsvY1QY5YYKXJ6x8KdYQOk7rRK3Ph1b/JNyFGSVYrUo45fSD3Wu9eGLeCCHmiEPJzOtE50ndZ5hqS0Wn20ONq1pWMQbNswaVFWptpmKwgZSylISB3m1EvVTq7Jfjx1FLjZOSlebjE/9Cx1G1y/p1H5nfWdCdFeX5lQP3h6Ta9l7GaFHLDBS5PWPhT9kDpO60iQ9KkLffcU46s4qUo5yeCmVOVSZyJcRwocSdX2UOg91qJeeDWKYqXxiWVNJxfQo/wCnf/5a917nK48YsVSkQEHMNRcPSe7utHkPRJCH2HFNuoOKVJOcG11b1tV6NxLxS3ObT8SPssdI3WuX9OI/M76zoTovaBMdp8Wmy2cONaklScRmxyTaRIelyFvvuKcdWcVKUcST/ALUkKCVEBQwIB1jhjyHYj6H2HFNuoOKVJOBBtcRZXdSOtWdSnHCfMdCdFeG77F4YrTD7zjQbXlgoAz5sPvbmxp/X5Pgm3NjT+vyfBNubGn9fk+Cbc2NP6/J8E25saf1+T4JtzY0/r8nwTbmxp/X5Pgm3NjT+vyfBNqLSm6LTG4LTinEIJIUrXnOOhO2HbDth2w7YdsO2HbDtht//9k=";


  get_slika_base64_FS(s:any) {
    if(s!=null && s.slika_zaposlenika_postojeca_FS!=null)
      return "data:image/jpg;base64,"+ s?.slika_zaposlenika_postojeca_FS;
    return this.noimage;

  }


}



