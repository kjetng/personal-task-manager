using AutoMapper;
using TaskApi.Dto;
using TaskApi.Models;

namespace TaskApi.Profiles;

public class TaskMappingProfile : Profile
{
  public TaskMappingProfile()
  {
    // Entity <-> DTO
    CreateMap<TaskItem, TaskDto>();
    CreateMap<CreateTaskDto, TaskItem>()
        .ForMember(dest => dest.Status, opt => opt.MapFrom(src => TaskItemStatus.InProgress));  // Default for new tasks
    CreateMap<UpdateTaskDto, TaskItem>();
  }
}