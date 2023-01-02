import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-narudzbe',
  templateUrl: './narudzbe.component.html',
  styleUrls: ['./narudzbe.component.css']
})
export class NarudzbeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router:Router) { }

  zaposlenik_id:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.zaposlenik_id=+s["id"];
    })
  }


  btnDetalji() {
    this.router.navigate(['narudzba-detalji',this.zaposlenik_id]);
  }
}
