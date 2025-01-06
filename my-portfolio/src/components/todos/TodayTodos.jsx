import { Box, Typography, Paper } from '@mui/material';
import TodoList from './TodoList';
import { useTodos } from '../../context/TodoContext';
import { isToday } from 'date-fns';

const TodayTodos = () => {
  const { todos } = useTodos();
  const todayTodos = todos.filter(todo => isToday(new Date(todo.createdAt)));

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Today's Tasks
      </Typography>
      <TodoList initialTodos={todayTodos} />
    </Paper>
  );
};

export default TodayTodos; 