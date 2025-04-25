using Modelos.DTOs;

namespace Negocio.Contrato
{
    public interface IUsuarioService
    {
        Task<IEnumerable<UsuarioDto>> GetAllUsuarios();
        Task<UsuarioDto?> GetUsuarioPorId(int id);
        Task<UsuarioDto?> GetUsuarioPorNombreUsuario(string nombreUsuario);
        Task AddUsuario(UsuarioCreacionDto usuarioCreacion);
        Task UpdateUsuario(UsuarioActualizacionDto usuarioActualizacion);
        Task DeleteUsuario(int id);
        Task<UsuarioDto?> Authenticate(string nombreUsuario, string contraseña);
    }
}
