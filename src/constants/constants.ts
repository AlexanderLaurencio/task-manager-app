import { type StatsProps } from "../types/types";

export const server = "https://task-manager-backend-p7ga.onrender.com/";

export const CONTENT_TYPE = {
    text: "text/plain",
    json: "application/json"
};

export const mockStatsProps: StatsProps = {
    completed: 100,
    pending: 20,
    inProgress: 20,
    totalTasks: 140
}