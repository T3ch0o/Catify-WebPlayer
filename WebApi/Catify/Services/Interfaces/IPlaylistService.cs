namespace Catify.Services.Interfaces
{
    using System.Collections.Generic;

    using Catify.Entities;
    using Catify.Models.BindingModels;

    public interface IPlaylistService
    {
        Playlist Get(string id);

        IEnumerable<Playlist> GetAll();

        void Create(PlaylistBindingModel model, string creatorId);

        bool Edit(PlaylistBindingModel model, string playlistId, string creatorId);
    }
}
