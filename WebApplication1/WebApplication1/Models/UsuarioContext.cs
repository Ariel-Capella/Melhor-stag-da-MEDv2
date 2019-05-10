using Microsoft.EntityFrameworkCore;


namespace WebApplication1.Models
{
    public class UsuarioContext : DbContext
    {
        public UsuarioContext(DbContextOptions<UsuarioContext> options)
            : base(options)
        {
        }

        public DbSet<UsuarioItem> UsuarioItems { get; set; }
        public DbSet<UsuarioFriends> UsuarioFriends { get; set; }
        public DbSet<FotoItem> FotoItem { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UsuarioItem>()
                        .HasMany(ui => ui.Friends)
                        .WithOne(uf => uf.UsuarioItem)
                        .HasForeignKey(ui => ui.IdUser);

            base.OnModelCreating(modelBuilder);
        }
    }
}
