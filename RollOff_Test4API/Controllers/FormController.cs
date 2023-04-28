using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RollOff_Test4API.Models.Domain;
using RollOff_Test4API.Models.DTO;
using RollOff_Test4API.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RollOff_Test4API.Controllers
{
    [Route("[controller]")]
    [ApiController]
  //  [Authorize(Roles = "Accounts, PSP, Admin")]
    public class FormController : ControllerBase
    {
            private readonly IFormRepository formRepository;
            private readonly IMapper mapper;

            public FormController(IFormRepository formRepository, IMapper mapper)
            {
                this.formRepository = formRepository;
                this.mapper = mapper;
            }

            [HttpPost]
            public async Task<IActionResult> AddEmployeeForm(FormTableDTO formTable)
            {
            try
            {
                //DTO to Model
                var employeeForm = mapper.Map<FormTable>(formTable);

                //Pass Detail to Repository
                var response = await formRepository.AddFormAsync(employeeForm);

                //Convert back to DTO
                var formTableDTO = mapper.Map<FormTableDTO>(response);

                return Ok(formTableDTO);
            }
            catch(Exception e)
            {
                return BadRequest("Error in Controller method AddEmployeeForm" + e);
            }
            }

            [HttpGet]
            public async Task<IActionResult> GetAllEmployeesForms()
            {
            try
            {
                var formDetails = await formRepository.GetAllFormsAsync();

                //return DTO

                var formDetailsDTO = mapper.Map<List<FormTableDTO>>(formDetails);

                return Ok(formDetailsDTO);
            }
            catch(Exception e)
            {
                return BadRequest("Error in Controller method GetAllEmployeesForm" + e);
            }
            }
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetReqeustByGUID(Guid id)
        {
            var formDetails = await formRepository.GetRequestByGuid(id);             //return DTO
            var formDetailsDTO = mapper.Map<FormTableDTO>(formDetails);
            return Ok(formDetailsDTO);
        }
        [HttpPut]
        [Route("{guid}")]
        public async Task<IActionResult> EditRequest(Guid guid, UpdateFormDTO formTable)
        {
            var employeeForm = mapper.Map<FormTable>(formTable);
            var response = await formRepository.EditRequest(guid, employeeForm);
            if (response == null)
            {
                return BadRequest();
            }
            //Convert back to DTO
            var formTableDTO = mapper.Map<UpdateFormDTO>(response);
            return Ok(formTableDTO);
        }
        [HttpGet]
        [Route("Approved/{data}")]
        public async Task<IActionResult> GetApprovedRequests(string data)
        {
            var result = await formRepository.GetApprovedRequestsByAccounts( data);
            return Ok(result);
        }
        [HttpGet]
        [Route("Terminated/{data}")]
        public async Task<IActionResult> GetTerminatedRequests(string data)
        {
            var result = await formRepository.GetTerminatedRequestsByAccounts(data);
            return Ok(result);
        }
        [HttpGet]
        [Route("Initiated/{data}")]
        public async Task<IActionResult> GetInitiatedRequests(string data)
        {
            var result = await formRepository.GetInitiatedRequestsByAccounts(data);
            return Ok(result);
        }
        [HttpGet]
        [Route("OnHold/{data}")]
        public async Task<IActionResult> GetOnHoldRequests(string data)
        {
            var result = await formRepository.GetHoldRequestsByAccounts(data);
            return Ok(result);
        }
        [HttpGet]
        [Route("ApprovedByPSP/{data}")]
        public async Task<IActionResult> GetApprovedRequestsByPSP(string data)
        {
            var result = await formRepository.GetApprovedRequestsByPSP(data);
            return Ok(result);
        }
        [HttpGet]
        [Route("TerminatedByPSP/{data}")]
        public async Task<IActionResult> GetTerminatedRequestsByPSP(string data)
        {
            var result = await formRepository.GetTerminatedRequestsByPSP(data);
            return Ok(result);
        }
        [HttpGet]
        [Route("InitiatedByPSP/{data}")]
        public async Task<IActionResult> GetInitiatedRequestsByPSP(string data)
        {
            var result = await formRepository.GetInitiatedRequestsByPSP(data);
            return Ok(result);
        }
        [HttpGet]
        [Route("OnHoldByPSP/{data}")]
        public async Task<IActionResult> GetOnHoldRequestsByPSP(string data)
        {
            var result = await formRepository.GetHoldRequestsByPSP(data);
            return Ok(result);
        }
        [HttpGet]
        [Route("OnHold")]
        public async Task<IActionResult> GetOnHoldRequests()
        {
            var result = await formRepository.GetHoldRequests();
            return Ok(result);
        }
        [HttpGet]
        [Route("OPSFlag")]
        public async Task<IActionResult> GetByOpsFlag()
        {
            var result = await formRepository.GetByOpsFlag();
            return Ok(result);
        }
        [HttpGet]
        [Route("OPSFlagApproved")]
        public async Task<IActionResult> GetByOpsFlagApproved()
        {
            var result = await formRepository.GetApprovedByOpsFlag();
            return Ok(result);
        }
        [HttpGet]
        [Route("OPSFlagTerminated")]
        public async Task<IActionResult> GetByOpsFlagTerminated()
        {
            var result = await formRepository.GetTerminatedByOpsFlag ();
            return Ok(result);
        }
        [HttpGet]
        [Route("Request/{data}")]
        public async Task<IActionResult> GetRequests(string data, string role)
        {
            var result = await formRepository.GetRequest(data, role);
            return Ok(result);
        }


    }
}
