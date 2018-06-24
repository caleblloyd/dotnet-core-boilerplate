using System.IO;
using App.Common.Config;
using Microsoft.EntityFrameworkCore.Migrations;

namespace App.Migrations
{
    public partial class testdata : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(File.ReadAllText(Path.Combine(AppConfig.DataDir, "test.sql")));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                DELETE FROM ""Posts"";
                DELETE FROM ""Authors"";
            ");
        }
    }
}
