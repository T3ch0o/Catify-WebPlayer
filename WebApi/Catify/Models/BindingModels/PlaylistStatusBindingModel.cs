namespace Catify.Models.BindingModels
{
    using System.ComponentModel.DataAnnotations;

    public class PlaylistStatusBindingModel
    {
        [Range(0, int.MaxValue, ErrorMessage = "Must be positive number.")]
        public int Likes { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Must be positive number.")]
        public int Favorites { get; set; }
    }
}
