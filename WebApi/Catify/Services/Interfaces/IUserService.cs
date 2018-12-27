namespace Catify.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Catify.Entities;
    using Catify.Models.BindingModels;

    public interface IUserService
    {
        Task<string> Authenticate(string username, string password);

        Task<string> Register(RegisterBindingModel model);

        Task Logout();

        void AddPlaylistToFavorites(string userId,string playlistId);

        void RemovePlaylistFromFavorites(string userId,string playlistId);

        IEnumerable<FavoritePlaylist> GetUserFavoritePlaylists(string userId);
    }
}
