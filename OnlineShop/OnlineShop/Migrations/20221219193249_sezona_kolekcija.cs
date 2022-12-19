using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Migrations
{
    /// <inheritdoc />
    public partial class sezonakolekcija : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Sezona",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Doba = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Godina = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sezona", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Kolekcija",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Godina = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    sezonaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kolekcija", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Kolekcija_Sezona_sezonaId",
                        column: x => x.sezonaId,
                        principalTable: "Sezona",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Kolekcija_sezonaId",
                table: "Kolekcija",
                column: "sezonaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Kolekcija");

            migrationBuilder.DropTable(
                name: "Sezona");
        }
    }
}
