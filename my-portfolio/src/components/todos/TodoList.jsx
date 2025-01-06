import { useState } from 'react';
import { List, Paper, Typography, Box } from '@mui/material';
import TodoItem from './TodoItem';
import TodoFilters from './TodoFilters';
import { useTodos } from '../../context/TodoContext';

const TodoList = () => {
  const { todos, loading, error } = useTodos();
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    category: 'all',
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filterTodos = (todos) => {
    return todos.filter(todo => {
      // Status filter
      if (filters.status === 'active' && todo.completed) return false;
      if (filters.status === 'completed' && !todo.completed) return false;

      // Priority filter
      if (filters.priority !== 'all' && todo.priority !== filters.priority) return false;

      // Category filter - Fixed this part
      if (filters.category !== 'all' && todo.category !== filters.category) return false;

      return true;
    });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const filteredTodos = filterTodos(todos);

  return (
    <Paper sx={{ p: 2 }}>
      <TodoFilters onFilterChange={handleFilterChange} filters={filters} />
      
      {filteredTodos.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography color="textSecondary">
            {filters.category !== 'all' 
              ? `No ${filters.category} todos found`
              : 'No todos found'}
          </Typography>
        </Box>
      ) : (
        <List>
          {filteredTodos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
        </List>
      )}
    </Paper>
  );
};

export default TodoList;