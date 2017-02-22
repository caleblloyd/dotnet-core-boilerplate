using App.Cmd.Commands;
using System;

namespace App.Cmd {

    public static class CommandRunner
    {
        public static void Help()
        {
            Console.Error.WriteLine(@"app
    migrate            run migrations
    -h, --help         show this message
            ");
        }

        public static int Run(string[] args)
        {
            var cmd = args[0];

            try
            {
	            switch (cmd)
	            {
		            case "migrate":
						MigrateCommand.Run();
			            break;
		            case "-h":
		            case "--help":
			            Help();
			            break;
		            default:
			            Help();
			            return 1;
	            }
            }
            catch (Exception e)
            {
                Console.Error.WriteLine(e.Message);
                return 1;
            }
            return 0;
        }
    }
}
    