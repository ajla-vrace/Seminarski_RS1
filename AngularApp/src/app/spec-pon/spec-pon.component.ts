import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-spec-pon',
  templateUrl: './spec-pon.component.html',
  styleUrls: ['./spec-pon.component.css']
})
export class SpecPonComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router) { }

  admin_id:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.admin_id=+s["id"];
    })
  }


}
