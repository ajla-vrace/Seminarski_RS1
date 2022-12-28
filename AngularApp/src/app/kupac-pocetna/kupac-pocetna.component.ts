import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-kupac-pocetna',
  templateUrl: './kupac-pocetna.component.html',
  styleUrls: ['./kupac-pocetna.component.css']
})
export class KupacPocetnaComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router:Router) { }

  kupac_id:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.kupac_id=+s["id"];
    })
  }

}
