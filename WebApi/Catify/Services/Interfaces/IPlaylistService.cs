namespace Catify.Services.Interfaces
{
    using System.Collections.Generic;

    using Catify.Entities;

    public interface IPlaylistService
    {
        IEnumerable<Playlist> GetAll();
    }
}
