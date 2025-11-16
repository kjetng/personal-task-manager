using TaskApi.Models;

namespace TaskApi.Repositories;

public interface ITaskRepository
{
  Task<IEnumerable<TaskItem>> GetAllAsync(string? statusFilter = null);
  Task<TaskItem?> GetByIdAsync(int id);
  Task<TaskItem> AddAsync(TaskItem task);
  Task<TaskItem?> UpdateAsync(int id, TaskItem task);
  Task<bool> DeleteAsync(int id);
}