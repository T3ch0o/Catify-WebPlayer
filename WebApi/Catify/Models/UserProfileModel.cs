namespace Catify.Models
{
    using System.Collections.Generic;

    public class UserProfileModel
    {
        public string Username { get; set; }

        public string Email { get; set; }

        public ICollection<string> FavoritePlaylists { get; set; }

        public string Role { get; set; }
    }
}
