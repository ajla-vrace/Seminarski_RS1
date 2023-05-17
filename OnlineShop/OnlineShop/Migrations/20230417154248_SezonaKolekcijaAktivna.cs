using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Migrations
{
    /// <inheritdoc />
    public partial class SezonaKolekcijaAktivna : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Aktivna",
                table: "Sezona",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Aktivna",
                table: "Kolekcija",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Aktivna",
                table: "Sezona");

            migrationBuilder.DropColumn(
                name: "Aktivna",
                table: "Kolekcija");
        }
    }
}
