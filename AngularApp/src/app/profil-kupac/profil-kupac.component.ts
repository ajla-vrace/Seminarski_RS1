import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MojConfig} from "../moj-config";
import {HttpClient} from "@angular/common/http";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";
import {LoginInformacije} from "../helpers/login-informacije";
import {NgModel} from "@angular/forms";
import {SignalRService} from "../_servisi/SignalRServis";
import { CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import {Chart} from 'chart.js'
import {AngularFireDatabase} from "@angular/fire/compat/database";


declare function porukaSuccess(a: string):any;
declare function porukaError(a: string):any;

interface IzvjestajKomentari {
  mjesec: string;
  ukupnoKomentara: number;
}








@Component({
  selector: 'app-profil-kupac',
  templateUrl: './profil-kupac.component.html',
  styleUrls: ['./profil-kupac.component.css']
})
export class ProfilKupacComponent implements OnInit {


  notifikacija:any;
  brojacFirebase:number=0;


//mjeseci
  public months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "Mart" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }
    // Dodajte ostale mjesece
  ];


  chartInstance!: Chart;






  kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
kupac_podaci:any;
   komentariPodaci1: any;
  odabranikomentar: any=null;
   ocjeneProdavnica: any;
   ocjene: any=false;
   ocjeneProdavnicaMoje: any;
  ocjeneProizvoda: any;
   ocjeneProizvodaMoje: any;
  ocjeneProizvodaBool:any=false;
   prikaziDiv: any=false;
  kupac: any;
  promjeniIme: any=false;
  promjeniBroj: any=false;
  promjeniPrezime: any=false;
   kupciPodaci: any;
  promjeniLozinku: any;
  novaLozinka: any;
  novaLozinkaPonovo:any;
  sadasnjaLozinka: any;
   ime: any="";
   prezime: any="";
   lozinka: any="";
  brojTelefona:any="";
  email:any="";
  username:any="";

   prikaziNarudzbe: any=false;
   narudzbeKupcaPodaci: any;
   jeLiPodaci:any=true;
   prikazPodataka: any=false;
  prikazKomentara: any=false;
  PrikazOcjena: any=false;





  //slika_objekat:any;
   kupciPodaci1: any;
