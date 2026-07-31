import { type TaskPriority } from "../../types/types"

interface PriorityProps {
    onChange: (newPriority: TaskPriority) => void,
    defaultValue?: string
};

export default function PrioritySelector({onChange, defaultValue}: PriorityProps) {
    return(
        <select className="prioritySelector" id="prioritySelector" defaultValue={defaultValue} 
                data-testid="prioritySelector" onChange={(e) => onChange(e.target.value as TaskPriority)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
    )
};