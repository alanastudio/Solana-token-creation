using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

const string FrontCors = "FrontCors";
builder.Services.AddCors(options =>
{
    options.AddPolicy(FrontCors, policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000"
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Solana App API", Version = "v1" });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(FrontCors);

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.Run();
