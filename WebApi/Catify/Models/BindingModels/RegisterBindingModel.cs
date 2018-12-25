namespace Catify.Models.BindingModels
{
    using System.ComponentModel.DataAnnotations;

    public class RegisterBindingModel
    {
        [Required]
        [MinLength(3, ErrorMessage = "Username is too short.")]
        public string Username { get; set; }

        [Required] [EmailAddress] public string Email { get; set; }

        [Required]
        [MinLength(3, ErrorMessage = "Password is too short.")]
        public string Password { get; set; }

        [Required]
        [Compare(nameof(Password), ErrorMessage = "Passwords doesn't match.")]
        public string RepeatPassword { get; set; }

        public string Token { get; set; }

        public string Role { get; set; }
    }
}