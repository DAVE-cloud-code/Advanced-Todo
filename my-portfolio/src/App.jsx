import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';
import { ThemeProvider } from './context/ThemeContext';
import Routes from './Routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <TodoProvider>
            <Routes />
            <Toaster position="top-right" />
          </TodoProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App; 