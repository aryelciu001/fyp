import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Navbar from 'Components/Navbar'
import Home from 'Pages/Home'
import Admin from 'Pages/Admin'
import Login from 'Pages/Login'
import { login } from 'Reducers/user'
import api from 'API'

function App() {

  const dispatch = useDispatch()
  let navigate = useNavigate();

  // local state
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // check user token in localstorage
    let token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      navigate("/login");
    } else {
      api('GET_USER_INFO', { token })
        .then((res) => {
          dispatch(login({ email: res.data.email, role: res.data.role, token }))
          setLoading(false)
        })
        .catch(e => {
          navigate("/login");
          setLoading(false)
        })
    }
  }, [dispatch, navigate])

  const RequireAuth = ({ children }) => {
    const userToken = useSelector(state => state.user.token)
    if (!userToken) {
      return <Navigate to="/login"/>;
    } else {
      return children;
    }
  }

  const RequireAdmin = ({ children }) => {
    const userRole = useSelector(state => state.user.role)
    if (userRole.toLowerCase() !== "admin") {
      return <Navigate to="/"/>;
    } else {
      return children;
    }
  }

  const HomeRoute = () => (
    <RequireAuth>
      <Navbar/>
      <h1>FYP Selection Platform</h1>
      <Home/>
    </RequireAuth>
  )

  const AdminRoute = () => (
    <RequireAuth>
      <RequireAdmin>
        <Navbar/>
        <h1>FYP Selection Platform</h1>
        <Admin/>
      </RequireAdmin>
    </RequireAuth>
  )

  return (
    <div className="App">
      {
        loading ? <h1>Loading</h1> : 
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/test" element={<>hello</>}/>
          <Route path="/admin" element={<AdminRoute/>}/>
          <Route path="/" element={<HomeRoute/>}/>
        </Routes>
      }
    </div>
  );
}

export default App;