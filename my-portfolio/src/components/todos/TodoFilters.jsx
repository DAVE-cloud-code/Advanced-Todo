import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const TodoFilters = ({ onFilterChange, filters }) => {
  const handleStatusChange = (event, newStatus) => {
    if (newStatus !== null) {
      onFilterChange({
        ...filters,
        status: newStatus,
      });
    }
  };

  const handlePriorityChange = (event) => {
    onFilterChange({
      ...filters,
      priority: event.target.value,
    });
  };

  const handleCategoryChange = (event) => {
    onFilterChange({
      ...filters,
      category: event.target.value,
    });
  };

  return (
    <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
      <ToggleButtonGroup
        value={filters.status}
        exclusive
        onChange={handleStatusChange}
        size="small"
      >
        <ToggleButton value="all">
          All
        </ToggleButton>
        <ToggleButton value="active">
          Active
        </ToggleButton>
        <ToggleButton value="completed">
          Completed
        </ToggleButton>
      </ToggleButtonGroup>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Priority</InputLabel>
        <Select
          value={filters.priority}
          onChange={handlePriorityChange}
          label="Priority"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={filters.category}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="personal">Personal</MenuItem>
          <MenuItem value="work">Work</MenuItem>
          <MenuItem value="shopping">Shopping</MenuItem>
          <MenuItem value="important">Important</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TodoFilters;