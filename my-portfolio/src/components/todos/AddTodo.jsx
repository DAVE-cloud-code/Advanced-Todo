import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useTodos } from '../../context/TodoContext';
import toast from 'react-hot-toast';

const AddTodo = () => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('personal');
  const [dueDate, setDueDate] = useState('');
  
  const { addTodo } = useTodos();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim()) {
      try {
        await addTodo({
          text: text.trim(),
          priority,
          category,
          dueDate: dueDate ? new Date(dueDate).toISOString() : null,
          completed: false,
          isImportant: false
        });
        toast.success('Todo added successfully!');
        // Reset form
        setText('');
        setPriority('medium');
        setCategory('personal');
        setDueDate('');
      } catch (error) {
        toast.error('Failed to add todo');
        console.error('Error adding todo:', error);
      }
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Todo Input Field */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a new todo..."
              variant="outlined"
              size="small"
              required
            />
            <Button 
              type="submit" 
              variant="contained" 
              startIcon={<Add />}
              disabled={!text.trim()}
              sx={{ minWidth: 120 }}
            >
              Add Todo
            </Button>
          </Box>

          {/* Todo Options */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                label="Priority"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="personal">Personal</MenuItem>
                <MenuItem value="work">Work</MenuItem>
                <MenuItem value="shopping">Shopping</MenuItem>
                <MenuItem value="important">Important</MenuItem>
              </Select>
            </FormControl>

            <TextField
              type="datetime-local"
              label="Due Date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: getCurrentDateTime(),
              }}
              size="small"
              sx={{ minWidth: 200 }}
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default AddTodo;