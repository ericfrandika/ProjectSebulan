import Header from './templates/header/header'
import Body from './templates/body/index'
import { BrowserRouter as Router } from "react-router-dom"
function App() {
  return (
    <div>
      <Router>
   <Header></Header>
    <Body/>
    </Router>
    </div>
  );
}

export default App;
