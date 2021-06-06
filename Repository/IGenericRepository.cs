using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductManegment.Repository
{
    public interface IGenericRepository<T, DTO> where T : class
    {
        Task<DTO> Get(int id);
        Task<IEnumerable<DTO>> GetAll(string includes);
        Task Add(DTO entity);
        Task Delete(int id);
        Task Update(DTO entity);
    }
}