namespace Catify.Services.Interfaces
{
    using Catify.Entities;

    public interface ISongService
    {
        void Create(string title, string url, string playlistId);
    }
}
