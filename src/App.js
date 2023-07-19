import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AppRoutes from './appRoutes';

function App() {
  return (
    <div className="App">
           <AppRoutes />
      <ToastContainer
      pauseOnFocusLoss={false}
        autoClose={1000}
      />
    </div>
  );
}

export default App;
