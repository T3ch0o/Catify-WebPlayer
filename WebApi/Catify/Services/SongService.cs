namespace Catify.Services
{
    using System.Collections.Generic;
    using System.Linq;

    using Catify.Data;
    using Catify.Entities;
    using Catify.Services.Interfaces;

    using Microsoft.EntityFrameworkCore;

    public class SongService : ISongService
    {
        private readonly CatifyDbContext _db;

        public SongService(CatifyDbContext db)
        {
            _db = db;
        }

        public bool Create(string title, string url, string creatorId, string playlistId, string role = "User")
        {
            Playlist playlist = _db.Playlists.FirstOrDefault(p => p.Id == playlistId);

            if (playlist != null && (playlist.CreatorId == creatorId || role == "Administrator"))
            {
                Song song = new Song
                {
                    Title = title.Trim(),
                    Url = url,
                    PlaylistId = playlistId
                };

                _db.Songs.Add(song);
                _db.SaveChanges();

                return true;
            }

            return false;
        }

        public bool Delete(string playlistId, string title, string creatorId, string role)
        {
            if (_db.Playlists.Any(p => p.Id == playlistId))
            {
                Song song = _db.Songs.Include(s => s.Playlist).FirstOrDefault(s => s.PlaylistId == playlistId && s.Title == title);

                if (song != null && (song.Playlist.CreatorId == creatorId || role == "Administrator"))
                {
                    _db.Songs.Remove(song);
                    _db.SaveChanges();
                }

                return true;
            }

            return false;
        }

        public void DeleteAll(string playlistId)
        {
            IEnumerable<Song> songs = _db.Songs.Where(s => s.PlaylistId == playlistId);

            _db.RemoveRange(songs);
            _db.SaveChanges();
        }
    }
}
