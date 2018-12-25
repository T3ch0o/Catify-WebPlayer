namespace Catify.Models.BindingModels
{
    using System.ComponentModel.DataAnnotations;

    public class PlaylistBindingModel
    {
        [Required(ErrorMessage = "Please enter your playlist title.")]
        [StringLength(16, MinimumLength = 4, ErrorMessage = "Title must be between 4 and 16 characters.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Please enter image url.")]
        [RegularExpression(@"(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)", ErrorMessage = "Please enter a valid image url.")]
        public string ImageUrl { get; set; }

        [Required(ErrorMessage = "Please enter song url.")]
        [RegularExpression(@"((https:\/\/)|(http:\/\/)|(www.)|(m\.)|(\s))+(soundcloud.com\/)+[a-zA-Z0-9\-.]+(\/)+[a-zA-Z0-9\-.]+", ErrorMessage = "Please enter a valid image url.")]
        public string SongUrl { get; set; }

        [Required(ErrorMessage = "Non generated Title for this song.")]
        public string SongTitle { get; set; }

        [RegularExpression(@"(?:\w+,)*\w+", ErrorMessage = "Multiple Tags must be separated with comma.")]
        public string Tags { get; set; }
    }
}