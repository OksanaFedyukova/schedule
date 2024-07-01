
import { db } from '../config';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore/lite';

export const getTasks = async () => {
  try {
    const tasksCol = collection(db, 'tasks');
    const tasksSnapshot = await getDocs(tasksCol);
    const tasksList = tasksSnapshot.docs.map(doc => doc.data());
    return tasksList;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

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

export const updateTask = async (taskId, updatedTaskData) => {
  try {
    const taskDocRef = doc(db, 'tasks', taskId);
    await updateDoc(taskDocRef, updatedTaskData);
    console.log('Document successfully updated!');
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const taskDocRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskDocRef);
    console.log('Document successfully deleted!');
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
