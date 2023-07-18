import { Component, OnInit } from '@angular/core';
import {LoginInformacije} from "../helpers/login-informacije";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";

@Component({
  selector: 'app-vodiczavelicine',
  templateUrl: './vodiczavelicine.component.html',
  styleUrls: ['./vodiczavelicine.component.css']
})
export class VodiczavelicineComponent implements OnInit {
  spol: any;
zenski:boolean=true;
muski:any;
  constructor() { }
  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }
  ngOnInit(): void {
  }

  prikaziZenski() {
    this.zenski=true;
    this.muski=false;
  }

  prikaziMuski() {
  this.muski=true;
    this.zenski=false;
  }
}
