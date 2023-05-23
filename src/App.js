import './App.css';
import Routes from './Routes/Routes';
import toast, { Toaster } from 'react-hot-toast';


function App() {
  
  return (
		<div className='App bg-[#090a27]'>
		  <Routes />
		  <Toaster/>
		</div>
	);
}

export default App;
