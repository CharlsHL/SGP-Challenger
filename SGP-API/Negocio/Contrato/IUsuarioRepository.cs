using Datos.Contexto;
using Modelos.DTOs;

namespace Negocio.Contrato
{
    public interface IUsuarioRepository
    {
        Task<UsuarioDto> GetUsuarioPorId(int id);
        Task<UsuarioDto> GetUsuarioPorNombreUsuario(string nombreUsuario);
        Task<IEnumerable<UsuarioDto>> GetAllUsuarios();
        Task AddUsuario(UsuarioCreacionDto usuario);
        Task UpdateUsuario(UsuarioActualizacionDto usuario); 
        Task DeleteUsuario(int id);
        Task<UsuarioDto> Authenticate(string nombreUsuario, string contraseña);
    }
}
