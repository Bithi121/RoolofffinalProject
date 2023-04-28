using RollOff_Test4API.Models.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RollOff_Test4API.Repository
{
    public interface IFormRepository
    {
        Task<FormTable> AddFormAsync(FormTable formTable);

        Task<IEnumerable<FormTable>> GetAllFormsAsync();
        Task<FormTable> GetRequestByGuid(Guid ID);
        Task<FormTable> EditRequest(Guid ID, FormTable formTable);
        Task<IEnumerable<FormTable>> GetApprovedRequestsByAccounts(string name); 
        Task<IEnumerable<FormTable>> GetTerminatedRequestsByAccounts(string name);
        Task<IEnumerable<FormTable>> GetInitiatedRequestsByAccounts(string name);
        Task<IEnumerable<FormTable>> GetHoldRequestsByAccounts(string name);
        Task<IEnumerable<FormTable>> GetApprovedRequestsByPSP(string name);
        Task<IEnumerable<FormTable>> GetTerminatedRequestsByPSP(string name);
        Task<IEnumerable<FormTable>> GetInitiatedRequestsByPSP(string name);
        Task<IEnumerable<FormTable>> GetHoldRequestsByPSP(string name);
        Task<IEnumerable<FormTable>> GetHoldRequests();
        Task<IEnumerable<FormTable>> GetByOpsFlag();
        Task<IEnumerable<FormTable>> GetApprovedByOpsFlag();
        Task<IEnumerable<FormTable>> GetTerminatedByOpsFlag();
        Task<IEnumerable<FormTable>> GetRequest(string name, string role);
     

    }
}
