using Microsoft.EntityFrameworkCore;
using RollOff_Test4API.Data;
using RollOff_Test4API.Models.Domain;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RollOff_Test4API.Repository
{
    public class FormRepository: IFormRepository
    {
        private readonly RollOff4DbContext context;

        public FormRepository(RollOff4DbContext context)
        {
            this.context = context;
        }
        #region AddFormAsync
        public async Task<FormTable> AddFormAsync(FormTable formTable)
        {
            try
            {
                formTable.RequestDate = DateTime.Now;
                formTable.RollOffStartDate = DateTime.Now;
               // formTable.Status = "Initiated";
                await context.AddAsync(formTable);
                await context.SaveChangesAsync();
                return formTable;
            }
            catch(Exception)
            {
                throw;
            }
        }
        #endregion

        #region GetAllFormsAsync
        public async Task<IEnumerable<FormTable>> GetAllFormsAsync()
        {
            try
            {
                return await context.FormTables.ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion

        #region UpdateFormAsync
        //public async Task<FormTable> UpdateFormAsync(double ggid, FormTable form)
        //{
        //    try
        //    {
        //        var existingemployee = await context.FormTables.FirstOrDefaultAsync(x => x.GlobalGroupId == ggid);
        //        if (existingemployee == null)
        //        {
        //            return existingemployee;
        //        }

        //        existingemployee.EmployeeNo = form.EmployeeNo;
        //        existingemployee.Name = form.Name;
        //        existingemployee.PrimarySkill = form.PrimarySkill;
        //        existingemployee.LocalGrade = form.LocalGrade;
        //        existingemployee.ProjectCode = form.ProjectCode;
        //        existingemployee.ProjectName = form.ProjectName;
        //        existingemployee.Practice = form.Practice;
        //        existingemployee.RollOffEndDate = form.RollOffEndDate;
        //        existingemployee.ReasonForRollOff = form.ReasonForRollOff;
        //        existingemployee.ThisReleaseNeedBackfillIsBackFilled = form.ThisReleaseNeedBackfillIsBackFilled;
        //        existingemployee.PerformanceIssue = form.PerformanceIssue;
        //        existingemployee.Resigned = form.Resigned;
        //        existingemployee.UnderProbation = form.UnderProbation;
        //        existingemployee.LongLeave = form.LongLeave;
        //        existingemployee.TechnicalSkills = form.TechnicalSkills;
        //        existingemployee.Communication = form.Communication;
        //        existingemployee.RoleCompetencies = form.RoleCompetencies;
        //        existingemployee.Remarks = form.Remarks;
        //        existingemployee.RelevantExperienceYrs = form.RelevantExperienceYrs;
        //        existingemployee.Status = form.Status;
        //        existingemployee.RequestDate = form.RequestDate;

        //        await context.SaveChangesAsync();
        //        return existingemployee;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}
        #endregion

        public async Task<FormTable> GetRequestByGuid(Guid ID)
        {
            return await context.FormTables.FirstOrDefaultAsync(x => x.Id == ID);
        }
        public async Task<FormTable> EditRequest(Guid guid, FormTable formTable)
        {
            var formDetail = await context.FormTables.FirstOrDefaultAsync(x => x.Id == guid);
            formDetail.Status = formTable.Status;
            await context.SaveChangesAsync();
            return formDetail;
        }
        public async Task<IEnumerable<FormTable>> GetApprovedRequestsByAccounts(string name)
        {
            string Status = "Approved";
            var Empquery = from x in context.FormTables select x;
            if (!string.IsNullOrEmpty(Status))
            {
                Empquery = Empquery.Where(x => x.Status.Equals(Status) && x.SentBy.Equals(name));
            }
            return await Empquery.AsNoTracking().ToListAsync();
        }
        public async Task<IEnumerable<FormTable>> GetTerminatedRequestsByAccounts(string name)
        {
            string Status = "Terminated";
            var Empquery = from x in context.FormTables select x; if (!string.IsNullOrEmpty(Status))
            {
                Empquery = Empquery.Where(x => x.Status.Equals(Status) && x.SentBy.Equals(name));
            }
            return await Empquery.AsNoTracking().ToListAsync();
        }
        public async Task<IEnumerable<FormTable>> GetInitiatedRequestsByAccounts(string name)
        {
            string Status = "Initiated";
            var Empquery = from x in context.FormTables select x; if (!string.IsNullOrEmpty(Status))
            {
                Empquery = Empquery.Where(x => x.Status.Equals(Status) && x.SentBy.Equals(name));
            }
            return await Empquery.AsNoTracking().ToListAsync();
        }
        public async Task<IEnumerable<FormTable>> GetHoldRequestsByAccounts(string name)
        {
            string Status = "On Hold";
            var Empquery = from x in context.FormTables select x; if (!string.IsNullOrEmpty(Status))
            {
                Empquery = Empquery.Where(x => x.Status.Equals(Status) && x.SentBy.Equals(name));
            }
            return await Empquery.AsNoTracking().ToListAsync();
        }
        public async Task<IEnumerable<FormTable>> GetApprovedRequestsByPSP(string name)
        {
            string Status = "Approved";
            var Empquery = from x in context.FormTables select x;
            if (!string.IsNullOrEmpty(Status))
            {
                Empquery = Empquery.Where(x => x.Status.Equals(Status) && x.SentTo.Contains(name));
            }
            return await Empquery.AsNoTracking().ToListAsync();
        }
        public async Task<IEnumerable<FormTable>> GetTerminatedRequestsByPSP(string name)
        {
            string Status = "Terminated";
            var Empquery = from x in context.FormTables select x; if (!string.IsNullOrEmpty(Status))
            {
                Empquery = Empquery.Where(x => x.Status.Equals(Status) && x.SentTo.Contains(name));
            }
            return await Empquery.AsNoTracking().ToListAsync();
        }
        public async Task<IEnumerable<FormTable>> GetInitiatedRequestsByPSP(string name)
        {
            string Status = "Initiated";
            var Empquery = from x in context.FormTables select x; if (!string.IsNullOrEmpty(Status))
            {
                Empquery = Empquery.Where(x => x.Status.Equals(Status) && x.SentTo.Contains(name));
            }
            return await Empquery.AsNoTracking().ToListAsync();
        }
        public async Task<IEnumerable<FormTable>> GetHoldRequestsByPSP(string name)
        {
            string Status = "On Hold";
            var Empquery = from x in context.FormTables select x; if (!string.IsNullOrEmpty(Status))
            {
                Empquery = Empquery.Where(x => x.Status.Equals(Status) && x.SentTo.Contains(name));
            }
            return await Empquery.AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<FormTable>> GetHoldRequests()
        {
            string Status = "On Hold";
            var Empquery = from x in context.FormTables select x; if (!string.IsNullOrEmpty(Status))
            {
                Empquery = Empquery.Where(x => x.Status.Equals(Status));
            }
            return await Empquery.AsNoTracking().ToListAsync();
        }
        public async Task<IEnumerable<FormTable>> GetByOpsFlag()
        {
            string OpsFlag = "1";
            var Empquery = from x in context.FormTables select x; 
            if (!string.IsNullOrEmpty(OpsFlag))
            {
                Empquery = Empquery.Where(x => x.OpsFlag.Equals(OpsFlag));
            }
            return await Empquery.AsNoTracking().ToListAsync();
        }
        public async Task<IEnumerable<FormTable>> GetApprovedByOpsFlag()
        {
            string OpsFlag = "1";
            string Status = "Approved";
            var Empquery = from x in context.FormTables select x; 
            if (!string.IsNullOrEmpty(OpsFlag))
            {
                Empquery = Empquery.Where(x => x.OpsFlag.Equals(OpsFlag) && x.Status.Equals(Status));
            }
            return await Empquery.AsNoTracking().ToListAsync();
        }
        public async Task<IEnumerable<FormTable>> GetTerminatedByOpsFlag()
        {
            string OpsFlag = "1";
            string Status = "Terminated";
            var Empquery = from x in context.FormTables select x; 
            if (!string.IsNullOrEmpty(OpsFlag))
            {
                Empquery = Empquery.Where(x => x.OpsFlag.Equals(OpsFlag) && x.Status.Equals(Status));
            }
            return await Empquery.AsNoTracking().ToListAsync();
        }
        public async Task<IEnumerable<FormTable>> GetRequest(string name, string role)
        {
            var Empquery = from x in context.FormTables select x; 
            if (!string.IsNullOrEmpty(name))
            {
                if(role == "Accounts")
                {
                    Empquery = Empquery.Where(x => x.SentBy.Equals(name));
                }
              else if(role == "PSP")
                {
                    Empquery = Empquery.Where(x => x.SentTo.Contains(name));
                }
            }
            return await Empquery.AsNoTracking().ToListAsync();
        }

      
    }
}
