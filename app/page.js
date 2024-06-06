'use client'
import Image from 'next/image';
import React  from "react";
import TaskList from "@/app/components/TaskList";

const task = {id: 1, text: "Todo Test", completed: false}

export default function Home() {
  const [tasks, setTasks] = React.useState(() => {
        try {
            const stored = JSON.parse(localStorage.getItem("tasks"));
            return stored ? stored : [];
        } catch (error) {
            console.log("Failed to parse tasks from localStorage:", error);
            return [];
        }
    });

    React.useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem("tasks"));
            if (stored) {
                setTasks(stored);
            }
        } catch (error) {
            console.log("Failed to parse tasks from localStorage:", error);
        }
    }, []);

    React.useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);
// rewrite using states
  const [filter, setFilter] = React.useState('all'); // rewrite using states
  const [taskText, setTaskText] = React.useState('')



    const handleToggleTask = (Id) => {
        setTasks(tasks.map(task => task.id == Id
            ? {...task, completed: !task.completed}
            : task))

    };

    const handleDeleteTask = (index) => {
        setTasks(oldVals => {
            return oldVals.filter((_,i) => i !== index)
        })
    };


  const handleAddTask = () => {
    const task = { id: tasks.length, text: taskText, completed: false };
    setTasks([...tasks, task]);
    setTaskText('')
  };

  const handleClearCompleted = () => {
      setTasks(prev => prev.filter(task => !task.completed))
  }



  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
        
      </div>
      <div className="mb-4 flex items-center">
        <input
            type="text"
            className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
            placeholder="What to do?"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
        />
        <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">
       <TaskList tasks={tasks} setTasks={setTasks} filter={filter} handleToggleTask={handleToggleTask} handleDeleteTask={handleDeleteTask}/>
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span> {tasks.filter(task => !task.completed).length} items left</span> {/* show how many uncompleted items left */}
          <div>
            <button onClick={() => setFilter('all')} className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>All
            </button>
            <button onClick={() => setFilter('active')}
                    className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}>Active
            </button>
            <button onClick={() => setFilter('completed')}
                    className={`${filter === 'completed' ? 'text-white' : ''}`}>Completed
            </button>
          </div>
          <button
              onClick={() => handleClearCompleted()}
              className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
