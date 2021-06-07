using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ProductManegment.Dto;
using ProductManegment.Repository;
using ProductManegment.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace ProductManegment.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IProductService _pService;




        public ProductController(IUnitOfWork unitOfWork, IProductService ps)
        {
            _unitOfWork = unitOfWork;
            _pService = ps;

        }

        // GET: api/<Books>
        [HttpGet]
        public async Task<IEnumerable<ProductDTO>> Get()
        {
            try
            {
                var res = await _unitOfWork.Products.GetAll("Vendor");
                return res;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet("{id}")]
        public async Task<ProductDTO> Get(int id)
        {
            return await _unitOfWork.Products.Get(id);
        }

        // POST api/<Books>
        [HttpPost]
        public async Task<IActionResult> Post()
        {
            var folderName = Path.Combine("wwwroot", "Images");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            var formCollection = await Request.ReadFormAsync();
            var file = formCollection.Files.First();
            var data = formCollection["data"];
            var dbPath = "";
            var fileName = "";
            ProductDTO result = JsonConvert.DeserializeObject<ProductDTO>(data);
            if (file.Length > 0)
            {
                fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                var fullPath = Path.Combine(pathToSave, fileName);
                dbPath = Path.Combine(folderName, fileName);
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

            }
            result.Image = fileName;

            _unitOfWork.Products.Add(result);
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
        [HttpGet("GetPagedResult/{page}/{size}")]
        public async Task<IActionResult> GetPagedResult(int page, int size)
        {



            var result = _pService.GetPagedResult(page, size, "Vendor");


            return Ok(result);
        }
        [HttpPost("upload"), DisableRequestSizeLimit]
        public async Task<IActionResult> Upload()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                var folderName = Path.Combine("wwwroot", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        [HttpGet("DownloadImage/{ImageName}")]
        public async Task<IActionResult> DownloadImage(string ImageName)
        {
            try
            {
                string initialpath = "./wwwroot/Images/";
                var path = Path.GetFullPath(initialpath + ImageName);
                MemoryStream memory = new MemoryStream();
                using (FileStream stream = new FileStream(path, FileMode.Open))
                {
                    await stream.CopyToAsync(memory);
                }
                memory.Position = 0;
                return File(memory, "image/png");
            }
            catch (Exception ex)
            {
                throw;
            }


        }
        private string GetContentType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;
            if (!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }

    }
}
