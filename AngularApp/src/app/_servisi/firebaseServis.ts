import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {filter, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) {}

  getNotifikacija(): Observable<number> {
    const notifikacijaRef = this.db.object<number>('/notifikacija');
    return notifikacijaRef.valueChanges().pipe(
      map(value => value || 0) // Ako je value null, zamijenite ga s 0
    );
  }





  ovo:any;
  setNotifikacija(value: number): Observable<void> {
    // Postavi vrijednost diode na true (1) ili false (0)
    const notifikacijaValue = value ? 1 : 0;
    this.ovo=this.db.object('/dioda').set(notifikacijaValue);
    return this.ovo;
  }


}
