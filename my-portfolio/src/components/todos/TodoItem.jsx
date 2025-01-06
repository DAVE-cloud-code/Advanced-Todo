import { useState } from 'react';
import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  TextField,
  Menu,
  MenuItem,
  Typography,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from '@mui/icons-material';
import { useTodos } from '../../context/TodoContext';
import toast from 'react-hot-toast';

const TodoItem = ({ todo }) => {
  const { updateTodo, deleteTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    text: todo.text,
    priority: todo.priority,
    category: todo.category,
    dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().slice(0, 16) : '',
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleToggleComplete = async () => {
    try {
      await updateTodo(todo._id, { 
        ...todo, 
        completed: !todo.completed 
      });
      toast.success(todo.completed ? 'Todo marked as incomplete' : 'Todo marked as complete');
    } catch (error) {
      toast.error('Failed to update todo');
      console.error('Error updating todo:', error);
    }
  };

  const handleToggleImportant = async () => {
    try {
      await updateTodo(todo._id, { 
        ...todo, 
        isImportant: !todo.isImportant 
      });
      toast.success(todo.isImportant ? 'Removed from important' : 'Marked as important');
    } catch (error) {
      toast.error('Failed to update todo');
      console.error('Error updating todo:', error);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    handleMenuClose();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({
      text: todo.text,
      priority: todo.priority,
      category: todo.category,
      dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().slice(0, 16) : '',
    });
  };

  const handleSaveEdit = async () => {
    try {
      await updateTodo(todo._id, {
        ...todo,
        ...editData,
        dueDate: editData.dueDate ? new Date(editData.dueDate).toISOString() : null,
      });
      setIsEditing(false);
      toast.success('Todo updated successfully');
    } catch (error) {
      toast.error('Failed to update todo');
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTodo(todo._id);
      setDeleteDialogOpen(false);
      toast.success('Todo deleted successfully');
    } catch (error) {
      toast.error('Failed to delete todo');
      console.error('Error deleting todo:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString();
  };

  return (
    <>
      <ListItem
        sx={{
          bgcolor: 'background.paper',
          mb: 1,
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
        }}
        secondaryAction={
          isEditing ? (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={handleSaveEdit} color="primary">
                <SaveIcon />
              </IconButton>
              <IconButton onClick={handleCancelEdit}>
                <CancelIcon />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title={todo.isImportant ? "Remove from important" : "Mark as important"}>
                <IconButton 
                  onClick={handleToggleImportant}
                  color={todo.isImportant ? "warning" : "default"}
                >
                  {todo.isImportant ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
              </Tooltip>
              <IconButton onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
            </Box>
          )
        }
      >
        <Checkbox
          checked={todo.completed}
          onChange={handleToggleComplete}
          sx={{ mr: 2 }}
        />

        {isEditing ? (
          <Box sx={{ display: 'flex', gap: 2, flex: 1, alignItems: 'center' }}>
            <TextField
              value={editData.text}
              onChange={(e) => setEditData({ ...editData, text: e.target.value })}
              size="small"
              fullWidth
            />
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={editData.priority}
                onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
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
                value={editData.category}
                onChange={(e) => setEditData({ ...editData, category: e.target.value })}
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
              value={editData.dueDate}
              onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              sx={{ minWidth: 200 }}
            />
          </Box>
        ) : (
          <ListItemText
            primary={
              <Typography
                sx={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? 'text.secondary' : 'text.primary',
                }}
              >
                {todo.text}
              </Typography>
            }
            secondary={
              <Box sx={{ mt: 1 }}>
                <Chip
                  label={todo.priority}
                  size="small"
                  color={
                    todo.priority === 'high'
                      ? 'error'
                      : todo.priority === 'medium'
                      ? 'warning'
                      : 'default'
                  }
                  sx={{ mr: 1 }}
                />
                <Chip
                  label={todo.category}
                  size="small"
                  color="primary"
                  sx={{ mr: 1 }}
                />
                {todo.dueDate && (
                  <Typography variant="caption" color="text.secondary">
                    Due: {formatDate(todo.dueDate)}
                  </Typography>
                )}
              </Box>
            }
          />
        )}
      </ListItem>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick}>
          <EditIcon sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <DeleteIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Todo</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this todo?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TodoItem;