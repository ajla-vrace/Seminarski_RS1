import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-skladiste',
  templateUrl: './skladiste.component.html',
  styleUrls: ['./skladiste.component.css']
})
export class SkladisteComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  zaposlenik_id:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.zaposlenik_id=+s["id"];
    })
  }
}
