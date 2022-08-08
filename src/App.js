import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pay from './components/Pay';
import Success from './components/Success';
import Blank from './components/Blank'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/pay" element={ <Pay />} />
          <Route path="/success" element={ <Success />} />
          <Route path="*" element={ <Blank />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
