export interface StatsProps {
    totalTasks: number,
    completed: number,
    pending: number,
    inProgress: number ,
    StatsDataTestId?: string,
}; 

export interface TaskProps{
  task_title: string,
  task_description: string,
  task_status: TaskStatus,
  task_priority: TaskPriority,
  task_due_date: string,
};

export interface TaskPropsExtended extends TaskProps {
  task_id: number, 
  task_creation_date?: string
}

export interface UpdateTaskListProps {
    updateTasks: () => void
}
export type TaskStatus = "completed" | "pending" | "inProgress";

export type TaskPriority = "low" | "medium" | "high"
