import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const TodoContext = createContext();

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/todos');
      setTodos(response.data);
    } catch (error) {
      setError('Failed to fetch todos');
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todoData) => {
    try {
      const response = await api.post('/todos', todoData);
      setTodos(prevTodos => [...prevTodos, response.data]);
      return response.data;
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      // Remove _id from updates to prevent MongoDB errors
      const { _id, ...updateData } = updates;
      
      const response = await api.put(`/todos/${id}`, updateData);
      setTodos(prevTodos => 
        prevTodos.map(todo => 
          todo._id === id ? { ...todo, ...updateData } : todo
        )
      );
      return response.data;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        error,
        addTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};