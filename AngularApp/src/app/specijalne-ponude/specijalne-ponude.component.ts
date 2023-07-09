import { Component, OnInit } from '@angular/core';
import {SignalRProba1Servis} from "../_servisi/SignalRProba1Servis";
import {SignalRProba2Servis} from "../_servisi/SignalRProba2Servis";
@Component({
  selector: 'app-specijalne-ponude',
  templateUrl: './specijalne-ponude.component.html',
  styleUrls: ['./specijalne-ponude.component.css']
})
export class SpecijalnePonudeComponent implements OnInit {

  constructor(public probaServis1: SignalRProba1Servis, public probaServis2: SignalRProba2Servis) {
    probaServis1.otvoriKanalWebSocket();
    probaServis2.otvoriKanalWebSocket();
  }

  ngOnInit(): void {

  }

}
