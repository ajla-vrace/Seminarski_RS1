using Microsoft.AspNetCore.SignalR;

namespace OnlineShop.Modul3_SignalR
{
    public class PorukeHub:Hub
    {
        public async Task PosaljiPoruku(string poruka)
        {
            await Clients.All.SendAsync("PrimljenaPoruka", poruka);
        }
    }
}
