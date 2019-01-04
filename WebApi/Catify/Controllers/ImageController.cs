namespace Catify.Controllers
{
    using System.IO;
    using System.Threading.Tasks;

    using Catify.Services.Interfaces;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    using IOFile = System.IO.File;

    public class ImageController : BaseApiController
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        private readonly IPlaylistService _playlistService;

        private readonly string _playlistsImageFolder = "PlaylistImages";

        public ImageController(IHostingEnvironment hostingEnvironment, IPlaylistService playlistService)
        {
            _hostingEnvironment = hostingEnvironment;
            _playlistService = playlistService;
        }

        [HttpPost("{id}")]
        [Authorize]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Upload(IFormFile file, string id)
        {
            string extension = Path.GetExtension(file.FileName).ToLower();

            if (extension == ".jpeg" || extension == ".png" || extension == ".jpg")
            {
                using (FileStream fileStream = IOFile.OpenWrite(Path.Combine(_hostingEnvironment.WebRootPath, _playlistsImageFolder, id + extension)))
                {
                    await file.CopyToAsync(fileStream);

                    _playlistService.UpdateImagePath(id, $"{_playlistsImageFolder}/{id + extension}");
                }

                return Ok();
            }

            return BadRequest();
        }
    }
}
