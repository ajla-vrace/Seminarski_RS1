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

  getZaposlenika(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Zaposlenik/id?id="
    +this.zaposlenik_id).subscribe((x:any)=>{
      this.obj_zaposlenik=x;
      console.log(this.obj_zaposlenik);

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


}



