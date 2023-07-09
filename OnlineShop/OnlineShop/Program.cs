using OnlineShop.Data;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Helper;
using OnlineShop.Modul3_SignalR;
using OnlineShop.Helper.AutentifikacijaAutorizacija;

var config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", false)
    .Build();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(config.GetConnectionString("db1")));

builder.Services.AddControllers();





//signal R
builder.Services.AddSignalR();








// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();   ///zakomentarisala ovu i dodala onu ispod
builder.Services.AddSwaggerGen(c => c.OperationFilter<AutorizacijaSwaggerHeader>());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors(
    options => options
        .SetIsOriginAllowed(x => _ = true)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()
); //This needs to set everything allowed

app.UseRouting();

app.UseEndpoints(endpoints =>
{

    endpoints.MapControllers();


    endpoints.MapHub<PorukeHub>("/poruka-hub-putanja");
});









app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();