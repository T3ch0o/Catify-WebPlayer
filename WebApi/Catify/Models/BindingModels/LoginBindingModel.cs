namespace Catify.Models.BindingModels
{
    using System.ComponentModel.DataAnnotations;

    public class LoginBindingModel
    {
        [Required] public string Username { get; set; }

        [Required] public string Password { get; set; }

        public string Token { get; set; }

        public string Role { get; set; }
    }
}