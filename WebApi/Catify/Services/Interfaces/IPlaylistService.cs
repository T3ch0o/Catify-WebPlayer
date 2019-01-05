namespace Catify.Services.Interfaces
{
    using System.Collections.Generic;

    using Catify.Entities;
    using Catify.Models.BindingModels;

    public interface IPlaylistService
    {
        Playlist Get(string title);

        IEnumerable<Playlist> GetAll();

        string Create(PlaylistBindingModel model, string creatorId);

        bool Edit(EditPlaylistBindingModel model, string title, string creatorId, string role);

        bool UpdateStatus(PlaylistStatusBindingModel model, string title, string userId);

        bool Delete(string title, string creatorId, string role);

        IEnumerable<UsersPlaylistStatus> GetFavoritePlaylists(string userId);

        void UpdateImagePath(string playlistId, string imagePath);
    }
}
