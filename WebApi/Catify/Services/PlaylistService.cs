namespace Catify.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using Catify.Data;
    using Catify.Entities;
    using Catify.Models.BindingModels;
    using Catify.Services.Interfaces;

    using Microsoft.EntityFrameworkCore;

    public class PlaylistService : IPlaylistService
    {
        private readonly CatifyDbContext _db;

        private readonly ISongService _songService;

        private readonly IUserService _userService;

        public PlaylistService(CatifyDbContext db, ISongService songService, IUserService userService)
        {
            _db = db;
            _songService = songService;
            _userService = userService;
        }

        public Playlist Get(string id)
        {
            Playlist playlist = _db.Playlists
                                   .Include(p => p.Creator)
                                   .Include(p => p.Songs)
                                   .FirstOrDefault(p => p.Id == id);

            return playlist;
        }

        public IEnumerable<Playlist> GetAll()
        {
            return _db.Playlists
                      .Include(playlist => playlist.Creator);
        }

        public void Create(PlaylistBindingModel model, string creatorId)
        {
            Playlist playlist = new Playlist
            {
                Title = model.Title,
                ImageUrl = model.ImageUrl,
                CreationDate = DateTime.UtcNow,
                CreatorId = creatorId
            };

            _db.Add(playlist);
            _db.SaveChanges();

            _songService.Create(model.SongTitle, model.SongUrl, playlist.Id);
        }

        public bool Edit(EditPlaylistBindingModel model, string playlistId, string creatorId)
        {
            Playlist playlist = _db.Playlists.FirstOrDefault(p => p.Id == playlistId);

            if (playlist == null || playlist.CreatorId != creatorId)
            {
                return false;
            }

            playlist.Title = model.Title;
            playlist.ImageUrl = model.ImageUrl;

            _db.SaveChanges();

            return true;
        }

        public bool UpdateStatus(PlaylistStatusBindingModel model, string playlistId, string userId)
        {
            Playlist playlist = Get(playlistId);

            if (playlist == null)
            {
                return false;
            }

            bool isAddLike = playlist.Likes + 1 == model.Likes;
            bool isRemoveLike = playlist.Likes - 1 == model.Likes;
            bool isAddFavorite = playlist.Favorites + 1 == model.Favorites;
            bool isRemoveFavorite = playlist.Favorites - 1 == model.Favorites;

            if (!_db.UsersPlaylistStatuses.Any(ps => ps.PlaylistId == playlistId && ps.UserId == userId))
            {
                _userService.CreateUserPlaylistStatus(userId, playlistId);
            }

            if ((isAddLike || isRemoveLike) && playlist.Favorites == model.Favorites)
            {
                _userService.UpdateUserPlaylistStatus(userId, playlistId, "like", isAddLike);

                playlist.Likes = model.Likes;
            }
            else if ((isAddFavorite || isRemoveFavorite) && playlist.Likes == model.Likes)
            {
                _userService.UpdateUserPlaylistStatus(userId, playlistId, "favorite", isAddFavorite);

                playlist.Favorites = model.Favorites;
            }
            else
            {
                return false;
            }

            _db.SaveChanges();

            return true;
        }

        public bool Delete(string playlistId, string creatorId)
        {
            Playlist playlist = _db.Playlists.FirstOrDefault(p => p.Id == playlistId);

            if (playlist == null || playlist.CreatorId != creatorId)
            {
                return false;
            }

            _songService.DeleteAll(playlistId);

            IEnumerable<UsersPlaylistStatus> favoritePlaylists = _db.UsersPlaylistStatuses.Where(fp => fp.PlaylistId == playlistId);

            _db.UsersPlaylistStatuses.RemoveRange(favoritePlaylists);
            _db.Playlists.Remove(playlist);
            _db.SaveChanges();

            return true;
        }

        public IEnumerable<UsersPlaylistStatus> GetFavoritePlaylists(string userId)
        {
            IEnumerable<UsersPlaylistStatus> favoritePlaylists = _db.UsersPlaylistStatuses.Where(fp => fp.UserId == userId);

            return favoritePlaylists;
        }
    }
}
