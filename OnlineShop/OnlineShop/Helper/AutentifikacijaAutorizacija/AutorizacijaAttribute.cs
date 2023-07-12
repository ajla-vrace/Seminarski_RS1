using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace OnlineShop.Helper.AutentifikacijaAutorizacija
{
    public class AutorizacijaAttribute : TypeFilterAttribute
    {
        public AutorizacijaAttribute(bool Kupac, bool Zaposlenik, bool Admin) : base(typeof(MyAuthorizeImpl))
        {
            Arguments = new object[] { Kupac,Zaposlenik, Admin};
        }
       

        public class MyAuthorizeImpl : IActionFilter
        {
            private readonly bool _kupac;
            private readonly bool _zaposlenik;
            private readonly bool _admin;


            public MyAuthorizeImpl(bool kupac, bool zaposlenik, bool admin)
            {
                _kupac = kupac;
                _zaposlenik = zaposlenik;
                _admin = admin;
            }
            public void OnActionExecuted(ActionExecutedContext filterContext)
            {
                KretanjePoSistemu.Save(filterContext.HttpContext); //dodano
            }

            public void OnActionExecuting(ActionExecutingContext filterContext)
            {
                MyAuthTokenExtension.LoginInformacije loginInfo = filterContext.HttpContext.GetLoginInfo();

                if (!loginInfo.isLogiran || loginInfo.korisnickiNalog==null) //filterContext.HttpContext.GetLoginInfo().isLogiran
                {
                    filterContext.Result = new UnauthorizedResult();
                    return;
                }

                //KretanjePoSistemu.Save(filterContext.HttpContext);

                if (loginInfo.korisnickiNalog.isAdmin!=null && _admin)
                {
                    if (loginInfo.korisnickiNalog.isAdmin==true && (loginInfo.autentifikacijaToken==null || !loginInfo.autentifikacijaToken.jel_otkljucan))
                    {
                        filterContext.Result = new UnauthorizedObjectResult("Korisnik nije otkljucan, provjerite email.");
                        return;
                    }
                    return;//ok - ima pravo pristupa
                }

                if (loginInfo.korisnickiNalog.isZaposlenik!=null && _zaposlenik)
                {
                    return;//ok - ima pravo pristupa
                }

                if (loginInfo.korisnickiNalog.isKupac!=null && _kupac)
                {
                    return;//ok - ima pravo pristupa
                }


                //else nema pravo pristupa
                filterContext.Result = new UnauthorizedResult();
            }
        }
    }
}
