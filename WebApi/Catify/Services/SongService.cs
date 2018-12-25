namespace Catify.Services
{
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
    }
}
