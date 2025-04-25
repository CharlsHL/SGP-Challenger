using Modelos.DTOs;

namespace Negocio.Contrato
{
    public interface IProyectoService
    {
        Task<ProyectoDTO> GetProyectoPorID(int id);
        Task<ProyectoDTO> GetProyectoPorUsuarioID(int idN);
        Task<IEnumerable<ProyectoDTO>> GetAllProyectos();
        Task AddProyecto(ProyectoDTO proyecto);
        Task UpdateProyecto(ProyectoActualizacionDto proyecto);
        Task DeleteProyecto(int id);
    }
}
