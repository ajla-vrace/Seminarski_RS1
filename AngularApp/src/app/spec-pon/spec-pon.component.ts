import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-spec-pon',
  templateUrl: './spec-pon.component.html',
  styleUrls: ['./spec-pon.component.css']
})
export class SpecPonComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router, private httpKlijent:HttpClient) { }

  admin_id:any;
  jelKliknuoSearch: boolean=false;

  specijalne_ponude:any;
  specijalne_ponude_proizvodi:any;
  popusti:any;

  obj_sp:any;
  obj_spp:any;
  obj_popust:any;

  proizvodi:any;

  popust_id:any;  //difoltni
  proizvod_id:any; //difoltni
  specijalna_ponuda_id:any; //difoltna

  kliknuoEditSP:boolean=false;
  kliknuoEditSPP:boolean=false;
  kliknuoEditPopust:boolean=false;

  duzinaPopust:any;
  duzinaSPP:any;
  duzinaSP:any;
  duzinaProizvod:any;

  izabranoSortiranje:string="Mlađi datum";
  sp_opadajuci:any;
  sp_rastuci:any;


  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.admin_id=+s["id"];

      this.getPopusti();
      this.getProizvodPodaci();
      this.getSpecijalnePonude();
      this.getSpecijalnePonudeProizvod();
      this.getSpecijalnePonudeOpadajuci();
      this.getSpecijalnePonudeRastuci();
      this.kreirajObjekte();
    })



  }


  kreirajObjekte(){
    this.obj_sp={
      id:0,
      naziv:"",
      datum_pocetka:"",
      datum_zavrsetka:""
    };

    this.obj_popust={
      id:0,
      opis:""
    };


    this.obj_spp={
      id:0,
      specijalnaPonudaId:6,
      proizvodId:4,
      popustId:10,
      specijalnaPonudaOpis:"",
      proizvodOpis:"",
      popustOpis:"",

    };

    console.log("ob_spp: ",this.obj_spp)
  }

  getProizvodPodaci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Proizvod").subscribe((x:any)=>{
      this.proizvodi=x;
      this.proizvod_id=this.proizvodi[0].id;
      this.duzinaProizvod=this.proizvodi.length;
      console.log("proizvod id: ",this.proizvod_id);
    })
  }

  getSpecijalnePonude(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SpecijalnaPonudaProizvod/Specijalne_ponude")
      .subscribe((x:any)=>{
      this.specijalne_ponude=x;
      this.specijalna_ponuda_id=this.specijalne_ponude[0].id;
      this.duzinaSP=this.specijalne_ponude.length;
      console.log("specijalna ponuda id: ",this.specijalna_ponuda_id);
    })
  }

  getSpecijalnePonudeRastuci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SpecijalnaPonudaProizvod/Specijalne_ponude_rastuci")
      .subscribe((x:any)=>{
       this.sp_rastuci=x;
      })
  }

  getSpecijalnePonudeOpadajuci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SpecijalnaPonudaProizvod/Specijalne_ponude_opadajuci")
      .subscribe((x:any)=>{
        this.sp_opadajuci=x;
      })
  }

  getSpecijalnePonudeProizvod(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SpecijalnaPonudaProizvod/Specijalne_ponude_proizvod")
      .subscribe((x:any)=>{
        this.specijalne_ponude_proizvodi=x;
        this.duzinaSPP=this.specijalne_ponude_proizvodi.length;
        console.log(this.specijalne_ponude_proizvodi);
      })
  }

  getPopusti(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SpecijalnaPonudaProizvod/Popust")
      .subscribe((x:any)=>{
        this.popusti=x;
        this.popust_id=this.popusti[0].id;
        this.duzinaPopust=this.popusti.length;
        console.log("popust id: ",this.popust_id);
      })
  }

  snimi_spp(){
    this.httpKlijent.post(MojConfig.adresa_servera+"/api/SpecijalnaPonudaProizvod/post_spp"
      ,this.obj_spp)
      .subscribe((x:any)=>
      {
        console.log(this.obj_spp);

        alert("Uspješno spašeno.");

        this.getSpecijalnePonudeProizvod();

        this.obj_spp={
          id:0,
          specijalnaPonudaId:this.specijalna_ponuda_id,
          proizvodId:this.proizvod_id,
          popustId:this.popust_id,
          specijalnaPonudaOpis:"",
          proizvodOpis:"",
          popustOpis:"",

        };

        this.kliknuoEditSPP=false;

      })
  }

  snimi_sp(){

    this.httpKlijent.post(MojConfig.adresa_servera+"/api/SpecijalnaPonudaProizvod/post_sp"
      ,this.obj_sp)
      .subscribe((x:any)=>
      {
        console.log(this.obj_sp);

        alert("Uspješno spašeno.");

        this.getSpecijalnePonude();

        this.obj_sp={
          id:0,
          naziv:"",
          datum_pocetka:"",
          datum_zavrsetka:""
        };

        this.kliknuoEditSP=false;
      })
  }

  snimi_popust(){
    this.httpKlijent.post(MojConfig.adresa_servera+"/api/SpecijalnaPonudaProizvod/post_popust"
      ,this.obj_popust)
      .subscribe((x:any)=>{

        alert("Uspješno spašeno.");

        console.log(this.obj_popust);

        this.getPopusti();

        this.obj_popust={
          id:0,
          opis:""
        }

        this.kliknuoEditPopust=false;
      })
  }

  edit_spp(spp:any){
    this.kliknuoEditSPP=true;
    this.obj_spp=spp;
  }

  edit_sp(sp: any){
    this.kliknuoEditSP=true;
    this.obj_sp=sp;
  }

  edit_popust(p: any){
    this.kliknuoEditPopust=true;
    this.obj_popust=p;
  }

  delete_sp(sp: any){

    this.kliknuoEditSP=false;

    if(confirm("Brisanjem ovog zapisa brišete i sve specijalne ponude koje sadrže ovaj zapis." +
      " Jeste li sigurni da želite obrisati zapis?")){
      this.httpKlijent.delete(MojConfig.adresa_servera+"/api/SpecijalnaPonudaProizvod/del_sp?id="
      +sp.id)
        .subscribe((x:any)=>{
          this.getSpecijalnePonudeOpadajuci();
          console.log(this.getSpecijalnePonudeOpadajuci())
        })
    }
  }

  delete_spp(spp:any){

    this.kliknuoEditSPP=false;

    if(confirm("Jeste li sigurni da želite obrisati zapis?")){
      this.httpKlijent.delete(MojConfig.adresa_servera+"/api/SpecijalnaPonudaProizvod/del_spp?id="
      +spp.id)
        .subscribe((x:any)=>{
          this.getSpecijalnePonudeProizvod();

        })
    }
  }

  delete_popust(p: any){

    this.kliknuoEditPopust=false;

    if(confirm("Brisanjem ovog zapisa brišete i sve specijalne ponude koje sadrže ovaj zapis." +
      " Jeste li sigurni da želite obrisati zapis?")){
      this.httpKlijent.delete(MojConfig.adresa_servera+"/api/SpecijalnaPonudaProizvod/del_popust?id="
      +p.id)
        .subscribe((x:any)=>{
          this.getPopusti();
        })
    }
  }


  jelDisabledSnimiSP(nazivSP: NgModel, dateStart: NgModel, dateEnd: NgModel) {
    if(nazivSP.valid && dateStart.valid && dateEnd.valid)
      return true;
    return false;
  }



  //filteri

  get_filter(naziv:string, niz:any){
    if(this.jelKliknuoSearch){
      return niz?.filter((x:any)=>(
        x.naziv.toLowerCase().includes(naziv.toLowerCase())
      ))
    }
    else{
      return niz;
    }
  }

  getFilterPodatkeSP(naziv:string){
    if(this.izabranoSortiranje=="Mlađi datum"){
      return this.get_filter(naziv,this.sp_opadajuci);
    }
    else{
      return this.get_filter(naziv,this.sp_rastuci);
    }
  }

  getFilterPodatkeSPP(spp:string){
    if(this.jelKliknuoSearch){
      return this.specijalne_ponude_proizvodi?.filter((x:any)=>(
        x.proizvodOpis.toLowerCase().includes(spp.toLowerCase())
        || x.specijalnaPonudaOpis.toLowerCase().includes(spp.toLowerCase())
        || x.popustOpis.includes(spp)
      ))
    }
    else{
      return this.specijalne_ponude_proizvodi;
    }
  }

}
