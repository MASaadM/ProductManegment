using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProductManegment.Dto;
using ProductManegment.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManegment.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;



        public ProductController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

        }

        // GET: api/<Books>
        [HttpGet]
        public async Task<IEnumerable<ProductDTO>> Get()
        {
            return await _unitOfWork.Products.GetAll("");
        }

        [HttpGet("{id}")]
        public async Task<ProductDTO> Get(int id)
        {
            return await _unitOfWork.Products.Get(id);
        }

        // POST api/<Books>
        [HttpPost]
        public IActionResult Post(ProductDTO _item)
        {
            _unitOfWork.Products.Add(_item);
            _unitOfWork.Complete();
            return Ok();
        }
        // POST api/<Books>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            //var item = await _unitOfWork.Items.Get(id);
            _unitOfWork.Products.Delete(id);
            _unitOfWork.Complete();
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> Update(ProductDTO i)
        {
            //var item = await _unitOfWork.Items.Get(i.Id);
            _unitOfWork.Products.Update(i);
            _unitOfWork.Complete();
            return Ok();
        }
    }
}
