import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";

@Component({
  selector: 'app-narudzba-detalji',
  templateUrl: './narudzba-detalji.component.html',
  styleUrls: ['./narudzba-detalji.component.css']
})
export class NarudzbaDetaljiComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router:Router,private httpKlijent:HttpClient) { }

//  zaposlenik_id:any;
//  kupac_id:any;
  narudzba_id:any;
  narudzbaDetalji:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.narudzba_id=+s["id"];
    })
    this.getNarudzbaDetalji();
  }

  getNarudzbaDetalji(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/Narudzba/GetKupcaIDetaljeNarudzbe?narudzba_id="
    +this.narudzba_id).subscribe((x:any)=>{
      this.narudzbaDetalji=x;
      console.log(this.narudzbaDetalji);
    })
  }
}
