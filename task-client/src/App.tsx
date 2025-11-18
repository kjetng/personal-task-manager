import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { YourTasksPage } from './pages/YourTasksPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<YourTasksPage />} />
        <Route path="/tasks" element={<YourTasksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