notification:any;
poruka1:any;
  primljenaPoruka: string = '';
  receivedMessage: string = '';


  selectedFile: File | null = null;
  selectedFiles: FileList | null = null;

  slikaUrl: string | null = null;
   stavkeJedneNarudzbePodaci: any;
   prikazSignalR:any=false;
   notifikacijaa:string="Dodana je nova specijalna ponuda. Pogledajte je!";
  constructor(private route: ActivatedRoute, private httpKlijent:HttpClient,private router:Router,
              private signalRService: SignalRService , private afDB:AngularFireDatabase ) {
    //a.otvoriKanalWebSocket();
    this.signalRService.porukaReceived$.subscribe((poruka: string) => {
      this.primljenaPoruka = poruka;
      this.prikazSignalR=true;
    });



  }




  /*selectedFile: File | null = null;
  slikaUrl: string | null = null;
*/


  izracunajTotal(id:any){
    this.fetchNarudzbaStavkeByIdNarudzbe(id);
    setTimeout( ()=>{
      console.log("stavkejednenarudzbepodaci_:",this.stavkeJedneNarudzbePodaci);
      for(let n of this.stavkeJedneNarudzbePodaci){
        this.suma=this.suma+n.total;
      }
    }, 1000);

  }













  handleFileInput(input: HTMLInputElement): void {
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadSlika(): void {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.httpKlijent.post(MojConfig.adresa_servera+"/Kupac/UploadSlikaKupca/upload-slika", formData)
      .subscribe(() => {
        console.log('Slika je uspješno spremljena.');
        this.getSlika();
      });
  }

  getSlika(): void {
    const idKupca = this.kupac_id; // ID trenutno prijavljenog kupca
    this.httpKlijent.get(`${MojConfig.adresa_servera}/Kupac/GetSlika/slika?id=${idKupca}`, { responseType: 'blob' })
      .subscribe((response) => {
        this.slikaUrl = URL.createObjectURL(response);
      });
  }




kupacPodaciNovi:any;
  slika_kupca_postojeca_fs:any;
  slika_kupca_postojeca_db:any;

  getKupcaNovi(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/Kupac/GetByIdS?id="+this.kupac_id)
      .subscribe((x:any)=>{
        this.kupacPodaciNovi=x;


        this.slika_kupca_postojeca_fs=x.slika_kupca_postojeca_FS;
        this.slika_kupca_postojeca_db=x.slika_kupca_postojeca_DB;

        // console.log(this.slika_kupca_postojeca_fs,"\n",this.slika_kupca_postojeca_db);

       // console.log("PODACI: ",this.kupacPodaciNovi);
      })
  }



  getSlikuKupca(){
    //  /api/Zaposlenik/slikaKorisnika?id=5
    this.httpKlijent.get(MojConfig.adresa_servera+"/Kupac/Slika/slikaKorisnika?id="+this.kupac_id)
      .subscribe((x:any)=>{
        if(x!=null) {
          this.slika_kupca = x;
         // console.log("Slika kupca: "+this.slika_kupca);

        }
      })
  }



























  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }
  getKupca1(){
    /*this.httpKlijent.get(MojConfig.adresa_servera+"/Kupac/GetById?id="+this.kupac_id)
      .subscribe((x:any)=>{
        this.kupac_podaci=x;
        console.log("getkupaca1: "+this.kupac_podaci[0].ime);


      })*/
  }
  vrijednostNotifikacije:any;
  ngOnInit(): void {
    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    this.getKupcaNovi();
   /* this.route.params.subscribe(s=>{
      this.kupac_id=+s["id"];
    })*/
    this.fetchKupci();
   this.getKupca1();
this.fetchKupci1();
    this.getKupca();

   // this.fetchKomentari();
    this.fetchKomentariMoji();
    this.fetchOcjeneProdavnice();
    this.fetchOcjeneProdavniceMoje();
    this.fetchOcjeneProizvoda();
    this.fetchOcjeneProizvodaMoje();
this.fetchNarudzbeKupca();

this.getSlikuKupca();


  //  this.fetchNarudzbaStavkeByIdNarudzbe();
//this.getPodatkeZaIzvjestajParametri();


  //this.getPodatkeZaIzvjestaj();
    //report
   // this.getIzvjestajKomentari();
  /*  this.httpKlijent.get<IzvjestajKomentari[]>(MojConfig.adresa_servera+"/Komentar/GetIzvjestajKomentari")
      .subscribe(data => {
        this.izvjestaj = data;
        console.log("Izvjesta podaci: "+this.izvjestaj);
        console.log(JSON.stringify(this.izvjestaj));

       this.prikaziGrafikon();
      });
*/
    this.notifikacija=this.afDB.object("/notifikacija").valueChanges();

   // console.log("notifikacija"+this.notifikacija);
    this.notifikacija.subscribe((vrijednost:any) => {
      this.vrijednostNotifikacije=vrijednost;
     // console.log('Vrijednost notifikacije:', vrijednost);


    });


    /* if (vrijednost === 1 && this.brojacFirebase==0) {
            porukaSuccess('Dodan je nova specijalna ponuda. Pogledajte je!');
            this.brojacFirebase++;
            setTimeout(() => {
              this.brojacFirebase--;
            }, 10000);
          }*/



  }





  fetchNarudzbaStavkeByIdNarudzbe(id:any) {
    //this.imeKorpe="Korpa"+this.loginInfo().autentifikacijaToken.korisnickiNalogId;

    this.httpKlijent.get(MojConfig.adresa_servera+ "/Narudzba/GetByIdNarudzbe?narudzbaId="+id, MojConfig.http_opcije()).subscribe(x=>{
      this.stavkeJedneNarudzbePodaci = x;
    });

  }
  suma:any;brojac:any=0;




  kliknuoDodajSliku:boolean=false;
  slika_obj:any;

  dodajSliku() {
    this.kliknuoDodajSliku=true;

    this.slika_obj={
      idKupac:this.kupac_id,
      slika_nova:"",
      slika_kupca_postojeca_DB:""
    }
  }

  slika:any;

  snimi_sliku() {
    this.kliknuoDodajSliku=false;

    this.httpKlijent.post(MojConfig.adresa_servera+"/Kupac/PromijeniSlikuKupca/promijeni_sliku", this.slika_obj)
      .subscribe(x=>{
       // console.log("ovo je slika.obj: ",this.slika_obj);
       // console.log("podaci kupca------",this.kupacPodaciNovi);
        this.slika=this.slika_obj.slika_nova;
       // console.log("Slika: "+this.slika);
       // console.log("Slika_obj.slika_nova",this.slika_obj.slika_nova);
        this.getKupcaNovi();
       // console.log("Nakon pozivanja get: ",this.kupacPodaciNovi);
        this.get_slika_novi_request_FS();
        this.get_slika_base64_FS(this.kupacPodaciNovi);
      //  console.log("get_slika_base64_FS:",this.kupacPodaciNovi);
        // this.reloadPage();
        // this.slika_obj=null;

      });
  }


  ukloniSliku(){
    if("data:@file/jpeg;base64,"+this.slika_kupca_postojeca_fs!=this.noimage ){
      if (confirm("Da li stvarno želite ukloniti sliku?")) {
        this.slika_obj = {
          idKupac: this.kupac_id,
          slika_nova: this.noimage,
          slika_kupca_postojeca_DB: ""
        }
        this.httpKlijent.post(MojConfig.adresa_servera + "/Kupac/PromijeniSlikuKupca/promijeni_sliku", this.slika_obj)
          .subscribe((x: any) => {
            this.slika=this.noimage;
            this.getKupcaNovi();
          })
      }
      porukaSuccess("Slika je uspjesno uklonjena.");
    }

  }



  get_slika_base64_FS(s:any) {
    if(s!=null && s[0].slika_kupca_postojeca_FS!=null)
      return "data:image/jpg;base64,"+ s[0]?.slika_kupca_postojeca_FS;
    return this.noimage;

  }

  get_slika_novi_request_FS() {
    return `${MojConfig.adresa_servera}/Kupac/GetSlikaFS/id_fs?id=`+this.kupac_id;
  }


  get_slika_novi_request_DB(s: any) {
    return `${MojConfig.adresa_servera}/Kupac/GetSlikaDB/id_db?id=`+s.id;
  }

  get_slika_base64_DB(s:any) {
    return "data:image/jpg;base64,"+ s?.slika_kupca_postojeca_db;
  }



  generisi_preview() {
    // @ts-ignore
    var file = document.getElementById("slika-input").files[0];
    if (file) {
      var reader = new FileReader();
      let this2 = this;
      reader.onload = function () {
        this2.slika_obj.slika_nova = reader.result?.toString();
      }
     // console.log("file: ", file);
      reader.readAsDataURL(file);
    }
  }















  mjesec:any='';


  promjenaMjeseca1() {
    if (this.mjesec) {
      // Ako je odabran mjesec, pozovite API s parametrom
      this.httpKlijent.get<IzvjestajKomentari[]>
      (MojConfig.adresa_servera + '/GetIzvjestajKomentariParametar?mjesec=' + this.mjesec)
        .subscribe(data => {
          this.izvjestaj = data;
          this.prikaziGrafikon();
        });
    } else {
      // Ako nije odabran mjesec, pozovite API bez parametra
      this.httpKlijent.get<IzvjestajKomentari[]>(MojConfig.adresa_servera + '/GetIzvjestajKomentari')
        .subscribe(data => {
          this.izvjestaj = data;
          this.prikaziGrafikon();
        });
    }}



