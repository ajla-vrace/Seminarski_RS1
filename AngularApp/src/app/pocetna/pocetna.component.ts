import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private afDB:AngularFireDatabase) { }

  ngOnInit(): void {
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
      console.log("pocetna");
      this.update_varijable();
    });
  }
}
