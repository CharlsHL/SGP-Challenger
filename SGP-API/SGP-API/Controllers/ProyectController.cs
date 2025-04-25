using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Modelos.DTOs;
using Negocio.Contrato;

namespace SGP_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProyectController : ControllerBase
    {
        private readonly IProyectoService _proyectoService;

        public ProyectController(IProyectoService proyeectoRepo)
        {
            _proyectoService = proyeectoRepo;
        }

        [HttpGet("GetAllProyectos")]
        public async Task<ActionResult<IEnumerable<ProyectoDTO>>> GetProyectos()
        {
            var proyectos = await _proyectoService.GetAllProyectos();
            return Ok(proyectos);
        }

        [HttpGet("GetProyectoXId/{id}")]
        public async Task<ActionResult<ProyectoDTO>> GetProyectoXIdUsuario(int id)
        {
            var proyecto = await _proyectoService.GetProyectoPorID(id);

            if (proyecto == null)
            {
                return NotFound();
            }

            return Ok(proyecto);
        }

        [HttpPost("CrearProyecto")]
        public async Task<ActionResult<ProyectoDTO>> PostProyecto(ProyectoDTO proyectoCreacion)
        {
            await _proyectoService.AddProyecto(proyectoCreacion);

            // Asumiendo que UsuarioId + Título es único (deberías validar esto)
            var proyectoDTO = (await _proyectoService.GetAllProyectos())
                .FirstOrDefault(p => p.Titulo == proyectoCreacion.Titulo && p.UsuarioId == proyectoCreacion.UsuarioId);

            if (proyectoDTO == null)
                return NotFound();

            return CreatedAtAction(nameof(GetProyectoXIdUsuario), new { id = proyectoDTO.Id }, proyectoDTO);
        }

        [HttpPut("ActualizarProyecto")]
        public async Task<IActionResult> ActualizarProyecto(ProyectoActualizacionDto proyectoActualizacion)
        {
            await _proyectoService.UpdateProyecto(proyectoActualizacion);
            return NoContent();
        }

        [HttpDelete("BorrarProyecto")]
        public async Task<IActionResult> BorrarProyecto(int id)
        {
            await _proyectoService.DeleteProyecto(id);
            return NoContent();
        }
    }
}

