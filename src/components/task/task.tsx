import { type TaskStatus, type TaskPriority } from "../../types/types.ts";
import StatusSelector from "../statusSelector/statusSelector";
import PrioritySelector from "../prioritySelector/prioritySelector";
import Button from "../button/button";
import editIcon from "../../assets/icons/edit.svg"
import saveicon from "../../assets/icons/save.svg"
import trashIcon from "../../assets/icons/trash.svg"
import "./task.modules.css"
import { useState } from "react";
import { type TaskPropsExtended } from "../../types/types.ts";
import { isBeforeToday } from "../../utils/date/date.ts";

interface ComponentTaskProps {
    task: TaskPropsExtended,
    onDeleteTask: (task_id: number) => void,
    onUpdateTask: ({task_id, task_title, task_description, task_status, task_priority, task_due_date}: TaskPropsExtended) => void
}

export default function Task( {task, onDeleteTask, onUpdateTask}: ComponentTaskProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.task_title);
    const [description, setDescription] = useState(task.task_description);
    const [status, setStatus] = useState<TaskStatus>(task.task_status);
    const [priority, setPriority] = useState<TaskPriority>(task.task_priority);
    const [dueDate, setDueDate] = useState(task.task_due_date);
    
    function changeIsEditing() {
        setIsEditing(!isEditing)
    }

    function saveChanges() {

        if (!Number(task.task_id) || !title || !description || !status || !priority || !dueDate) {
            console.log("One of the fields is empty or contains invalid values");
            return
        }

        if (isBeforeToday(dueDate)) {
            console.log("Due Date is before today");
            return
        }

        let updatedTask: TaskPropsExtended = {
            task_id: task.task_id, task_title: title.trim(), 
            task_description: description.trim(), task_status: status,
            task_priority: priority, task_due_date: dueDate.trim()
        };
        
        changeIsEditing()
        onUpdateTask(updatedTask)
    }
    return (
        <article className="task" data-testid="task">

            {isEditing
                ? <input type="text" className="task_inputTitle" placeholder="Type the new title"
                    data-testid="inputEditTaskTitle" defaultValue={task.task_title} name="title"
                    onChange={(e) => setTitle(e.target.value)}/>

                : <h3 className="task_title">{task.task_title}</h3>
            }

            {isEditing
                ? <input type="date" onChange={(e) => setDueDate(e.target.value)} 
                    defaultValue={task.task_due_date} name="date"/>
                : <span className="task_dueDate">{task.task_due_date}</span>
            }

            {isEditing
                ? <input type="text" className="task_inputDescription" placeholder="Type the new description"
                    data-testid="inputEditTaskDescription" defaultValue={task.task_description} name="description"
                    onChange={(e) => setDescription(e.target.value)}/>

                : <p className="task_description">{task.task_description}</p>
            }

            {isEditing
                ? <>
                    <StatusSelector onChange={setStatus} defaultValue={task.task_status} />
                    <PrioritySelector onChange={setPriority} defaultValue={task.task_priority} />
                  </>

                : <>
                    <span className="task_status">{task.task_status}</span>
                    <span className="task_priority">{task.task_priority}</span>
                  </>
            }            

            <span className="task_creationDate">{task.task_creation_date}</span> 


            <div className="task_buttonsContainer">

                {isEditing
                    ? <Button onClick={saveChanges} dataTestId="buttonSetTaskChanges" className="button_editTask">
                        <img src={saveicon} alt="save" />
                      </Button>

                    : <Button onClick={changeIsEditing} className="button_editTask" dataTestId="buttonEditTask">
                        <img src={editIcon} alt="pencil" />
                      </Button>
                }

                    <Button dataTestId="buttonRemoveTask" className="button_removeTask" onClick={() => onDeleteTask(task.task_id as number)}>
                        <img src={trashIcon} alt="trash" />
                    </Button>
            </div>
        </article>
    )
};