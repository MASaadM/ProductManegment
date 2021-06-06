using ProductManegment.Dto;
using ProductManegment.Models;
using ProductManegment.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManegment.Services
{
    public class VendorService : BaseService<Vendor, VendorDTO>, IVendorService
    {
        public VendorService(IUnitOfWork unitOfWork,
            IVendorRepository repository) : base(unitOfWork, repository)
        {

        }
    }
}
