namespace Catify.Services.Interfaces
{
    public interface ISongService
    {
        bool Create(string title, string url, string creatorId, string playlistId, string role);

        bool Delete(string playlistId, string songTitle, string creatorId, string role);

        void DeleteAll(string playlistId);
    }
}
