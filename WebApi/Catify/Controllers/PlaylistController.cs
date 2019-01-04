namespace Catify.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;

    using Catify.Entities;
    using Catify.Models;
    using Catify.Models.BindingModels;
    using Catify.Services.Interfaces;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    public class PlaylistController : BaseApiController
    {
        private readonly IPlaylistService _playlistService;

        private readonly IUserService _userService;

        public PlaylistController(IPlaylistService playlistService, IUserService userService)
        {
            _playlistService = playlistService;
            _userService = userService;
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Get([FromRoute]string id)
        {
            Playlist playlist = _playlistService.Get(id);

            if (playlist == null)
            {
                return BadRequest();
            }

            List<SongModel> songs = new List<SongModel>();

            foreach (Song song in playlist.Songs)
            {
                songs.Add(new SongModel{ Title = song.Title, Url = song.Url });
            }

            PlaylistReturnModel playlistModel = new PlaylistReturnModel
            {
                Id = playlist.Id,
                Creator = playlist.Creator.UserName,
                Title = playlist.Title,
                ImageUrl = playlist.ImageUrl,
                Likes = playlist.Likes,
                Favorites = playlist.Favorites,
                CreationDate = playlist.CreationDate,
                Songs = songs
            };

            UsersPlaylistStatus userPlaylistStatus = _userService.GetUserPlaylistStatus(User.Identity.Name, playlist.Id);

            if (User.Identity.IsAuthenticated && userPlaylistStatus != null)
            {
                playlistModel.IsFavorite = userPlaylistStatus.IsFavorite;
                playlistModel.IsLiked = userPlaylistStatus.IsLiked;
            }

            return Ok(playlistModel);
        }

        [HttpGet("all")]
        [AllowAnonymous]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult All()
        {
            IEnumerable<Playlist> playlists = _playlistService.GetAll();
            List<AllPlaylistsModel> playlistsModel = new List<AllPlaylistsModel>();
            IEnumerable<UsersPlaylistStatus> favoritePlaylists = _userService.GetUserFavoritePlaylists(User.Identity.Name);

            foreach (Playlist playlist in playlists)
            {
                bool isFavorite = favoritePlaylists.Any(p => p.PlaylistId == playlist.Id && p.IsFavorite);

                playlistsModel.Add(new AllPlaylistsModel
                {
                    Id = playlist.Id,
                    Creator = playlist.Creator.UserName,
                    Title = playlist.Title,
                    ImageUrl = playlist.ImageUrl,
                    CreationDate = playlist.CreationDate,
                    IsFavoritePlaylist = isFavorite
                });
            }

            return Ok(playlistsModel);
        }

        [HttpPost]
        [Authorize]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Post([FromBody]PlaylistBindingModel model)
        {
            if (ModelState.IsValid)
            {
                _playlistService.Create(model, User.Identity.Name);

                return Ok(new { Created = true });
            }

            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        [Authorize]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Put([FromBody]EditPlaylistBindingModel model, [FromRoute]string id)
        {
            if (ModelState.IsValid)
            {
                string role = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).Any() ? "Administrator" : "User";
                string creatorId = User.Identity.Name;

                bool isUpdated = _playlistService.Edit(model, id, creatorId, role);

                if (isUpdated)
                {
                    return Ok(new { Edited = true });
                }

                return Unauthorized();
            }

            return BadRequest(ModelState);
        }

        [HttpPut("update/{id}")]
        [Authorize]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult UpdateStatus([FromBody]PlaylistStatusBindingModel model, [FromRoute]string id)
        {
            if (ModelState.IsValid)
            {
                bool isUpdated = _playlistService.UpdateStatus(model, id, User.Identity.Name);

                if (isUpdated)
                {
                    return Ok(new { StatusUpdate = true });
                }

                return Unauthorized();
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        [Authorize]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Delete([FromRoute]string id)
        {
            string role = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).Any() ? "Administrator" : "User";
            string creatorId = User.Identity.Name;

            bool isDeleted = _playlistService.Delete(id, creatorId, role);

            if (isDeleted)
            {
                return Ok(new { Removed = true });
            }

            return Unauthorized();
        }
    }
}