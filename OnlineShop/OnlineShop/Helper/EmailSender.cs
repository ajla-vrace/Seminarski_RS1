using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;

namespace OnlineShop.Helper
{
    public class EmailSender
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }

    
}
