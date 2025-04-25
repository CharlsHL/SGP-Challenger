using AutoMapper;
using Datos.Contexto;
using Microsoft.AspNetCore.Identity;
using Modelos.DTOs;
using Negocio.Contrato;
namespace Negocio.Servicios
{
    public class UsuarioService: IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IMapper _mapper;
        private readonly PasswordHasher<Usuario> _passwordHasher = new();
        public UsuarioService( IMapper mapper, IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
            _mapper = mapper;
        }

        public async Task<UsuarioDto> GetUsuarioPorId(int id)
        {
            var usuario = await _usuarioRepository.GetUsuarioPorId(id);
            return _mapper.Map<UsuarioDto>(usuario);
        }

        public async Task<UsuarioDto> GetUsuarioPorNombreUsuario(string nombreUsuario)
        {
            var usuario = await _usuarioRepository.GetUsuarioPorNombreUsuario(nombreUsuario);
            return _mapper.Map<UsuarioDto>(usuario);
        }

        public async Task<IEnumerable<UsuarioDto>> GetAllUsuarios()
        {
            var usuarios = await _usuarioRepository.GetAllUsuarios();
            return _mapper.Map<IEnumerable<UsuarioDto>>(usuarios);
        }

        public async Task AddUsuario(UsuarioCreacionDto usuarioCreacion)
        {
            var existingUsuario = await _usuarioRepository.GetUsuarioPorNombreUsuario(usuarioCreacion.Nombre);
            if (existingUsuario != null)
            {
                throw new InvalidOperationException("El nombre de usuario ya está registrado");
            }
            usuarioCreacion.Contraseña = _passwordHasher.HashPassword(_mapper.Map<Usuario>(usuarioCreacion), usuarioCreacion.Contraseña);

            var usuario = _mapper.Map<UsuarioCreacionDto>(usuarioCreacion);
            await _usuarioRepository.AddUsuario(usuario);
        }

        public async Task UpdateUsuario(UsuarioActualizacionDto usuarioActualizacion)
        {
            var existingUsuario = await _usuarioRepository.GetUsuarioPorId(usuarioActualizacion.Id);
            if (existingUsuario != null)
            {
                var usuarioActualizado = _mapper.Map<UsuarioActualizacionDto>(usuarioActualizacion);
                await _usuarioRepository.UpdateUsuario(usuarioActualizado);
            }
            else
            {
                throw new KeyNotFoundException("Usuario no encontrado");
            }
        }

        public async Task DeleteUsuario(int id)
        {
            await _usuarioRepository.DeleteUsuario(id);
        }

        public async Task<UsuarioDto?> Authenticate(string nombreUsuario, string contraseña)
        {
            try
            {
                var usuario = await _usuarioRepository.GetUsuarioPorNombreUsuario(nombreUsuario);
                if (usuario == null) return null;

                var resultado = _passwordHasher.VerifyHashedPassword(_mapper.Map<Usuario>(usuario), usuario.Contraseña, contraseña);
                if (resultado == PasswordVerificationResult.Success)
                {
                    return _mapper.Map<UsuarioDto>(usuario);
                }

                return null;
            }
            catch(Exception ex)
            {
                throw new KeyNotFoundException("Usuario no encontrado"+ ex.Message);
            }
      
        }

        public string HashPassword(string contraseña)
        {
            return _passwordHasher.HashPassword(null, contraseña); // Podés pasar un objeto Usuario si querés
        }
    }
}
