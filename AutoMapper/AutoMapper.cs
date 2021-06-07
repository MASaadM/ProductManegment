using AutoMapper;
using ProductManegment.Dto;
using ProductManegment.Models;



namespace ProductManegment.AutoMapper
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {

            CreateMap<Product, ProductDTO>().ForMember(dest => dest.VendorName, opts => opts.MapFrom(src => src.Vendor.Name));
            CreateMap<ProductDTO, Product>();

            CreateMap<Vendor, VendorDTO>().ReverseMap();


        }
    }
}
