using Microsoft.EntityFrameworkCore;


namespace WebApplication1.Models
{
    public class UsuarioContext : DbContext
    {
        public UsuarioContext(DbContextOptions<UsuarioContext> options)
            : base(options)
        {
        }

        public DbSet<UserItem> UserItems { get; set; }
        public DbSet<UserFriends> UserFriends { get; set; }
        public DbSet<PhotoItem> PhotoItem { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserItem>()
                        .HasMany(ui => ui.Friends)
                        .WithOne(uf => uf.UserItem)
                        .HasForeignKey(ui => ui.IdUser);

            base.OnModelCreating(modelBuilder);
        }
    }
}
