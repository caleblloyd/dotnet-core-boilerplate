using App.Db;
using Microsoft.EntityFrameworkCore;
using System;

namespace App.Cmd.Commands {

    public static class MigrateCommand{

        public static void Run(){
            Console.WriteLine("Running migrations...");
            using (var db = new AppDb()){
                db.Database.Migrate();
            }
            Console.WriteLine("Done");
        }

    }

}