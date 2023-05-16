using System.Net.Mail;

namespace OnlineShop.Helper
{
    public class PosaljiMail
    {
        public static void Posalji(string _to, string _subject, string _body, bool _isBodyHtml=false)
        {
            string to = _to;
            string body = _body;
            string subject = _subject;
            MailMessage mm = new MailMessage();
            mm.From = new MailAddress("prodavnicaluna@gmail.com");
            mm.Subject = subject;
            mm.Body = body;
            mm.To.Add(to);
            mm.IsBodyHtml = _isBodyHtml;

            SmtpClient smtp = new SmtpClient("smtp.gmail.com");
            smtp.Port = 587;
            smtp.UseDefaultCredentials = false;
            smtp.EnableSsl = true;
            smtp.Credentials = new System.Net.NetworkCredential("prodavnicaluna@gmail.com", "yvygsqnrjdmyxksu");
            smtp.Send(mm);
        }
    }
}
