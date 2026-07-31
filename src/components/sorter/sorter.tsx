import { useSearchParams } from "react-router-dom"
import { type UpdateTaskListProps } from "../../types/types";


export default function Sorter({updateTasks}: UpdateTaskListProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams);

    async function onChange(order: string) {
        setSearchParams((params) => {
            params.set("order",order);
            return params
        });
        updateTasks()
    };
    
    return(
        <select name="sorter" className="sorter" data-testid="sorter" 
                onChange={(e) => onChange(e.target.value)}>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="earliestCreationDate">Earliest Creation</option>
            <option value="latestCreationDate">Latest Creation</option>
        </select>
    )
};