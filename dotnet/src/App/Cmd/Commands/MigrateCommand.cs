using App.Common.Db;
using Microsoft.EntityFrameworkCore;
using System;

namespace App.Cmd.Commands {

    public static class MigrateCommand{

        public static void Run(){
            Console.WriteLine("Running migrations...");
            using (var dbScope = new AppDbScope()){
                dbScope.AppDb.Database.Migrate();
            }
            Console.WriteLine("Done");
        }

    }

}