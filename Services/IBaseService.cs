using ProductManegment.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManegment.Services
{
    public interface IBaseService<T, DTO> where T : class
    {
        Task<DTO> Get(int id);
        Task<IEnumerable<DTO>> GetAll(string includes);
        Task Add(DTO entity);
        Task Delete(int id);
        Task Update(DTO entity);
        Task<IEnumerable<DTO>> FindBy(System.Linq.Expressions.Expression<Func<T, bool>> predicate);
        Task<PageResult<DTO>> GetPagedResult(int? page, int size);
    }
}
