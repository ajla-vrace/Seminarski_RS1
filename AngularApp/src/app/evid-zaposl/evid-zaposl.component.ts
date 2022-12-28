import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-evid-zaposl',
  templateUrl: './evid-zaposl.component.html',
  styleUrls: ['./evid-zaposl.component.css']
})
export class EvidZaposlComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router) { }

  admin_id:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.admin_id=+s["id"];
    })
  }


}
