﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Vehicle.DataAccessLayer.Entities
{
    public class VehicleEntity
    {
        public int? VehicleId { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }
    }
    public class VehicleDetailEntity : VehicleEntity
    {

    }
    public class VehicleFilterEntity
    {
        public int? VehicleId { get; set; }
        public string Name { get; set; }
        public bool? Active { get; set; }
    }
    public class VehicleLovEntity
    {
        public int VehicleId { get; set; }
        public string Name { get; set; }
    }
}
