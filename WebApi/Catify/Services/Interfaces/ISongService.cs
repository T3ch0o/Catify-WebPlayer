namespace Catify.Services.Interfaces
{
    using Catify.Entities;

    public interface ISongService
    {
        void Create(string title, string url, string playlistId);

        void Delete(string playlistId, string creatorId);

        void DeleteAll(string playlistId);
    }
}
