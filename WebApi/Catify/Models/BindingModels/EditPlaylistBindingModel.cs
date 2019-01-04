namespace Catify.Models.BindingModels
{
    using System.ComponentModel.DataAnnotations;

    public class EditPlaylistBindingModel
    {
        [Required(ErrorMessage = "Please enter your playlist title.")]
        [StringLength(16, MinimumLength = 4, ErrorMessage = "Title must be between 4 and 16 characters.")]
        public string Title { get; set; }

        [RegularExpression(@"(?:\w+,)*\w+", ErrorMessage = "Multiple Tags must be separated with comma.")]
        public string Tags { get; set; }
    }
}
