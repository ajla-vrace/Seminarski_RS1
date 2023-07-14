import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-narudzbe',
  templateUrl: './narudzbe.component.html',
  styleUrls: ['./narudzbe.component.css']
})
export class NarudzbeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router:Router, private httpKlijent:HttpClient) { }

  zaposlenik_id:any;
  narudzbe:any;
  statistika:any;
  ukupnoNarudzbi:any;
  ukupnoKorisnika:any;
  statusFilter:any="Sve";

  _filter:any="";

  totalLength:number=0;
  page:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.zaposlenik_id=+s["id"];
    })
   // this.getNarudzbe();
    this.getNarudzbePoStatusu();
    this.getStatistika();
    this.getBrojeveStatusa();
  }


  btnDetalji(n:any) {
    this.postOtkazana(n)

    this.router.navigate(['narudzba-detalji',n.id]);
  }

  getStatistika(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Admin/statistika")
      .subscribe((x:any)=>{
        this.statistika=x;
        this.ukupnoKorisnika=this.statistika?.brKupaca;
        this.ukupnoNarudzbi=this.statistika?.brNarudzbiUkupno;
        console.log(this.statistika);
      })
  }

  getNarudzbe(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/Narudzba/Sve")
      .subscribe((x:any)=>{
        this.narudzbe=x;
        this.totalLength=this.narudzbe?.length;
        console.log(this.narudzbe);
      })
  }

  getNarudzbePoStatusu(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/Narudzba/SortByStatus?status="+this.statusFilter).subscribe((x:any)=>{
      this.narudzbe=x;
    //  this.totalLength=this.narudzbe?.length;
      console.log("narudzbe status",this.narudzbe);
    })
  }

  formatDatum(datum:any){
    if(datum=="" || datum==null) return "-";
    return formatDate(datum,"dd/MM/yyyy","en-Us");
  }

  getFilterNarudzbe(){
    var rez:any;
    /*
    if(this._filter=="" && this.statusFilter=="Sve"){
      this.totalLength=this.narudzbe?.length;
      return this.narudzbe;
    }*/

    rez=this.narudzbe?.filter((x:any)=>( (
        x?.kupacNaziv.toLowerCase().includes(this._filter?.toLowerCase())
        || x?.evidentirao.toLowerCase().includes(this._filter?.toLowerCase())
        || x?.nazivProdavnice.toLowerCase().includes(this._filter?.toLowerCase())
      )
    ));

    /*
    if(this.statusFilter=="Sve"){
      rez=this.narudzbe?.filter((x:any)=> (
          x?.kupacNaziv.toLowerCase().startsWith(this._filter?.toLowerCase()) || this._filter==""
          || x?.evidentirao.toLowerCase().startsWith(this._filter?.toLowerCase()) || this._filter==""
          || x?.nazivProdavnice.toLowerCase().startsWith(this._filter?.toLowerCase()) || this._filter==""
        ))
    }
    else{
      rez=this.narudzbe?.filter((x:any)=> (
        (x.kupacNaziv.toLowerCase().startsWith(this._filter?.toLowerCase()) || this._filter==""
        || x.evidentirao.toLowerCase().startsWith(this._filter?.toLowerCase()) || this._filter==""
        || x.nazivProdavnice.toLowerCase().startsWith(this._filter?.toLowerCase()) || this._filter=="")
        && x.status===this.statusFilter
      ))
    }
*/
    this.totalLength=rez?.length;
    console.log("filter narudzbe:",rez);
    return rez;

  }

  obj_ukupnoNarudzbi:any;

  getBrojeveStatusa(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/Narudzba/BrojStatusa").subscribe((x:any)=>{
      this.obj_ukupnoNarudzbi={
        nova:x._nova,
        spremna:x._spremna,
        otkazana:x._otkazana,
        preuzeta:x._preuzeta,
        istekla:x._istekla,
        ponistena:x._ponistena
      }
    })
  }


  upozorenjeStatus(n:any) {
    console.log(n.status == "Otkazana", n.jel_kliknuo_otkazana==false)

    if (n.status == "Otkazana" && n.jel_kliknuo_otkazana==false) {
      return true; //<img src="assets/slike/warning.png" [ngStyle]="{'width':'40px','height':'40px'}">
    }
    else return false;
  }

  postOtkazana(n:any){
    if (n.status == "Otkazana" && n.jel_kliknuo_otkazana==false) {
      this.httpKlijent.put(MojConfig.adresa_servera+"/Narudzba/PostOtkazana/otkazana?narId="+n.id,n.id).subscribe((x:any)=>{
        this.getNarudzbePoStatusu();
        console.log("otkazana");
      })
    }
  }

}
