using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManegment.Repository
{
    public abstract class GenericRepository<T, DTO> : IGenericRepository<T, DTO> where T : class
    {
        protected readonly ProductDBContext _context;
        protected readonly IMapper _mapper;


        protected GenericRepository(ProductDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<DTO> Get(int id)
        {
            return _mapper.Map<DTO>(await _context.Set<T>().FindAsync(id));
        }

        public async Task<IEnumerable<DTO>> GetAll(string includes)
        {
            return _mapper.Map<IEnumerable<DTO>>(await _context.Set<T>().Include(includes).ToListAsync());
        }

        public async Task Add(DTO entity)
        {
            await _context.Set<T>().AddAsync(_mapper.Map<T>(entity));
        }

        public async Task Delete(int id)
        {
            try
            {

                _context.Set<T>().Remove(_context.Set<T>().FindAsync(id).Result);
            }
            catch (Exception ex)
            {

            }
        }

        public async Task Update(DTO entity)
        {
            _context.Set<T>().Update(_mapper.Map<T>(entity));
        }
        public async virtual Task<IEnumerable<DTO>> GetAll()
        {

            return _mapper.Map<IEnumerable<DTO>>(await _context.Set<T>().ToListAsync());
        }
        //public virtual IEnumerable<PickList> GetPickList()
        //{

        //    return _dbset.AsEnumerable<T>().Select(x=>new PickList { Id=x.id});
        //}
        public async Task<IEnumerable<DTO>> FindBy(System.Linq.Expressions.Expression<Func<T, bool>> predicate)
        {

            IEnumerable<DTO> query = _mapper.Map<IEnumerable<DTO>>(await _context.Set<T>().Where(predicate).ToListAsync()).AsEnumerable();
            return query;
        }

    }
}
