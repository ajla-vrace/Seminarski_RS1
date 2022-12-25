import {AutentifikacijaToken} from "./helpers/login-informacije";
import {AutentifikacijaHelper} from "./helpers/autentifikacija-helper";

export class MojConfig{
  static adresa_servera="https://localhost:7043";

  static http_opcije= function (){

    let autentifikacijaToken:AutentifikacijaToken = AutentifikacijaHelper.getLoginInfo().autentifikacijaToken;
    let mojtoken = "";

    if (autentifikacijaToken!=null)
      mojtoken = autentifikacijaToken.vrijednost;
    return {
      headers: {
        'autentifikacija-token': mojtoken,
      }
    };
  }


}
