import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {NgModel} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {formatDate} from "@angular/common";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";

declare function porukaInfo(a: string):any;

@Component({
  selector: 'app-proizvodi',
  templateUrl: './proizvodi.component.html',
  styleUrls: ['./proizvodi.component.css']
})
export class ProizvodiComponent implements OnInit {

  constructor(private httpKlijent:HttpClient, private route:ActivatedRoute) { }

  proizvodi:any;
  proizvodi_rastuci:any;
  proizvod_opadajuci:any;
  odabrani_proizvod:any;
  podkategorije:any;
  kategorije:any;
  kolekcije:any;
  sezone:any;
  boje:any;
  sifre:any;
  odjeli:any;
  kliknuoPretrazi:boolean=false;
  kliknuoEdit:boolean=false;
  naslov:string="";
  staJeIzabrano: string="Sve";  //aktivni neaktivni proizvodi
  //paginacija
  totalLength:number=0;
  page:number=1;
  sortirajPo: string="Datum opadajući";


  zaposlenik_id:any;


  ngOnInit(): void {
  //  this.getProizvodPodaci();
    this.getProizvodRastuci();
    this.getProizvodOpadajuci();
    this.getKategorije();
    this.getSezone();
  //  this.getSezoneAtkivne();
    this.getBoje();
    this.getSifre();
    this.getOdjeli();

//    this.getSkladista();

    this.route.params.subscribe(s=>{
      this.zaposlenik_id=+s["id"];
    })

  }

  ///   /api/SkladisteProizvod/kol_pr_opadajuci

  skladistaProizvod:any;

  getSkladistaProizvod(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SkladisteProizvod/kol_pr_opadajuci",MojConfig.http_opcije()).subscribe((x:any)=>{
      this.skladistaProizvod=x;
      console.log(this.skladistaProizvod);
    })
  }

  skladista:any;

  getSkladista(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Skladiste",MojConfig.http_opcije()).subscribe((x:any)=>{
      this.skladista=x;
      console.log(this.skladista);
    })
  }

  getProizvodPodaci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Proizvod",MojConfig.http_opcije()).subscribe((x:any)=>{
      this.proizvodi=x;
      console.log(this.proizvodi);
    })

 /*   for (let d of this.proizvodi){
      let formattedDate=formatDate(this.proizvodi[d.id]?.datum_kreiranja,"dd/MM/yyyy",'en-US');
      this.proizvodi[d.id].datum_kreiranja=formattedDate;
    }
*/
  }

  getProizvodRastuci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Proizvod/datumRastuci",MojConfig.http_opcije()).subscribe((x:any)=>{
      this.proizvodi_rastuci=x;
/*
      this.proizvodi_rastuci.datum_kreiranja=formatDate(this.proizvodi_rastuci.datum_kreiranja,'dd/MM/yyyy',"en-US");
      this.proizvodi_rastuci.datum_modifikacije=formatDate(this.proizvodi_rastuci.datum_modifikacije,'dd/MM/yyyy',"en-US");
*/

      console.log(this.proizvodi_rastuci);
    })
  }

  getProizvodOpadajuci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Proizvod/datumOpadajuci",MojConfig.http_opcije()).subscribe((x:any)=>{
      this.proizvod_opadajuci=x;
