using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RollOff_Test4API.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RollOff_Test4API.Controllers
{
    // [Route("api/[controller]")]
    [ApiController]
   //[Authorize(Roles = "Accounts")]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeService _context;
        private readonly IMapper _mapper;

        public EmployeesController(EmployeeService context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Employees
        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetDetails()
        {
            try
            {
                var data = await _context.GetAllEmployeeDetails();
                return Ok(_mapper.Map<List<Models.DTO.GetEmployee>>(data));
            }
            catch (Exception e) {
                return BadRequest("Error in Controller method GetEmployee"+ e);
            }
        }
       [HttpGet]
        [Route("[controller]/{id:int}")]
   
        public async Task<IActionResult> GetEmployeeByID(int id)
        {
            try
            {
                var result = await _context.GetEmployeeByID(id);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch(Exception e)
            {
                return BadRequest("Error in Controller method GetEmployeesByID"+ e);
            }
        }
        [HttpGet]
        [Route("[controller]/{data}")]
        public async Task<IActionResult> GetEmployee( string data)
        {
            try {
                //fetch employee
                var result = await _context.GetEmployee(data);
                if (result == null)
                {
                    return NotFound();
                }
                var resultDTO = _mapper.Map<List<Models.DTO.GetEmployeeByID>>(result);
                return Ok(resultDTO);
            }
            catch(Exception e)
            {
                return BadRequest("Error in Controller method GetEmployee by data"+ e);
            }
            }
        [HttpGet]
        [Route("EmployeeByPSP/{data}")]
        public async Task<IActionResult> GetEmployeeByPSP(string data)
        {
            try
            {
                //fetch employee
                var result = await _context.GetEmployeeByPSP(data);
                if (result == null)
                {
                    return NotFound();
                }
                var resultDTO = _mapper.Map<List<Models.DTO.GetEmployeeByID>>(result);
                return Ok(resultDTO);
            }
            catch (Exception e)
            {
                return BadRequest("Error in Controller method GetEmployee by data" + e);
            }
        }
        [HttpGet]
        [Route("EmployeeByAccounts/{data}")]
        public async Task<IActionResult> GetEmployeeByAccounts(string data)
        {
            try
            {
                //fetch employee
                var result = await _context.GetEmployeeByAccounts(data);
                if (result == null)
                {
                    return NotFound();
                }
                var resultDTO = _mapper.Map<List<Models.DTO.GetEmployeeByID>>(result);
                return Ok(resultDTO);
            }
            catch (Exception e)
            {
                return BadRequest("Error in Controller method GetEmployee by data" + e);
            }
        }
        [HttpGet]
        [Route("Joins")]
        public async Task<IActionResult> GetEmployeesByGGID()
        {
            var emp =  await _context.GetEmployeesByGGID();
            return Ok(emp);
        }
    }
}
