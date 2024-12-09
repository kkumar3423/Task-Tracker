# Task-Tracker

A simple and interactive task tracker application built with React. This app allows users to manage their tasks with various features, such as categorization, priority levels, due dates, and a drag-and-drop functionality for task reordering.

---

## Table of Contents

- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Setup and Installation](#setup-and-installation)  
- [Usage](#usage)  
- [Code](#Code)  
- [Contributing](#contributing)  
- [License](#license)

---

## **Features**

- **Add Tasks**: Create tasks with title, priority, due date, and category.
- **Task Management**: Mark tasks as completed, and delete them.
- **Drag-and-Drop**: Reorder tasks using drag-and-drop functionality.
- **Task Statistics**: View total and completed tasks with a progress bar.
- **Categorization**: Organize tasks by category (General, Work, Personal).
- **Responsive Design**: The application is fully responsive and works across different devices.

---

## **Technologies Used**

### Frontend
1. **React**: Used to build the user interface and manage the app's components.
2. **React DnD**: Used to enable drag-and-drop functionality for reordering tasks.
3. **HTML5 Drag-and-Drop API**: Provides the native browser support for drag-and-drop behavior.
4. **CSS**: Used for styling the app (layout, colors, fonts) and making it responsive on different devices.
5. **JavaScript (ES6+)**: Used for writing the app's logic, such as handling state changes and user interactions.

### Data Management
1. **React State**: Tasks and their details (like title, priority, etc.) are stored in React’s local state using the `useState` hook.
2. **No Database**: Data is not saved to an external database, so if the page is refreshed, the data is lost.

---


### **Installation Steps**

To get started with this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/task-tracker.git
    ```

2. Navigate into the project directory:
    ```bash
    cd task-tracker
    ```

3. Install the necessary dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm start
    ```

5. Open your browser and go to `http://localhost:3000` to see the app in action.

---

![Screenshot (138)](https://github.com/user-attachments/assets/2ed21947-eeec-4ebe-a883-aa069da36517)


---

## **Usage**

Once the application is running, you can:

- **Add a Task**: Fill out the form with a title, priority, due date, and category, then click the "Add Task" button.
- **Manage Tasks**: Click on a task to toggle its completion status. You can also delete tasks by clicking the "Delete" button.
- **Reorder Tasks**: Use the drag-and-drop feature to reorder tasks.
- **View Statistics**: The task tracker will display the total number of tasks and how many are completed.
 
---

## **Code**

Here is an overview of the main components:

### TaskItem Component

This component renders individual tasks and allows interaction like marking as completed, deleting, and dragging.

```jsx
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
      <button onClick={(e) => { e.stopPropagation(); onDelete(); }}>Delete</button>
    </div>
  );
}
```

### App Component

This is the main component where tasks are managed and rendered.

```jsx
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
```

Certainly! Here's the **Setup and Installation** section formatted in the syntax for your README file:

---

### Setup and Installation

To get started with this project, follow the steps below to set it up on your local machine.

#### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v14.x or later)
- **npm** (comes with Node.js)

#### Steps

1. **Clone the Repository**  
   First, clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/yourusername/your-project-name.git
   ```

2. **Navigate to the Project Folder**  
   Move into the project directory:

   ```bash
   cd your-project-name
   ```

3. **Install Dependencies**  
   Install the required dependencies using npm:

   ```bash
   npm install
   ```

4. **Run the Application**  
   Start the development server:

   ```bash
   npm start
   ```

   The app should now be running at [http://localhost:3000](http://localhost:3000).

5. **Open the App in Your Browser**  
   Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the application.

---

## **Contributing**  

Certainly! Here's a **Contributing** section that you can include in your README file:

---

### Contributing

We welcome contributions to this project! If you would like to contribute, please follow these steps:

#### How to Contribute

1. **Fork the Repository**  
   Start by forking the repository to your own GitHub account:
   
   - Go to the repository page on GitHub.
   - Click on the **Fork** button at the top-right of the page.

2. **Clone Your Fork**  
   Clone the forked repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/your-forked-repo.git
   ```

3. **Create a New Branch**  
   It's best practice to create a new branch for your feature or fix:

   ```bash
   git checkout -b your-feature-branch
   ```

4. **Make Your Changes**  
   Make the necessary changes or improvements. Ensure that your code adheres to the project's coding style and best practices.

5. **Commit Your Changes**  
   After making the changes, commit them with a clear and concise commit message:

   ```bash
   git add .
   git commit -m "Add your commit message"
   ```

6. **Push Your Changes**  
   Push your changes to your forked repository:

   ```bash
   git push origin your-feature-branch
   ```

7. **Create a Pull Request**  
   Go to the original repository and create a pull request (PR) from your branch. Describe the changes you have made and why they are necessary.

---

## **Credits**

- This project is an enhancement of the Task Tracker app from the OCUFrontendWebDev repository.
- I leveraged ChatGPT to assist with code modifications and to improve the documentation.

---

## **License**

This project is licensed under the MIT License - see the [License](License) file for details.