/*
      this.proizvod_opadajuci.datum_kreiranja=formatDate(this.proizvod_opadajuci.datum_kreiranja,'dd/MM/yyyy',"en-US");
      this.proizvod_opadajuci.datum_modifikacije=formatDate(this.proizvod_opadajuci.datum_modifikacije,'dd/MM/yyyy',"en-US");
*/

      console.log("proizvod opadajuci",this.proizvod_opadajuci);
    })
  }

  kategorijaDefault:any;
  getKategorije(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Kategorija",MojConfig.http_opcije()).subscribe((x:any)=>{
      this.kategorije=x;
      this.kategorijaDefault=this.kategorije[0]?.id;
    })
  }

  getPodkategorijeByKatID(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Kategorija/GetPodkategorije?katID="+
      this.odabrani_proizvod?.kategorijaId,MojConfig.http_opcije()).subscribe((x:any)=>{
      this.podkategorije=x;
      console.log("getPodkatByKatId, podaci:",this.podkategorije);
      if(this.kliknuoEdit==false) //ako je dodavanje proizvoda, ovo ce bit difoltni podkategorijaID
      {
        if(this.podkategorije?.length>0)
           this.odabrani_proizvod.podkategorijaId=this.podkategorije[0]?.id;
        else
          this.podkategorije=[];
      }
    })

    console.log("getPodkatbyKatId, kliknuoEdit:",this.kliknuoEdit);
  }

  getKolekcijeBySezonaID2(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Sezona/getKolekcije?id="+
      this.odabrani_proizvod?.sezonaId,MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.kolekcije=x;
        if(this.kliknuoEdit==false) //ako je dodavanje proizvoda, ovo ce bit difoltni kolekcijaID
        {
          if(this.kolekcije.length>0)
            this.odabrani_proizvod.kolekcijaId=this.kolekcije[0]?.id;
          else
            this.kolekcije=[];
        }
      });
  }


  sezonaDefaultno:any;
  kolekcijaDefaultno:any;

  getSezone(){

    // /api/Sezona/sezone
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Sezona/sezone_kolekcija",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.sezone=x;
       // if(this.kliknuo_add_sezkol==true)
        this.sezonaDefaultno=x[0]?.id;
        if(this.obj_sezkol!=null && this.odabrani!=null)
          this.obj_sezkol.sezonaId=this.sezonaDefaultno;
        console.log("x",x);
        if(this.kliknuo_add_sezkol==false){
          if(this.obj_sezkol!=null && this.odabrani!=null)
            this.obj_sezkol.sezonaId=this.odabrani.sezonaId;
        }
      })
    console.log("sezona defaultno",this.sezonaDefaultno);
  }

  sezone_aktivne:any;
  getSezoneAtkivne(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Sezona/sezone_aktivne",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.sezone_aktivne=x;
        this.sezonaDefaultno=x[0]?.id;
        if(this.obj_sezkol!=null && this.odabrani!=null)
          this.obj_sezkol.sezonaId=this.sezonaDefaultno;
        console.log("x",x);
        if(this.kliknuo_add_sezkol==false){
          if(this.obj_sezkol!=null && this.odabrani!=null)
            this.obj_sezkol.sezonaId=this.odabrani.sezonaId;
        }
      })
    console.log("sezone aktivne", this.sezone_aktivne);
  }

  kolekcije_aktivne:any;
  getKolekcijeBySezonaIDaktivne(sezonaId:any){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Sezona/getKolekcije_aktivne?id="+sezonaId,MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.kolekcije_aktivne=x;
        console.log("kolekcije_aktivne",x);
        console.log("sezonaId",sezonaId);

        if(this.kliknuo_add_sezkol==true) {
          if(this.kolekcije_aktivne.length>0){
            this.obj_sezkol.kolekcijaId=x[0]?.id;
            // this.kolekcijaDefaultno=this.obj_sezkol.kolekcijaId;
            this.kolekcijaDefaultno=x[0]?.id;
          }
          else
            this.kolekcije_aktivne=[];
        }
        else {
          console.log("obj_sezkol.kolekcijaId,",this.odabrani?.kolekcijaId);
          this.obj_sezkol.kolekcijaId=this.odabrani?.kolekcijaId;
        }

      })
  }


  getKolekcijeBySezonaID(sezonaId:any){  //+this.obj_sezkol.sezonaId
    /*
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Sezona/getKolekcije?id="+
    this.odabrani_proizvod.sezonaId,MojConfig.http_opcije()).subscribe((x:any)=>{
      this.kolekcije=x;
      if(this.kliknuoEdit==false)
      {
        if(this.kolekcije.length>0)
           this.odabrani_proizvod.kolekcijaId=this.kolekcije[0].id;
        else
          this.kolekcije=[];
      }
    })
    */

    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Sezona/getKolekcije?id="+
      sezonaId,MojConfig.http_opcije()).subscribe((x:any)=>{
      this.kolekcije=x;
      console.log("kolekcije",x);
      console.log("sezonaId",sezonaId);

      if(this.kliknuo_add_sezkol==true) {
        if(this.kolekcije.length>0){
          this.obj_sezkol.kolekcijaId=x[0]?.id;
         // this.kolekcijaDefaultno=this.obj_sezkol.kolekcijaId;
          this.kolekcijaDefaultno=x[0]?.id;
        }
        else
          this.kolekcije=[];
      }
      else {
        /*
       if(this.obj_sezkol!=null && this.odabrani!=null)
         this.obj_sezkol.kolekcijaId=this.odabrani.kolekcijaId;
       else
         this.obj_sezkol.kolekcijaId=this.kolekcije[0]?.id;

         */
        console.log("obj_sezkol.kolekcijaId,",this.odabrani?.kolekcijaId);
        this.obj_sezkol.kolekcijaId=this.odabrani?.kolekcijaId;
      }

    })


  }

  getBoje(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Boja",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.boje=x;
      })
  }

  getSifre(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Proizvod/sifra",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.sifre=x;
      })
  }

  getOdjeli(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Proizvod/odjeli",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.odjeli=x;
      })
  }



  EditDugme(p: any) {
    this.naslov="Edit proizvoda (Šifra: "+p.sifra+")";
    this.kliknuoEdit=true;
  //  this.odabrani_proizvod.kolekcijaOpis="";
  //  this.odabrani_proizvod.sezonaOpis="";

  //  this.getPodkategorijeByKatID();
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Kategorija/GetPodkategorije?katID="+
      p?.kategorijaId,MojConfig.http_opcije()).subscribe((x:any)=>{
        this.podkategorije=x;
        console.log("podkategorije u edit");
    });

   // this.getKolekcijeBySezonaID2();
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Sezona/getKolekcije?id="+
      p?.sezonaId,MojConfig.http_opcije()).subscribe((x:any)=>{
        this.kolekcije=x;
        console.log("kolekcije u edit");
    })

    setTimeout(()=>{
      this.odabrani_proizvod=p;
      this.odabrani_proizvod.modifikovao=AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.username;
      console.log("odabarani proizvod u edit");
    },500)

  }

  DeleteDugme(p: any) {

    this.kliknuoEdit=false;

    if(confirm("Jeste li sigurni da želite obrisati ovaj zapis?"))
      this.httpKlijent.delete(MojConfig.adresa_servera + "/api/Proizvod?id=" + p.id,MojConfig.http_opcije())
        .subscribe((x: any) => {
          this.getProizvodOpadajuci();
          this.getProizvodRastuci();
          alert("Zapis uspješno obrisan");
        })

  }

  filtering(x:any, p:any):any{
    return ( x?.naziv?.toLowerCase().includes(p?.toLowerCase()) ||
      x?.opis.toLowerCase().includes(p?.toLowerCase()) || x?.bojaOpis?.toLowerCase().includes(p?.toLowerCase())
      || x?.podkategorijaOpis?.toLowerCase().includes(p?.toLowerCase()) || x?.kategorijaOpis?.toLowerCase().includes(p?.toLowerCase())
      || x?.sezonaOpis?.toLowerCase().includes(p?.toLowerCase()) || x?.kolekcijaOpis?.toLowerCase().includes(p?.toLowerCase())
      || x?.sifra.toString().toLowerCase().includes(p?.toLowerCase())|| x?.odjelOpis?.toLowerCase().includes(p?.toLowerCase()))
  }

  filterNiz(niz:any, p:any):any{

    let aktivnost=this.staJeIzabrano=="Aktivan"?true:false;

    if(this.staJeIzabrano=="Sve"){
     /* if(this.kliknuoPretrazi){
        let data=niz.filter((x:any)=>( this.filtering(x,p)));
        this.totalLength=data?.length>0?data.length:0;
        return data;
      }
      else {
        this.totalLength = niz?.length>0 ? niz.length : 0;
        return niz;
      } */
      let data=niz?.filter((x:any)=>( this.filtering(x,p)));
      this.totalLength=data?.length>0?data?.length:0;
      return data;
    }
    else {
     /* if (this.kliknuoPretrazi) {
        let data=niz.filter((x: any) => (((this.filtering(x,p)) && x.aktivan == aktivnost)));
        this.totalLength=data?.length>0?data.length:0;
        return data;
      } else{
        let data2=niz.filter((x:any)=>(x.aktivan==aktivnost));
        this.totalLength=data2?.length>0?data2.length:0;
        return data2;
      }*/
      let data=niz?.filter((x: any) => (((this.filtering(x,p)) && x.aktivan == aktivnost)));
      this.totalLength=data?.length>0?data?.length:0;
      return data;
    }
  }


  pretraga_vrijednost:any="";
  getFilterProizvodi() {  //(p: string)
    //if(p==null) p="";
    //this.pretraga_vrijednost=p;

    if(this.sortirajPo=="Datum opadajući"){
      return this.filterNiz(this.proizvod_opadajuci,this.pretraga_vrijednost);
    }
    else{
      return this.filterNiz(this.proizvodi_rastuci,this.pretraga_vrijednost);
    }

  }

  dodajProizvod() {
    this.kliknuoEdit=false;

    this.naslov="Dodaj novi proizvod";

    this.odabrani_proizvod={
      id:0,
      sifra:0,
      naziv:"",
      cijena:1.0,
      opis:"",
      aktivan:true,
      bojaId:1,
      bojaOpis:"",
      odjelId:1,
      odjelOpis:"",
      podkategorijaOpis:"",
      kategorijaOpis:"",
      sezonaOpis:"",
      kolekcijaOpis:"",
     // modifikovao:AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.username,
     // skladisteId:1,
     // kolicina:1
      evidentirao:AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.username,

  }

    //mozda su viska getKategorije i getSezone, u objektu mozemo
    //postaviti difoltnu vrijednost
    this.getKategorije();
    this.odabrani_proizvod.kategorijaId=this.kategorijaDefault; //difoltna vrijednost
    this.getPodkategorijeByKatID();

    this.getSezone();
    this.odabrani_proizvod.sezonaId=this.sezonaDefaultno; //difotna vrijednost
    this.getKolekcijeBySezonaID2();

  }


  dozvoljenaSifra(sifra: string) {
    for(let s of this.sifre){
      if(s==sifra)
        return false;
    }
    return true;
  }

  jelOmogucenSave(sifraControll: NgModel, sifraInput: HTMLInputElement, nazivControll: NgModel, cijenaControll: NgModel, opisControll: NgModel,
                  bojaControll:NgModel,
                  podkatControll: NgModel, katControll: NgModel,
                  sezonaControll:NgModel, kolekcijaControll:NgModel
  ) {
    if(this.kliknuoEdit==true){
      if(nazivControll.valid && cijenaControll.valid && opisControll.valid && this.boje?.length>0
        && this.podkategorije?.length>0 && this.kategorije?.length>0 && this.kolekcije?.length>0  && this.sezone?.length>0
      ){
      //  console.log(this.podkategorije?.length);
        return false;
      }
      else return true;
    }
    else{
      if(sifraControll.valid && this.dozvoljenaSifra(sifraInput.value) && nazivControll.valid && cijenaControll.valid && opisControll.valid
        && this.boje?.length>0
        && this.podkategorije?.length>0 && this.kategorije?.length>0 && this.kolekcije?.length>0  && this.sezone?.length>0
      ){
        return false;
      }
      else return true;
    }
  }

