namespace Catify.Services.Interfaces
{
    using System.Threading.Tasks;

    using Catify.BindingModels;
    using Catify.Entities;

    public interface IUserService
    {
        Task<string> Authenticate(string username, string password);

        Task<string> Register(RegisterBindingModel model);
    }
}
