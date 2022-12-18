import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation
} from 'react-router-dom';
import { useLayoutEffect } from 'react';

import Navigare from "./componente/Navigare/Navigare.jsx";
import Subsol from './componente/Subsol/Subsol';
import Alert from "./componente/Alert/Alert";

import PaginaPrincipala from "./pagini/PaginaPrincipala/PaginaPrincipala";
import Stiri from "./pagini/Stiri/Stiri.jsx";
import Layout from './pagini/Layout/Layout.jsx'
import NotFound from "./pagini/NotFound/NotFound.jsx";
import Stire from './pagini/Stiri/DetaliiStiri/Stire.jsx';
import AddEdit from './pagini/AddEdit/AddEdit';
import Previzualizare from './pagini/AddEdit/Previzualizare';
import Confirmare from './pagini/Confirmare/Confirmare';
import CalendarMeciuri from './pagini/CalendarMeciuri/CalendarMeciuri';

import ProtectedRoute from "./rute/RuteProtejate";

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
                <Navigare expand={width >= 750 ? "md" : false} />
                <ProtectedRoute />
                <Subsol />
              </>
            }
          >

            {/* protected rute */}
            <Route path="/add/stire" element={<AddEdit />} />
            <Route path="/add/stire/preview" element={<Previzualizare />} />
          <Route path="/confirmation" element={<Confirmare />} />
           {/*
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
                <Navigare expand={width >= 750 ? "sm" : false} />
                <Outlet />
                <Subsol />
              </>
            }
          >
            {/* public rute */}
            <Route path="/" element={<PaginaPrincipala />} />

            <Route path="/noutati" element={
              <Layout>
                <Stiri />
              </Layout>
            } />
            <Route path="/noutati/:id" exact element={<Layout><Stire /></Layout>} />

            <Route path="/calendar" element={
              <Layout>
                <CalendarMeciuri />
              </Layout>
            } />

            <Route path='*' exact={true} element={<Layout><NotFound /></Layout>} />

          </Route>

          {/* onboarding rute */}
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