getPodatkeZaIzvjestajParametri(){
  this.httpKlijent.get<IzvjestajKomentari[]>
  (MojConfig.adresa_servera+"/Komentar/GetIzvjestajKomentariParametar?mjesec="+this.mjesec)
    .subscribe(data => {
      this.izvjestaj = data;
      console.log("izvjestaj",this.izvjestaj);
      console.log("mjesec je : "+this.mjesec);
      this.prikaziGrafikon();
    });
}
  promjenaMjeseca() {
    // Dohvat podataka iz API-ja nakon promjene mjeseca
    this.httpKlijent.get<IzvjestajKomentari[]>
    (MojConfig.adresa_servera+"Komentar/GetIzvjestajKomentariParametri?mjesec="+this.mjesec)
      .subscribe(data => {
        this.izvjestaj = data;
        this.prikaziGrafikon();
      });
  }
  getPodatkeZaIzvjestaj(){
    this.httpKlijent.get<IzvjestajKomentari[]>(MojConfig.adresa_servera+"/Komentar/GetIzvjestajKomentari")
      .subscribe(data => {
        this.izvjestaj = data;
        console.log("Izvjesta podaci: "+this.izvjestaj);
        console.log(JSON.stringify(this.izvjestaj));
        /*setTimeout( ()=>{
          this.prikaziGrafikon();
        }, 5000);*/
        this.prikaziGrafikon();
      });

  }






  fetchKupci(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/Kupac/GetAll")
      .subscribe((x:any)=>{
        this.kupciPodaci=x;
      })
  }
  fetchKupci1(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/Kupac/GetAll1")
      .subscribe((x:any)=>{
        this.kupciPodaci1=x;
      })
  }


  fetchKomentariMoji() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Komentar/GetById/"+this.kupac_id, MojConfig.http_opcije()).subscribe(x=>{
      this.komentariPodaci1 = x;
    });
  }

  fetchOcjeneProdavnice() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Ocjena/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.ocjeneProdavnica = x;
    });
  }
  fetchOcjeneProizvoda() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Zvjezdica/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.ocjeneProizvoda = x;
    });
  }
  fetchNarudzbeKupca()
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Narudzba/GetByIdKupca?kupacId="+this.loginInfo().autentifikacijaToken.korisnickiNalogId, MojConfig.http_opcije()).subscribe(x=>{
      this.narudzbeKupcaPodaci = x;
    });

  }





  fetchOcjeneProdavniceMoje() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Ocjena/GetById/"+this.kupac_id, MojConfig.http_opcije()).subscribe(x=>{
      this.ocjeneProdavnicaMoje = x;
    });
  }
  fetchOcjeneProizvodaMoje() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Zvjezdica/GetById/"+this.kupac_id, MojConfig.http_opcije()).subscribe(x=>{
      this.ocjeneProizvodaMoje = x;
    });
  }


  prikaziMojeKomentare() {
    if (this.komentariPodaci1 == null)
      return [];
    return this.komentariPodaci1.filter((a:any)=>a.kupacId==this.kupac_id);
  }

  prikazKomm() {
    this.prikazKomentara = true;
    this.prikazPodataka=false;
    this.prikaziNarudzbe=false;
    this.PrikazOcjena=false;
    this.ocjeneProizvodaBool=false;
  }

  prikaziMojeOcjeneProdavnica() {
    if (this.ocjeneProdavnica == null)
      return [];
    return this.ocjeneProdavnica.filter((a:any)=>a.kupacId==this.kupac_id);
  }

  prikaziMojeOcjeneProizvoda() {
    if (this.ocjeneProizvoda == null)
      return [];
    return this.ocjeneProizvoda.filter((a:any)=>a.kupacId==this.kupac_id);
  }

  prikazOcjene() {
    this.PrikazOcjena = true;
    this.prikazKomentara = false;
    this.prikazPodataka=false;
    this.prikaziNarudzbe=false;
    this.ocjeneProizvodaBool=false;
  }

  brisikomm(s: any) {
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Komentar/Delete/" + s.id,null, MojConfig.http_opcije())
      .subscribe((povratnaVrijednost:any) =>{
        const index = this.komentariPodaci1.indexOf(s);
        if (index > -1) {
          this.komentariPodaci1.splice(index, 1);
        }

      });


   /* this.httpKlijent.post(MojConfig.adresa_servera+ "/Komentar/GetById?id="+s.id,MojConfig.http_opcije()).subscribe(x=>{
      this.komentariPodaci1= x;
    });*/
    /*alert("Odabrani komentar je obrisan!");*/
    porukaSuccess("Odabrani komentar je obrisan.");
  }

  modifikuj(s: any) {
this.odabranikomentar=s;
  }

  modifikuj1(odabranikomentar: any) {
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Komentar/Update/" + this.odabranikomentar.id, this.odabranikomentar)
      .subscribe((a:any) =>{
      });

this.odabranikomentar=null;
}


  brisiOcjenu(s: any) {
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Ocjena/Delete/" + s.id,null, MojConfig.http_opcije())
      .subscribe((povratnaVrijednost:any) =>{
        const index = this.ocjeneProdavnica.indexOf(s);
        if (index > -1) {
          this.ocjeneProdavnica.splice(index, 1);
        }

      });


   /* this.httpKlijent.post(MojConfig.adresa_servera+ "/Ocjena/GetById/"+s.id,MojConfig.http_opcije()).subscribe(x=>{
      this.ocjeneProdavnica= x;
    });
    */
   // alert("Odabrani ocjena je obrisana!");
    porukaSuccess("Odabrana ocjena je obrisana!");
  }

  prikazOcjeneProizvoda() {
    this.ocjeneProizvodaBool=true;
    this.prikazPodataka=false;
    this.prikaziNarudzbe=false;
    this.prikazKomentara=false;
    this.PrikazOcjena=false;
  }



  brisiOcjenuProizvoda(o: any) {
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Zvjezdica/Delete/"+ o.id,null, MojConfig.http_opcije())
      .subscribe((povratnaVrijednost2:any) =>{
        const index = this.ocjeneProizvoda.indexOf(o);
        if (index > -1) {
          this.ocjeneProizvoda.splice(index, 1);
        }

      });

   /* this.httpKlijent.post(MojConfig.adresa_servera+ "/Zvjezdica/GetById/"+this.kupac_id,MojConfig.http_opcije()).subscribe(x=>{
      this.ocjeneProizvodaMoje= x;
    });*/
   // this.fetchOcjeneProizvodaMoje();
    //alert("Odabrani ocjena je obrisana!");
    porukaSuccess("Odabrana ocjena je obrisana!");
  }



  skloniDiv() {
    this.prikaziDiv=false;
  }

  editBrojTelefona() {
this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    this.httpKlijent.put(MojConfig.adresa_servera+ "/Kupac/EditTelefon/"+this.kupac_id+"?brojTelefona="+this.kupac.brojTelefona,null, MojConfig.http_opcije())
      .subscribe((a:any) =>{
       this.getKupca();
       this.kupac=null;
       this.promjeniBroj=false;
      });
}


  editImeKupca() {
    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    this.httpKlijent.put(MojConfig.adresa_servera+ "/Kupac/EditIme/"+this.kupac_id+"?ime="+this.kupac.ime,null, MojConfig.http_opcije())
      .subscribe((a:any) =>{
        this.getKupca();
        this.kupac=null;
        this.promjeniIme=false;
      });


  }

  brojTelPromjena() {
    this.getKupca();

    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    for(let x of this.kupciPodaci){
      if(x.id==this.kupac_id){
        this.kupac=x;
      }
    }
      this.promjeniBroj=true;


  }
