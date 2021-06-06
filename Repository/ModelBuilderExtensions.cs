


using Microsoft.EntityFrameworkCore;
using ProductManegment.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ProductManegment.Repository
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Product>().HasData(ProductSeed().ToArray());



        }


        private static List<Product> ProductSeed()
        {
            return new List<Product>
            {

            };
        }

    }
}
