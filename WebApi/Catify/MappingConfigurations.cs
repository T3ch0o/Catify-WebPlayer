namespace Catify
{
    using System;

    using AutoMapper;

    using Catify.Entities;
    using Catify.Models;
    using Catify.Models.BindingModels;

    public class MappingConfiguration : Profile
    {
        public MappingConfiguration()
        {
            CreateMap<RegisterBindingModel, CatifyUser>();
            CreateMap<PlaylistBindingModel, Playlist>()
                    .BeforeMap((s, d) => d.CreationDate = DateTime.UtcNow);
            CreateMap<Song, SongModel>();
            CreateMap<Playlist, PlaylistReturnModel>()
                    .ForMember(dest => dest.Creator, m => m.MapFrom(src => src.Creator.UserName));
            CreateMap<Playlist, PlaylistsReturnModel>()
                    .ForMember(dest => dest.Creator, m => m.MapFrom(src => src.Creator.UserName));
        }
    }
}
