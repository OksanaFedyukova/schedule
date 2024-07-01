import { db } from '../config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore/lite';

// Obtener tareas
export const getTasks = async () => {
  try {
    const tasksCol = collection(db, 'tasks');
    const tasksSnapshot = await getDocs(tasksCol);
    const tasksList = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return tasksList;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Crear tarea
export const createTask = async (newTaskData) => {
  try {
    const tasksCol = collection(db, 'tasks');
    const docRef = await addDoc(tasksCol, newTaskData);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

// Actualizar tarea
export const updateTask = async (taskId, updatedTask) => {
  try {
    const taskDoc = doc(db, 'tasks', taskId);
    await updateDoc(taskDoc, updatedTask);
    return taskDoc;

  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Eliminar tarea
export const deleteTask = async (taskId) => {
  try {
    const taskDoc = doc(db, 'tasks', taskId);
    await deleteDoc(taskDoc);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
