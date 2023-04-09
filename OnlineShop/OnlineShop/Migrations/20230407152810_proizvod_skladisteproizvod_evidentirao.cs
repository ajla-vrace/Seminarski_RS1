using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Migrations
{
    /// <inheritdoc />
    public partial class proizvodskladisteproizvodevidentirao : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "evidentirao",
                table: "SkladisteProizvod",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "evidentirao",
                table: "Proizvod",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "evidentirao",
                table: "SkladisteProizvod");

            migrationBuilder.DropColumn(
                name: "evidentirao",
                table: "Proizvod");
        }
    }
}
