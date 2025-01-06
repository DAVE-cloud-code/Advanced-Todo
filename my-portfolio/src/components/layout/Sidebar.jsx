import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { useTodos } from '../../context/TodoContext';

const Sidebar = ({ onSelect }) => {
  const { todos } = useTodos();

  const getTodayTodos = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return todos.filter(todo => {
      if (!todo.dueDate) return false;
      const dueDate = new Date(todo.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate.getTime() === today.getTime();
    });
  };

  const getUpcomingTodos = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return todos.filter(todo => {
      if (!todo.dueDate) return false;
      const dueDate = new Date(todo.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate.getTime() > today.getTime();
    });
  };

  const getImportantTodos = () => {
    return todos.filter(todo => todo.isImportant);
  };

  return (
    <div>
      <List>
        <ListItem button onClick={() => onSelect(getTodayTodos())}>
          <ListItemText primary="Today's Todos" />
        </ListItem>
        <ListItem button onClick={() => onSelect(getUpcomingTodos())}>
          <ListItemText primary="Upcoming Todos" />
        </ListItem>
        <ListItem button onClick={() => onSelect(getImportantTodos())}>
          <ListItemText primary="Important Todos" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => onSelect(todos)}>
          <ListItemText primary="All Todos" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar; 