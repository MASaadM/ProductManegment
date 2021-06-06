using ProductManegment.Dto;
using ProductManegment.Models;
using ProductManegment.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManegment.Services
{
    public class ProductService : BaseService<Product, ProductDTO>, IProductService
    {
        public ProductService(IUnitOfWork unitOfWork,
            IProductRepository repository) : base(unitOfWork, repository)
        {

        }
    }
}
