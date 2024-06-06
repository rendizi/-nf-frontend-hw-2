import React from 'react';
import TaskItem from '../TaskItem';

const TaskList = (props) => {
  // Render TaskItems using TaskItem component
  // Filter tasks by status here
  return (
      <>
          {props.filter === 'all' &&
props.tasks.map(item => (
          <TaskItem key={item.id} item={item} setTasks={props.setTasks} tasks={props.tasks} handleDeleteTask={props.handleDeleteTask} handleToggleTask={props.handleToggleTask}/>
        )) || props.filter === 'completed' &&
              props.tasks.map(item => (
                  item.completed === true &&           <TaskItem key={item.id} item={item} setTasks={props.setTasks} tasks={props.tasks} handleDeleteTask={props.handleDeleteTask} handleToggleTask={props.handleToggleTask}/>

              )) || props.tasks.map(item => (
                  item.completed === false &&          <TaskItem key={item.id} item={item} setTasks={props.setTasks} tasks={props.tasks} handleDeleteTask={props.handleDeleteTask} handleToggleTask={props.handleToggleTask}/>

              ))
          }
      </>
  );
};

export default TaskList;
