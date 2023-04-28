using RollOff_Test4API.Models.Domain;
using System.Threading.Tasks;

namespace RollOff_Test4API.Repository
{
    public interface ITokenHandler
    {
        Task<string> CreateTokenAsync(Login loginTable);
        Task<string> GeneratePasswordTokenAsync(Login users);
    }
}
