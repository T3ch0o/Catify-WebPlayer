namespace Catify.Entities
{
    using System.ComponentModel.DataAnnotations.Schema;

    public class Song : BaseEntity<string>
    {
        public string Title { get; set; }

        public string Url { get; set; }

        public string PlaylistId { get; set; }

        [ForeignKey(nameof(PlaylistId))]
        public Playlist Playlist { get; set; }
    }
}
