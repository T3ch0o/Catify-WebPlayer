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

        public PlaylistService(CatifyDbContext db, ISongService songService)
        {
            _db = db;
            _songService = songService;
        }

        public Playlist Get(string id)
        {
            return _db.Playlists
                      .Include(p => p.Creator)
                      .Include(p => p.Songs)
                      .FirstOrDefault(p => p.Id == id);
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

        public bool Edit(PlaylistBindingModel model, string playlistId, string creatorId)
        {
            Playlist playlist = _db.Playlists.FirstOrDefault(p => p.Id == playlistId);

            if (playlist == null || playlist.CreatorId == creatorId)
            {
                return false;
            }

            playlist.Title = model.Title;
            playlist.ImageUrl = model.ImageUrl;

            _db.SaveChanges();

            return true;
        }
    }
}