//  /api/Proizvod/drugiNacin

  spasi(o: any) {
    this.httpKlijent.post(MojConfig.adresa_servera+"/api/Proizvod",o,MojConfig.http_opcije()).subscribe(
      (x:any)=>{
        this.getProizvodOpadajuci();
        this.getProizvodRastuci();
     //   this.getSkladistaProizvod();
        this.odabrani_proizvod=null;
        this.kliknuoEdit=false;
      }
    )
  }

  jelDisabledSifra(p: any) {
    if(p.id==0)
      return false;
    else
      return true;
  }

  jelUnesenaNula(cijena: string) {
    let parsirana=parseFloat(cijena);
    if(parsirana==0.0)
      return true;
    return false;
  }



  //slike

  slike_by_proizvodId:any;
  listaobjekataProizvodSlike:any;

  getSlikeByProizvodId(p:number){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/ProizvodSlika/slikaByProizvodId?id="
    +p,MojConfig.http_opcije()).subscribe((x:any)=>{
      this.slike_by_proizvodId=x;
      console.log(this.slike_by_proizvodId);
    })
  }

  getSlikeByProizvodId_2nacin(p:number){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/ProizvodSlika/slikeByProizvodId_2?proizvod_id="
      +p,MojConfig.http_opcije()).subscribe((x:any)=>{
      this.listaobjekataProizvodSlike=x;
      console.log(this.listaobjekataProizvodSlike);
    })
  }


  proizvod_id:any;
  proizvod_sifra:any;
  kliknuoDodajSliku:boolean=false;
  slika_proizvod_objekat:any;

  dodajSliku(p: any) {

    console.log(p.id);

    this.kliknuoDodajSliku=true;
    this.proizvod_id=p.id;
    this.proizvod_sifra=p.sifra;

    this.slika_proizvod_objekat={
      id:0,
      proizvodId:this.proizvod_id,
      proizvodOpis:"",
      slika_nova:""
    }

    //this.getSlikeByProizvodId(this.proizvod_id);
    this.getSlikeByProizvodId_2nacin(this.proizvod_id);
  }

  generisi_preview() {
    // @ts-ignore
    var file = document.getElementById("slika-input").files[0];
    if (file) {
      var reader = new FileReader();
      let this2 = this;
      reader.onload = function () {
        this2.slika_proizvod_objekat.slika_nova = reader.result?.toString();
      }
      console.log("file: ", file);
      reader.readAsDataURL(file);
    }
  }

  snimi_sliku() {
    this.kliknuoDodajSliku=false;

    this.httpKlijent.post(MojConfig.adresa_servera+"/api/ProizvodSlika", this.slika_proizvod_objekat,MojConfig.http_opcije())
      .subscribe(x=>{
        this.getProizvodOpadajuci();
        this.getProizvodRastuci();
        this.get_slika_novi_request_FS(this.slika_proizvod_objekat.proizvodId);
        this.slika_proizvod_objekat=null;
      });
  }


  get_slika_FS(p: any) {
    return "data:image/jpg;base64,"+p.fileContents;
  }

  get_slika_novi_request_FS(p_id:any) {
    return `${MojConfig.adresa_servera}/api/Proizvod/slika_id_fs?id=`+p_id;
  }
  get_slika_base64_DB(p:any) {
    if(p?.slika_postojeca==null) return "";
    return "data:image/jpg;base64,"+ p?.slika_postojeca;
  }

  get_slika_base64_FS(p:any) {
    if(p!=null && p.slika_postojeca!=null)
      return "data:image/jpg;base64,"+ p?.slika_postojeca;
    return this.noimage;
  ///   return "data:image/jpg;base64,"+p.slika_postojeca;
  }

  noimage:any="data:@file/jpeg;base64,/9j/4AAQSkZJRgABAQAAZABkAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wgALCADIAN8BAREA/8QAGwABAAMBAQEBAAAAAAAAAAAAAAUGBwMBBAL/2gAIAQEAAAAA24AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAi/i8Ak/vAABXbEOf57eQFgAABXbE59M+idX8gLAAACu2Ks5bsEpxjZuAsAAAK7zyHn9mw55Wtd7WAAAFOy3ke+Ouv2QAAEPXgFpkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//EADoQAAEDAQMGCwgCAwEAAAAAAAECAwQFAAYREiEwMUDREBMWF1FUVmGRkrIHFCI1NkFzdCCBFTJScf/aAAgBAQABPwDazth2w7YdsO2HbDth2w6Ks1lNHRHxivSFyHOLQhrDEnDH725SzOzlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUszs5U/Knfaj1RFYpyJjbS2kqUpOQvWCDhoTory/MqB+8PSf4vPNR2i684httOtSzgBaNMjTG+MjPtvIGbFtQI4DqNrl/TqPzO+s6E6K8vzKgfvD0nhS+yp9bCXUF1ABUgHOAdWI4PaeZXFQcnK90+LKw1Zf2x/q3s4965Qr4rK934o8d0d3948B1G1y/p1H5nfWdCdFeX5lQP3h6TwXsvY1QY5YYKXJ6x8KdYQOk7rRK3Ph1b/JNyFGSVYrUo45fSD3Wu9eGLeCCHmiEPJzOtE50ndZ5hqS0Wn20ONq1pWMQbNswaVFWptpmKwgZSylISB3m1EvVTq7Jfjx1FLjZOSlebjE/9Cx1G1y/p1H5nfWdCdFeX5lQP3h6Ta9l7GaFHLDBS5PWPhT9kDpO60iQ9KkLffcU46s4qUo5yeCmVOVSZyJcRwocSdX2UOg91qJeeDWKYqXxiWVNJxfQo/wCnf/5a917nK48YsVSkQEHMNRcPSe7utHkPRJCH2HFNuoOKVJOcG11b1tV6NxLxS3ObT8SPssdI3WuX9OI/M76zoTovaBMdp8Wmy2cONaklScRmxyTaRIelyFvvuKcdWcVKUcST/ALUkKCVEBQwIB1jhjyHYj6H2HFNuoOKVJOBBtcRZXdSOtWdSnHCfMdCdFeG77F4YrTD7zjQbXlgoAz5sPvbmxp/X5Pgm3NjT+vyfBNubGn9fk+Cbc2NP6/J8E25saf1+T4JtzY0/r8nwTbmxp/X5Pgm3NjT+vyfBNqLSm6LTG4LTinEIJIUrXnOOhO2HbDth2w7YdsO2HbDtht//9k=";

  obrisiSliku(id_slikaProizvod:any) {
    if(confirm("Jeste li sigurni da želite izbrisati sliku?")){
      this.httpKlijent.delete(MojConfig.adresa_servera+"/api/ProizvodSlika/"+id_slikaProizvod,MojConfig.http_opcije())
        .subscribe((res:any)=>{
          this.getSlikeByProizvodId_2nacin(this.proizvod_id);
        })
    }
  }


  formatDatum(datum:any){
    if(datum=="" || datum==null) return "-";
    return formatDate(datum,"dd/MM/yyyy","en-Us");
  }

  obj_sezkol:any;
  odabrani:any;
  kliknuo_add_sezkol:boolean=false;

  sezonaIdparametar:any;

  dodajSezonuIKolekcij(p_id:any, p:any){
    this.odabrani=p;
    console.log("odabrani:",this.odabrani);

   // this.getSezone();

    this.obj_sezkol={
      proizvod_id:p_id,
    }

    if(this.odabrani?.sezonaId!=null && this.odabrani?.kolekcijaId!=null){
      this.naslov="Edituj sezonu i kolekciju za proizvod: "+this.odabrani.sifra;
      this.obj_sezkol.sezonaId=this.odabrani?.sezonaId;
      this.getKolekcijeBySezonaID(this.odabrani?.sezonaId);
    //  this.getKolekcijeBySezonaIDaktivne(this.odabrani?.sezonaId);
     // this.obj_sezkol.kolekcijaId=this.odabrani?.kolekcijaId;
    }
    else{
      this.kliknuo_add_sezkol=true;
      this.getSezone();
     // this.getSezoneAtkivne();
      this.naslov="Dodaj sezonu i kolekciju za proizvod: "+this.odabrani.sifra;
     // this.obj_sezkol.sezonaId=this.sezonaDefaultno;
      let sezId=this.sezonaDefaultno;
      this.getKolekcijeBySezonaID(sezId);
     // this.getKolekcijeBySezonaIDaktivne(sezId);
     // this.obj_sezkol.kolekcijaId=this.kolekcijaDefaultno;
    }
    //console.log("sezId:",this.obj_sezkol.sezonaId,"kolId:",this.obj_sezkol.kolekcijaId);
    this.obj_sezkol.modifikovao=AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.username;

  }


  getColor(){
    if(this.kliknuo_add_sezkol==true)
      return "blue";
    else return "green";
  }

  spasi_sezkol(){

    this.httpKlijent.post(MojConfig.adresa_servera+"/api/Proizvod/sezkol",this.obj_sezkol)
      .subscribe((x:any)=>{
        this.obj_sezkol=null;
        this.kliknuo_add_sezkol=false;
        this.getProizvodOpadajuci();
        this.getProizvodRastuci();
      });
  }

  jel_dozvoljen_save_sezkol(){
    if(this.kolekcije?.length>0  && this.sezone?.length>0)
      return true;
    return false;
  }


  obj_ponisti_sezkol:any;
  ponistiSezKol(){

    this.obj_ponisti_sezkol={
      proizvod_id:this.obj_sezkol?.proizvod_id,
      modifikovao:AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.username
    }

    this.httpKlijent.post(MojConfig.adresa_servera+"/api/Proizvod/ponisti_sezkol",this.obj_ponisti_sezkol,MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.obj_sezkol=null;
        this.getProizvodOpadajuci();
        this.getProizvodRastuci();
        porukaInfo("Uspješno ste poništili sezonu i kolekciju za dati proizvod!");
      })
  }
}
