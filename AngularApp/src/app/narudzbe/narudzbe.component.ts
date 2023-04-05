import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";

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

  _filter:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.zaposlenik_id=+s["id"];
    })
    this.getNarudzbe();
    this.getStatistika();
  }


  btnDetalji() {
    this.router.navigate(['narudzba-detalji',this.zaposlenik_id]);
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
    this.httpKlijent.get(MojConfig.adresa_servera+"/Narudzba/GetAll")
      .subscribe((x:any)=>{
        this.narudzbe=x;
        console.log(this.narudzbe);
      })
  }

  getFilterNarudzbe(){
    //if status == sve ...
    //if status == nova ... filter && x.status==nova
    //itd...
    var rez=this.narudzbe?.filter((x:any)=>
      (
        x.kupac.toLowerCase().startsWith(this._filter.toLowerCase())
        //|| zaposlenik || prodavnica
      ))
  }
}
