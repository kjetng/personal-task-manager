using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TaskApi.Dto;
using TaskApi.Models;
using TaskApi.Services;

namespace TaskApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
  private readonly ITaskService _service;
  private readonly IMapper _mapper;

  public TasksController(ITaskService service, IMapper mapper)
  {
    _service = service;
    _mapper = mapper;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<TaskDto>>> GetAll([FromQuery] string? statusFilter)
  {
    var tasks = await _service.GetAllAsync(statusFilter);
    var taskDtos = _mapper.Map<IEnumerable<TaskDto>>(tasks);
    return Ok(taskDtos);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<TaskDto>> GetById(int id)
  {
    var task = await _service.GetByIdAsync(id);
    if (task == null) return NotFound();
    var taskDto = _mapper.Map<TaskDto>(task);
    return Ok(taskDto);
  }

  [HttpPost]
  public async Task<ActionResult<TaskDto>> Create(CreateTaskDto createDto)
  {
    var task = _mapper.Map<TaskItem>(createDto);
    var newTask = await _service.AddAsync(task);
    var newTaskDto = _mapper.Map<TaskDto>(newTask);
    return CreatedAtAction(nameof(GetById), new { id = newTaskDto.Id }, newTaskDto);
  }

  [HttpPut("{id}")]
  public async Task<ActionResult<TaskDto>> Update(int id, UpdateTaskDto updateDto)
  {
    // print updateDto to console for debugging
    Console.WriteLine($"UpdateTaskDto: Name={updateDto.Name}, DueDate={updateDto.DueDate}, Status={updateDto.Status}");
    var task = _mapper.Map<TaskItem>(updateDto);
    task.Id = id;
    var updated = await _service.UpdateAsync(id, task);
    if (updated == null) return NotFound();
    var updatedDto = _mapper.Map<TaskDto>(updated);
    return Ok(updatedDto);
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var deleted = await _service.DeleteAsync(id);
    if (!deleted) return NotFound();
    return NoContent();
  }
}