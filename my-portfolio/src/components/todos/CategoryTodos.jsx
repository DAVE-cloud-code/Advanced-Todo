import { Box, Typography, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import TodoList from './TodoList';
import { useTodos } from '../../context/TodoContext';

const CategoryTodos = () => {
  const { category } = useParams();
  const { todos } = useTodos();
  const categoryTodos = todos.filter(todo => 
    todo.category?.toLowerCase() === category?.toLowerCase()
  );

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ textTransform: 'capitalize' }}>
        {category} Tasks
      </Typography>
      <TodoList initialTodos={categoryTodos} />
    </Paper>
  );
};

export default CategoryTodos; 