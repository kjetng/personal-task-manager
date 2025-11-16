using Microsoft.EntityFrameworkCore;
using TaskApi.Data;
using TaskApi.Models;
using TaskApi.Repositories;

namespace TaskApi.Repositories;

public class TaskRepository : ITaskRepository
{
  private readonly AppDbContext _context;

  public TaskRepository(AppDbContext context)
  {
    _context = context;
  }

  public async Task<IEnumerable<TaskItem>> GetAllAsync(string? statusFilter = null)
  {
    var query = _context.Tasks.AsQueryable();
    if (!string.IsNullOrEmpty(statusFilter))
    {
      if (Enum.TryParse<TaskItemStatus>(statusFilter, out var status))
      {
        query = query.Where(t => t.Status == status);
      }
    }
    return await query.ToListAsync();
  }

  public async Task<TaskItem?> GetByIdAsync(int id)
  {
    return await _context.Tasks.FindAsync(id);
  }

  public async Task<TaskItem> AddAsync(TaskItem task)
  {
    _context.Tasks.Add(task);
    await _context.SaveChangesAsync();
    return task;
  }

  public async Task<TaskItem?> UpdateAsync(int id, TaskItem task)
  {
    var existing = await GetByIdAsync(id);
    if (existing == null) return null;

    existing.Name = task.Name;
    existing.DueDate = task.DueDate;
    existing.Status = task.Status;

    await _context.SaveChangesAsync();
    return existing;
  }

  public async Task<bool> DeleteAsync(int id)
  {
    var task = await GetByIdAsync(id);
    if (task == null) return false;

    _context.Tasks.Remove(task);
    await _context.SaveChangesAsync();
    return true;
  }
}