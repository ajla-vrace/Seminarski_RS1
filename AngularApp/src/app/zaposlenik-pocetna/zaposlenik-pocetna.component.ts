import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-zaposlenik-pocetna',
  templateUrl: './zaposlenik-pocetna.component.html',
  styleUrls: ['./zaposlenik-pocetna.component.css']
})
export class ZaposlenikPocetnaComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  zaposlenik_id:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.zaposlenik_id=+s["id"];
    })
  }
}
