using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Migrations
{
    /// <inheritdoc />
    public partial class narudzba3atributa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "jel_poslana_prouka",
                table: "Narudzba",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "jel_promijenjen_status",
                table: "Narudzba",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "jel_poslana_prouka",
                table: "Narudzba");

            migrationBuilder.DropColumn(
                name: "jel_promijenjen_status",
                table: "Narudzba");
        }
    }
}
