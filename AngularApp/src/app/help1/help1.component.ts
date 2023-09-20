import { Component, OnInit } from '@angular/core';
import {LoginInformacije} from "../helpers/login-informacije";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";

@Component({
  selector: 'app-help1',
  templateUrl: './help1.component.html',
  styleUrls: ['./help1.component.css']
})
export class Help1Component implements OnInit {
  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }
  constructor() { }

  ngOnInit(): void {
  }

}
