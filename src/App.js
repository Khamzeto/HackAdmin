import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import AdminPage from './Components/pages/AdminPage';
import AddModal from './Components/AddModal/AddModal';
import AuthPage from './Components/pages/AuthPage';
import Navigation from './Components/Navigation';

function App() {
  const [addModal, setAddModal] = useState(false);
  return (
    <div className="App">
      {addModal && <AddModal setAddModal={setAddModal} />}

      <Navigation setAddModal={setAddModal} />
    </div>
  );
}

export default App;
