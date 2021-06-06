using AutoMapper;
using ProductManegment.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManegment.Services
{
    public class BaseService<T, DTO> : IBaseService<T, DTO> where T : class
    {
        protected readonly IGenericRepository<T, DTO> _repository;
        public readonly IUnitOfWork _unitOfWork;

        public BaseService(
            IUnitOfWork unitOfWork,
            IGenericRepository<T, DTO> repository)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }
        public async Task<DTO> Get(int id)
        {
            return await _repository.Get(id);
        }

        public async Task<IEnumerable<DTO>> GetAll(string includes)
        {
            return await _repository.GetAll(includes);
        }

        public async Task Add(DTO entity)
        {
            await _repository.Add(entity);
            await _unitOfWork.Complete();
        }

        public async Task Delete(int id)
        {
            await _repository.Delete(id);
            await _unitOfWork.Complete();
        }

        public async Task Update(DTO entity)
        {
            await _repository.Update(entity);
            await _unitOfWork.Complete();
        }

    }
}
