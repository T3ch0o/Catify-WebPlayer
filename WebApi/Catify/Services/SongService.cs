namespace Catify.Services
{
    using System.Collections.Generic;
    using System.Linq;

    using Catify.Data;
    using Catify.Entities;
    using Catify.Services.Interfaces;

    public class SongService : ISongService
    {
        private readonly CatifyDbContext _db;

        public SongService(CatifyDbContext db)
        {
            _db = db;
        }

        public void Create(string title, string url, string playlistId)
        {
            Song song = new Song
            {
                Title = title,
                Url = url,
                PlaylistId = playlistId
            };

            _db.Songs.Add(song);
            _db.SaveChanges();
        }

        public void DeleteAll(string playlistId)
        {
            IEnumerable<Song> songs = _db.Songs.Where(s => s.PlaylistId == playlistId);

            _db.RemoveRange(songs);
            _db.SaveChanges();
        }
    }
}
