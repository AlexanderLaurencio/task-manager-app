import type { ErrorProps } from "../../components/error/error";
import { CONTENT_TYPE, server } from "../../constants/constants";
import { type TaskPropsExtended, type TaskProps } from "../../types/types";

export async function createTask({ task_title, task_description, task_status, task_priority, task_due_date }: TaskProps) {
    const requestBody = {
        task_title: task_title,
        task_description: task_description,
        task_status: task_status,
        task_priority: task_priority,
        task_due_date: task_due_date
    };
    try {

        let request = await fetch(server, {
            method: "POST",
            headers: {
                "Content-Type": CONTENT_TYPE.json
            },
            body: JSON.stringify(requestBody)
        });

        let response: ErrorProps = await request.json();

        if (!request.ok) {
            alert(response.message);
            throw new Error(`Message: ${response.message} StatusCode: ${response.statusCode}`)
        }

        return response

    } catch (error) {
        console.error("Error while creating task",error)
        return error
    }
};

export async function getTasks() {

    let url = new URLSearchParams(location.search);

    let pattern = !url.get("pattern") ? null : url.get("pattern");
    
    let filter = !url.get("filter") ? "all" : url.get("filter");

    let order = !url.get("order") ? "a-z" : url.get("order");

    let page = !url.get("page") ? "0" : url.get("page");

    let query = { pattern: pattern, filter: filter, order: order , page: page};

    console.log(query);

    try {

        let request = await fetch(server + location.search, {
            method: "GET",
            headers: {
                "Content-Type": CONTENT_TYPE.text
            },
        });
        
        let response = await request.json();

        if (!request.ok) {
            throw new Error(response)
        }
        
        return response

    } catch (error) {
        console.error("Error while getting all tasks", error)
        return error
    }
};

export async function deleteTask(task_id: number) {
    try {
        let request = await fetch(server + `/${task_id}`, {
            method: "DELETE",
        });

        let response = await request.text();

        if (!request.ok) {
            throw new Error(response) 
        }

    } catch(error) {
        console.error("Error while deleting task",error);
        return error
    }
};



export async function updateTask({task_id, task_title, task_description, task_status, task_priority, task_due_date }: TaskPropsExtended) {
    try {
        let request = await fetch(server, {
            method: "PUT",
            headers: {
                "Content-Type": CONTENT_TYPE.json
            },
            body: JSON.stringify({
                task_id: task_id,
                task_title: task_title,
                task_description: task_description,
                task_status: task_status,
                task_priority: task_priority,
                task_due_date: task_due_date
            })
        });

        let response = await request.text();

        if (!request.ok) {
            alert("Data incorrect");
            throw new Error(`${response}`)
        }

        return response

    } catch (error) {
        console.error("Error while creating task",error);
        return error
    }
};

