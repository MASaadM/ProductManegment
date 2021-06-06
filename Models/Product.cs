using ProductManegment.Models;
using ProductManegment.Validation;
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
        [Required]
        [StringLength(80, MinimumLength = 3, ErrorMessage = "Title must be between 3 and 80 characters!")]
        public string Title { get; set; }
        [StringLength(1000, MinimumLength = 10, ErrorMessage = "Description must be between 10 and 1000 characters!")]

        public string Description { get; set; }
        [Required]
        [Range(3, 5000)]
        public decimal Price { get; set; }
        public string Image { get; set; }
        [Required]

        public bool Vegeterien { get; set; }
        [Range(1, 5)]
        public int? Votes { get; set; }
        [Required]
        [DateInTheFuture]
        public DateTime Expirydate { get; set; }
        [ForeignKey("VendorId")]
        public int? VendorId { get; set; }
        public virtual Vendor Vendor { get; set; }
    }
}