vratiNaFalse(){
    this.kupac=null;
    this.promjeniIme=false;
    this.promjeniBroj=false;
    this.promjeniPrezime=false;
    this.promjeniLozinku=false;
}

  promjenaPrezimena() {
    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    for(let x of this.kupciPodaci){
      if(x.id==this.kupac_id){
        this.kupac=x;
      }
    }
    this.promjeniPrezime=true;
  }
  promjenaLozinke() {
    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    for(let x of this.kupciPodaci){
      if(x.id==this.kupac_id){
        this.kupac=x;
      }
    }
    this.promjeniLozinku=true;
  }
  promjenaImena() {
    /*this.kupac=this.loginInfo().autentifikacijaToken.korisnickiNalog;*/
    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    for(let x of this.kupciPodaci){
      if(x.id==this.kupac_id){
        this.kupac=x;
      }
    }
    this.promjeniIme=true;
    //console.log("ime: "+this.kupac.ime);
  }

  editPrezimeKupca() {
    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    this.httpKlijent.put(MojConfig.adresa_servera+ "/Kupac/EditPrezime/"+this.kupac_id+"?prezime="+this.kupac.prezime,null, MojConfig.http_opcije())
      .subscribe((a:any) =>{
        this.getKupca();
        this.kupac=null;
        this.promjeniPrezime=false;
      });
  }
  jeLiOmoguceno(sadasnja:NgModel, nova:NgModel,ponovljena :NgModel){
   /* this.getKupca();*/

      if(this.kupac_podaci.lozinka!=undefined)
      {
       /* console.log(this.kupac_podaci.lozinka);*/
        if(this.sadasnjaLozinka==this.kupac_podaci.lozinka && this.novaLozinka===this.novaLozinkaPonovo
          && this.sadasnjaLozinka!=="" && this.novaLozinka!==""
          && sadasnja.valid && nova.valid && ponovljena.valid){
          return true;
        }
        else{
          return false; }
      }
      else {
       return false;
      }


}




  editLozinkeKupca() {
    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
   /* console.log("novalozinka: "+this.novaLozinka);*/


      this.httpKlijent.put(MojConfig.adresa_servera+ "/Kupac/EditLozinka/"+this.kupac_id+"?lozinka="+this.novaLozinka,null, MojConfig.http_opcije())
        .subscribe((a:any) =>{
          this.getKupca();
          this.kupac=null;
          this.promjeniLozinku=false;
          this.novaLozinka="";
          this.novaLozinkaPonovo="";
          this.sadasnjaLozinka="";
        });
  }


  prikazNarudzbi() {
    this.prikazPodataka=false;
    this.prikaziNarudzbe=true;
this.prikazKomentara=false;
    this.PrikazOcjena=false;
    this.ocjeneProizvodaBool=false;

  }

  prikaziPodatke() {
    this.prikazPodataka=true;
    this.prikaziNarudzbe=false;
    this.prikazKomentara=false;
    this.PrikazOcjena=false;
    this.ocjeneProizvodaBool=false;
  }

 /* dodajSliku() {
    this.kupac_id=this.loginInfo().autentifikacijaToken.korisnickiNalogId;
    for(let x of this.kupciPodaci){
      if(x.id==this.kupac_id){
        this.kupac=x;
      }
    }
  }*/
