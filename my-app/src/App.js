import logo from './logo.svg';
import './App.css';
import Components from './Components';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

function App() {
  return (
    <div className="App">
     <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" m={2} pt={3}>
          <Box gridColumn="span 8">
            <Components />
          </Box>
      </Box>
    </div>
  );
}

export default App;
