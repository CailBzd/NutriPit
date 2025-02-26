var builder = WebApplication.CreateBuilder(args);

// Configure Kestrel pour écouter sur le port 5001 en HTTPS
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5001, listenOptions =>
    {
        listenOptions.UseHttps(); // Utilise le certificat de développement ou celui défini dans la configuration
    });
});

// Enregistrer HttpClientFactory
builder.Services.AddHttpClient();
// Ajoutez vos services et configuration habituelle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("GenericCorsPolicy", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
var app = builder.Build();
// Utilisation de Swagger en développement (optionnel)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("GenericCorsPolicy");
app.UseAuthorization();
app.MapControllers();
app.Run();