snimiSliku(){
  this.httpKlijent.post(`${MojConfig.adresa_servera}/Kupac/Add`, this.kupac, MojConfig.http_opcije()).subscribe(x => {
    this.fetchKupci();
    //console.log(this.kupac);
   // console.log(this.kupac.slikaKupca);

  });
}
  /*ukloniSliku() {
   /* if("data:@file/jpeg;base64,"+this.slika_zaposlenika_postojeca_fs!=this.noimage ){
      if (confirm("Da li stvarno želite ukloniti sliku?")) {
        this.slika_obj = {
          idZaposl: this.zaposlenik_id,
          slika_nova: this.noimage,
          slika_zaposlenika_postojeca_DB: ""
        }
        this.httpKlijent.post(MojConfig.adresa_servera + "/api/Zaposlenik/promijeni_sliku", this.slika_obj)
          .subscribe((x: any) => {
            this.slika=this.noimage;
            this.getZaposlenika();
          })
      }
    }
  }
  }*/
datumRegistracije:any="";
isPretplacen:any="";
  getKupca(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/Kupac/GetById?id="+this.kupac_id)
      .subscribe((x:any)=>{
        this.kupac_podaci=x;
        this.ime=this.kupac_podaci.ime;
       // console.log("ime je : "+this.ime);
        this.prezime=this.kupac_podaci.prezime;
        this.username=this.kupac_podaci.username;
        this.lozinka=this.kupac_podaci.lozinka;
        this.email=this.kupac_podaci.email;
        this.username=this.kupac_podaci.username;
        this.brojTelefona=this.kupac_podaci.brojTelefona;
       /* this.datumRegistracije=formatDate(this.kupac_podaci.datumRegistracije,'dd-MM-yyyy','en-US');*/
        this.isPretplacen=this.kupac_podaci.isPretplacen;
        //console.log("get kupca po id: ",this.kupac_podaci);
        //this.slika_kupca_postojeca_fs=x.slika_kupca_postojeca_FS;
       // this.slika_kupca_postojeca_db=x.slika_kupca_postojeca_DB;

      })


     // console.log(" fs malo: "+this.slika_kupca_postojeca_fs,"\n","db malo: "+this.slika_kupca_postojeca_db);

   // console.log("PODACI: ",this.kupac_podaci);
  }

  //slika_kupca_postojeca_fs:any;
 // slika_kupca_postojeca_db:any;

