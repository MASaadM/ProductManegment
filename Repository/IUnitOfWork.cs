using System;
using System.Threading.Tasks;

namespace ProductManegment.Repository
{
    public interface IUnitOfWork : IDisposable
    {
        IProductRepository Products { get; }

        Task<int> Complete();
    }
}