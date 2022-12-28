import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profil-admin',
  templateUrl: './profil-admin.component.html',
  styleUrls: ['./profil-admin.component.css']
})
export class ProfilAdminComponent implements OnInit {
  constructor(private route:ActivatedRoute, private router:Router) { }

  admin_id:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.admin_id=+s["id"];
    })
  }

}
