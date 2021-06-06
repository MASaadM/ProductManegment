using AutoMapper;
using ProductManegment.Dto;
using ProductManegment.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManegment.Repository
{
    public class ProductRepository : GenericRepository<Product, ProductDTO>, IProductRepository
    {
        public ProductRepository(ProductDBContext context, IMapper mapper) : base(context, mapper)

        {

        }
    }
}
