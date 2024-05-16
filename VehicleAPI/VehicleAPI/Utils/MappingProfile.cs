using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vehicle.DataAccessLayer.Entities;
using VehicleAPI.Models;

namespace VehicleAPI.Utils
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Brand Mapper Configuration
            CreateMap<BrandModel, BrandEntity>();
            CreateMap<BrandFilterModel, BrandFilterEntity>();

            CreateMap<BrandEntity, BrandModel>();
            CreateMap<BrandDetailEntity, BrandDetailModel>();
            CreateMap<BrandLovEntity, BrandLovModel>();

            // Model Mapper Configuration
            CreateMap<ModelModel, ModelEntity>();
            CreateMap<ModelFilterModel, ModelFilterEntity>();

            CreateMap<ModelEntity, ModelModel>();
            CreateMap<ModelDetailEntity, ModelDetailModel>();
            CreateMap<ModelLovEntity, ModelLovModel>();
        }
    }
}
