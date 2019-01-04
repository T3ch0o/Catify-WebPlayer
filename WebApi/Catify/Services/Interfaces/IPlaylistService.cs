namespace Catify.Services.Interfaces
{
    using System.Collections.Generic;

    using Catify.Entities;
    using Catify.Models.BindingModels;

    public interface IPlaylistService
    {
        Playlist Get(string id);

        IEnumerable<Playlist> GetAll();

        string Create(PlaylistBindingModel model, string creatorId);

        bool Edit(EditPlaylistBindingModel model, string playlistId, string creatorId, string role);

        bool UpdateStatus(PlaylistStatusBindingModel model, string playlistId, string userId);

        bool Delete(string playlistId, string creatorId, string role);

        IEnumerable<UsersPlaylistStatus> GetFavoritePlaylists(string userId);

        void UpdateImagePath(string playlistId, string imagePath);
    }
}
