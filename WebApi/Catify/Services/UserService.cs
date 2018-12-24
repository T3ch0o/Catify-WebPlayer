﻿namespace Catify.Services
{
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;

    using Catify.BindingModels;
    using Catify.Entities;
    using Catify.Services.Interfaces;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;

    public class UserService : IUserService
    {
        private readonly JwtSettings _jwtSettings;

        private readonly SignInManager<CatifyUser> _signInManager;

        private readonly UserManager<CatifyUser> _userManager;

        public UserService(IOptions<JwtSettings> jwtSettings,
                           SignInManager<CatifyUser> singInManager,
                           UserManager<CatifyUser> userManager)
        {
            _signInManager = singInManager;
            _userManager = userManager;
            _jwtSettings = jwtSettings.Value;
        }

        public async Task<string> Authenticate(string username, string password)
        {
            SignInResult loginResult = await _signInManager.PasswordSignInAsync(username, password, false, false);

            if (!loginResult.Succeeded)
            {
                return null;
            }

            CatifyUser user = await _userManager.FindByNameAsync(username);
            IList<string> roles = await _userManager.GetRolesAsync(user);

            return await GetToken(user);
        }

        public async Task<string> Register(RegisterBindingModel model)
        {
            CatifyUser user = new CatifyUser
            {
                UserName = model.Username,
                Email = model.Email
            };

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
            IList<string> roles = await _userManager.GetRolesAsync(user);

            return await GetToken(user);
        }

        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }

        private async Task<string> GetToken(CatifyUser user)
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

            return tokenHandler.WriteToken(token);
        }
    }
}