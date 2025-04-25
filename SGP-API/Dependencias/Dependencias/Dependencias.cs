using Datos.Contexto;
using Implementacion;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Negocio.Contrato;
using Negocio.Implementacion;
using Negocio.Servicios;

namespace Dependencias.Dependencias
{
    public static class Dependencias
    {
        public static void InyectarDependencia(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<proyectogestiondbContext>(option =>
            {
                var connectionString = configuration.GetConnectionString("CadenaSQLDev");
                option.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
            });
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();
            services.AddScoped<IProyectoRepository, ProyectoRepository>();
            services.AddScoped<IUsuarioService,UsuarioService>();
            services.AddScoped<IProyectoService,ProyectoService>();
        }
    }
}
