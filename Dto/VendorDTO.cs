using DataAnnotationsExtensions;
using ProductManegment.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManegment.Dto
{
    public class VendorDTO
    {
        public int ID { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2, ErrorMessage = "Name must be between 2 and 30 characters!")]
        public string Name { get; set; }

    }
}
