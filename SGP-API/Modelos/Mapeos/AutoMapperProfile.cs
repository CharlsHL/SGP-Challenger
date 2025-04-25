using AutoMapper;
using Datos.Contexto;
using Modelos.DTOs;

namespace Modelos.Mapeos
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Usuario, UsuarioDto>();
            CreateMap<UsuarioDto, Usuario>();
            CreateMap<UsuarioCreacionDto, Usuario>(); // Mapeo desde DTO de creación hacia Modelos.Usuario
            CreateMap<UsuarioActualizacionDto, Usuario>(); // Mapeo desde DTO de actualización hacia Modelos.Usuario
            CreateMap<Usuario, UsuarioActualizacionDto>(); // Opcional: si necesitas mapear desde la entidad para editar

            CreateMap<Proyecto, ProyectoDTO>();
            CreateMap<ProyectoActualizacionDto, Proyecto>();
            CreateMap<Proyecto, ProyectoActualizacionDto>();
   
            CreateMap<ProyectoDTO, Proyecto>()
            .ForMember(dest => dest.FechaInicio, opt => opt.MapFrom(src => src.FechaInicio.HasValue ? DateOnly.FromDateTime(src.FechaInicio.Value) : (DateOnly?)null))
            .ForMember(dest => dest.FechaFin, opt => opt.MapFrom(src => src.FechaFin.HasValue ? DateOnly.FromDateTime(src.FechaFin.Value) : (DateOnly?)null));

            CreateMap<Proyecto, ProyectoDTO>()
                .ForMember(dest => dest.FechaInicio, opt => opt.MapFrom(src => src.FechaInicio.HasValue ? src.FechaInicio.Value.ToDateTime(TimeOnly.MinValue) : (DateTime?)null))
                .ForMember(dest => dest.FechaFin, opt => opt.MapFrom(src => src.FechaFin.HasValue ? src.FechaFin.Value.ToDateTime(TimeOnly.MinValue) : (DateTime?)null));


        }
    }
}
