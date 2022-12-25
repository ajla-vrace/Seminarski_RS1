using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace OnlineShop.Helper.AutentifikacijaAutorizacija
{
    public class AutorizacijaAttribute : TypeFilterAttribute
    {
        public AutorizacijaAttribute(bool Kupac, bool Admin, bool Zaposlenik) : base(typeof(MyAuthorizeImpl))
        {
            Arguments = new object[] { };
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
            public void OnActionExecuted(ActionExecutedContext context)
            {


            }

            public void OnActionExecuting(ActionExecutingContext filterContext)
            {

                if (filterContext.HttpContext.GetLoginInfo().isLogiran)
                {
                    filterContext.Result = new UnauthorizedResult();
                    return;
                }

                KretanjePoSistemu.Save(filterContext.HttpContext);

                if (filterContext.HttpContext.GetLoginInfo().isLogiran)
                {
                    return;//ok - ima pravo pristupa
                }


                //else nema pravo pristupa
                filterContext.Result = new UnauthorizedResult();
            }
        }
    }
}
