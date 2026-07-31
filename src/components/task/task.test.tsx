import { render, screen, waitFor } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Task from './task';
import userEvent from '@testing-library/user-event';
import type { TaskPriority, TaskStatus } from '../../types/types';



const mockTask = {
      task: {
        task_id: 1,
        task_title: "Complete React project",
        task_description: "Finish the task manager UI and connect the components.",
        task_status: "in progress" as TaskStatus,
        task_priority: "high" as TaskPriority,
        task_due_date: "07-30-2026",
        task_creation_date: "07-20-2026",
      }
}

test("task must appear in the screen",async () => {
    const user = userEvent.setup();
    const mockFunction = vi.fn();
    render(<Task task={mockTask.task} onUpdateTask={mockFunction} onDeleteTask={mockFunction}/>)
    screen.debug();

    expect(screen.getByTestId("task")).toBeInTheDocument();

    //When the user clicks buttonEditTask (to edit a task)
    await user.click(screen.getByTestId("buttonEditTask"));

    //All these elements should appear in the document
    expect(await screen.findByTestId("inputEditTaskTitle")).toBeInTheDocument();
    expect(await screen.findByTestId("inputEditTaskDescription")).toBeInTheDocument();
    expect(await screen.findByTestId("prioritySelector")).toBeInTheDocument();
    expect(await screen.findByTestId("statusSelector")).toBeInTheDocument();

    //When the user clicks buttonSetTaskChanges all these elements mustn't appear
    //in the document

    await user.click(screen.getByTestId("buttonSetTaskChanges"));

    waitFor(() => {
      expect(screen.queryByTestId("inputEditTaskTitle")).not.toBeInTheDocument();
      expect(screen.queryByTestId("inputEditTaskDescription")).not.toBeInTheDocument();
      expect(screen.queryByTestId("prioritySelector")).not.toBeInTheDocument();
      expect(screen.queryByTestId("statusSelector")).not.toBeInTheDocument();
    })

  
    await user.click(screen.getByTestId("buttonRemoveTask"));
    expect(mockFunction).toHaveBeenCalledOnce();

    mockFunction.mockClear()
});