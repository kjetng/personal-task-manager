using System.ComponentModel.DataAnnotations;
using TaskApi.Models;

namespace TaskApi.Dto;

public class UpdateTaskDto
{
  [Required(ErrorMessage = "Name is required")]
  [StringLength(200, ErrorMessage = "Name cannot exceed 200 characters")]
  public string Name { get; set; } = string.Empty;

  public DateTime? DueDate { get; set; }

  [Required(ErrorMessage = "Status is required")]
  public TaskItemStatus Status { get; set; }
}