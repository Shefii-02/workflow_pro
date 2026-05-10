<?php

namespace App\DTOs;

class TaskDTO
{
    public function __construct(
        public string $project_id,
        public ?string $parent_task_id,
        public ?string $assigned_to,
        public string $title,
        public ?string $description,
        public ?string $status,
        public ?string $priority,
        public ?string $due_date,
        public ?float $estimated_hours,
        public ?bool $is_milestone,
    ) {}

    public static function fromRequest($request): self
    {
        return new self(
            project_id: $request->project_id,
            parent_task_id: $request->parent_task_id,
            assigned_to: $request->assigned_to,
            title: $request->title,
            description: $request->description,
            status: $request->status ?? 'todo',
            priority: $request->priority ?? 'medium',
            due_date: $request->due_date,
            estimated_hours: $request->estimated_hours,
            is_milestone: $request->is_milestone ?? false,
        );
    }
}
