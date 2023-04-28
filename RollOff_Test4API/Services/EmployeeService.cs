
using RollOff_Test4API.Models.Domain;
using RollOff_Test4API.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RollOff_Test4API.Services
{
    public class EmployeeService
    {
        private IEmployeeDetails _EmpDetailsRepositoty;
        

        public EmployeeService(IEmployeeDetails EmpDetails)
        {
            _EmpDetailsRepositoty = EmpDetails;
        }
        #region GetAllEmployeeDetails
        public async Task<IEnumerable<Employee>> GetAllEmployeeDetails()
        {
            return await _EmpDetailsRepositoty.GetAllEmployeeDetails();
        }
        #endregion

        #region GetEmployeeByID
        public async Task<Employee> GetEmployeeByID(int ID)
        {
            try
            {
                return await _EmpDetailsRepositoty.GetEmployeeByID(ID);
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion

        #region GetEmployee
        public async Task<IEnumerable<Employee>> GetEmployee(string data)
        {
            try
            {
                return await _EmpDetailsRepositoty.GetEmployee(data);
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion
        public async Task<IEnumerable<Employee>> GetEmployeeByPSP(string data)
        {
            try
            {
                return await _EmpDetailsRepositoty.GetEmployeeByPSP(data);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<IEnumerable<Employee>> GetEmployeeByAccounts(string data)
        {
            try
            {
                return await _EmpDetailsRepositoty.GetEmployeeByAccounts(data);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<IEnumerable<Employee>> GetEmployeesByGGID()
        {
            try
            {
                return await _EmpDetailsRepositoty.GetEmployeesByGGID();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
