using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RollOff_Test4API.Models.Domain;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace RollOff_Test4API.Repository
{
    public class TokenHandler : ITokenHandler
    {
        private readonly IConfiguration configuration;

        public TokenHandler(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        #region CreateTokenAsync
        public Task<string> CreateTokenAsync(Login loginTable)
        {
            try
            {
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));

                //Creating claims
                var claims = new List<Claim>();

                claims.Add(new Claim(ClaimTypes.GivenName, loginTable.Username));

                claims.Add(new Claim(ClaimTypes.Role, loginTable.Department));

                var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(configuration["Jwt:Issuer"], configuration["Jwt:Audience"],
                    claims, expires: DateTime.Now.AddMinutes(15), signingCredentials: credentials);

                return Task.FromResult(new JwtSecurityTokenHandler().WriteToken(token));
            }

            catch (Exception)
            {
                throw;
            }
        }
        #endregion
        public Task<string> GeneratePasswordTokenAsync(Login users)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:key"]));

            //creating claims
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Email, users.Email));

            var credentails = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(configuration["Jwt:Issuer"], configuration["Jwt:Audience"], claims,
                expires: DateTime.Now.AddMinutes(5), signingCredentials: credentails);

            return Task.FromResult(new JwtSecurityTokenHandler().WriteToken(token));
        }
    }
}
