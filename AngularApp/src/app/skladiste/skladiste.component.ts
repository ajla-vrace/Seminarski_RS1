import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-skladiste',
  templateUrl: './skladiste.component.html',
  styleUrls: ['./skladiste.component.css']
})
export class SkladisteComponent implements OnInit {

  constructor(private route: ActivatedRoute, private httpKlijent:HttpClient, private datePipe:DatePipe) { }



  zaposlenik_id:any;
  kolicinaF: number=0;
  nazivProizvoda: string="";
  odabrana_stavka: any;
  s: any;
  p: any;
  s_p:any;
  naslov: string="";
  kliknuoEdit:boolean=false;
  sortirajPoKolicina:string="Količina opadajući";
  sortirajPoNaziv:string="Proizvod opadajući";

  k_p_opadajuci:any;
  k_p_rastuci:any;
  k_rastuci_p_opadajuci:any;
  k_opadajuci_p_rastuci:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.zaposlenik_id=+s["id"];

      this.getProizvodi();
      this.getSkladista();
     // this.getSkladisteProizvod();
      this.getSkladisteProizvod_k_p_opadajuci();
      this.getSkladisteProizvod_k_p_rastuci();
      this.getSkladisteProizvod_k_opadajuci_p_rastuci();
      this.getSkladisteProizvod_k_rastuci_p_opadajuci();
      this.getProdavnice();
      this.getGradove();
    })
  }

  getSkladisteProizvod_k_p_opadajuci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SkladisteProizvod/kol_pr_opadajuci")
      .subscribe((x:any)=>{
        this.k_p_opadajuci=x;
        console.log(this.k_p_opadajuci);
       // this.k_p_opadajuci.datum_modifikacije=this.datePipe.transform(this.k_p_opadajuci.datum_modifikacije,"yyyy-MM-dd");
      })
  }

  getSkladisteProizvod_k_p_rastuci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SkladisteProizvod/kol_pr_rastuci")
      .subscribe((x:any)=>{
        this.k_p_rastuci=x;
        console.log(this.k_p_rastuci);
      })
  }

  getSkladisteProizvod_k_opadajuci_p_rastuci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SkladisteProizvod/kol_opadajuci_pr_rastuci")
      .subscribe((x:any)=>{
        this.k_opadajuci_p_rastuci=x;
        console.log(this.k_opadajuci_p_rastuci);
      })
  }

  getSkladisteProizvod_k_rastuci_p_opadajuci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SkladisteProizvod/kol_rastuci_pr_opadajuci")
      .subscribe((x:any)=>{
        this.k_rastuci_p_opadajuci=x;
        console.log(this.k_rastuci_p_opadajuci);
      })
  }

  getProizvodi(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Proizvod")
      .subscribe((x:any)=>{
        this.p=x;
        if(this.kliknuoEdit==false && this.odabrana_stavka!=null){
          this.odabrana_stavka.proizvodId=this.p[0].id; //defaultna vrijednost
          console.log(this.odabrana_stavka.proizvodId);
          console.log(this.p[0].id);
        }
      })
  }

  getSkladista(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Skladiste")
      .subscribe((x:any)=>{
        this.s=x;
        if(this.kliknuoEdit==false && this.odabrana_stavka!=null){
          this.odabrana_stavka.skladisteId=this.s[0].id; //defaultna vrijednost
        }

      })
  }

  getSkladisteProizvod(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SkladisteProizvod")
      .subscribe((x:any)=>{
        this.s_p=x;

        //this.s_p_opadajuci
      })

  }

  getFilterKolicinaNaziv(niz:any) {
    return niz?.filter((x:any)=>
        (
          this.nazivProizvoda ?
            x.proizvodOpis.toLowerCase().startsWith(this.nazivProizvoda.toLowerCase()) : niz
        )
        &&
        (
          this.kolicinaF?
            x.kolicina==(this.kolicinaF) : niz
        )
    )
  }

  getFilter(){
    if(this.sortirajPoKolicina=="Količina opadajući" && this.sortirajPoNaziv=="Proizvod opadajući"){
      return this.getFilterKolicinaNaziv(this.k_p_opadajuci);
    }
    else if(this.sortirajPoKolicina=="Količina rastući" && this.sortirajPoNaziv=="Proizvod rastući"){
      return this.getFilterKolicinaNaziv(this.k_p_rastuci);
    }
    else if(this.sortirajPoNaziv=="Količina opadajući" && this.sortirajPoKolicina=="Proizvod rastući"){
      return this.getFilterKolicinaNaziv(this.k_opadajuci_p_rastuci);
    }
    else{
      return this.getFilterKolicinaNaziv(this.k_rastuci_p_opadajuci);
    }
  }

  btnEdit(p: any) {
    this.kliknuoEdit=true;
    this.naslov="Modifikacija stavke: "+p.id;
    this.odabrana_stavka=p;


    console.log(this.odabrana_stavka);

    this.getProizvodi();
    this.getSkladista();
  }

  btnDelete(p: any) {
    this.kliknuoEdit=false;

    if(confirm("Da li stvarno želite obrisati ovu stavku?")){
      this.httpKlijent.delete(MojConfig.adresa_servera+"/api/SkladisteProizvod?id="+
        p.id).subscribe((x:any)=>{
        this.getSkladisteProizvod();
      })
    }
  }

  spasi() {
    this.kliknuoEdit=false;
    console.log(this.odabrana_stavka);
    this.httpKlijent.post(MojConfig.adresa_servera+"/api/SkladisteProizvod", this.odabrana_stavka)
      .subscribe((x:any)=>{
        this.odabrana_stavka=null;
        this.getSkladisteProizvod_k_rastuci_p_opadajuci();
        this.getSkladisteProizvod_k_opadajuci_p_rastuci();
        this.getSkladisteProizvod_k_p_rastuci();
        this.getSkladisteProizvod_k_p_opadajuci();
    })
  }

  btnDodaj() {

    this.kliknuoEdit=false;

    this.naslov="Dodaj stavku";

    this.odabrana_stavka={
      id:0,
      proizvodOpis:"",
      skladisteOpis:"",
      kolicina:0,
      proizvodId:0,
      skladisteId:0
    }
    this.getProizvodi();
    this.getSkladista();

  }


  kliknuoEditSkladista:boolean=false;
  obj_skladiste:any;
  gradovi:any;
  prodavnice:any;

  getProdavnice(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/Prodavnica/GetAllProdavnice/all")
      .subscribe((x:any)=>{
        this.prodavnice=x;
        console.log("PRODAVNICE: ", this.prodavnice);
      })
  }

  getGradove(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/Grad/GetAll")
      .subscribe((x:any)=>{
        this.gradovi=x;
        console.log("GRADOVI: ",this.gradovi);
      })
  }

  btnEditSkladiste(p:any){
    this.kliknuoEditSkladista=true;
    this.obj_skladiste=p;
    this.naslov="Modifikacija skladišta: "+p.id;
  }

  btnDeleteSkladiste(p:any){
    this.kliknuoEditSkladista=false;

    if(confirm("Brisanjem ovog zapisa brišete i sve stavke koje sadrže ovaj zapis. Da li ste sigurni da" +
      " želite izvršiti brisanje?")){
      this.httpKlijent.delete(MojConfig.adresa_servera+"/api/Skladiste?id="+p.id)
        .subscribe((x:any)=>{
          this.getSkladista();
        })
    }
  }

  btnDodajSkladiste(){
    this.kliknuoEditSkladista=false;
    this.naslov="Dodaj novo skladište";

    this.obj_skladiste={
      id:0,
      naziv:"",
      adresa:"",
      brojTelefona:"",
      povrsina:"",
      gradId:1,
      gradOpis:"",
      prodavnicaId:1,
      prodavnicaOpis:""
    }
  }

  spasi_skladiste(){
    this.httpKlijent.post(MojConfig.adresa_servera+"/api/Skladiste",this.obj_skladiste)
      .subscribe((x:any)=>{
        this.getSkladista();
        this.obj_skladiste=null;
        alert("Uspješno ste sačuvali promjene.");
      })
  }

  kliknuoEditProdavnicu:boolean=false;
  obj_prodavnica:any;

  btnDodajProdavnicu(){
    this.kliknuoEditProdavnicu=false;
    this.naslov="Dodaj novu prodavnicu.";

    this.obj_prodavnica={
      id:0,
      naziv:"",
      adresa:"",
      brojTelefona:"",
      gradId:1,
      gradOpis:""
    }
  }

  editProdavnicu(p:any){
    this.kliknuoEditProdavnicu=true;
    this.obj_prodavnica=p;
    this.naslov="Modifikacija prodavnice: "+p.id;
  }

  deleteProdavnicu(p:any){
    this.kliknuoEditProdavnicu=false;
    if(confirm("Brisanjem prodavnice brišete sve zapise koji sadrže ovaj zapis. Jeste li" +
      "sigurni da želite obrisati prodavnicu?")){
        this.httpKlijent.delete(MojConfig.adresa_servera+"/Prodavnica/DeleteProdavnica/prodId?id="
        +p.id).subscribe((x:any)=>{
          this.getProdavnice();
          this.getSkladista();
          this.getSkladisteProizvod();
        })
    }
  }

  spasi_prodavnicu(){
    this.httpKlijent.post(MojConfig.adresa_servera+"/Prodavnica/Snimi/Snimi",this.obj_prodavnica)
      .subscribe((x:any)=>{
        this.getProdavnice();
        this.obj_prodavnica=null;
        alert("Uspješno ste spasili promjene.");
      })

  }

}
