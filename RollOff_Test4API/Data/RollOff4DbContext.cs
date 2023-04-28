using Microsoft.EntityFrameworkCore;
using RollOff_Test4API.Models.Domain;

namespace RollOff_Test4API.Data
{
    public class RollOff4DbContext:DbContext
    {
        public RollOff4DbContext(DbContextOptions<RollOff4DbContext>options):base(options)
        {

        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<FormTable> FormTables { get; set; }
        //public DbSet<UserDetails> Users { get; set; }
       public DbSet<Login> login { get; set; }

    }
}
