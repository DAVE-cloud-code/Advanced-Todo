import { Paper, Typography, Box, LinearProgress } from '@mui/material';
import { useTodos } from '../../context/TodoContext';

const TodoStats = () => {
  const { todos } = useTodos();

  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length,
    highPriority: todos.filter(todo => todo.priority === 'high').length,
  };

  const completionRate = (stats.completed / stats.total) * 100 || 0;

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Statistics
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Completion Rate
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={completionRate} 
          sx={{ mt: 1 }}
        />
        <Typography variant="body2" align="right">
          {completionRate.toFixed(1)}%
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <StatItem label="Total" value={stats.total} />
        <StatItem label="Completed" value={stats.completed} />
        <StatItem label="Active" value={stats.active} />
        <StatItem label="High Priority" value={stats.highPriority} />
      </Box>
    </Paper>
  );
};

const StatItem = ({ label, value }) => (
  <Box>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="h6">
      {value}
    </Typography>
  </Box>
);

export default TodoStats; 