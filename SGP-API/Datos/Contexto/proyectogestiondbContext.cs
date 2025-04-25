using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Datos.Contexto
{
    public partial class proyectogestiondbContext : DbContext
    {
        public proyectogestiondbContext()
        {
        }

        public proyectogestiondbContext(DbContextOptions<proyectogestiondbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Proyecto> Proyectos { get; set; } = null!;
        public virtual DbSet<Usuario> Usuarios { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured) {  }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Proyecto>(entity =>
            {
                entity.ToTable("proyecto");

                entity.HasIndex(e => e.UsuarioId, "UsuarioId");

                entity.Property(e => e.Descripcion).HasColumnType("text");

                entity.Property(e => e.Estado)
                    .HasColumnType("enum('Activo','Completado','Cancelado','Eliminado')")
                    .HasDefaultValueSql("'Activo'");

                entity.Property(e => e.Titulo).HasMaxLength(200);

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.Proyectos)
                    .HasForeignKey(d => d.UsuarioId)
                    .HasConstraintName("proyecto_ibfk_1");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.ToTable("usuario");

                entity.HasIndex(e => e.Email, "Email")
                    .IsUnique();

                entity.Property(e => e.Activo)
                    .IsRequired()
                    .HasDefaultValueSql("'1'");

                entity.Property(e => e.Contraseña).HasMaxLength(255);

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.FechaRegistro)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Nombre).HasMaxLength(100);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
