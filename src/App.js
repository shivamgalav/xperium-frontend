import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Nav from './components/Navbar/Nav';
import ContactForm from './components/AddContactForm/ContactForm';
import ContactList from './components/ShowContact/ContactList';
let data = [];
function useForceUpdate(){
  // eslint-disable-next-line
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}
function App() {
  const forceUpdate = useForceUpdate();
  return (
    <>
      <Nav/>
      <div className='mainBody'>
        <div>
          <ContactForm data={data} forceUpdate={forceUpdate}/>
        </div>
        <div>
          <ContactList data = {data} forceUpdate={forceUpdate}/>
        </div>
      </div>
    </>
  );
}

export default App;
