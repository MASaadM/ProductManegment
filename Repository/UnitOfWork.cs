using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManegment.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ProductDBContext _context;


        public IProductRepository Products { get; }

        public UnitOfWork(ProductDBContext stepperDbContext,

            IProductRepository itemRepository)
        {
            this._context = stepperDbContext;


            this.Products = itemRepository;
        }
        public async Task<int> Complete()
        {
            return _context.SaveChanges();
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context.Dispose();
            }
        }
    }
}
