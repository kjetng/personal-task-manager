using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskApi.Models;

public enum TaskItemStatus { InProgress, Completed }

public class TaskItem
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public DateTime? DueDate { get; set; }
  public TaskItemStatus Status { get; set; } = TaskItemStatus.InProgress;
}