import "./stats.modules.css"
import { type HeaderProps } from "../header/header"

export default function Stats({stats, StatsDataTestId}: HeaderProps) {
    return(
        <div className="stats" data-testid={StatsDataTestId}>
            <span className="stat-completed">Completed: {!stats.completed ? 0 : stats.completed}</span>
            <span className="stat-pending">Pending: {!stats.pending ? 0 : stats.pending}</span>
            <span className="stat-inProgress">In progress: {!stats.inProgress ? 0 : stats.inProgress}</span>
            <span className="stat-totalTasks">Total tasks: {!stats.totalTasks ? 0 : stats.totalTasks}</span>
        </div>
    )
};