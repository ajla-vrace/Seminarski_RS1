import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";
import {MojConfig} from "../moj-config";
import {HttpClient} from "@angular/common/http";
import {NgControl, NgModel} from "@angular/forms";

@Component({
  selector: 'app-profil-admin',
  templateUrl: './profil-admin.component.html',
  styleUrls: ['./profil-admin.component.css']
})
export class ProfilAdminComponent implements OnInit {
  constructor(private route:ActivatedRoute, private router:Router,
              private httpKlijent:HttpClient) { }

  admin_id:any;
  jelKliknuoPromijeniLoz: boolean=false;
  spolovi:any;
  admin_podaci:any;
  korisnicka_imena:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.admin_id=+s["id"];
      this.getAdminPodaci();
      this.getSpolove();
      this.getKorisnickaImena();
    })
  }

  getAdminPodaci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Admin?id="+this.admin_id)
      .subscribe((x:any)=>{
        this.admin_podaci=x;
        console.log(this.admin_podaci);
      })
  }

  getKorisnickaImena(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Admin/korImena")
      .subscribe((x:any)=>{
        this.korisnicka_imena=x;
      })
  }

  odjaviSe() {
    // @ts-ignore
    AutentifikacijaHelper.setLoginInfo(null);

    this.httpKlijent.post(MojConfig.adresa_servera + "/api/Autentifikacija", null, MojConfig.http_opcije())
      .subscribe((x: any) => {
        this.router.navigateByUrl("/pocetna");
      //  alert("Uspješno ste se odjavili.");
      });
  }

  getSpolove(){
    //   /api/Admin/spolovi
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Admin/spolovi")
      .subscribe((x:any)=>{
        this.spolovi=x;
        console.log(this.spolovi);
      })
  }


  kliknuoEditPodatke:boolean=false;
  jelKliknuoPromijeniUsername: boolean=false;

  edit() {
    this.kliknuoEditPodatke=true;
  }

  spasi_promjene_loz(sadasnja: any, nova: any, ponovoNova: any) {

    this.kliknuoEditPodatke=false;

  //  console.log(sadasnja.value,nova.value,ponovoNova.value);
  //  console.log(this.admin_podaci[0]?.lozinka);


    this.httpKlijent.put(MojConfig.adresa_servera+"/api/Admin/lozinka?novaLozinka="+ nova.value+ "&id="+
        this.admin_id,this.admin_podaci[0])
        .subscribe((x:any)=>{
          this.jelKliknuoPromijeniLoz=false;
          this.getAdminPodaci();

          this.sadasnja_lozinka="";
          this.nova_lozinka="";
          this.ponovo_nova_lozinka="";
        })
  }

  spasi_promjene_username(novoKor: string) {

    this.kliknuoEditPodatke=false;

    this.httpKlijent.put(MojConfig.adresa_servera+"/api/Admin/korIme?novoKorIme="+ novoKor+ "&id="+
      this.admin_id, this.admin_podaci[0])
      .subscribe((x:any)=>{

        this.jelKliknuoPromijeniUsername=false;
        this.getAdminPodaci();

        this.novo_korIme="";
        this.ponovo_korIme="";

       // console.log(this.admin_podaci[0]);
      })

  }

  nova_lozinka:string="";
  ponovo_nova_lozinka:string="";
  sadasnja_lozinka:string="";

  jelOmogucenSaveLozinka(){

    if(this.sadasnja_lozinka==this.admin_podaci[0].lozinka && this.nova_lozinka==this.ponovo_nova_lozinka
    && this.sadasnja_lozinka!=="" && this.nova_lozinka!=="") {
      return true;
    }
    return false;
  }

  novo_korIme:string="";
  ponovo_korIme:string="";

  jelOmogucenSaveKorIme(){

    //provjeriti da li je uneseno ono koje nije zauzeto
    if(this.novo_korIme==this.ponovo_korIme && this.novo_korIme!==this.admin_podaci[0].username
    && this.novo_korIme!==""){
      for (let x of this.korisnicka_imena){
        if(x===this.novo_korIme)
          return false;
      }
      return true;
    }
    return false;

  }

  jelOmogucenSave(imeControll: NgModel, prezimeControll: NgModel, spolControll: NgModel, emailControll: NgModel, telControll: NgModel) {

    if(imeControll.valid && prezimeControll.valid && spolControll.valid && emailControll.valid
    && telControll.valid){
      return true;
    }
    return false;
  }

  spasi() {

    this.httpKlijent.put(MojConfig.adresa_servera+"/api/Admin",this.admin_podaci[0])
      .subscribe((x:any)=>{

        this.kliknuoEditPodatke=false;
        this.getAdminPodaci();
      })

  }


}
