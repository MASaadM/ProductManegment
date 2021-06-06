
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using ProductManegment.Services;

namespace ProductManegment.Repository
{
    public static class DependancyInjection
    {
        public static IServiceCollection AddRepository(this IServiceCollection services)
        {

            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();



            return services;
        }
        public static IServiceCollection AddServices(this IServiceCollection services)
        {

            services.AddTransient<IProductService, ProductService>();


            return services;
        }
    }
}
