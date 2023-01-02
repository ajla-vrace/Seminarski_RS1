import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MojConfig} from "../moj-config";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-favoriti',
  templateUrl: './favoriti.component.html',
  styleUrls: ['./favoriti.component.css']
})
export class FavoritiComponent implements OnInit {

  kupac_id:any;
   favoritiPodaci: any;

  constructor(private httpKlijent: HttpClient,private router: Router, private route:ActivatedRoute) {
  }
  fetchFavoriti() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Favorit/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.favoritiPodaci = x;
    });
  }
  ngOnInit(): void {
    this.fetchFavoriti();
    this.route.params.subscribe(s=>{
      this.kupac_id=+s["id"];
    })

  }

  getFavoriti() {
    if (this.favoritiPodaci == null)
      return [];
    return this.favoritiPodaci;
  }
}
