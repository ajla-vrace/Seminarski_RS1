using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;

namespace OnlineShop.Helper
{
    public class EmailSender
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }


        public static void UspjesnaPretplata(string primateljEmail)
        {
            string posiljateljEmail = "prodavnicaluna@gmail.com"; 
            string subject = "Potvrda pretplate 1";
            string body = "Uspješno ste se pretplatili na naš newsletter. <br/><br/> Pozdrav <br/> Luna";             

            using (MailMessage mail = new MailMessage(posiljateljEmail, primateljEmail))
            {
                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;

                using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587)) 
                {
                    smtp.EnableSsl = true;
                    smtp.Credentials = new NetworkCredential(posiljateljEmail, "yvygsqnrjdmyxksu");
                    smtp.Send(mail);
                }
            }
        }

        public static void SpecijalnePonude(string primateljEmail)
        {
            string posiljateljEmail = "prodavnicaluna@gmail.com";
            string subject = "Specijalna ponuda";
            string body = "Dodane su nove specijalne ponude.<br/> Budite prvi koji će to vidjeti. <br/><br/> Pozdrav <br/> Luna";

            using (MailMessage mail = new MailMessage(posiljateljEmail, primateljEmail))
            {
                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;

                using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                {
                    smtp.EnableSsl = true;
                    smtp.Credentials = new NetworkCredential(posiljateljEmail, "yvygsqnrjdmyxksu");
                    smtp.Send(mail);
                }
            }
        }


        public static void EmailSpecijalnePonude(string to, string subject, string body)
        {
            using (var smtpClient = new SmtpClient("smtp.gmail.com", 587))
            {
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential("prodavnicaluna@gmail.com", "yvygsqnrjdmyxksu");
                smtpClient.EnableSsl = true;

                using (var mailMessage = new MailMessage("prodavnicaluna@gmail.com", to))
                {
                    mailMessage.Subject = subject;
                    mailMessage.Body = body;
                    mailMessage.IsBodyHtml = true;

                    smtpClient.Send(mailMessage);
                }
            }
        }
    }
    
    
}
