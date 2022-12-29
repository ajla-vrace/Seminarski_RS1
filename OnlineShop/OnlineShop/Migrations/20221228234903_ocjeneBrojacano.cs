using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Migrations
{
    /// <inheritdoc />
    public partial class ocjeneBrojacano : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Naziv",
                table: "Zvjezdica");

            migrationBuilder.DropColumn(
                name: "Naziv",
                table: "Ocjena");

            migrationBuilder.AddColumn<int>(
                name: "OcjenaBrojcano",
                table: "Zvjezdica",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OcjenaBrojcano",
                table: "Ocjena",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OcjenaBrojcano",
                table: "Zvjezdica");

            migrationBuilder.DropColumn(
                name: "OcjenaBrojcano",
                table: "Ocjena");

            migrationBuilder.AddColumn<string>(
                name: "Naziv",
                table: "Zvjezdica",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Naziv",
                table: "Ocjena",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
