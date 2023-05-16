import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {Router} from "@angular/router";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";
import {Observable,throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-otkljucaj',
  templateUrl: './otkljucaj.component.html',
  styleUrls: ['./otkljucaj.component.css']
})
export class OtkljucajComponent implements OnInit {

  constructor(private httpClient:HttpClient,private route:Router) { }

  code:any="";
  ispravan_kod:any="";
  loginId:any=AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.id;

  ngOnInit(): void {
    this.getKod();
  }

  getKod(){
    this.httpClient.get(MojConfig.adresa_servera+"/api/Autentifikacija/kod",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.ispravan_kod=x?.code;
        console.log(this.ispravan_kod, " ", x);
      })
  }

  otkljucaj(){
    if(this.ispravan_kod==this.code) {
      this.httpClient.get(MojConfig.adresa_servera + "/api/Autentifikacija/" + this.code, MojConfig.http_opcije())
        .subscribe((x: any) => {
        this.route.navigateByUrl("/admin-pocetna/" + this.loginId);
      })
    }
    else{
      alert("Unijeli ste neispravan kod!");
      this.code="";
      //this.route.navigate(["/otkljucaj"]);
    }


  }

  handleError(error:any) {
    throw error (error.message || "Server error");
  }
}
