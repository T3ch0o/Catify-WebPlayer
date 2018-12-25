namespace Catify.Entities
{
    using System.Collections.Generic;

    using Microsoft.AspNetCore.Identity;

    public class CatifyUser : IdentityUser
    {
        public ICollection<FavoritePlaylist> FavoritePlaylists { get; set; } = new HashSet<FavoritePlaylist>();
    }
}
