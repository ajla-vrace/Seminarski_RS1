import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {NgModel} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {formatDate} from "@angular/common";

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
    this.getProizvodOpadajući();
    this.getKategorije();
    this.getSezone();
    this.getBoje();
    this.getSifre();
    this.getOdjeli();

    this.route.params.subscribe(s=>{
      this.zaposlenik_id=+s["id"];
    })

  }

  getProizvodPodaci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Proizvod").subscribe((x:any)=>{
      this.proizvodi=x;
      console.log(this.proizvodi);
    })
  }

  getProizvodRastuci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Proizvod/datumRastuci").subscribe((x:any)=>{
      this.proizvodi_rastuci=x;
/*
      this.proizvodi_rastuci.datum_kreiranja=formatDate(this.proizvodi_rastuci.datum_kreiranja,'dd/MM/yyyy',"en-US");
      this.proizvodi_rastuci.datum_modifikacije=formatDate(this.proizvodi_rastuci.datum_modifikacije,'dd/MM/yyyy',"en-US");
*/

      console.log(this.proizvodi_rastuci);
    })
  }

  getProizvodOpadajući(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Proizvod/datumOpadajuci").subscribe((x:any)=>{
      this.proizvod_opadajuci=x;
/*
      this.proizvod_opadajuci.datum_kreiranja=formatDate(this.proizvod_opadajuci.datum_kreiranja,'dd/MM/yyyy',"en-US");
      this.proizvod_opadajuci.datum_modifikacije=formatDate(this.proizvod_opadajuci.datum_modifikacije,'dd/MM/yyyy',"en-US");
*/

      console.log(this.proizvod_opadajuci);
    })
  }

  getKategorije(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Kategorija").subscribe((x:any)=>{
      this.kategorije=x;
    })
  }

  getPodkategorijeByKatID(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Kategorija/GetPodkategorije?katID="+
      this.odabrani_proizvod.kategorijaId).subscribe((x:any)=>{
      this.podkategorije=x;
      if(this.kliknuoEdit==false){
        if(this.podkategorije.length>0)
           this.odabrani_proizvod.podkategorijaId=this.podkategorije[0].id;
        else
          this.podkategorije=[];
      }


    })
  }

  getSezone(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Sezona/sezone")
      .subscribe((x:any)=>{
        this.sezone=x;
      })
  }

  getKolekcijeBySezonaID(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Sezona/getKolekcije?id="+
    this.odabrani_proizvod.sezonaId).subscribe((x:any)=>{
      this.kolekcije=x;
      if(this.kliknuoEdit==false){
        if(this.kolekcije.length>0)
           this.odabrani_proizvod.kolekcijaId=this.kolekcije[0].id;
        else
          this.kolekcije=[];
      }
    })
  }

  getBoje(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Boja")
      .subscribe((x:any)=>{
        this.boje=x;
      })
  }

  getSifre(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Proizvod/sifra")
      .subscribe((x:any)=>{
        this.sifre=x;
      })
  }

  getOdjeli(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Proizvod/odjeli")
      .subscribe((x:any)=>{
        this.odjeli=x;
      })
  }



  EditDugme(p: any) {
    this.kliknuoEdit=true;
    this.odabrani_proizvod=p;

    this.naslov="Edit proizvoda (ID: "+p.id+")";

    this.getPodkategorijeByKatID();
    this.getKolekcijeBySezonaID();

  }

  DeleteDugme(p: any) {

    this.kliknuoEdit=false;

    if(confirm("Jeste li sigurni da želite obrisati ovaj zapis?"))
      this.httpKlijent.delete(MojConfig.adresa_servera + "/api/Proizvod?id=" + p.id)
        .subscribe((x: any) => {
          this.getProizvodPodaci();
          alert("Zapis uspješno obrisan");
        })

  }

  filtering(x:any, p:any):any{
    return ( x.naziv.toLowerCase().includes(p.toLowerCase()) ||
      x.opis.toLowerCase().includes(p.toLowerCase()) || x.bojaOpis.toLowerCase().includes(p.toLowerCase())
      || x.podkategorijaOpis.toLowerCase().includes(p.toLowerCase()) || x.kategorijaOpis.toLowerCase().includes(p.toLowerCase())
      || x.sezonaOpis.toLowerCase().includes(p.toLowerCase()) || x.kolekcijaOpis.toLowerCase().includes(p.toLowerCase())
      || x.odjelOpis.toLowerCase().includes(p.toLowerCase()))
  }

  filterNiz(niz:any, p:any):any{

    let aktivnost=this.staJeIzabrano=="Aktivan"?true:false;

    if(this.staJeIzabrano=="Sve"){
      if(this.kliknuoPretrazi){
        let data=niz.filter((x:any)=>( this.filtering(x,p)));
        this.totalLength=data?.length>0?data.length:0;
        return data;
      }
      else {
        this.totalLength = niz?.length>0 ? niz.length : 0;
        return niz;
      }
    }
    else {
      if (this.kliknuoPretrazi) {
        let data=niz.filter((x: any) => (((this.filtering(x,p)) && x.aktivan == aktivnost)));
        this.totalLength=data?.length>0?data.length:0;
        return data;
      } else{
        let data2=niz.filter((x:any)=>(x.aktivan==aktivnost));
        this.totalLength=data2?.length>0?data2.length:0;
        return data2;
      }
    }
  }


  getFilterProizvodi(p: string) {
    if(p==null) p="";

    if(this.sortirajPo=="Datum opadajući"){
      return this.filterNiz(this.proizvod_opadajuci,p);
    }
    else{
      return this.filterNiz(this.proizvodi_rastuci,p);
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
      kolekcijaOpis:""
    }

    //mozda su viska getKategorije i getSezone, u objektu mozemo
    //postaviti difoltnu vrijednost
    this.getKategorije();
    this.odabrani_proizvod.kategorijaId=1; //difoltna vrijednost
    this.getPodkategorijeByKatID();

    this.getSezone();
    this.odabrani_proizvod.sezonaId=1; //difotna vrijednost
    this.getKolekcijeBySezonaID();

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
                  sezonaControll:NgModel, kolekcijaControll:NgModel) {
    if(this.kliknuoEdit==true){
      if(nazivControll.valid && cijenaControll.valid && opisControll.valid && katControll.valid
        && bojaControll.valid && podkatControll.valid && sezonaControll.valid && kolekcijaControll.valid
      ){
        return false;
      }
      else return true;
    }
    else{
      if(sifraControll.valid && this.dozvoljenaSifra(sifraInput.value) && nazivControll.valid && cijenaControll.valid && opisControll.valid && katControll.valid
        && bojaControll.valid && podkatControll.valid && sezonaControll.valid && kolekcijaControll.valid
      ){
        return false;
      }
      else return true;
    }
  }

  spasi(o: any) {
    this.httpKlijent.post(MojConfig.adresa_servera+"/api/Proizvod",o).subscribe(
      (x:any)=>{
        this.getProizvodPodaci();
        this.odabrani_proizvod=null;
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

  getSlikeByProizvodId(p:number){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/ProizvodSlika/slikaByProizvodId?id="
    +p).subscribe((x:any)=>{
      this.slike_by_proizvodId=x;
      console.log(this.slike_by_proizvodId);
    })
  }



  proizvod_id:any;
  kliknuoDodajSliku:boolean=false;
  slika_proizvod_objekat:any;

  dodajSliku(p: any) {

    console.log(p.id);

    this.kliknuoDodajSliku=true;
    this.proizvod_id=p.id;

    this.slika_proizvod_objekat={
      id:0,
      proizvodId:this.proizvod_id,
      proizvodOpis:"",
      slika_nova:""
    }

    this.getSlikeByProizvodId(this.proizvod_id);

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

    this.httpKlijent.post(MojConfig.adresa_servera+"/api/ProizvodSlika", this.slika_proizvod_objekat)
      .subscribe(x=>{
        this.slika_proizvod_objekat=null;
        this.getProizvodPodaci();
      });
  }


  get_slika_FS(p: any) {
    return "data:image/png;base64,"+p.fileContents;
  }

}
