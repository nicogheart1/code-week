import "./App.css";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Game from "./Game";

function App() {
  return (
    <>
      <Header />
      <main className="main container">
        <h1 className="center">Tic Tac Toe AI</h1>
        <Game />
      </main>
      <Footer />
    </>
  );
}

export default App;
