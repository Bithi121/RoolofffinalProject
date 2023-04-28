
using RollOff_Test4API.Models.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RollOff_Test4API.Repository
{
    public interface IEmployeeDetails
    {
        Task<IEnumerable<Employee>> GetAllEmployeeDetails();

        Task<Employee> GetEmployeeByID(int ID);
        Task<IEnumerable<Employee>> GetEmployee(string data);
        Task<IEnumerable<Employee>> GetEmployeeByPSP(string name);
        Task<IEnumerable<Employee>> GetEmployeeByAccounts(string name);
        Task<IEnumerable<Employee>> GetEmployeesByGGID();

    }
}
