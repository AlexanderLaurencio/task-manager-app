import type { TaskStatus } from "../../types/types"

interface StatusProps {
    onChange: (newTitle: TaskStatus) => void,
    defaultValue?: string
};

export default function StatusSelector({onChange, defaultValue}: StatusProps) {
    return(
        <select name="status" id="statusSelector" defaultValue={defaultValue}
        data-testid="statusSelector" className="statusSelector" 
        onChange={(e) => onChange(e.target.value as TaskStatus)}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="inProgress">In progress</option>
        </select>
    )
};