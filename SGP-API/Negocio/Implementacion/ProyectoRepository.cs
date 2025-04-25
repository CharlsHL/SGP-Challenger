using AutoMapper;
using AutoMapper.QueryableExtensions;
using Datos.Contexto;
using Microsoft.EntityFrameworkCore;
using Modelos.DTOs;
using Negocio.Contrato;

namespace Negocio.Implementacion
{
    public class ProyectoRepository : IProyectoRepository
    {
        private readonly proyectogestiondbContext _context;
        private readonly IMapper _mapper;

        public ProyectoRepository(proyectogestiondbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProyectoDTO>> GetAllProyectos()
        {
            return await _context.Proyectos
                .AsNoTracking()
                .ProjectTo<ProyectoDTO>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<ProyectoDTO?> GetProyectoPorID(int id)
        {
            var proyecto = await _context.Proyectos
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);

            return proyecto != null ? _mapper.Map<ProyectoDTO>(proyecto) : null;
        }

        public async Task<ProyectoDTO?> GetProyectoPorUsuarioID(int usuarioId)
        {
            var proyecto = await _context.Proyectos
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.UsuarioId == usuarioId);

            return proyecto != null ? _mapper.Map<ProyectoDTO>(proyecto) : null;
        }

        public async Task AddProyecto(ProyectoDTO proyectoDto)
        {
            var proyecto = _mapper.Map<Proyecto>(proyectoDto);
            try
            {
       
                await _context.Proyectos.AddAsync(proyecto);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine("ERROR GUARDANDO EN BD: " + ex.InnerException?.Message);
                throw; // o podés devolver un mensaje más amigable si querés
            }

        }

        public async Task UpdateProyecto(ProyectoActualizacionDto proyectoDto)
        {
            try
            {
                var proyectoExistente = await _context.Proyectos.FindAsync(proyectoDto.Id);
                if (proyectoExistente != null)
                {
                    DateTime fechaYHora =Convert.ToDateTime(proyectoDto.FechaInicio);
                    DateOnly fechaInicio = DateOnly.FromDateTime(fechaYHora);
                    fechaYHora = Convert.ToDateTime(proyectoDto.FechaFin);
                    DateOnly fechaFin = DateOnly.FromDateTime(fechaYHora);

                    // Actualizar los valores del usuario existente con los datos del DTO
                    proyectoExistente.Titulo = proyectoDto.Titulo;
                    proyectoExistente.Descripcion = proyectoDto.Descripcion;
                    proyectoExistente.Estado = proyectoDto.Estado;
                    proyectoExistente.UsuarioId = proyectoDto.UsuarioId;
                    proyectoExistente.FechaInicio = fechaInicio;
                    proyectoExistente.FechaFin = fechaFin;


                    // Otros campos según el DTO
                    await _context.SaveChangesAsync();
                }

                _context.Proyectos.Update(proyectoExistente);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine("ERROR GUARDANDO EN BD: " + ex.InnerException?.Message);
                throw; // o podés devolver un mensaje más amigable si querés
            }
    
        }

        public async Task DeleteProyecto(int id)
        {
            var proyecto = await _context.Proyectos.FindAsync(id);
            if (proyecto == null) return;

            _context.Proyectos.Remove(proyecto);
            await _context.SaveChangesAsync();
        }
    }
}
