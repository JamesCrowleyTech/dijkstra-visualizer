import "./App.css";
import "../SelectionBar/Index";
import SelectionBar from "../SelectionBar/Index";
import Grid from "../Grid/Index";

function App() {
    return (
        <div className="app">
            <SelectionBar />
            <Grid />
        </div>
    );
}

export default App;
