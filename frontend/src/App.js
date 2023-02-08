import { useEffect, useState } from 'react';
// import { Navbar } from 'react-bootstrap';
import './App.css';
import Signin from './pages/Signin';
import Team from './pages/Team';
import { Loading } from './components/Loading';

function App() {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLogin(true);
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, [])

  if (loading) {
    return (
      <>
        <div className="homeNavbar">
          <div className="logoHome"></div>
          <div className="brandText">Developers & Coders Club</div>
        </div>
        <Loading />
      </>
    );
  }
  return (
    <div className="App">
      {!login && <div className="homeNavbar">
        <div className="logoHome"></div>
        <div className="brandText">Developers & Coders Club</div>
      </div>}
      {login ?
        <Team setLogin={setLogin} />
        : (
          <Signin setLogin={setLogin} />
        )}
    </div>
  );
}

export default App;
