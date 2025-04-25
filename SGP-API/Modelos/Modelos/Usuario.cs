using System;
using System.Collections.Generic;

namespace Datos.Contexto
{
    public partial class Usuario
    {
        public Usuario()
        {
            Proyectos = new HashSet<Proyecto>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime FechaRegistro { get; set; }
        public string Contraseña { get; set; } = null!;
        public bool? Activo { get; set; }

        public virtual ICollection<Proyecto> Proyectos { get; set; }
    }
}
