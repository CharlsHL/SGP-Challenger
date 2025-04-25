namespace Modelos.DTOs
{
    public class UsuarioDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }

        public string Contraseña { get; set; }
        public DateTime FechaCreacion { get; set; }
    }

    public class UsuarioCreacionDto
    {
        public string Nombre { get; set; }
        public string Contraseña { get; set; }
        public string Email { get; set; }
        public DateTime FechaCreacion { get; set; } = DateTime.Now;
    }

    public class UsuarioActualizacionDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public string Contraseña { get; set; }

        public DateTime FechaCreacion { get; set; }
    }
}
