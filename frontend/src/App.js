import Playground from "./components/Playground";
import AddReview from "./components/AddReview";
import "./App.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import PlaygroundReview from "./components/PlaygroundReview";


function App() {
  return (
    
    <div className="App">
      <header className="App-header">
      <h1 style={{fontSize:74, fontFamily: "Open-sans"}}>Playground Finders</h1>
      <Playground />
      {/* <AddReview /> */}
      </header>
    </div>
  );
}

export default App;