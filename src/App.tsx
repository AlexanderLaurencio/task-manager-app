import { useState, useEffect } from "react";
import Header from "./components/header/header"
import FormAddTask from "./components/formAddTask/formAddTask";
import Stats from "./components/stats/stats";
import type { StatsProps, TaskPropsExtended } from "./types/types";
import TaskList from "./components/taskList/taskList";
import { Error } from "./components/error/error";
import { deleteTask, getTasks, updateTask } from "./services/db/db";
import { type ErrorProps } from "./components/error/error";

export interface ResponseBody {
  tasks: TaskPropsExtended[],
  stats: StatsProps,
  totalTasks: number,
  rowsNumber: number
};

function App() {
  const [data, setData] = useState<ResponseBody>({tasks: [], stats: {completed: 0, inProgress: 0, pending: 0, totalTasks: 0}, totalTasks: 0, rowsNumber: 0});
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<ErrorProps>({ isError: false, message: undefined, statusCode: 0 });

  useEffect(() => {

    showTasks();

  }, []);

  function onShowForm() {
    setShowForm(!showForm)
  };

  async function showTasks() {
    try {
      
      const response = await getTasks() as ResponseBody;

      response.stats.totalTasks = response.totalTasks;

      setData({...response});   

    } catch (error) {
          console.error(error);
          setError(error as ErrorProps)
    }
  }

  async function onDeleteTask(task_id: number) {
    try {

      await deleteTask(task_id);

      showTasks();
    
    } catch(error) {

      console.error(error);
      setError(error as ErrorProps)

    }
  }

  async function onUpdateTask({task_id, task_title, task_description, task_status, task_priority, task_due_date}: TaskPropsExtended) {
    
    try {

      await updateTask({task_id, task_title, task_description, task_status, task_priority, task_due_date});

      showTasks()

    } catch(error) {

      console.log("Error while updating task",error)

    }
  };

  return (

    <>
      <Header onAddTask={onShowForm} updateTasks={showTasks} stats={data.stats} StatsDataTestId="floatingStatsMenu" />

      {showForm && <FormAddTask onShow={onShowForm} refreshTasksList={showTasks} />}

      <Stats stats={data.stats} StatsDataTestId="SideStatsMenu" />

      {error.isError
        ? <Error message={error.message} statusCode={error.statusCode} />
        : <TaskList updateTaskList={showTasks} rowsNumber={data.rowsNumber} totalTasks={data.totalTasks} tasks={data.tasks} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask}/>}

    </>
  )
}

export default App
