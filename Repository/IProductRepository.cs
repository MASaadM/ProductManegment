using ProductManegment.Dto;
using ProductManegment.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManegment.Repository
{
    public interface IProductRepository : IGenericRepository<Product, ProductDTO>
    {
    }
}
