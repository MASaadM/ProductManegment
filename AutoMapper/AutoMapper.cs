using AutoMapper;
using ProductManegment.Dto;
using ProductManegment.Models;



namespace ProductManegment.AutoMapper
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {

            CreateMap<Product, ProductDTO>().ReverseMap();
            CreateMap<Vendor, VendorDTO>().ReverseMap();


        }
    }
}
