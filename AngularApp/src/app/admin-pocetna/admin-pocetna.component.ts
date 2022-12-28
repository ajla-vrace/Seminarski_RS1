import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-pocetna',
  templateUrl: './admin-pocetna.component.html',
  styleUrls: ['./admin-pocetna.component.css']
})
export class AdminPocetnaComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router) { }

  admin_id:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.admin_id=+s["id"];
    })
  }

}
