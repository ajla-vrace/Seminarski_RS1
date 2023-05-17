import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postavke-poruke',
  templateUrl: './postavke-poruke.component.html',
  styleUrls: ['./postavke-poruke.component.css']
})
export class PostavkePorukeComponent implements OnInit {

  constructor() { }

  porukaSpremna:any="Vaša narudžba je spremna za preuzeti već od sutra. Rok za preuzimanje naružbe je do narednih 14 dana.";
  porukaOdgodjena:any="Vaša narudžba je odgođena jer trenutno nemamo zaliha proizvoda kojeg naručujete";
  _poruka:any;
  porukaIstekla: any="Vaša narudžba nije preuzeta u predefinisano vrijeme te je stoga istekla.";

  ngOnInit(): void {
  }


  spasi() {

  }

  uredi_poruku(poruka:any){
    this._poruka=poruka;
  }
}
