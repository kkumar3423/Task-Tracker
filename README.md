# Task-Tracker
Task Tracker is a comprehensive and intuitive application designed to enhance productivity by streamlining task management. With advanced features like persistent storage, advanced filtering and sorting, and a calendar view, it caters to both individual users and teams.

## Table of Contents

- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Setup and Installation](#setup-and-installation)  
- [Usage](#usage)  
- [Code](#Code)  
- [Challenges and Solutions](#challenges-and-solutions)  
- [Contributing](#contributing)  
- [License](#license)

---

## **Features**

### **1. Progress Bar**
- It shows the task progress that how far the tasks are completed.

### **2. Categories and Sorting**
- Users can filter tasks by:
  - Priority (High, Medium, Low)  
  - Status (Completed, Pending)  
  - Due Dates (Upcoming, Overdue)  
- Sort tasks by creation date, due date, or priority.
### **3. Delete**
- If task is finished.Users can delete using delete option.
### **4. Drag and Drop**  
- Supports drag-and-drop task rescheduling.  
- Striks off the completed task and shows overdue tasks.

### **4. User-Friendly Interface**
- A modern, responsive design ensures seamless use on desktops and mobile devices.  
- Dark mode and light mode support.

---

## **Technologies Used**

### **Frontend**
- **React.js**: For building the interactive user interface.  
- **Tailwind CSS**: For styling and layout.
- **React-dnd**: for building Drag and drop tasks.  

### **Backend**
- **Node.js**: For server-side logic.  
- **Express.js**: For building RESTful APIs.
 
## **Setup and Installation**

### **Prerequisites**
- Node.js (v14+)
- MongoDB installed locally or access to MongoDB Atlas
- Git for version control

### **Installation Steps**

1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/task-tracker.git
   cd task-tracker
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Navigate to the source folder and install dependencies:  
   ```bash
   cd source
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `server` directory.
   - Add the following:  
     ```env
     DB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

5. Start the backend server:  
   ```bash
   npm install react-calendar
   ```

6. Start the frontend:  
   ```bash
   npm start
   ```

7. Open the application in your browser at:  
   `http://localhost:3000`

---

## **Usage**

### **1. Creating Tasks**
- Add tasks by providing a title, description, due date, and priority.

### **2. Viewing Tasks**
- View all tasks on the dashboard.

### **3. Editing/Deleting Tasks**
- Update task details or delete tasks directly from the interface.

### **4. Filtering and Sorting**
- Use filters to narrow down tasks based on priority, status, or due dates.

### **5. Drag and Drop tasks**
- Drag and drop tasks to reschedule them.
### **6. Progress Bar**
- Shows the progress of tasks 

---

## **code**

### 1. **Calendar Integration**  
This snippet integrates a calendar view, allowing users to view tasks by date.

### 2. **Adding Tasks**  
This snippet provides adding tasks for priority, status, and search, with real-time updates.
''jsx
import React, { useState, useCallback, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './style.css';

function AddTaskForm({ onAdd, categories }) {
  const [formData, setFormData] = useState({
    title: '',
    priority: 'Medium',
    dueDate: '',
    category: categories[0]
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
      category: categories[0]
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
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
}

  


## **Contributing**  

To contribute:
1. Fork the repository.  
2. Create a new branch (`git checkout -b feature-name`).  
3. Make your changes and commit (`git commit -m "Add feature"`)  
4. Push to your branch (`git push origin feature-name`).  
5. Open a pull request.

## **Credits**

- This project is an extension of OCUFrontendWebDev repo's Task Tracker app.
- I used the Chatgpt for implementing some changes in the code and the Documentation.
