import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Programs from './pages/programs/Programs'
import ProgramDetail from './pages/programs/ProgramDetail'
import CreateProgram from './pages/programs/CreateProgram'
import Routines from './pages/routines/Routines'
import RoutineDetail from './pages/routines/RoutineDetail'
import CreateRoutine from './pages/routines/CreateRoutine'
import Steps from './pages/steps/Steps'
import StepDetail from './pages/steps/StepDetail'
import CreateStep from './pages/steps/CreateStep'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Protected routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="programs">
          <Route index element={<Programs />} />
          <Route path="create" element={<CreateProgram />} />
          <Route path=":id" element={<ProgramDetail />} />
        </Route>
        <Route path="routines">
          <Route index element={<Routines />} />
          <Route path="create" element={<CreateRoutine />} />
          <Route path=":id" element={<RoutineDetail />} />
        </Route>
        <Route path="steps">
          <Route index element={<Steps />} />
          <Route path="create" element={<CreateStep />} />
          <Route path=":id" element={<StepDetail />} />
        </Route>
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App