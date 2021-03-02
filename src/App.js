import Header from './templates/header/header'
import Body from './templates/body/index'
import Login from './page/login/login'
import { BrowserRouter as Router } from "react-router-dom"
import BackUpData from './page/database/backupData'
function App() {
  return (
    <div>
      <Router> 
      <Header></Header>
      <Body/>
    </Router>
    {/* <Login/> */}
    </div>
  );
}
export default App;
