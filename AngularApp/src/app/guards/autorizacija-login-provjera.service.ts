import {Injectable, OnInit} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";
import {MojConfig} from "../moj-config";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class AutorizacijaLoginProvjera implements CanActivate{

  constructor(private router: Router, private httpKlijent:HttpClient) {

    //this.getOtkljucan();

    this.getOtkljucan();

  }

  getOtkljucan(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Autentifikacija/kod",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.jel_otkljucan=x?.jelOtkljucan;
        console.log(this.jel_otkljucan);
      })

    return this.jel_otkljucan;

  }

  jel_otkljucan:boolean=false;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    console.log(AutentifikacijaHelper.getLoginInfo().isLogiran,
      AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.isAdmin,

      this.getOtkljucan())

      //this.jel_otkljucan();


    try {
      //nedovrseno privremeno rjesenje
      if (AutentifikacijaHelper.getLoginInfo().isLogiran && !AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.isAdmin)
        return true;
      else if(AutentifikacijaHelper.getLoginInfo().isLogiran
        && AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.isAdmin

        && this.getOtkljucan()==true

        && this.jel_otkljucan)

        return true;
    }catch (e) {
    }
    // not logged in so redirect to login page with the return url
    //this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    this.router.navigate(['/prijava']);
    return false;
  }
}
