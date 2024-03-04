import { Provider } from "react-redux";
import Body from "./components/Body";
import appStore from "./utils/appStore";

function App() {
  return (
    <div className="w-[100vw] h-[100vh] ">
      <Provider store={appStore}>
        <Body />
      </Provider>
    </div>
  );
}

export default App;
