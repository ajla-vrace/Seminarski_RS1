import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {NgModel} from "@angular/forms";
import {DatePipe, formatDate} from "@angular/common";
import {SignalRService} from "../_servisi/SignalRServis";


@Component({
  selector: 'app-spec-pon',
  templateUrl: './spec-pon.component.html',
  styleUrls: ['./spec-pon.component.css']
})
export class SpecPonComponent implements OnInit {
  poruka: string = '';

  constructor(private route:ActivatedRoute, private router:Router, private httpKlijent:HttpClient, private datePipe:DatePipe,
              private signalRService: SignalRService   ) {


  }



  posaljiPoruku(): void {
    this.poruka="Dodana nova specijalna ponuda.";
    this.signalRService.posaljiPoruku(this.poruka);
  }









  trenutniDatum:any=this.datePipe.transform(new Date(),"yyyy-MM-dd");

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
     // this.getProizvodPodaci();
      this.getProizvodRastuci();
      this.getSpecijalnePonude();
      this.getSpecijalnePonudeProizvod();
      this.getSpecijalnePonudeOpadajuci();
      this.getSpecijalnePonudeRastuci();
      //this.kreirajObjekte();
    })


    /*
        this.obj_popust={
          id:0,
          opis:""
        };
    */
  }

  getProizvodPodaci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Proizvod").subscribe((x:any)=>{
      this.proizvodi=x;
      this.proizvod_id=this.proizvodi[0].id;
      this.duzinaProizvod=this.proizvodi.length;
      console.log("proizvod id: ",this.proizvod_id);
    })
  }

  pr_rastuci:any;
  getProizvodRastuci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Proizvod/naziv_asc",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.pr_rastuci=x;
        this.proizvod_id=this.pr_rastuci[0].id;
        this.duzinaProizvod=this.pr_rastuci.length;
        console.log("proizvod id: ",this.proizvod_id);
        console.log(this.pr_rastuci);
      })
  }


  specijalna_ponuda_id2:any;
  getSpecijalnePonude(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SpecijalnaPonudaProizvod/Specijalne_ponude", MojConfig.http_opcije())
      .subscribe((x:any)=>{
      this.specijalne_ponude=x;
      this.specijalna_ponuda_id2=this.specijalne_ponude[0]?.id;
      this.duzinaSP=this.specijalne_ponude?.length;
      console.log("specijalna ponuda id: ",this.specijalna_ponuda_id2);
    })
  }

  totalLength1:any;
  page1:any;

  totalLength2:any;
  page2:any;

  getSpecijalnePonudeRastuci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SpecijalnaPonudaProizvod/Specijalne_ponude_rastuci",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.sp_rastuci=x;
        this.specijalna_ponuda_id=this.sp_rastuci[0]?.id;
        this.duzinaSP=this.sp_rastuci.length;
      })
  }

  getSpecijalnePonudeOpadajuci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SpecijalnaPonudaProizvod/Specijalne_ponude_opadajuci",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.sp_opadajuci=x;
      })
  }

  getSpecijalnePonudeProizvod(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SpecijalnaPonudaProizvod/Specijalne_ponude_proizvod",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.specijalne_ponude_proizvodi=x;
        this.duzinaSPP=this.specijalne_ponude_proizvodi.length;
        console.log(this.specijalne_ponude_proizvodi);
      })
  }

  getPopusti(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SpecijalnaPonudaProizvod/Popust",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.popusti=x;
        this.popust_id=this.popusti[0].id;
        this.duzinaPopust=this.popusti.length;
        console.log("popust id: ",this.popust_id);
      })
  }

  snimi_spp(){
    this.httpKlijent.post(MojConfig.adresa_servera+"/api/SpecijalnaPonudaProizvod/post_spp"
      ,this.obj_spp, MojConfig.http_opcije())
      .subscribe((x:any)=>
      {
        console.log(this.obj_spp);

        this.getSpecijalnePonudeProizvod();

        alert("Uspješno spašeno.");

        this.obj_spp=null;

        this.kliknuoEditSPP=false;

      })
  }

  snimi_sp(){
    this.httpKlijent.get(MojConfig.adresa_servera+
      "/api/SpecijalnaPonudaProizvod/uporediDatume?datumUnosPocetak="+this.obj_sp.datum_pocetka
      +"&datumUnosZavrsetak="+this.obj_sp.datum_zavrsetka+"&sp_id="+this.obj_sp.id).subscribe((x:any)=>{

      if(x.uslovIspravan==false){
        alert("Uslov je neispravan.");
        this.obj_sp=null;
        this.getSpecijalnePonudeOpadajuci();
        this.getSpecijalnePonudeRastuci();
        this.getSpecijalnePonudeProizvod();
        return;
      }
      else{
        this.httpKlijent.post(MojConfig.adresa_servera+"/api/SpecijalnaPonudaProizvod/post_sp"
          ,this.obj_sp, MojConfig.http_opcije())
          .subscribe((x:any)=>
          {
            console.log(this.obj_sp);

            this.getSpecijalnePonude();
            this.getSpecijalnePonudeOpadajuci();
            this.getSpecijalnePonudeRastuci();
            this.getSpecijalnePonudeProizvod();

            alert("Uspješno spašeno.");

            this.obj_sp=null;

            this.kliknuoEditSP=false;
          })

      }

    });


  }

  snimi_popust(){
    this.httpKlijent.post(MojConfig.adresa_servera+"/api/SpecijalnaPonudaProizvod/post_popust"
      ,this.obj_popust, MojConfig.http_opcije())
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
    this.naslov="Izmjeni stavku";
  }

  edit_sp(sp: any){
    this.kliknuoEditSP=true;
    this.obj_sp=sp;
    this.naslov="Izmjeni specijalnu ponudu";
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
      +sp.id, MojConfig.http_opcije())
        .subscribe((x:any)=>{
          this.getSpecijalnePonude();
          this.getSpecijalnePonudeOpadajuci();
          this.getSpecijalnePonudeRastuci();
          this.getSpecijalnePonudeProizvod();;
        //  console.log(this.getSpecijalnePonudeOpadajuci())
        })
    }
  }

  delete_spp(spp:any){

    this.kliknuoEditSPP=false;

    if(confirm("Jeste li sigurni da želite obrisati zapis?")){
      this.httpKlijent.delete(MojConfig.adresa_servera+"/api/SpecijalnaPonudaProizvod/del_spp?id="
      +spp.id,MojConfig.http_opcije())
        .subscribe((x:any)=>{
          this.getSpecijalnePonude();
          this.getSpecijalnePonudeProizvod();
          this.getSpecijalnePonudeOpadajuci();
          this.getSpecijalnePonudeRastuci();
        })
    }
  }

  delete_popust(p: any){

    this.kliknuoEditPopust=false;

    if(confirm("Brisanjem ovog zapisa brišete i sve specijalne ponude koje sadrže ovaj zapis." +
      " Jeste li sigurni da želite obrisati zapis?")){
      this.httpKlijent.delete(MojConfig.adresa_servera+"/api/SpecijalnaPonudaProizvod/del_popust?id="
      +p.id,MojConfig.http_opcije())
        .subscribe((x:any)=>{
          this.getPopusti();
        })
    }
  }


  jelDisabledSnimiSP(nazivSP: NgModel, dateStart: NgModel, dateEnd: NgModel) {
    if(nazivSP.valid && dateStart.valid && dateEnd.valid //&& !this.postojiSP(nazivSP.value)
    )
      return true;
    return false;
  }



  //filteri

  pretraga_sp:any="";

  get_filter(naziv:string, niz:any){
    if(this.jelKliknuoSearch){
      let filterPodaci=niz?.filter((x:any)=>(
        x.naziv.toLowerCase().includes(naziv.toLowerCase())));
      this.totalLength1=filterPodaci?.length;
      return filterPodaci;
    }
    else{
      this.totalLength1=niz?.length;
      return niz;
    }
  }

  get_filter2(naziv:string, niz:any){
    let filterPodaci=niz?.filter((x:any)=>(
      this.pretraga_sp!="" ? (x.naziv.toLowerCase().includes(this.pretraga_sp.toLowerCase())) : niz
    ));
    this.totalLength1=filterPodaci?.length;
    return filterPodaci;
  }

  getFilterPodatkeSP(naziv:string){
    if(this.izabranoSortiranje=="Mlađi datum"){
      return this.get_filter2(naziv,this.sp_opadajuci);
    }
    else{
      return this.get_filter2(naziv,this.sp_rastuci);
    }
  }

  pretraga_spp:any="";
  aktivne_spp:any="Aktivne";
  getFilterPodatkeSPP(inputspp:string){
    //if(this.jelKliknuoSearch)

    if(this.aktivne_spp=="Aktivne"){
      let filterPodaci = this.specijalne_ponude_proizvodi?.filter((x:any)=>(
        x.aktivna==true && ( this.pretraga_spp!=""? (
        x.proizvodOpis.toLowerCase().includes(this.pretraga_spp.toLowerCase())
        || x.specijalnaPonudaOpis.toLowerCase().includes(this.pretraga_spp.toLowerCase())
        || x.popustOpis.includes(this.pretraga_spp) ) : this.specijalne_ponude_proizvodi)
      ));
      this.totalLength2=filterPodaci?.length;
      return filterPodaci;
    }
    else if(this.aktivne_spp=="Neaktivne"){
      let filterPodaci = this.specijalne_ponude_proizvodi?.filter((x:any)=>(
        x.aktivna==false && ( this.pretraga_spp!=""? (
          x.proizvodOpis.toLowerCase().includes(this.pretraga_spp.toLowerCase())
          || x.specijalnaPonudaOpis.toLowerCase().includes(this.pretraga_spp.toLowerCase())
          || x.popustOpis.includes(this.pretraga_spp) ) : this.specijalne_ponude_proizvodi)
      ));
      this.totalLength2=filterPodaci?.length;
      return filterPodaci;
    }
    else{
      let filterPodaci = this.specijalne_ponude_proizvodi?.filter((x:any)=>(
        (
          this.pretraga_spp!=""?
          x.proizvodOpis.toLowerCase().includes(this.pretraga_spp.toLowerCase())
          || x.specijalnaPonudaOpis.toLowerCase().includes(this.pretraga_spp.toLowerCase())
          || x.popustOpis.includes(this.pretraga_spp) : this.specijalne_ponude_proizvodi )
      ));
      this.totalLength2=filterPodaci?.length;
      return filterPodaci;
    }
   /* else{
      this.totalLength2=this.specijalne_ponude_proizvodi?.length;
      return this.specijalne_ponude_proizvodi;
    }
    */
  }

  naslov:any="";

  dodajSP() {
    this.naslov="Dodaj specijalnu ponudu";
    this.obj_sp={
      id:0,
      naziv:"",
      datum_pocetka:this.trenutniDatum,
      datum_zavrsetka:this.trenutniDatum,
      aktivna:true
    };
  }

  obj_sp_aktivna:any;
  promijeni_aktivnost:boolean=false;
  promijeni_aktivnost_sp(sp:any){
    this.promijeni_aktivnost=true;
    this.obj_sp_aktivna={
      id:sp.id,
      aktivna:sp.aktivna
    }
  }

  spasi_aktivnost(){
    this.httpKlijent.post(MojConfig.adresa_servera+"/api/SpecijalnaPonudaProizvod/post_aktivna_sp"
      ,this.obj_sp_aktivna, MojConfig.http_opcije())
      .subscribe((x:any)=>
      {
        console.log("uspjesno spasena aktivnost");
        this.promijeni_aktivnost=false;
        this.obj_sp_aktivna=null;
        this.getSpecijalnePonude();
        this.getSpecijalnePonudeOpadajuci();
        this.getSpecijalnePonudeRastuci();
        this.getSpecijalnePonudeProizvod();
      })
  }

  dodajSPP() {
    this.naslov="Dodaj specijalnu ponudu za određeni proizvod";
    this.obj_spp={
      id:0,
      specijalnaPonudaId:this.specijalna_ponuda_id2,
      proizvodId:this.proizvod_id,
      popustId:this.popust_id,
      specijalnaPonudaOpis:"",
      proizvodOpis:"",
      popustOpis:"",
    };

    console.log("ob_spp: ",this.obj_spp)
  }


  postojiSP(sp:string){
    for(let i of this.specijalne_ponude){
      if(i.naziv === sp && i.id!==this.obj_sp.id)
        return true;
    }
    return false;
  }

  formatDatum(datum:any){
    if(datum=="" || datum==null) return "-";
    return formatDate(datum,"dd/MM/yyyy","en-Us");
  }

  jel_disabled_spp(){
    let brojac=0;
    for(let i of this.sp_rastuci){
      if(i.specijalnaPonudaId==this.obj_spp.specijalnaPonudaId && i.id!=this.obj_spp.id)
        brojac++;
    }
    if(brojac>=4)
      return true;
    else return false;
  }

  jel_disabled_snimi_spp(){
    let brojac=0;
    for (let i of this.specijalne_ponude_proizvodi){
      if(i.specijalnaPonudaId==this.obj_spp.specijalnaPonudaId)
        brojac++;
    }
    if(brojac>=4)
      return true;
    else return false;
  }

  SaljiMailSpecijalnePonude() {
    this.httpKlijent.post(MojConfig.adresa_servera + "/api/EmailPretplata/PosaljiSpecijalnePonude", {},
      { responseType: 'text' })
      .subscribe((povratnaVrijednost: any) => {
        console.log("Uspješno poslani mailovi.", povratnaVrijednost);
        // Handle success
      }, error => {
        console.error("Greška pri slanju mailova:", error);
        // Handle error
      });
  }



}
