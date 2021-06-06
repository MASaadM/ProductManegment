using ProductManegment.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManegment.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }
        public bool Vegetrien { get; set; }
        public int Votes { get; set; }
        public DateTime ExpiryDate { get; set; }
        [ForeignKey("VendorId")]
        public int VendorId { get; set; }
        public virtual Vendor Vendor { get; set; }
    }
}
