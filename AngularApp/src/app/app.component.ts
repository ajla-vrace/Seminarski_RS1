import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "./moj-config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  ngOnInit(): void {
      throw new Error('Method not implemented.');
  }
  title = 'AngularApp';

  constructor(private router:Router) {
  }

  pocetna() {

  }

  otvoriFaq() {
    this.router.navigate(['/faq']);
  }

  otvoriHelp() {
this.router.navigate(['/help1']);
  }
}
