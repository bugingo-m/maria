import Form from "./Form"
import ApparitionContainer from "./ApparitionContainer"
import { ToastContainer } from 'react-toastify';
import AppProvider from "./context";

function App() {
  

  return (
    <AppProvider>
      <div className="apparition-container">
      <h4 className='apparition-heading'>add apparition</h4>
      <Form/>
      <ApparitionContainer/>
      <ToastContainer position="top-center"/>
    </div>
    </AppProvider>
    
  )
}

export default App
