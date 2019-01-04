namespace Catify.Services
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;

    using AutoMapper;

    using Catify.Data;
    using Catify.Entities;
    using Catify.Models.BindingModels;
    using Catify.Services.Interfaces;

    using Microsoft.AspNetCore.Hosting;
    using Microsoft.EntityFrameworkCore;

    public class PlaylistService : IPlaylistService
    {
        private readonly CatifyDbContext _db;

        private readonly ISongService _songService;

        private readonly IUserService _userService;

        private readonly IMapper _mapper;

        private readonly IHostingEnvironment _hostingEnvironment;

        public PlaylistService(CatifyDbContext db,
                               ISongService songService,
                               IUserService userService,
                               IMapper mapper,
                               IHostingEnvironment hostingEnvironment)
        {
            _db = db;
            _songService = songService;
            _userService = userService;
            _mapper = mapper;
            _hostingEnvironment = hostingEnvironment;
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

        public string Create(PlaylistBindingModel model, string creatorId)
        {
            Playlist playlist = _mapper.Map<Playlist>(model);

            playlist.CreatorId = creatorId;
            playlist.ImagePath = Path.Combine("PlaylistImages", "default-cover.jpg");

            _db.Add(playlist);
            _db.SaveChanges();

            _songService.Create(model.SongTitle, model.SongUrl, creatorId, playlist.Id, null);

            return playlist.Id;
        }

        public bool Edit(EditPlaylistBindingModel model, string playlistId, string creatorId, string role)
        {
            Playlist playlist = _db.Playlists.FirstOrDefault(p => p.Id == playlistId);

            if (playlist == null)
            {
                return false;
            }

            if (playlist.CreatorId == creatorId || role == "Administrator")
            {
                playlist.Title = model.Title;
                playlist.ImagePath = playlist.ImagePath = Path.Combine("PlaylistImages", "default-cover.jpg");

                _db.SaveChanges();

                return true;
            }

            return false;
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

        public bool Delete(string playlistId, string creatorId, string role)
        {
            Playlist playlist = _db.Playlists.FirstOrDefault(p => p.Id == playlistId);

            if (playlist == null)
            {
                return false;
            }

            if (playlist.CreatorId == creatorId || role == "Administrator")
            {
                _songService.DeleteAll(playlistId);

                IEnumerable<UsersPlaylistStatus> playlistStatuses = _db.UsersPlaylistStatuses.Where(ps => ps.PlaylistId == playlistId);

                _db.UsersPlaylistStatuses.RemoveRange(playlistStatuses);
                if (playlist.ImagePath != "PlaylistImages\\default-cover.jpg")
                {
                    File.Delete(Path.Combine(_hostingEnvironment.WebRootPath, playlist.ImagePath));
                }
                _db.Playlists.Remove(playlist);
                _db.SaveChanges();

                return true;
            }

            return false;
        }

        public IEnumerable<UsersPlaylistStatus> GetFavoritePlaylists(string userId)
        {
            IEnumerable<UsersPlaylistStatus> favoritePlaylists = _db.UsersPlaylistStatuses.Where(fp => fp.UserId == userId);

            return favoritePlaylists;
        }

        public void UpdateImagePath(string playlistId, string imagePath)
        {
            Playlist playlist = _db.Playlists.FirstOrDefault(p => p.Id == playlistId);

            playlist.ImagePath = imagePath;

            _db.SaveChanges();
        }
    }
}
