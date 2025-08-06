import { useSelector } from 'react-redux';
import Header from './HeaderData/Header';
import ContextProvider from './MainData/ContextProvider';
import Main from './MainUi/Main';
import Welcome from './MainUi/Welcome';

function App() {
  const page = useSelector((store) => store.PAGE); // 'welcome' or 'main'

  return (
    <>
      <Header />
      {page === 'welcome' ? (
        <Welcome />
      ) : (
        <ContextProvider>
          <Main />
        </ContextProvider>
      )}
    </>
  );
}

export default App;
