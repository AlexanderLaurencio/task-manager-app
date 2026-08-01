import { useSearchParams } from "react-router-dom"
import { type UpdateTaskListProps } from "../../types/types";

export default function Filter({updateTasks}: UpdateTaskListProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    searchParams;

    async function onChange(filter: string) {
        setSearchParams((params) => {
            params.set("filter", filter)
            return params
        });
        updateTasks()
    };

    return(
        <select data-testid="taskFilter" className="filter" 
                onChange={(e) => onChange(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="inProgress">In progress</option>
        </select>
    )
};