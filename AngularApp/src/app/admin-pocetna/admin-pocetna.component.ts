import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";

@Component({
  selector: 'app-admin-pocetna',
  templateUrl: './admin-pocetna.component.html',
  styleUrls: ['./admin-pocetna.component.css']
})
export class AdminPocetnaComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router, private httpKlijent:HttpClient) { }

  admin_id:any;
  brPreuzimanja: any;
  naslovKataloga: any="Neki naslov kataloga";
  brPosjeta: any;
  brNar: any;
  brojPretpl: any;
  brojReg: any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.admin_id=+s["id"];
    })
    this.getBestsellers();
  }

  bestsellers:any;
  proizvod1Id:any;
  proizvod2Id:any;
  proizvod3Id:any;
  getBestsellers(){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/Admin/bestsellers")
      .subscribe((x:any)=>{
        this.bestsellers=x;
        this.proizvod1Id=this.bestsellers[0].proizvodId;
        this.proizvod2Id=this.bestsellers[1].proizvodId;
        this.proizvod3Id=this.bestsellers[2].proizvodId;
        console.log(this.bestsellers);
        console.log(this.proizvod1Id, this.proizvod2Id, this.proizvod3Id);

      })
  }


  slike_by_proizvodId:any; //moram imati 3 razlicita objekta

  getSlikeByProizvodId(p:number){
    this.httpKlijent.get(MojConfig.adresa_servera+"/api/ProizvodSlika/slikaByProizvodId?id="
      +p).subscribe((x:any)=>{
        if(x.length>0)
         this.slike_by_proizvodId=x[0];
      console.log(this.slike_by_proizvodId);
    })
  }


  get_slika_FS(p: any) {
    return "data:image/jpg;base64,"+p.fileContents;
  }

}
