import Task from "../task/task";
import "./taskList.modules.css"
import { type TaskPropsExtended } from "../../types/types";
import { NavigationLowerBar } from "../navigationLowerBar/navigationLowerBar";

interface TaskListProps {
    tasks: TaskPropsExtended[],
    onDeleteTask: (task_id: number) => void,
    onUpdateTask: ({task_id, task_title, task_description, task_status, task_priority, task_due_date}: TaskPropsExtended) => void
    totalTasks: number,
    rowsNumber: number,
    updateTaskList: () => void
}

export default function TaskList({ tasks, onDeleteTask, onUpdateTask, totalTasks, rowsNumber, updateTaskList }: TaskListProps) {
    return (
        <>
            <div className="taskList_wrapper">
                <main className="taskList">
                    {tasks.length === 0 
                    ? <span className="taskList_loading">Not Found</span>
                    : <>
                        {tasks.map(t =>
                        <Task key={t.task_id} task={t} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask}/>
                        )}
                    </>}
                </main>
                <NavigationLowerBar rowsNumber={rowsNumber} totalTasks={totalTasks} updateTaskList={updateTaskList}/>
            </div>
        </>
    )
};

