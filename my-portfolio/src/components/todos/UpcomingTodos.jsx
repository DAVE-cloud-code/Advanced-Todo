import { Box, Typography, Paper } from '@mui/material';
import TodoList from './TodoList';
import { useTodos } from '../../context/TodoContext';
import { isFuture } from 'date-fns';

const UpcomingTodos = () => {
  const { todos } = useTodos();
  const upcomingTodos = todos.filter(todo => 
    todo.dueDate && isFuture(new Date(todo.dueDate))
  );

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Upcoming Tasks
      </Typography>
      <TodoList initialTodos={upcomingTodos} />
    </Paper>
  );
};

export default UpcomingTodos; 