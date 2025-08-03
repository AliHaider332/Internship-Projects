import './App.css';
// App.jsx
import Header from './HeaderData/Header';
import ContextProvider from './MainData/ContextProvider';
import Main from './MainUi/Main';
function App() {
  return (
    <>
      <ContextProvider>
        <Header />
        
        <Main />
      </ContextProvider>
    </>
  );
}

export default App;
