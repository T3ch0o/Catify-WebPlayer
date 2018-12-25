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

        bool UpdateStatus(PlaylistStatusBindingModel model, string playlistId, string userId);

        bool Delete(string playlistId, string creatorId);

        IEnumerable<FavoritePlaylist> GetFavoritePlaylists(string userId);
    }
}
