﻿namespace Catify.Services
{
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;

    using AutoMapper;

    using Catify.Data;
    using Catify.Entities;
    using Catify.Models;
    using Catify.Models.BindingModels;
    using Catify.Services.Interfaces;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;

    public class UserService : IUserService
    {
        private readonly JwtSettings _jwtSettings;

        private readonly SignInManager<CatifyUser> _signInManager;

        private readonly UserManager<CatifyUser> _userManager;

        private readonly CatifyDbContext _db;

        private readonly IMapper _mapper;

        public UserService(IOptions<JwtSettings> jwtSettings,
                           SignInManager<CatifyUser> singInManager,
                           UserManager<CatifyUser> userManager,
                           CatifyDbContext db,
                           IMapper mapper)
        {
            _signInManager = singInManager;
            _userManager = userManager;
            _db = db;
            _mapper = mapper;
            _jwtSettings = jwtSettings.Value;
        }

        public async Task<UserReturnModel> Authenticate(string username, string password)
        {
            SignInResult loginResult = await _signInManager.PasswordSignInAsync(username, password, false, false);

            if (!loginResult.Succeeded)
            {
                return null;
            }

            CatifyUser user = await _userManager.FindByNameAsync(username);

            return await SetupUserModel(user);
        }

        public async Task<UserReturnModel> Register(RegisterBindingModel model)
        {

            CatifyUser user = _mapper.Map<CatifyUser>(model);

            IdentityResult result = await _userManager.CreateAsync(user, model.Password);

            if (_signInManager.UserManager.Users.Count() == 1)
            {
                await _signInManager.UserManager.AddToRoleAsync(user, "Administrator");
            }

            if (!result.Succeeded)
            {
                return null;
            }

            await _signInManager.SignInAsync(user, isPersistent: false);

            return await SetupUserModel(user);
        }

        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }

        public void CreateUserPlaylistStatus(string userId, string playlistId)
        {
            UsersPlaylistStatus usersPlaylistStatus = new UsersPlaylistStatus
            {
                UserId = userId,
                PlaylistId = playlistId
            };

            _db.UsersPlaylistStatuses.Add(usersPlaylistStatus);
            _db.SaveChanges();
        }

        public void UpdateUserPlaylistStatus(string userId, string playlistId, string modifier, bool isAdded)
        {
            UsersPlaylistStatus userPlaylistStatus = _db.UsersPlaylistStatuses.FirstOrDefault(ps => ps.UserId == userId && ps.PlaylistId == playlistId);

            if (modifier == "like")
            {
                userPlaylistStatus.IsLiked = isAdded;
            }
            else if (modifier == "favorite")
            {
                userPlaylistStatus.IsFavorite = isAdded;
            }

            _db.SaveChanges();
        }

        public IEnumerable<UsersPlaylistStatus> GetUserFavoritePlaylists(string userId)
        {
            return _db.UsersPlaylistStatuses
                      .Where(ps => ps.UserId == userId && ps.IsFavorite);
        }

        public UsersPlaylistStatus GetUserPlaylistStatus(string userId, string playlistId)
        {
            return _db.UsersPlaylistStatuses
                      .FirstOrDefault(ps => ps.PlaylistId == playlistId && ps.UserId == userId);
        }

        public async Task<UserProfileModel> Get(string id)
        {
            CatifyUser user = await _userManager.FindByIdAsync(id);
            IList<string> roles = await _userManager.GetRolesAsync(user);
            List<string> favoritePlaylists = GetUserFavoritePlaylists(id)
                                             .Where(fp => fp.UserId == id && fp.IsFavorite)
                                             .Select(fp => fp.PlaylistId).ToList();

            return new UserProfileModel
            {
                Username = user.UserName,
                Email = user.Email,
                FavoritePlaylists = favoritePlaylists,
                Role = roles.Count() == 1 ? "Admin" : "User"
            };
        }

        private async Task<UserReturnModel> SetupUserModel(CatifyUser user)
        {
            IList<string> roles = await _userManager.GetRolesAsync(user);
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Id),
            };

            foreach (string role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            // Authentication successful so generate jwt token
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return new UserReturnModel
            {
                Username = user.UserName,
                Token = tokenHandler.WriteToken(token),
                Role = roles.Count() == 1 ? "Admin" : "User"
            };
        }
    }
}
