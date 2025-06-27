import React, { useContext } from 'react'
import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Dashboard from './pages/Admin/Dashboard'
import ManageTasks from './pages/Admin/ManageTasks'
import CreateTask from './pages/Admin/CreateTask'
import ManageUsers from './pages/Admin/ManageUsers'
import UserDashboard from './pages/Users/UserDashboard'
import ViewTaskDetails from './pages/Users/ViewTaskDetails'
import PrivateRoute from './routes/PrivateRoute'
import UserProvider, { UserContext } from './context/UserContext'
import { Toaster } from 'react-hot-toast'
import MyTasks from './pages/Users/MyTasks'


const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            {/* login route */}
            <Route path='/login' element={<Login />} />
            <Route path='/signUp' element={<SignUp />} />

            {/* Admin Routes */}
            <Route element={<PrivateRoute allowedRole={["admin"]} />}   >
              <Route path='/admin/dashboard' element={<Dashboard />} />
              <Route path='/admin/tasks' element={<ManageTasks />} />
              <Route path='/admin/create-task' element={<CreateTask />} />
              <Route path='/admin/users' element={<ManageUsers />} />
            </Route >

            {/* User Routes */}
            <Route element={<PrivateRoute allowedRole={["user"]} />}   >
              <Route path='/user/dashboard' element={<UserDashboard />} />
              <Route path='/user/my-tasks' element={<MyTasks />} />
              <Route path='/user/task-details/:id' element={<ViewTaskDetails />} />
            </Route >

            {/* default Route */}
            <Route path='/' element={<Root />} />

          </Routes>
        </Router>
      </div>
      <Toaster toastOptions={{
        className: "",
        style: {
          fontSize: "13px"
        }
      }} />


    </UserProvider>
  )
}

export default App



// Home page // default route task manager
const Root = () => {
  const { user, loading } = useContext(UserContext);
  if (loading) return <Outlet />

  if (!user) {
    return <Navigate to={"/login"} />
  }

  return user.role === "admin" ?
    <Navigate to={"/admin/dashboard"} /> :
    <Navigate to={"/user/dashboard"} />
}