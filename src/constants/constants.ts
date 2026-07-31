import { type StatsProps } from "../types/types";

export const server = "http://127.0.0.1:5000/tasks";

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