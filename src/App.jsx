import { Provider } from "react-redux";
import Pokemones from "./components/Pokemones";
import generateStore from "./redux/store";
import  "./App.css";


function App() {
  const store = generateStore()
  return (
    <Provider store={store}>
      <Pokemones/>
    </Provider>
  );
}

export default App;
