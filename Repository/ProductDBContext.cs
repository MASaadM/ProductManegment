using Microsoft.EntityFrameworkCore;

using ProductManegment.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManegment.Repository
{
    public class ProductDBContext : DbContext
    {
        public ProductDBContext(DbContextOptions<ProductDBContext> options) : base(options)
        {
        }

        public DbSet<Product> Product { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);


            modelBuilder.Seed();
        }
    }
}


