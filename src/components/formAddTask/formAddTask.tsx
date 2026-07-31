import StatusSelector from "../statusSelector/statusSelector"
import PrioritySelector from "../prioritySelector/prioritySelector";
import "./formAddTask.modules.css"
import Button from "../button/button";
import React, { useState } from "react";
import { isBeforeToday } from "../../utils/date/date";
import { createTask } from "../../services/db/db";
import type { TaskPriority, TaskStatus } from "../../types/types";

interface FormAddTaskProps {
    onShow: () => void,
    refreshTasksList: () => void
};

export const errorMessage = {
    noError: "No error",
    fieldEmpty: "One of the fields is empty",
    dateIncorrect: "Due date is before today",
    server: "Server internal error"
};

export default function FormAddTask({onShow, refreshTasksList}: FormAddTaskProps) {
    let [taskTitle, setTaskTile] = useState<string>();
    let [taskDescription, setTaskdescription] = useState<string>("Not defined");
    let [taskStatus, setTaskStatus] = useState<TaskStatus>("pending");
    let [taskPriority, setTaskPriority] = useState<TaskPriority>("medium");
    let [taskDueDate, setTaskDueDate] = useState<string | undefined>(undefined);

    let [isError, setIsError] = useState({isError: false, messagge: errorMessage.noError})

    function onClose(e: React.MouseEvent) {
        e.preventDefault();
        onShow()
    };

    function onSetTitle(title: string) {
        setTaskTile(title);
    };

    function onSetDescription(description: string) {
        setTaskdescription(description);
    };

    function onSetStatus(status: TaskStatus) {
        setTaskStatus(status);
    };

    function onSetPriority(priority: TaskPriority) {
        setTaskPriority(priority);
    };

    function onSetDueDate(date: string) {
        setIsError({isError: false, messagge: errorMessage.noError})
        setTaskDueDate(date);
    };

    async function onSendTask(e: React.MouseEvent) {
        e.preventDefault();

        if (taskDueDate !== undefined) {
            if (isBeforeToday(taskDueDate)) {
                setIsError({isError: true, messagge: errorMessage.dateIncorrect})
                return 
            }
        }

        if (!taskTitle || taskDueDate === undefined) {
            setIsError({isError: true, messagge: errorMessage.fieldEmpty})
            return
        }
        
        setIsError({isError: false, messagge: errorMessage.noError})
        
        try {
            await createTask({
                task_title: taskTitle, task_description: taskDescription, 
                task_priority: taskPriority, task_status: taskStatus, task_due_date: taskDueDate
            });


        } catch(error) {
            console.error(error);
            setIsError({isError: true, messagge: `${error}`});

        } finally {

            if (!isError.isError) {
                refreshTasksList()
                onShow()
            }

        }
    };

    return(
        <dialog className="modal_formAddTask" data-testid="modalFormAddTask">
            <form className="formAddTask">

                <label htmlFor="input_taskTitle" className="label_formAddTask labelTitle">
                    Title
                    <input data-testid="inputTaskTitle" type="text" className="input_taskTitle" onChange={(e) => onSetTitle(e.target.value)} 
                     id="input_taskTitle" placeholder="Write a title"/>
                </label>

                 <label htmlFor="input_taskDescription" className="label_formAddTask labelDescription">
                    Description (optional)
                    <input type="text" className="input_taskDescription"  
                    onChange={(e) => onSetDescription(e.target.value)}
                    id="input_taskDescription" placeholder="Write a description"/>
                </label>

                <label htmlFor="inputDueDate_formAddTask" className="label_formAddTask labelDueDate">
                    Due date
                    <input type="date" data-testid="inputDueDateForm" id="inputDueDate_formAddTask" 
                    onChange={(e) => onSetDueDate(e.target.value)}/>
                </label>

                <label htmlFor="statusSelector" className="label_formAddTask labelStatusSelector">
                    Status
                    <StatusSelector onChange={onSetStatus} defaultValue={taskStatus}/>
                </label>

                <label htmlFor="prioritySelector" className="label_formAddTask labelPrioritySelector">
                    Priority
                    <PrioritySelector onChange={onSetPriority} defaultValue={taskPriority}/>
                </label>

                {isError.isError && <span className="error">{isError.messagge}</span>}

                <Button onClick={(e: React.MouseEvent) => onClose(e)} dataTestId="buttonCloseFormAddTask" 
                className="button_cancelFormAddTask">Cancel</Button>

                <Button onClick={(e: React.MouseEvent) => onSendTask(e)} dataTestId="buttonSendFormAddTask" 
                className="button_saveFormAddTask">Save</Button>
            </form>
        </dialog>
    )
};