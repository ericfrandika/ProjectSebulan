import Header from './templates/header/header'
import Body from './templates/body/index'
import Login from './page/login/login'
import { BrowserRouter as Router } from "react-router-dom"
import BackUpData from './page/database/backupData'
import Navbar from './templates/sidebar/Navbar'
function App() {
  return (
    <div>
      <Router> 
      {/* <Header></Header> */}
      <Navbar/>
      <Body/>
      {/* <Login></Login> */}
    </Router>
    </div>
  );
}
export default App;
