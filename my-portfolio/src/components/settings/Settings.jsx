import {
  Paper,
  Typography,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import { useThemeContext } from '../../context/ThemeContext';
import { useState, useEffect } from 'react';
import { requestNotificationPermission } from '../../utils/notifications';
import toast from 'react-hot-toast';

const Settings = () => {
  const { darkMode, toggleDarkMode } = useThemeContext();
  const [notifications, setNotifications] = useState(false);

  useEffect(() => {
    const notificationEnabled = Notification.permission === 'granted';
    setNotifications(notificationEnabled);
  }, []);

  const handleNotificationToggle = async () => {
    try {
      const granted = await requestNotificationPermission();
      setNotifications(granted);
      if (granted) {
        toast.success('Notifications enabled');
      } else {
        toast.error('Notification permission denied');
      }
    } catch (error) {
      toast.error('Failed to enable notifications');
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>

      <List>
        <ListItem>
          <ListItemText 
            primary="Dark Mode" 
            secondary="Toggle dark/light theme"
          />
          <ListItemSecondaryAction>
            <Switch 
              edge="end"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
          </ListItemSecondaryAction>
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText 
            primary="Notifications" 
            secondary="Enable push notifications for reminders"
          />
          <ListItemSecondaryAction>
            <Switch 
              edge="end"
              checked={notifications}
              onChange={handleNotificationToggle}
            />
          </ListItemSecondaryAction>
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText 
            primary="Data Sync" 
            secondary="Sync todos with local storage"
          />
          <ListItemSecondaryAction>
            <Switch 
              edge="end"
              defaultChecked
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Paper>
  );
};

export default Settings; 