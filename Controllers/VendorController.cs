using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProductManegment.Dto;
using ProductManegment.Repository;
using ProductManegment.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManegment.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VendorController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IVendorService _vendorService;




        public VendorController(IUnitOfWork unitOfWork, IVendorService vs)
        {
            _unitOfWork = unitOfWork;
            _vendorService = vs;

        }

        // GET: api/<Books>
        [HttpGet]
        public async Task<IEnumerable<VendorDTO>> Get()
        {
            try
            {
                var res = await _unitOfWork.Vendors.GetAll();
                return res;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet("{id}")]
        public async Task<VendorDTO> Get(int id)
        {
            return await _unitOfWork.Vendors.Get(id);
        }

        // POST api/<Books>
        [HttpPost]
        public IActionResult Post(VendorDTO _item)
        {
            _unitOfWork.Vendors.Add(_item);
            _unitOfWork.Complete();
            return Ok();
        }
        // POST api/<Books>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            //var item = await _unitOfWork.Items.Get(id);
            _unitOfWork.Vendors.Delete(id);
            _unitOfWork.Complete();
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> Update(VendorDTO i)
        {
            //var item = await _unitOfWork.Items.Get(i.Id);
            _unitOfWork.Vendors.Update(i);
            _unitOfWork.Complete();
            return Ok();
        }
        [HttpGet("GetPagedResult/{page}/{size}")]
        public async Task<IActionResult> GetPagedResult(int page, int size)
        {



            var result = _vendorService.GetPagedResult(page, size, "Products");


            return Ok(result);
        }
    }
}
