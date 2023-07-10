import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import {MojConfig} from "../moj-config";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private connection: signalR.HubConnection;
  private porukaReceivedSubject: Subject<string> = new Subject<string>();
  public porukaReceived$ = this.porukaReceivedSubject.asObservable();

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(MojConfig.adresa_servera+'/poruka-hub-putanja')
      .build();

    this.connection.start()
      .then(() => console.log('SignalR konekcija uspostavljena.'))
      .catch((err:any) => console.error('Greška prilikom SignalR konekcije: ', err));

    this.connection.on('PrimljenaPoruka', (poruka: string) => {
      this.porukaReceivedSubject.next(poruka);
    });
  }

  posaljiPoruku(poruka: string): void {
    this.connection.invoke('PosaljiPoruku', poruka);
  }
}
