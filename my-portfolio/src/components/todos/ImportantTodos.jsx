import { Box, Typography, Paper } from '@mui/material';
import TodoList from './TodoList';
import { useTodos } from '../../context/TodoContext';

const ImportantTodos = () => {
  const { todos } = useTodos();
  const importantTodos = todos.filter(todo => todo.priority === 'high');

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Important Tasks
      </Typography>
      <TodoList initialTodos={importantTodos} />
    </Paper>
  );
};

export default ImportantTodos; 