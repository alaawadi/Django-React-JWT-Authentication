import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
// import SideBar from './components/SideBar'

let HomePage = React.lazy(() => import('./pages/HomePage')) 
// import HomePage from './pages/HomePage'

let LoginPage = React.lazy(() => import('./pages/LoginPage')) 
// import LoginPage from './pages/LoginPage'

let Signup = React.lazy(() => import('./pages/Signup')) 
// import Signup from './pages/Signup';

let Changepassword = React.lazy(() => import('./pages/changepassword'))
// import Changepassword from './pages/changepassword'

let Resetpassword = React.lazy(() => import('./pages/resetpassword'))
// import Resetpassword from './pages/resetpassword'

let Createnote = React.lazy(() => import('./pages/Createnote'))
// import Createnote from './pages/Createnote'

let Createnoteall = React.lazy(() => import('./pages/Createnoteall'))
// import Createnoteall from './pages/Createnoteall'

let UpdateCourse = React.lazy(() => import('./pages/UpdateCourse'))
// import UpdateCourse from './pages/UpdateCourse';

let ListPage = React.lazy(() => import('./pages/ListPage'))
// import ListPage from './pages/ListPage';


import { Audio, Circles } from 'react-loader-spinner'




function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header/>
          <main>
          <React.Suspense fallback={<div className='spinnerr'><Circles
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/></div>}>
            <PrivateRoute component={HomePage} path="/" exact/>
            <PrivateRoute component={ListPage} path="/notes" exact/>
            <Route component={LoginPage} path="/login"/>
            <Route component={Signup} path="/signup"/>
            <PrivateRoute component={Changepassword} path="/change-password"/>
            <Route component={Resetpassword} path="/reset-password"/>
            <PrivateRoute component={Createnote} path="/create-note" />
            <PrivateRoute component={Createnoteall} path="/create-noteall" />
            <PrivateRoute component={UpdateCourse} path="/update-note/:id" />
          </React.Suspense>
          </main>
          
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
