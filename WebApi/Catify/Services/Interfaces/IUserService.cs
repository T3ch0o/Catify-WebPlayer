namespace Catify.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Catify.Entities;
    using Catify.Models;
    using Catify.Models.BindingModels;

    public interface IUserService
    {
        Task<UserReturnModel> Authenticate(string username, string password);

        Task<UserReturnModel> Register(RegisterBindingModel model);

        Task Logout();

        void CreateUserPlaylistStatus(string userId, string playlistId);

        void UpdateUserPlaylistStatus(string userId, string playlistId, string modifier, bool isAdded);

        IEnumerable<UsersPlaylistStatus> GetUserFavoritePlaylists(string userId);

        UsersPlaylistStatus GetUserPlaylistStatus(string userId, string playlistId);

        Task<UserProfileModel> Get(string id);
    }
}
