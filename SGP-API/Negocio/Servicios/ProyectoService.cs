using AutoMapper;
using Modelos.DTOs;
using Negocio.Contrato;

namespace Negocio.Servicios
{
    public class ProyectoService:IProyectoService
    {
        private readonly IProyectoRepository _proyectoRepository;
        private readonly IMapper _mapper;

        public ProyectoService(IMapper mapper, IProyectoRepository proyectoRepository)
        {
            _proyectoRepository = proyectoRepository;
            _mapper = mapper;
        }

        public async Task AddProyecto(ProyectoDTO proyecto)
        {
            // Podés agregar validaciones o reglas aquí si es necesario
            await _proyectoRepository.AddProyecto(proyecto);
        }

        public async Task DeleteProyecto(int id)
        {
            await _proyectoRepository.DeleteProyecto(id);
        }

        public async Task<IEnumerable<ProyectoDTO>> GetAllProyectos()
        {
            return await _proyectoRepository.GetAllProyectos();
        }

        public async Task<ProyectoDTO?> GetProyectoPorID(int id)
        {
            return await _proyectoRepository.GetProyectoPorID(id);
        }

        public async Task<ProyectoDTO?> GetProyectoPorUsuarioID(int usuarioId)
        {
            return await _proyectoRepository.GetProyectoPorUsuarioID(usuarioId);
        }

        public async Task UpdateProyecto( ProyectoActualizacionDto proyecto)
        {
            await _proyectoRepository.UpdateProyecto(proyecto);
        }
    }
}
