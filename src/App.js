import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation
} from 'react-router-dom';
import { useLayoutEffect } from 'react';

import Navigation from "./components/Navigation/Navigation.jsx";
import Footer from './components/Footer/Footer';
import Alert from "./components/Alert/Alert";

import PaginaPrincipala from "./pages/PaginaPrincipala/PaginaPrincipala";
import Stiri from "./pages/Stiri/Stiri.jsx";
import Layout from './pages/Layout/Layout.jsx'
import NotFound from "./pages/NotFound/NotFound.jsx";
import Stire from './pages/Stiri/DetaliiStiri/Stire.jsx';
import AddEdit from './pages/AddEdit/AddEdit';
import Preview from './pages/AddEdit/Preview';
import Confirmation from './pages/Confirmation/Confirmation';

import ProtectedRoute from "./routes/ProtectedRoutes";

import useStateProvider from "./hooks/useStateProvider";
import useWindowDimensions from "./hooks/useWindowDimensions"

import "react-calendar/dist/Calendar.css";
import "./App.scss";
function App() {
  const { width } = useWindowDimensions();
  const { alert } = useStateProvider();
  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route
            element={
              <>
                <Navigation expand={width >= 750 ? "md" : false} />
                <ProtectedRoute />
                <Footer />
              </>
            }
          >

            {/* protected routes */}
            <Route path="/stire-add" element={<AddEdit />} />
            <Route path="/stire-add/preview" element={<Preview />} />
          <Route path="/confirmation" element={<Confirmation />} />
           {/*<Route path="/confirmation" element={<Confirmation />} />
            <Route path="/my-account">
              <Route path="profile" element={<MyAccount />} />
              <Route path="security" element={<MyAccount />} />
              <Route path="notifications" element={<MyAccount />} />
              <Route path="messages" element={<MyAccount />} />
            </Route>*/}
            <Route path="/edit/:id" element={<AddEdit />} /> 
          </Route>

          <Route
            element={
              <>
                <Navigation expand={width >= 750 ? "sm" : false} />
                <Outlet />
                <Footer />
              </>
            }
          >
            {/* public routes */}
            <Route path="/" element={<PaginaPrincipala />} />

            <Route path="/stiri" element={
              <Layout>
                <Stiri />
              </Layout>
            } />
            <Route path="/stiri/:id" exact element={<Layout><Stire /></Layout>} />

            <Route path='*' exact={true} element={<Layout><NotFound /></Layout>} />

          </Route>

          {/* onboarding routes */}
          {/* <Route path="/login" element={<Onboarding />} />
        <Route path="/register" element={<Onboarding />} />
        <Route path="/forgot-password" element={<Onboarding />} />
        <Route path="/reset-password" element={<Onboarding />} /> */}

        </Routes>
        {alert && <Alert message={alert.message} type={alert.type} />}
      </Wrapper>
    </Router>
  );
}

export default App;

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0,0);
  }, [location.pathname]);
  return children
} 