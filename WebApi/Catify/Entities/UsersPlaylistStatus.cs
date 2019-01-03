namespace Catify.Entities
{
    using System.ComponentModel.DataAnnotations.Schema;

    public class UsersPlaylistStatus : BaseEntity<int>
    {
        public string UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public CatifyUser User { get; set; }

        public string PlaylistId { get; set; }

        [ForeignKey(nameof(PlaylistId))]
        public Playlist Playlist { get; set; }

        public bool IsFavorite { get; set; }

        public bool IsLiked { get; set; }
    }
}
