namespace Catify.Services.Interfaces
{
    using System.Collections.Generic;

    using Catify.Entities;
    using Catify.Models.BindingModels;

    public interface IPlaylistService
    {
        IEnumerable<Playlist> GetAll();

        void Create(CreatePlaylistBindingModel model, string creatorId);
    }
}
