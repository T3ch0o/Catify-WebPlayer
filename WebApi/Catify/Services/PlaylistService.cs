namespace Catify.Services
{
    using System;
    using System.Collections.Generic;

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

        public IEnumerable<Playlist> GetAll()
        {
            return _db.Playlists
                      .Include(playlist => playlist.Creator);
        }

        public void Create(CreatePlaylistBindingModel model, string creatorId)
        {
            Playlist playlist = new Playlist
            {
                Title = model.Title,
                ImageUrl = model.ImageUrl,
                Likes = 0,
                CreationDate = DateTime.UtcNow,
                CreatorId = creatorId
            };

            _db.Add(playlist);
            _db.SaveChanges();

            _songService.Create(model.SongTitle, model.SongUrl, playlist.Id);
        }
    }
}
