import {Component, Input, OnInit} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";
import {MojConfig} from "../moj-config";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-izvjestaji',
  templateUrl: './izvjestaji.component.html',
  styleUrls: ['./izvjestaji.component.css']
})




export class IzvjestajiComponent{

  constructor(private router:Router, private httpKlijent:HttpClient) { }

  @Input() jelOtkljucan:any;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("nakon provjere")

    console.log(AutentifikacijaHelper.getLoginInfo().isLogiran,
      AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.isAdmin,
      this.jelOtkljucan)


    try {
      if (AutentifikacijaHelper.getLoginInfo().isLogiran && !AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.isAdmin)
        return true;
      else if(AutentifikacijaHelper.getLoginInfo().isLogiran
        && AutentifikacijaHelper.getLoginInfo().autentifikacijaToken.korisnickiNalog.isAdmin
        && this.jelOtkljucan==true
      )
        return true;
    }catch (e) {
    }
    // not logged in so redirect to login page with the return url
    //this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    this.router.navigate(['/prijava']);
    return false;

  }
}
