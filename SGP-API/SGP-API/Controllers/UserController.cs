using Microsoft.AspNetCore.Mvc;
using Modelos.DTOs;
using Negocio.Contrato;

namespace SGP_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UserController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpGet("GetAllUsuarios")]
        public async Task<ActionResult<IEnumerable<UsuarioDto>>> GetUsuarios()
        {
            var usuarios = await _usuarioService.GetAllUsuarios();
            return Ok(usuarios);
        }

        [HttpGet("GetUsuarioXId/{id}")]
        public async Task<ActionResult<UsuarioDto>> GetUsuario(int id)
        {
            var usuario = await _usuarioService.GetUsuarioPorId(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return Ok(usuario);
        }

        [HttpPost("CrearUsuario")]
        public async Task<ActionResult<UsuarioDto>> PostUsuario(UsuarioCreacionDto usuarioCreacion)
        {
            await _usuarioService.AddUsuario(usuarioCreacion);
            return CreatedAtAction(nameof(GetUsuario), new { id = (await _usuarioService.GetUsuarioPorNombreUsuario(usuarioCreacion.Nombre)).Id }, usuarioCreacion);
        }

        [HttpPut("ActualizarUsuario")]
        public async Task<IActionResult> ActualizarUsuario(UsuarioActualizacionDto usuarioActualizacion)
        { 
            await _usuarioService.UpdateUsuario(usuarioActualizacion);
            return NoContent();
        }

        [HttpDelete("BorrarUsuario")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            await _usuarioService.DeleteUsuario(id);
            return NoContent();
        }

        [HttpPost("login")]
        public async Task<ActionResult<UsuarioDto>> Login([FromBody] LoginRequest request)
        {
            var usuario = await _usuarioService.Authenticate(request.NombreUsuario, request.Contraseña);

            if (usuario == null)
            {
                return Unauthorized();
            }

            return Ok(usuario);
        }
    }
}
