namespace Catify.Models
{
    using System;

    public class PlaylistsReturnModel
    {
        public string Id { get; set; }

        public string Creator { get; set; }

        public string Title { get; set; }

        public string ImagePath { get; set; }

        public DateTime CreationDate { get; set; }

        public bool IsFavoritePlaylist { get; set; }
    }
}
