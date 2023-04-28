using RollOff_Test4API.Models.Domain;
using System.Threading.Tasks;

namespace RollOff_Test4API.Repository
{
    public interface IUser
    {
        Task<Login> AddLoginDetailsAsync(Login loginTable);
        Task<Login> AuthenticateUserAsync(string email, string password,string department);
        Task<Login> FindByEmailAsync(string email);

        Task<Login> ResetPasswordAsync(string email, string password);
    }
}
