import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-narudzbe',
  templateUrl: './narudzbe.component.html',
  styleUrls: ['./narudzbe.component.css']
})
export class NarudzbeComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  zaposlenik_id:any;

  ngOnInit(): void {
    this.route.params.subscribe(s=>{
      this.zaposlenik_id=+s["id"];
    })
  }


}
