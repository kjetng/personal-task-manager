using TaskApi.Models;
using TaskApi.Repositories;
using TaskApi.Services;

namespace TaskApi.Services;

public class TaskService : ITaskService
{
  private readonly ITaskRepository _repository;

  public TaskService(ITaskRepository repository)
  {
    _repository = repository;
  }

  public async Task<IEnumerable<TaskItem>> GetAllAsync(string? statusFilter = null)
  {
    return await _repository.GetAllAsync(statusFilter);
  }

  public async Task<TaskItem?> GetByIdAsync(int id)
  {
    return await _repository.GetByIdAsync(id);
  }

  public async Task<TaskItem> AddAsync(TaskItem task)
  {
    return await _repository.AddAsync(task);
  }

  public async Task<TaskItem?> UpdateAsync(int id, TaskItem task)
  {
    return await _repository.UpdateAsync(id, task);
  }

  public async Task<bool> DeleteAsync(int id)
  {
    return await _repository.DeleteAsync(id);
  }
}