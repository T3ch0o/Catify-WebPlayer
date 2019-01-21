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

        public IQueryable<Playlist> All => _db.Playlists
                                              .Include(playlist => playlist.Creator);

        public Playlist Get(string title)
        {
            Playlist playlist = _db.Playlists
                                   .Include(p => p.Creator)
                                   .Include(p => p.Songs)
                                   .FirstOrDefault(p => p.Title == title);

            return playlist;
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

        public bool Edit(EditPlaylistBindingModel model, string title, string creatorId, string role)
        {
            Playlist playlist = _db.Playlists.FirstOrDefault(p => p.Title == title);

            if (playlist == null)
            {
                return false;
            }

            if (playlist.CreatorId == creatorId || role == "Administrator")
            {
                playlist.Title = model.Title;

                _db.SaveChanges();

                return true;
            }

            return false;
        }

        public bool UpdateStatus(PlaylistStatusBindingModel model, string title, string userId)
        {
            Playlist playlist = Get(title);

            if (playlist == null)
            {
                return false;
            }

            bool isAddLike = playlist.Likes + 1 == model.Likes;
            bool isRemoveLike = playlist.Likes - 1 == model.Likes;
            bool isAddFavorite = playlist.Favorites + 1 == model.Favorites;
            bool isRemoveFavorite = playlist.Favorites - 1 == model.Favorites;

            if (!_db.UsersPlaylistStatuses.Any(ps => ps.PlaylistId == playlist.Id && ps.UserId == userId))
            {
                _userService.CreateUserPlaylistStatus(userId, playlist.Id);
            }

            if ((isAddLike || isRemoveLike) && playlist.Favorites == model.Favorites)
            {
                _userService.UpdateUserPlaylistStatus(userId, playlist.Id, "like", isAddLike);

                playlist.Likes = model.Likes;
            }
            else if ((isAddFavorite || isRemoveFavorite) && playlist.Likes == model.Likes)
            {
                _userService.UpdateUserPlaylistStatus(userId, playlist.Id, "favorite", isAddFavorite);

                playlist.Favorites = model.Favorites;
            }
            else
            {
                return false;
            }

            _db.SaveChanges();

            return true;
        }

        public bool Delete(string title, string creatorId, string role)
        {
            Playlist playlist = _db.Playlists.FirstOrDefault(p => p.Title == title);

            if (playlist == null)
            {
                return false;
            }

            if (playlist.CreatorId == creatorId || role == "Administrator")
            {
                _songService.DeleteAll(playlist.Id);

                IEnumerable<UsersPlaylistStatus> playlistStatuses = _db.UsersPlaylistStatuses.Where(ps => ps.PlaylistId == playlist.Id);

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

            if (playlist != null)
            {
                playlist.ImagePath = imagePath;

                _db.SaveChanges();
            }
        }
    }
}
