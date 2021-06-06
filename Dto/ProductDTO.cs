using ProductManegment.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManegment.Dto
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }
        public bool Vegetrien { get; set; }
        public int Votes { get; set; }
        public DateTime ExpiryDate { get; set; }
 

    }
}
