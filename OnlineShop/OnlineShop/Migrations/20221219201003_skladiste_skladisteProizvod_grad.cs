using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineShop.Migrations
{
    /// <inheritdoc />
    public partial class skladisteskladisteProizvodgrad : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Grad",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grad", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Skladiste",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Adresa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BrojTelefona = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Povrsina = table.Column<float>(type: "real", nullable: false),
                    gradId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Skladiste", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Skladiste_Grad_gradId",
                        column: x => x.gradId,
                        principalTable: "Grad",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SkladisteProizvod",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    proizvodId = table.Column<int>(type: "int", nullable: true),
                    skladisteId = table.Column<int>(type: "int", nullable: true),
                    kolicina = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SkladisteProizvod", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SkladisteProizvod_Proizvod_proizvodId",
                        column: x => x.proizvodId,
                        principalTable: "Proizvod",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SkladisteProizvod_Skladiste_skladisteId",
                        column: x => x.skladisteId,
                        principalTable: "Skladiste",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Skladiste_gradId",
                table: "Skladiste",
                column: "gradId");

            migrationBuilder.CreateIndex(
                name: "IX_SkladisteProizvod_proizvodId",
                table: "SkladisteProizvod",
                column: "proizvodId");

            migrationBuilder.CreateIndex(
                name: "IX_SkladisteProizvod_skladisteId",
                table: "SkladisteProizvod",
                column: "skladisteId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SkladisteProizvod");

            migrationBuilder.DropTable(
                name: "Skladiste");

            migrationBuilder.DropTable(
                name: "Grad");
        }
    }
}
