namespace Lion.AbpPro.DbMigrator
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Information()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
                .MinimumLevel.Override("Volo.Abp", LogEventLevel.Warning)
#if DEBUG
                .MinimumLevel.Override("Lion.AbpPro", LogEventLevel.Debug)
#else
                .MinimumLevel.Override("Lion.AbpPro", LogEventLevel.Information)
#endif
                .Enrich.FromLogContext()
                .WriteTo.Async(c => c.File("Logs/logs.txt"))
                .WriteTo.Async(c => c.Console())
                .CreateLogger();

            await CreateHostBuilder(args).RunConsoleAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureLogging((context, logging) => logging.ClearProviders())
                .ConfigureAppConfiguration
                (
                    options =>
                    {
                        options.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
                        
                        var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                        if (!environment.IsNullOrWhiteSpace())
                        {
                            options.AddJsonFile($"appsettings.{environment}.json", optional: true, reloadOnChange: true);
                        }
                        
                        options.AddEnvironmentVariables();
                    }
                )
                .ConfigureServices((hostContext, services) =>
                {
                    services.AddHostedService<DbMigratorHostedService>();
                });
    }
}
