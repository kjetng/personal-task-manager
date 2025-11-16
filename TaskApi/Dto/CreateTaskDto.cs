using System.ComponentModel.DataAnnotations;

namespace TaskApi.Dto;

public class CreateTaskDto
{
  [Required(ErrorMessage = "Name is required")]
  [StringLength(200, ErrorMessage = "Name cannot exceed 200 characters")]
  public string Name { get; set; } = string.Empty;

  public DateTime? DueDate { get; set; }
}