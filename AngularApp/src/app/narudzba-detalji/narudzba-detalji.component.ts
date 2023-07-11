import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {formatDate} from "@angular/common";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";

@Component({
  selector: 'app-narudzba-detalji',
  templateUrl: './narudzba-detalji.component.html',
  styleUrls: ['./narudzba-detalji.component.css']
})
export class NarudzbaDetaljiComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router:Router,private httpKlijent:HttpClient) { }

  zaposlenik_id:any;
//  kupac_id:any;
  narudzba_id:any=1; //sad za sad
  narudzbaDetalji:any;

 // Input():any nar_id="";

  _datumKreiranjaNarudzbe:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.narudzba_id=+s["id"];
    })
    this.getNarudzbaDetalji();
    this.getBoolVrijednosti();
  }
  status:any;
  getNarudzbaDetalji(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/Narudzba/GetKupcaIDetaljeNarudzbe?narudzba_id="
    +this.narudzba_id).subscribe((x:any)=>{
      this.narudzbaDetalji=x;
      console.log(this.narudzbaDetalji);

      this.status=this.narudzbaDetalji?.narudzba?.status;
      this._datumKreiranjaNarudzbe=formatDate(this.narudzbaDetalji?.narudzba?.datumKreiranja,"dd/MM/yyyy","en-Us");
    })
  }

  loginId:any=AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.id;

  provjeriSkladiste() {
    this.router.navigate(['/skladiste',this.loginId])
  }

  kliknuoPromijeniStatus:boolean=false;
  kliknuoPosaljiMail:boolean=false;

  obj_email:any;

  posaljiMail(){
    this.obj_email={
      to:this.narudzbaDetalji?.kupac?.email,
      subject:this._naslov,
      body:this.getPoruku()
    }
  }

  getPoruku(){
    if(this.narudzbaDetalji?.narudzba?.status=="Nova"){
      this._poruka=this.porukaNova;
    }
    else if(this.narudzbaDetalji?.narudzba?.status=="Spremna"){
      this._poruka=this.porukaSpremna;
    }
    else if(this.narudzbaDetalji?.narudzba?.status=="Istekla"){
      this._poruka=this.porukaIstekla;
    }
    else if(this.narudzbaDetalji?.narudzba?.status=="Ponistena"){
      this._poruka=this.porukaPonistena;
    }
    else if(this.narudzbaDetalji?.narudzba?.status=="Preuzeta"){
      this._poruka=this.porukaPreuzeta;
    }
    return this._poruka;
  }

  porukaNova:any="Poruka u statusu Nova";
  porukaIstekla: any="Vaša narudžba nije preuzeta u predefinisano vrijeme te je stoga istekla.";
  porukaSpremna:any="Vaša narudžba je spremna za preuzeti već od sutra. Rok za preuzimanje naružbe je do narednih 14 dana.";
  porukaPonistena:any="Vaša narudžba je odgođena jer trenutno nemamo zaliha proizvoda kojeg naručujete.";
  porukaPreuzeta:any="Vaša narudžba je preuzeta!";
  _poruka:any="";
  _naslov:any="Obavještenje o narudžbi";

  sendEmail(){
    this.httpKlijent.post(MojConfig.adresa_servera+"/api/Poruke",this.obj_email,MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.kliknuoPosaljiMail=false;
        alert("poruka je uspjesno poslana na email: "+this.narudzbaDetalji?.kupac?.email);
        this.obj_email=null;

        this.httpKlijent.post(MojConfig.adresa_servera+"/Narudzba/PosaljiPoruku?narId="+this.narudzba_id,MojConfig.http_opcije())
          .subscribe((x:any)=>{
            this.getBoolVrijednosti();

            if(this.obj_status=="Odgodjena")
              this.update_stanje_na_skladistu();
          })
      })
  }

  update_stanje_na_skladistu(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/SkladisteProizvod/update_stanje?narudzbaId="+this.narudzba_id)
      .subscribe((x:any)=>{
        console.log("updateovano stanje");
      })
  }

  obj_status:any;
  promijeniStatus(){
    this.obj_status={
      narudzbaId:this.narudzbaDetalji?.narudzba?.id,
      status:this.narudzbaDetalji?.narudzba?.status,
      evidentirao:AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.username,
    }
  }

  changeStatus(){
    this.httpKlijent.post(MojConfig.adresa_servera+"/Narudzba/PromijeniStatus",this.obj_status,MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.kliknuoPromijeniStatus=false;
        this.getBoolVrijednosti();
          alert("Status je uspješno promijenjen!");
        this.obj_status=null;
        this.getNarudzbaDetalji();
      })

  }
  _jel_promijenjen_status:boolean=false;
  _jel_poslana_prouka:boolean=false;

  getBoolVrijednosti(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/Narudzba/zaEmail?narId="+this.narudzba_id,MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this._jel_poslana_prouka=x.jel_poslana_poruka;
        this._jel_promijenjen_status=x.jel_promijenjen_status;
        console.log("x",x);
        console.log("poslana",this._jel_poslana_prouka,"status",this._jel_promijenjen_status);
      })
  }
}
