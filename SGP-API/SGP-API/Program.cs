using Dependencias.Dependencias; // Añadir esta línea

var builder = WebApplication.CreateBuilder(args);

// ======= PRIMERO ===============
var Reglas = "ReglasCors";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: Reglas, builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Determina el entorno actual
var environment = builder.Environment.EnvironmentName;
builder.Services.InyectarDependencia(builder.Configuration); // Este método ahora debería funcionar
builder.Services.AddControllers();
builder.Services.AddAutoMapper(typeof(Modelos.Mapeos.AutoMapperProfile));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.UseCors(Reglas);

app.MapControllers();

app.Run();
