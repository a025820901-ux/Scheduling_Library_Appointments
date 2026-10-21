
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import QueueList from './components/QueueList';
import QueueForm from './components/QueueForm';
function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<QueueList></QueueList>}></Route>
        <Route path='/Add' element={<QueueForm></QueueForm>}></Route>
      </Routes>
    </BrowserRouter>

  )

}
export default App;
