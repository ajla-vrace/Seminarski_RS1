using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Migrations
{
    /// <inheritdoc />
    public partial class narudzbaPrethodniStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PrethodniStatus",
                table: "Narudzba",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "jel_kliknuo_otkazana",
                table: "Narudzba",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PrethodniStatus",
                table: "Narudzba");

            migrationBuilder.DropColumn(
                name: "jel_kliknuo_otkazana",
                table: "Narudzba");
        }
    }
}
