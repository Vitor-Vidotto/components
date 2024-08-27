import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const updateTodo = async (docId, updatedData) => {
  try {
    const todoRef = doc(db, "todo", docId);
    await updateDoc(todoRef, updatedData);
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

const addTodo = async ({ userId, title, description, status, city, company, displayDate, executionDate, color, observation }) => {
  try {
    await addDoc(collection(db, "todo"), {
      user: userId,
      title: title,
      description: description,
      status: status,
      city: city, // Inclui o campo cidade
      company: company, // Inclui o campo empresa
      displayDate: displayDate, // Inclui o campo Data de Exibição
      executionDate: executionDate, // Inclui o campo Data de Realização
      color: color,
      observation: observation,
      createdAt: new Date().getTime(),
    });
  } catch (err) {}
};

const toggleTodoStatus = async ({ docId, status }) => {
  try {
    const todoRef = doc(db, "todo", docId);
    await updateDoc(todoRef, {
      status,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteTodo = async (docId) => {
  try {
    const todoRef = doc(db, "todo", docId);
    await deleteDoc(todoRef);
  } catch (err) {
    console.log(err);
  }
};

export { addTodo, toggleTodoStatus, deleteTodo, updateTodo };
