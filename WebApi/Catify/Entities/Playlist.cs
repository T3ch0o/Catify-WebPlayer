namespace Catify.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Playlist : BaseEntity<string>
    {
        public string Title { get; set; }

        public string ImageUrl { get; set; }

        public int Likes { get; set; }

        public DateTime CreationDate { get; set; }

        public string CreatorId { get; set; }

        [ForeignKey(nameof(CreatorId))]
        public CatifyUser Creator { get; set; }

        public ICollection<Song> Songs { get; set; } = new HashSet<Song>();
    }
}
