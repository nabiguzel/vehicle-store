using System;
using System.Collections.Generic;
using System.Text;

namespace Vehicle.DataAccessLayer.Entities
{
    public class ModelEntity
    {
        public int? ModelId { get; set; }
        public string ModelName { get; set; }
        public int? BrandId { get; set; }
        public bool Active { get; set; }
    }
    public class ModelDetailEntity : ModelEntity
    {

    }
    public class ModelFilterEntity
    {
        public int? ModelId { get; set; }
        public string ModelName { get; set; }
        public int? BrandId { get; set; }
        public bool? Active { get; set; }
    }
    public class ModelLovEntity
    {
        public int ModelId { get; set; }
        public string ModelName { get; set; }
        public int? BrandId { get; set; }
    }
}
