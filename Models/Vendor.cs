using ProductManegment.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManegment.Models
{
    public class Vendor
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public virtual IEnumerable<Product> Products { get; set; }

    }
}
