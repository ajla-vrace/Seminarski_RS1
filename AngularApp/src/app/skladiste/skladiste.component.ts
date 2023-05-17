import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {DatePipe, formatDate} from "@angular/common";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";

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


  proizvodID:any;
  skladisteID:any;
  prodavnicaID:any;
  gradID:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.zaposlenik_id=+s["id"];

      this.getProizvodi();
      this.getProizvodRastuci();
      this.getSkladista();
     // this.getSkladisteProizvod();
      this.getSkladisteProizvod_k_p_opadajuci();
      this.getSkladisteProizvod_k_p_rastuci();
      this.getSkladisteProizvod_k_opadajuci_p_rastuci();
      this.getSkladisteProizvod_k_rastuci_p_opadajuci();
      this.getProizvodRastuci();
      this.getKolicinaRastuci();
      this.getProizvodOpadajuci();
      this.getKolicinaOpadajuci();
      this.getProdavnice();
      this.getGradove();
    })
  }

  kolicina_x:boolean=false;
  proizvod_x:boolean=false;
  kol_rastuci:any;
  kol_opadajuci:any;
  pr_rastuci:any;
  pr_opadajuci:any;

  getProizvodRastuci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SkladisteProizvod/pr_rastuci",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.pr_rastuci=x;
        console.log(this.pr_rastuci);
      })
  }

  getProizvodOpadajuci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SkladisteProizvod/pr_opadajuci",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.pr_opadajuci=x;
        console.log(this.pr_opadajuci);
      })
  }

  getKolicinaRastuci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SkladisteProizvod/kol_rastuci",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.kol_rastuci=x;
        console.log(this.kol_rastuci);
      })
  }

  getKolicinaOpadajuci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SkladisteProizvod/kol_opadajuci",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.kol_opadajuci=x;
        console.log(this.kol_opadajuci);
      })
  }

  getSkladisteProizvod_k_p_opadajuci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SkladisteProizvod/kol_pr_opadajuci",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.k_p_opadajuci=x;
        console.log(this.k_p_opadajuci);
       // this.k_p_opadajuci.datum_modifikacije=this.datePipe.transform(this.k_p_opadajuci.datum_modifikacije,"yyyy-MM-dd");
      })
  }

  getSkladisteProizvod_k_p_rastuci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SkladisteProizvod/kol_pr_rastuci",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.k_p_rastuci=x;
        console.log(this.k_p_rastuci);
      })
  }

  getSkladisteProizvod_k_opadajuci_p_rastuci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SkladisteProizvod/kol_opadajuci_pr_rastuci",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.k_opadajuci_p_rastuci=x;
        console.log(this.k_opadajuci_p_rastuci);
      })
  }

  getSkladisteProizvod_k_rastuci_p_opadajuci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SkladisteProizvod/kol_rastuci_pr_opadajuci",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.k_rastuci_p_opadajuci=x;
        console.log(this.k_rastuci_p_opadajuci);
      })
  }

  getProizvodi(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Proizvod/naziv_asc",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.p=x;
        if(this.kliknuoEdit==false && this.odabrana_stavka!=null){
          this.proizvodID=this.p[0]?.id;
          this.odabrana_stavka.proizvodId=this.p[0].id; //defaultna vrijednost
          console.log(this.odabrana_stavka.proizvodId);
          console.log(this.p[0].id);
        }
      })
  }


  totalLength2:any;
  page2:any;
  getSkladista(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Skladiste",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.s=x;
        if(this.kliknuoEdit==false && this.odabrana_stavka!=null){
          this.skladisteID=this.s[0].id;
          this.odabrana_stavka.skladisteId=this.s[0].id; //defaultna vrijednost
        }

        this.totalLength2=this.s?.length;
        console.log("SKLADISTA: ", this.s);

      })
  }

  getSkladisteProizvod(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SkladisteProizvod",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.s_p=x;

        //this.s_p_opadajuci
      })

  }

  totalLength1:any;
  page1:any;

  getFilterKolicinaNaziv(niz:any) {
    let podaci = niz?.filter((x:any)=>
      (
        this.nazivProizvoda ?
          ( x.proizvodOpis.toLowerCase().includes(this.nazivProizvoda.toLowerCase())
          || x.odjel.toLowerCase().includes(this.nazivProizvoda.toLowerCase())): niz
      )
      &&
      (
        this.kolicinaF?
          x.kolicina==(this.kolicinaF) : niz
      )
    );

    this.totalLength1=podaci?.length;
    return podaci;
  }

  getFilter(){
    if(this.proizvod_x==false && this.kolicina_x==false)
     {
      if (this.sortirajPoKolicina == "Količina opadajući" && this.sortirajPoNaziv == "Proizvod opadajući") {
        return this.getFilterKolicinaNaziv(this.k_p_opadajuci);
      } else if (this.sortirajPoKolicina == "Količina rastući" && this.sortirajPoNaziv == "Proizvod rastući") {
        return this.getFilterKolicinaNaziv(this.k_p_rastuci);
      } else if (this.sortirajPoNaziv == "Količina opadajući" && this.sortirajPoKolicina == "Proizvod rastući") {
        return this.getFilterKolicinaNaziv(this.k_opadajuci_p_rastuci);
      } else if (this.sortirajPoKolicina == "Količina rastući" && this.sortirajPoNaziv == "Proizvod opadajući") {
        return this.getFilterKolicinaNaziv(this.k_rastuci_p_opadajuci);
      }
    }

    else if(this.proizvod_x==false && this.kolicina_x==true){
      if(this.sortirajPoNaziv == "Proizvod opadajući")
        return this.getFilterKolicinaNaziv(this.pr_opadajuci);
      else if (this.sortirajPoNaziv=="Proizvod rastući")
        return this.getFilterKolicinaNaziv(this.pr_rastuci);
    }
    else if(this.proizvod_x==true && this.kolicina_x==false){
      if(this.sortirajPoKolicina == "Količina opadajući")
        return this.getFilterKolicinaNaziv(this.kol_opadajuci);
      else if (this.sortirajPoKolicina=="Količina rastući")
        return this.getFilterKolicinaNaziv(this.kol_rastuci);
    }

  }


  getPodatke(){
    if(this.proizvod_x==false && this.kolicina_x==false)
    {
      if (this.sortirajPoKolicina == "Količina opadajući" && this.sortirajPoNaziv == "Proizvod opadajući") {
        this.getSkladisteProizvod_k_p_opadajuci();
      } else if (this.sortirajPoKolicina == "Količina rastući" && this.sortirajPoNaziv == "Proizvod rastući") {
        this.getSkladisteProizvod_k_p_rastuci();
      } else if (this.sortirajPoNaziv == "Količina opadajući" && this.sortirajPoKolicina == "Proizvod rastući") {
        this.getSkladisteProizvod_k_opadajuci_p_rastuci();
      } else if (this.sortirajPoKolicina == "Količina rastući" && this.sortirajPoNaziv == "Proizvod opadajući") {
        this.getSkladisteProizvod_k_rastuci_p_opadajuci();
      }
    }

    else if(this.proizvod_x==false && this.kolicina_x==true){
      if(this.sortirajPoNaziv == "Proizvod opadajući")
        this.getProizvodOpadajuci();
      else if (this.sortirajPoNaziv=="Proizvod rastući")
        this.getProizvodRastuci();
    }
    else if(this.proizvod_x==true && this.kolicina_x==false){
      if(this.sortirajPoKolicina == "Količina opadajući")
        this.getKolicinaOpadajuci();
      else if (this.sortirajPoKolicina=="Količina rastući")
        this.getKolicinaRastuci();
    }

  }

  btnEdit(p: any) {
    this.kliknuoEdit=true;
    this.naslov="Modifikacija stavke: "+p.id;
    this.odabrana_stavka=p;
    this.odabrana_stavka.evidentirao=AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.username;

    console.log(this.odabrana_stavka);

    this.getProizvodi();
    this.getSkladista();
  }

  btnDelete(p: any) {
    this.kliknuoEdit=false;

    if(confirm("Da li stvarno želite obrisati ovu stavku?")){
      this.httpKlijent.delete(MojConfig.adresa_servera+"/api/SkladisteProizvod?id="+
        p.id,MojConfig.http_opcije()).subscribe((x:any)=>{
        this.getSkladisteProizvod_k_p_opadajuci();
        this.getSkladisteProizvod_k_opadajuci_p_rastuci();
        this.getSkladisteProizvod_k_p_rastuci();
        this.getSkladisteProizvod_k_p_opadajuci();
        this.getProizvodRastuci();
        this.getProizvodOpadajuci();
        this.getKolicinaRastuci();
        this.getKolicinaOpadajuci();
      })
    }
  }

  spasi() {
    this.kliknuoEdit=false;
    console.log(this.odabrana_stavka);
    this.httpKlijent.post(MojConfig.adresa_servera+"/api/SkladisteProizvod", this.odabrana_stavka,MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.odabrana_stavka=null;
        this.getSkladisteProizvod_k_rastuci_p_opadajuci();
        this.getSkladisteProizvod_k_opadajuci_p_rastuci();
        this.getSkladisteProizvod_k_p_rastuci();
        this.getSkladisteProizvod_k_p_opadajuci();
        this.getProizvodRastuci();
        this.getProizvodOpadajuci();
        this.getKolicinaRastuci();
        this.getKolicinaOpadajuci();
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
      skladisteId:0,
      velicina:'XS',
      odjel:"",
      evidentirao:AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.username
  }
    this.getProizvodi();
    this.getSkladista();
  }


  kliknuoEditSkladista:boolean=false;
  obj_skladiste:any;
  gradovi:any;
  prodavnice:any;


  totalLength3:any;
  page3:any;
  getProdavnice(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/Prodavnica/GetAllProdavnice/all",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.prodavnice=x;
        this.prodavnicaID=this.prodavnice[0]?.id;
        console.log("PRODAVNICE: ", this.prodavnice);
        this.totalLength3=this.prodavnice?.length;
      })
  }

  getGradove(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/Grad/GetAll",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.gradovi=x;
        this.gradID=this.gradovi[0]?.id;
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
      this.httpKlijent.delete(MojConfig.adresa_servera+"/api/Skladiste?id="+p.id,MojConfig.http_opcije())
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
      gradId:this.gradID,
      gradOpis:"",
      prodavnicaId:this.prodavnicaID,
      prodavnicaOpis:""
    }
  }

  spasi_skladiste(){
    this.httpKlijent.post(MojConfig.adresa_servera+"/api/Skladiste",this.obj_skladiste,MojConfig.http_opcije())
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
      gradId:this.gradID,
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
        +p.id,MojConfig.http_opcije()).subscribe((x:any)=>{
          this.getProdavnice();
          this.getSkladista();
          this.getSkladisteProizvod();
        })
    }
  }

  spasi_prodavnicu(){
    this.httpKlijent.post(MojConfig.adresa_servera+"/Prodavnica/Snimi/Snimi",this.obj_prodavnica,MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.getProdavnice();
        this.obj_prodavnica=null;
        alert("Uspješno ste spasili promjene.");
      })

  }


  postojiIstaProdavnica(prod:string){
    for(let i of this.prodavnice){
      if(i.naziv===prod && i.id!==this.obj_prodavnica.id)
        return true;
    }
    return false;
  }

  postojiIstoSkladiste(sklad:string){
    for(let i of this.s){
      if(i.naziv===sklad && i.id!==this.obj_skladiste?.id) {
        console.log(i.id, this.obj_skladiste.id);
        return true;
      }
    }
    return false;
  }

  formatDatum(datum:any){
    if(datum=="" || datum==null) return "-";
    return formatDate(datum,"dd/MM/yyyy","en-Us");
  }

  postojiIstaVelicina(vel:any){
    for(let i of this.k_p_opadajuci){
    //  console.log(i.proizvodId==this.odabrana_stavka.proizvodId, i.velicina==vel, i.id!==this.odabrana_stavka?.id);
    //  console.log("i.proizvodid",i.proizvodId,"this.odabrana_stavka.proizvodID,",this.odabrana_stavka.proizvodId);
      if(i.proizvodId==this.odabrana_stavka.proizvodId && i.velicina==vel && i.id!==this.odabrana_stavka?.id){
        return true;
      }
    }
    return false;
  }

  //za proizvod postoji samo jedno skladiste
  postojiSkladisteZaProizvod(){
    for(let i of this.k_p_opadajuci){
      if(i.proizvodId===this.odabrana_stavka.proizvodId && i.id!=this.odabrana_stavka?.id){
        return true;
      }
    }
    return false;
  }

  putanjaDoSlike() {
    if(this.proizvod_x==false){
      return "assets/slike/yes.png";
    }
    else return "assets/slike/no.png"
  }
  putanjaDoSlike2(){
    if(this.kolicina_x==false){
      return "assets/slike/yes.png";
    }
    else return "assets/slike/no.png"
  }
}
