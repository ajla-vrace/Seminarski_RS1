import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Component({
  selector: 'app-kupac-pocetna',
  templateUrl: './kupac-pocetna.component.html',
  styleUrls: ['./kupac-pocetna.component.css']
})
export class KupacPocetnaComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router:Router,
              private afDB:AngularFireDatabase) { }

  kupac_id:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.kupac_id=+s["id"];
    })
    this.getBrojPosjeta();
  }

  brojPosjetaUpdate:any;
  brojPregled:any;
  brojPosjetaRef?:any;
  counter:any=0;

  update_varijable(){
    console.log("update se desio");
    if(this.counter<1) {
      this.afDB.object('Varijable/').update({brojPregleda:++this.brojPregled});
      this.counter++;
    }
  }

  getBrojPosjeta(){
    this.brojPosjetaRef=this.afDB.object('Varijable').valueChanges().subscribe
    ((x:any)=>{
      this.brojPosjetaUpdate=x;
      console.log("brojposjeta:",this.brojPosjetaUpdate);
      this.brojPregled=this.brojPosjetaUpdate.brojPregleda;
      console.log(this.brojPregled);
      console.log("kupac pocetna");
      this.update_varijable();
    });
  }

}
