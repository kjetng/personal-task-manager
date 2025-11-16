using TaskApi.Models;

namespace TaskApi.Dto;

public class TaskDto
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public DateTime? DueDate { get; set; }
  public TaskItemStatus Status { get; set; }
}