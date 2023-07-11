import {Injectable, Input, OnInit} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";
import {MojConfig} from "../moj-config";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class AutorizacijaLoginProvjera implements CanActivate{

  constructor(private router: Router, private httpKlijent:HttpClient) {
    // this.getOtkljucan();

  }

  //@Input() jelOtkljucan:any;

  jel_otkljucan:any=false;

  getOtkljucan(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Autentifikacija/kod",MojConfig.http_opcije())
      .subscribe((x:any)=>{
        this.jel_otkljucan=x?.jelOtkljucan;
        console.log(this.jel_otkljucan);

        console.log(AutentifikacijaHelper.getLoginInfo().isLogiran,
          AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.isAdmin,
          this.jel_otkljucan)

        if(this.jel_otkljucan==false) {
          console.log("navigate to prijava")
          this.router.navigate(['/prijava']);
        }
        else {
          console.log("navigate to pocetna")
          this.router.navigate(['/admin-pocetna',AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.id]);
        }
      })
 /*   if (this.jel_otkljucan==true)
      return true;
    else
     {
      this.router.navigate(['/prijava']);
      return false;
    }
  */
    return this.jel_otkljucan;
  }


  delay(ms: number) {
    console.log("delay");
    return new Promise((resolve) => setTimeout(resolve, ms));
  }


  aktiviraj(){

    this.delay(5000);

    console.log("nakon provjere")
    try {
      //nedovrseno privremeno rjesenje
      if (AutentifikacijaHelper.getLoginInfo().isLogiran && !AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.isAdmin)
        return true;
      else if(AutentifikacijaHelper.getLoginInfo().isLogiran
        && AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.isAdmin
        && this.jel_otkljucan==true
      )
        return true;
    }catch (e) {
    }
    // not logged in so redirect to login page with the return url
    //this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    this.router.navigate(['/prijava']);
    //staviti admin pocetna (svakako samo ta stranica i koristi ovaj activate
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

   return this.getOtkljucan();

  }



}
