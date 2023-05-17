

export class LoginInformacije {
  // @ts-ignore
  autentifikacijaToken: AutentifikacijaToken=null ;
  isLogiran:  boolean=false;

}

export interface AutentifikacijaToken {
  id:                   number;
  vrijednost:           string;
  korisnickiNalogId:    number;
  korisnickiNalog:      KorisnickiNalog;
  vrijemeEvidentiranja: Date;
  ipAdresa:             string;
  twoFcode:             string;
  jel_otkljucan:        boolean;
}

export interface KorisnickiNalog {
  id:   number;
  ime:   string;
  prezime: string;
  username:  string;
  lozinka: string;
  email: string;
  brojTelefona: string;
  datumRegistracije: Date;
  isAdmin: boolean;
  isZaposlenik:boolean;
  isKupac:boolean;
  spolId:number;
}