slika_kupca:any;
 /*
  getSlikuKupca(){
    //  /api/Zaposlenik/slikaKorisnika?id=5
    this.httpKlijent.get(MojConfig.adresa_servera+"/Kupac/Slika/slikaKorisnika?id="+this.kupac_id)
      .subscribe((x:any)=>{
        if(x!=null) {
          this.slika_kupca = x;
          console.log(this.slika_kupca);

        }
      })
  }
*/

  /*kliknuoDodajSliku:boolean=false;
  slika_obj:any;

  dodajSliku() {
    this.kliknuoDodajSliku=true;
console.log("u dodajSliku funkciji idkupca je: "+this.kupac_id);
    this.slika_obj={
      idKupac:this.kupac_id,
      slika_nova:"",
      slika_kupca_postojeca_DB:""
    }
  }
*/
  //slika:any;
/*
  snimi_sliku() {
    this.kliknuoDodajSliku=false;
console.log("slika obj idkupac: "+this.slika_obj.idKupac+ " slika nova: "+this.slika_obj.slika_nova+
  " slika nova db: "+this.slika_obj.slika_kupca_postojeca_DB);
    this.httpKlijent.post(MojConfig.adresa_servera+"/Kupac/PromijeniSlikuKupca/promijeni_sliku", this.slika_obj)
      .subscribe(x=>{
        console.log("slika db je: **********"+this.slika_obj.slika_kupca_postojeca_DB);
        console.log(this.kupac_podaci);
        this.slika=this.slika_obj.slika_nova;
this.getKupca1();
        this.getKupca();
        console.log("promjena slike kupca: "+this.kupac_podaci);
        this.get_slika_novi_request_DB(this.kupac_podaci);
        this.get_slika_base64_DB();
        this.get_slika_novi_request_FS();
        this.get_slika_base64_FS(this.kupac_podaci);
        // this.reloadPage();
        // this.slika_obj=null;

      });
    setTimeout( ()=>{
  console.log("slika timer: "+this.slika_obj.slika_kupca_postojeca_DB);
    }, 500);
  }

*/
  /*
  ukloniSliku(){
    if("data:@file/jpeg;base64,"+this.slika_kupca_postojeca_fs!=this.noimage ){
      if (confirm("Da li stvarno želite ukloniti sliku?")) {
        this.slika_obj = {
          idKupac: this.kupac_id,
          slika_nova: this.noimage,
          slika_kupca_postojeca_DB: ""
        }
        this.httpKlijent.post(MojConfig.adresa_servera + "/Kupac/PromijeniSlikuKupca/promijeni_sliku", this.slika_obj)
          .subscribe((x: any) => {
            this.slika=this.noimage;
            this.getKupca();
          })
      }
    }
  }
*/
  /*
    get_slika_novi_request_FS() {
      var data=`${MojConfig.adresa_servera}/api/Zaposlenik/id_fs?id=${this.zaposlenik_id}"`;
      console.log(data);
      return data;
    }*/
