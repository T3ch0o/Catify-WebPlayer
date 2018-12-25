namespace Catify.Models
{
    using System;
    using System.Collections.Generic;

    public class PlaylistReturnModel
    {
        public string Creator { get; set; }

        public string Title { get; set; }

        public string ImageUrl { get; set; }

        public int Likes { get; set; }

        public int Favorites { get; set; }

        public DateTime CreationDate { get; set; }

        public ICollection<SongModel> Songs { get; set; }
    }
}
