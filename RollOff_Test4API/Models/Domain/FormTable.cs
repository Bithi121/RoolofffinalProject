using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RollOff_Test4API.Models.Domain
{
    public class FormTable
    {
        [Key]
        public Guid Id { get; set; }
        public double GlobalGroupId { get; set; }
        public double? EmployeeNo { get; set; }
        public string Name { get; set; }
        public string LocalGrade { get; set; }
        public string PrimarySkill { get; set; }
        public double? ProjectCode { get; set; }
        public string ProjectName { get; set; }
        public string Practice { get; set; }
        public DateTime? RollOffEndDate { get; set; }
        public string ReasonForRollOff { get; set; }
        public string ThisReleaseNeedBackfillIsBackFilled { get; set; }
        public string PerformanceIssue { get; set; }
        public string Resigned { get; set; }
        public string UnderProbation { get; set; }
        public string LongLeave { get; set; }
        public string TechnicalSkills { get; set; }
        public string Communication { get; set; }
        public string RoleCompetencies { get; set; }
        public string Remarks { get; set; }
        public double? RelevantExperienceYrs { get; set; }
        public string Status { get; set; }
        public DateTime? RequestDate { get; set; }
        public DateTime? RollOffStartDate { get; set; }
        public string OtherReasons { get; set; }
        public string Labour { get; set; }
        public string LeaveType { get; set; }
        public string OpsFlag { get; set; }
        public string SentBy { get; set; }
        public string SentTo { get; set; }

        [ForeignKey("GlobalGroupId")]
        public Employee Employees { get; set; }
        
    }
}