/*
  get_slika_FS(p: any) {
    // return "data:image/jpg;base64,"+p.fileContents;
    return p.fileContents;

    console.log("FILE CONTENTS: ",p.fileContents);
  }
*/
  /*
  get_slika_FS_2(){
    return this.slika_kupca?.fileContents;
  }

*/
  /*
  get_slika_base64_FS(s:any) {
    if(s!=null && s.slika_kupca_postojeca_FS!=null)
      return "data:image/jpg;base64,"+ s?.slika_kupca_postojeca_FS;
    return this.noimage;
    // return "data:image/jpg;base64,"+this.slika_zaposlenika_postojeca_fs;
  }

  get_slika_novi_request_FS() {
    return `${MojConfig.adresa_servera}/Kupac/GetSlikaFS/id_fs?id=`+this.kupac_id;
  }



  get_slika_novi_request_DB(s: any) {
    return `${MojConfig.adresa_servera}/Kupac/GetSlikaDB/id_db?id=`+s.id;
  }

  get_slika_base64_DB() {
    return "data:image/jpg;base64,"+ this?.slika_kupca_postojeca_db;
  }


  generisi_preview() {
    // @ts-ignore
    var file = document.getElementById("slika-input").files[0];
    if (file) {
      var reader = new FileReader();
      let this2 = this;
      reader.onload = function () {
        this2.slika_obj.slika_nova = reader.result?.toString();
      }
      console.log("file: ", file);
      reader.readAsDataURL(file);
    }
  }

*/


  reloadPage() {
    location.reload();
  }

  noimage:any="data:@file/jpeg;base64,/9j/4AAQSkZJRgABAQAAZABkAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wgALCADIAN8BAREA/8QAGwABAAMBAQEBAAAAAAAAAAAAAAUGBwMBBAL/2gAIAQEAAAAA24AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAi/i8Ak/vAABXbEOf57eQFgAABXbE59M+idX8gLAAACu2Ks5bsEpxjZuAsAAAK7zyHn9mw55Wtd7WAAAFOy3ke+Ouv2QAAEPXgFpkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//EADoQAAEDAQMGCwgCAwEAAAAAAAECAwQFAAYREiEwMUDREBMWF1FUVmGRkrIHFCI1NkFzdCCBFTJScf/aAAgBAQABPwDazth2w7YdsO2HbDth2w6Ks1lNHRHxivSFyHOLQhrDEnDH725SzOzlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUs3s5U/KnfblLN7OVPyp325SzezlT8qd9uUszs5U/Knfaj1RFYpyJjbS2kqUpOQvWCDhoTory/MqB+8PSf4vPNR2i684httOtSzgBaNMjTG+MjPtvIGbFtQI4DqNrl/TqPzO+s6E6K8vzKgfvD0nhS+yp9bCXUF1ABUgHOAdWI4PaeZXFQcnK90+LKw1Zf2x/q3s4965Qr4rK934o8d0d3948B1G1y/p1H5nfWdCdFeX5lQP3h6TwXsvY1QY5YYKXJ6x8KdYQOk7rRK3Ph1b/JNyFGSVYrUo45fSD3Wu9eGLeCCHmiEPJzOtE50ndZ5hqS0Wn20ONq1pWMQbNswaVFWptpmKwgZSylISB3m1EvVTq7Jfjx1FLjZOSlebjE/9Cx1G1y/p1H5nfWdCdFeX5lQP3h6Ta9l7GaFHLDBS5PWPhT9kDpO60iQ9KkLffcU46s4qUo5yeCmVOVSZyJcRwocSdX2UOg91qJeeDWKYqXxiWVNJxfQo/wCnf/5a917nK48YsVSkQEHMNRcPSe7utHkPRJCH2HFNuoOKVJOcG11b1tV6NxLxS3ObT8SPssdI3WuX9OI/M76zoTovaBMdp8Wmy2cONaklScRmxyTaRIelyFvvuKcdWcVKUcST/ALUkKCVEBQwIB1jhjyHYj6H2HFNuoOKVJOBBtcRZXdSOtWdSnHCfMdCdFeG77F4YrTD7zjQbXlgoAz5sPvbmxp/X5Pgm3NjT+vyfBNubGn9fk+Cbc2NP6/J8E25saf1+T4JtzY0/r8nwTbmxp/X5Pgm3NjT+vyfBNqLSm6LTG4LTinEIJIUrXnOOhO2HbDth2w7YdsO2HbDtht//9k=";


  odjaviSe()

  {
    let token=MojConfig.http_opcije();
    // @ts-ignore
    AutentifikacijaHelper.setLoginInfo(null);

    this.httpKlijent.post(MojConfig.adresa_servera + "/api/Autentifikacija", null, token)
      .subscribe((x: any) => {
        //alert("Uspješno ste se odjavili.");
        porukaSuccess("Uspjesno ste se odjavili.");
      });
    //this.router.navigateByUrl("/neregistrovan");
    this.router.navigate(["/pocetna"]);
  }





  izvjestaj: IzvjestajKomentari[] = [];
  izvjestajKomentari: IzvjestajKomentari[] = [];
  isKiliknuto: any=false;
  getIzvjestajKomentari() {
    this.httpKlijent.get<IzvjestajKomentari[]>(MojConfig.adresa_servera+"/Komentar/GetIzvjestajKomentari")
      .subscribe(data => {
        this.izvjestaj = data;
        this.prikaziGrafikon();
      });
  }




  prikaziGrafikon() {
    Chart.register(CategoryScale, LinearScale, BarController, BarElement);

    const canvas = document.getElementById('myChart') as HTMLCanvasElement;

    if (!canvas) {
      console.error('Element canvas s identifikatorom "myChart" nije pronađen.');
      return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Kontekst za crtanje nije dostupan.');
      return;
    }





    if (this.chartInstance) {
      this.chartInstance.destroy();
    }







    if (!this.izvjestaj || this.izvjestaj.length === 0) {
      console.warn('Nema dostupnih podataka za prikaz grafikona.');
      porukaError("Nema dostupnih podataka za prikaz grafikona.");
      return;
    }




    const sortedData = this.izvjestaj.sort((a, b) => {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const indexA = months.indexOf(a.mjesec);
      const indexB = months.indexOf(b.mjesec);

      return indexA - indexB;
    });

    const labels = sortedData.map(item => item.mjesec);
    const data = sortedData.map(item => item.ukupnoKomentara);




   this.chartInstance= new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Broj komentara',
            data: data,
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }

      }


    });
  }
  update_stanje_na_skladistu(id:any){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SkladisteProizvod/update_stanje?narudzbaId="+id)
      .subscribe((x:any)=>{
        console.log("updateovano stanje");

        //  console.log("prethodni status:", this.narudzbaDetalji?.narudzba?.prethodniStatus);
        //  console.log("trenutni status:", this.narudzbaDetalji?.narudzba?.status);
        //  console.log("obj_status.status",this.obj_status?.status);

      })
  }
obj_status:any;
  otkaziNarudzbu(id:any) {

      this.obj_status={
        narudzbaId:id,
        status:"Otkazana",
        evidentirao:"-",
      }
//console.log("obj_status: ",this.obj_status)
    this.httpKlijent.post(MojConfig.adresa_servera+"/Narudzba/PromijeniStatus",this.obj_status,MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.obj_status=null;
        this.update_stanje_na_skladistu(id);
        this.fetchNarudzbeKupca();
        porukaSuccess("Odabrana narudzba je otkazana!");
      })
  }


pogledano(){
  this.afDB.object('/notifikacija').set(0).then(() => {
    //console.log('Vrijednost cvora notifikacija promijenjena na 0.');
  });
}
  pogledanSignalR:any=false;
pogledanoSignalR(){
   this.prikazSignalR=false;
   console.log("Sada je "+this.prikazSignalR);
}

}
