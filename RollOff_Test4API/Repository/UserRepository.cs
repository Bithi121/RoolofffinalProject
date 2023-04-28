using Microsoft.EntityFrameworkCore;
using RollOff_Test4API.Data;
using RollOff_Test4API.Models.Domain;
using System;
using System.Threading.Tasks;

namespace RollOff_Test4API.Repository
{
    public class UserRepository : IUser
    {

        private RollOff4DbContext _context;

        public UserRepository(RollOff4DbContext context)
        {
            _context = context;
        }

        #region AddLoginDetailsAsync
        public async Task<Login> AddLoginDetailsAsync(Login loginTable)
        {
            try
            {
                await _context.login.AddAsync(loginTable);
                await _context.SaveChangesAsync();
                return loginTable;
            }
            catch(Exception)
            {
                throw;
            }
        }
        #endregion

        #region AuthenticateUserAsync
        public async Task<Login> AuthenticateUserAsync(string username, string password,string department)
        {
            try
            {
                var user = await _context.login.FirstOrDefaultAsync(x => x.Username == username && x.Password == password && x.Department == department);
                return user;
            }
            catch(Exception)
            {
                throw;
            }
        }
        #endregion
        public async Task<Login> FindByEmailAsync(string email)
        {
            var user = await _context.login.FirstOrDefaultAsync(x => x.Email == email);
            return user;
        }

        public async Task<Login> ResetPasswordAsync(string email, string password)
        {
            var user = await _context.login.FirstOrDefaultAsync(x => x.Email == email);
            if (user == null)
            {
                return null;
            }
            user.Password = password;
            //await context.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }
    }
}
