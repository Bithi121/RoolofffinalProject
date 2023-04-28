using Microsoft.EntityFrameworkCore;
using RollOff_Test4API.Data;

using RollOff_Test4API.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RollOff_Test4API.Repository
{
    public class EmployeeDetailsRepository: IEmployeeDetails
    {
        private RollOff4DbContext _db;
        public EmployeeDetailsRepository(RollOff4DbContext userDb)
        {
            _db = userDb;
        }
        #region GetAllEmployeeDetails
        public async Task<IEnumerable<Employee>> GetAllEmployeeDetails()
        {
            try
            {
                return await _db.Employees.ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion

        #region GetEmployeeByID
        public async Task<Employee> GetEmployeeByID(int ID)
        {
            try
            {
                return await _db.Employees.FirstOrDefaultAsync(x => x.GlobalGroupId == ID);
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
                //var id = data;
                var Empquery = from x in _db.Employees select x;
                if (!string.IsNullOrEmpty(data))
                {
                    Empquery = Empquery.Where(x => x.Name.Contains(data) || x.Email.Contains(data) || x.GlobalGroupId.ToString().Contains(data));
                }
                return await Empquery.AsNoTracking().ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion

        public async Task<IEnumerable<Employee>> GetEmployeeByPSP(string name)
        {

            try
            {
                //var id = data;
                var Empquery = from x in _db.Employees select x;
                if (!string.IsNullOrEmpty(name))
                {
                    Empquery = Empquery.Where(x=> x.PspName.Contains(name));
                }
                return await Empquery.AsNoTracking().ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<IEnumerable<Employee>> GetEmployeeByAccounts(string name)
        {

            try
            {
                //var id = data;
                var Empquery = from x in _db.Employees select x;
                if (!string.IsNullOrEmpty(name))
                {
                    Empquery = Empquery.Where(x => x.PeopleManagerPerformanceReviewer.Contains(name));
                }
                return await Empquery.AsNoTracking().ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<IEnumerable<Employee>> GetEmployeesByGGID()
        {
            //var Empquery = from x in _db.Employees select x;
            //var Empquery2 = from y in _db.FormTables select y;
            //var innerJoin = Empquery.Join(Empquery2,
            //    str1 => str1,
            //    str2 => str2,
            //    (str1, str2) => str1);
            var Empquery = (from x in _db.Employees
                            join y in _db.FormTables on
                            x.GlobalGroupId equals y.GlobalGroupId
                            select x
                            ).ToListAsync();

            return await Empquery;
        }
    }
}

