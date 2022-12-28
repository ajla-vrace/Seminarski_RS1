import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sez-kol',
  templateUrl: './sez-kol.component.html',
  styleUrls: ['./sez-kol.component.css']
})
export class SezKolComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router) { }

  admin_id:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.admin_id=+s["id"];
    })
  }

}
