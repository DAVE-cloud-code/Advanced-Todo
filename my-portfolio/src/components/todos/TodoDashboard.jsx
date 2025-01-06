import { Grid, Container, Box, Typography } from '@mui/material';
import TodoList from './TodoList';
import { useState } from 'react';
import AddTodo from './AddTodo';
import TodoFilters from './TodoFilters';
import { useTodos } from '../../context/TodoContext';

const TodoDashboard = () => {
  const { todos } = useTodos();
  const [filteredTodos, setFilteredTodos] = useState(todos);

  const handleSelect = (selectedTodos) => {
    setFilteredTodos(selectedTodos);
  };
  const completedTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;
  const activeTodos = totalTodos - completedTodos;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Summary Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Todo Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ 
              p: 2, 
              bgcolor: 'background.paper', 
              borderRadius: 1,
              boxShadow: 1
            }}>
              <Typography variant="h6" color="primary">
                Total Todos
              </Typography>
              <Typography variant="h4">
                {totalTodos}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ 
              p: 2, 
              bgcolor: 'background.paper', 
              borderRadius: 1,
              boxShadow: 1
            }}>
              <Typography variant="h6" color="success.main">
                Completed
              </Typography>
              <Typography variant="h4">
                {completedTodos}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ 
              p: 2, 
              bgcolor: 'background.paper', 
              borderRadius: 1,
              boxShadow: 1
            }}>
              <Typography variant="h6" color="warning.main">
                Active
              </Typography>
              <Typography variant="h4">
                {activeTodos}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Add Todo Section */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AddTodo />
        </Grid>

        {/* Todo List Section */}
        <Grid item xs={12}>
          <TodoList todos={filteredTodos} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default TodoDashboard;