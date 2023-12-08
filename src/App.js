import React from 'react';
import {
  ChakraProvider,
  theme
} from '@chakra-ui/react';
import IndexPage from './pages';
import { BrowserRouter, Routes,Route } from 'react-router-dom/dist';
function App() {
  return (
    <ChakraProvider theme={theme}>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage/>}></Route>
      </Routes>
     </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
