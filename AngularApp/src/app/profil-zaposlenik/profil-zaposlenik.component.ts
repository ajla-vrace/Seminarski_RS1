import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";

@Component({
  selector: 'app-profil-zaposlenik',
  templateUrl: './profil-zaposlenik.component.html',
  styleUrls: ['./profil-zaposlenik.component.css']
})
export class ProfilZaposlenikComponent implements OnInit {

  constructor(private route: ActivatedRoute, private httpKlijent:HttpClient) { }

  zaposlenik_id:any;
  podaci_zaposlenika:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.zaposlenik_id=+s["id"];
    })
    this.getZaposlenika();
  }

  getZaposlenika(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Zaposlenik/id?id="+this.zaposlenik_id)
      .subscribe((x:any)=>{
        this.podaci_zaposlenika=x;
        console.log(this.podaci_zaposlenika);
      })
  }

}
