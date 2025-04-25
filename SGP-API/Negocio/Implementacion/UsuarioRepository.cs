using AutoMapper;
using Datos.Contexto;
using Microsoft.EntityFrameworkCore;
using Modelos.DTOs;
using Negocio.Contrato;

namespace Implementacion
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly proyectogestiondbContext _context;
        private readonly IMapper _mapper;
        public UsuarioRepository(proyectogestiondbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<UsuarioDto> GetUsuarioPorId(int id)
        {
            // Lógica para obtener un usuario por ID desde la base de datos
            var usuario = await _context.Usuarios.FindAsync(id);
            return usuario != null ? _mapper.Map<UsuarioDto>(usuario) : null;
        }

        public async Task<UsuarioDto> GetUsuarioPorNombreUsuario(string nombreUsuario)
        {
            // Lógica para obtener un usuario por nombre de usuario
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Nombre == nombreUsuario);
            return usuario != null ? _mapper.Map<UsuarioDto>(usuario) : null;
        }

        public async Task<IEnumerable<UsuarioDto>> GetAllUsuarios()
        {
            var usuarios = await _context.Usuarios.Where(u=> u.Activo == true).ToListAsync();
            return _mapper.Map<IEnumerable<UsuarioDto>>(usuarios);
        }

        public async Task AddUsuario(UsuarioCreacionDto usuarioCreacion)
        {       
            try
            {
                var usuario = new Usuario
                {
                    Nombre = usuarioCreacion.Nombre,
                    Contraseña = usuarioCreacion.Contraseña,
                    Email = usuarioCreacion.Email,
                    FechaRegistro = usuarioCreacion.FechaCreacion
                };
                await _context.Usuarios.AddAsync(usuario);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine("ERROR GUARDANDO EN BD: " + ex.InnerException?.Message);
                throw; // o podés devolver un mensaje más amigable si querés
            }
        }

        public async Task UpdateUsuario( UsuarioActualizacionDto usuario)
        {
            var existingUsuario = await _context.Usuarios.FindAsync(usuario.Id);
            if (existingUsuario != null)
            {
                // Actualizar los valores del usuario existente con los datos del DTO
                existingUsuario.Nombre = usuario.Nombre;
                existingUsuario.Email = usuario.Email;
                existingUsuario.Contraseña = usuario.Contraseña;

                // Otros campos según el DTO
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario != null)
            {
                usuario.Activo = false;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<UsuarioDto> Authenticate(string nombreUsuario, string contraseña)
        {
            // Lógica para autenticar al usuario (comparar contraseñas de manera segura)
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Nombre == nombreUsuario);
            return usuario != null && usuario.Contraseña == contraseña ? _mapper.Map<UsuarioDto>(usuario) : null;
        }
    }
}