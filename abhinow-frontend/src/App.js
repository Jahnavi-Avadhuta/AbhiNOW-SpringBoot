import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import OAuth2Callback from './pages/OAuth2Callback';

// Pages
import Landing       from './pages/Landing';
import Login         from './pages/Login';
import Register      from './pages/Register';
import ChooseRole    from './pages/ChooseRole';
import Dashboard     from './pages/Dashboard';
import PostRoute     from './pages/driver/PostRoute';
import DriverRequests from './pages/driver/DriverRequests';
import DriverRides   from './pages/driver/DriverRides';
import SearchRide    from './pages/passenger/SearchRide';
import RideResults   from './pages/passenger/RideResults';
import PassengerRides from './pages/passenger/PassengerRides';
import RateRide       from './pages/passenger/RateRide';
import LiveTracking   from './pages/passenger/LiveTracking';

import DriverLiveTracking from './pages/driver/DriverLiveTracking';

import AdminPanel     from './pages/admin/AdminPanel';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid #2a2a2a',
            },
            success: { iconTheme: { primary: '#00d4aa', secondary: '#fff' } },
            error:   { iconTheme: { primary: '#ff6b6b', secondary: '#fff' } },
          }}
        />
        <Routes>
          {/* Public */}
          <Route path="/"         element={<Landing />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
		  <Route path="/oauth2/callback" element={<OAuth2Callback />} />

          {/* Protected — any logged in user */}
          <Route path="/choose-role" element={
            <ProtectedRoute><ChooseRole /></ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />

          {/* Driver routes */}
          <Route path="/driver/post-route" element={
            <ProtectedRoute allowedRoles={['DRIVER']}>
              <PostRoute />
            </ProtectedRoute>
          } />
          <Route path="/driver/requests" element={
            <ProtectedRoute allowedRoles={['DRIVER']}>
              <DriverRequests />
            </ProtectedRoute>
          } />
          <Route path="/driver/rides" element={
            <ProtectedRoute allowedRoles={['DRIVER']}>
              <DriverRides />
            </ProtectedRoute>
          } />
		  <Route path="/driver/track/:rideId" element={
		    <ProtectedRoute allowedRoles={['DRIVER']}>
		      <DriverLiveTracking />
		    </ProtectedRoute>
		  } />

          {/* Passenger routes */}
          <Route path="/passenger/search" element={
            <ProtectedRoute allowedRoles={['USER']}>
              <SearchRide />
            </ProtectedRoute>
          } />
          <Route path="/passenger/results" element={
            <ProtectedRoute allowedRoles={['USER']}>
              <RideResults />
            </ProtectedRoute>
          } />
          <Route path="/passenger/rides" element={
            <ProtectedRoute allowedRoles={['USER']}>
              <PassengerRides />
            </ProtectedRoute>
          } />
          <Route path="/passenger/rate/:rideId" element={
            <ProtectedRoute allowedRoles={['USER']}>
              <RateRide />
            </ProtectedRoute>
          } />
		  <Route path="/passenger/track/:rideId" element={
		    <ProtectedRoute allowedRoles={['USER']}>
		      <LiveTracking />
		    </ProtectedRoute>
		  } />

          {/* Admin */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminPanel />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;