using System.ComponentModel.DataAnnotations;

namespace RollOff_Test4API.Models.DTO
{
    public class GetEmployee
    {

   
        public double GlobalGroupId { get; set; }

        public double? EmployeeNo { get; set; }
        public string? Name { get; set; }
        public string? LocalGrade { get; set; }
       
        [Required]
        public string Email { get; set; }
       
    }
}
