import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-narudzba-detalji',
  templateUrl: './narudzba-detalji.component.html',
  styleUrls: ['./narudzba-detalji.component.css']
})
export class NarudzbaDetaljiComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router:Router) { }

  zaposlenik_id:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.zaposlenik_id=+s["id"];
    })
  }
}
