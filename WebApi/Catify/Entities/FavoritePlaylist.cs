namespace Catify.Entities
{
    using System.ComponentModel.DataAnnotations.Schema;

    public class FavoritePlaylist : BaseEntity<int>
    {
        public string UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public CatifyUser User { get; set; }

        public string PlaylistId { get; set; }

        [ForeignKey(nameof(PlaylistId))]
        public Playlist Playlist { get; set; }
    }
}
