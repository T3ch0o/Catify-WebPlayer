namespace Catify.Services
{
    using System.Collections.Generic;

    using Catify.Data;
    using Catify.Entities;
    using Catify.Services.Interfaces;

    using Microsoft.EntityFrameworkCore;

    public class PlaylistService : IPlaylistService
    {
        private readonly CatifyDbContext _db;

        public PlaylistService(CatifyDbContext db)
        {
            _db = db;
        }

        public IEnumerable<Playlist> GetAll()
        {
            return _db.Playlists
                      .Include(playlist => playlist.Songs)
                      .Include(playlist => playlist.Creator);
        }
    }
}
