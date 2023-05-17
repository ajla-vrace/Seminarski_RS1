using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Data;
using OnlineShop.Helper;
using System.Net.Mail;

namespace OnlineShop.Modul1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PorukeController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        public PorukeController(ApplicationDbContext context)
        {
            this.context = context;
        }


        [HttpPost]
        public ActionResult EmailSend(EmailSender es)
        {
            string to = es.To;
            string body = es.Body;
            string subject = es.Subject;
            MailMessage mm = new MailMessage();
            mm.From = new MailAddress("prodavnicaluna@gmail.com");
            mm.Subject = subject;
            mm.Body = body;
            mm.To.Add(to);
            mm.IsBodyHtml = false;

            SmtpClient smtp = new SmtpClient("smtp.gmail.com");
            smtp.Port = 587;
            smtp.UseDefaultCredentials = false;
            smtp.EnableSsl = true;
            smtp.Credentials = new System.Net.NetworkCredential("prodavnicaluna@gmail.com", "yvygsqnrjdmyxksu");
            smtp.Send(mm);

            return Ok();
        }
    }
}
