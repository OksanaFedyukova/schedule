import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '@/firebase/data/tasks';

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState({ title: '', duration: '' });
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksList = await getTasks();
        setTasks(tasksList);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
      setMessage({ type: 'success', content: 'Task deleted successfully.' });
    } catch (error) {
      console.error('Error deleting task:', error);
      setMessage({ type: 'error', content: `Error, ${error.mesaage}` });
    }
  };

  const handleEdit = (task) => {
    setEditMode(true);
    setEditTaskId(task.id);
    setNewTask({ title: task.title, duration: task.duration });
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode && editTaskId) {
        await updateTask(editTaskId, newTask);
        setTasks(tasks.map(task => task.id === editTaskId ? { id: editTaskId, ...newTask } : task));
        setMessage({ type: 'success', content: 'Task updated successfully.' });
      } else {
        const newTaskId = await createTask(newTask);
        setTasks([...tasks, { id: newTaskId, ...newTask }]);
        setMessage({ type: 'success', content: 'New task created successfully.' });
      }
      setNewTask({ title: '', duration: '' });
      setShowForm(false);
      setEditMode(false);
      setEditTaskId(null);
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', content: `Error, ${error.mesaage}` });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }


  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Tasks List</h2>

      {message && (
        <div className={`p-4 mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>
          {message.content}
        </div>
      )}

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded"
        onClick={() => {
          setShowForm(!showForm);
          setEditMode(false);
          setEditTaskId(null);
          setNewTask({ title: '', duration: '' });
        }}
      >
        {showForm ? 'Cancel' : 'Create New Task'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex mb-4">

            <div className="w-1/2 mr-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newTask.title}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="w-1/2 ml-2">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                Duration
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={newTask.duration}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {editMode ? 'Update Task' : 'Create Task'}
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{task.id}</td>

                <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{task.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TasksList;
