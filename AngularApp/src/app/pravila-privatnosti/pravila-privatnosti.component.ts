import { Component, OnInit } from '@angular/core';
import {LoginInformacije} from "../helpers/login-informacije";
import {AutentifikacijaHelper} from "../helpers/autentifikacija-helper";

@Component({
  selector: 'app-pravila-privatnosti',
  templateUrl: './pravila-privatnosti.component.html',
  styleUrls: ['./pravila-privatnosti.component.css']
})
export class PravilaPrivatnostiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  loginInfo():LoginInformacije {
    return AutentifikacijaHelper.getLoginInfo();
  }
}
