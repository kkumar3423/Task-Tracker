import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './style.css';

function AddTaskForm({ onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    priority: 'Medium',
    dueDate: '',
    category: 'General',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }
    onAdd(formData);
    setFormData({
      title: '',
      priority: 'Medium',
      dueDate: '',
      category: 'General',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <div className="form-group">
        <label htmlFor="title">
          Task Title: <span className="required">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="priority">Priority Level:</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="dueDate">Due Date:</label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
}

function TaskItem({ task, index, moveTask, onToggle, onDelete }) {
  const categoryClass = `category-${task.category.toLowerCase()}`;

  const [, ref] = useDrag({
    type: 'TASK',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'TASK',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      className={`task-item ${task.completed ? 'completed' : ''} ${categoryClass}`}
      onClick={onToggle}
    >
      <h3>{task.title}</h3>
      <p>Priority: {task.priority}</p>
      {task.dueDate && <p>Due Date: {task.dueDate}</p>}
      <p className="category">Category: {task.category}</p>
      <button onClick={(e) => { e.stopPropagation(); onDelete(); }}>
        Delete
      </button>
    </div>
  );
}

function Statistics({ totalTasks, completedTasks }) {
  return (
    <div className="statistics">
      <h2>Statistics</h2>
      <p>Total Tasks: {totalTasks}</p>
      <p>Completed Tasks: {completedTasks}</p>
    </div>
  );
}

export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    const newTask = { ...task, id: tasks.length + 1, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const moveTask = (fromIndex, toIndex) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <h1>Task Tracker</h1>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <Statistics totalTasks={totalTasks} completedTasks={completedTasks} />
        <AddTaskForm onAdd={addTask} />
        <div className="task-list">
          {tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              index={index}
              task={task}
              moveTask={moveTask}
              onToggle={() => toggleTask(task.id)}
              onDelete={() => deleteTask(task.id)}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}
