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
import AddEditStiri from './pagini/Stiri/AddEdit/AddEditStiri';
import AddEditMeciuri from './pagini/CalendarMeciuri/AddEdit/AddEditMeciuri';
import PrevizualizareStiri from './pagini/Stiri/AddEdit/PrevizualizareStiri';
import Confirmare from './pagini/Confirmare/Confirmare';
import CalendarMeciuri from './pagini/CalendarMeciuri/CalendarMeciuri';

import ProtectedRoute from "./rute/RuteProtejate";

import useStateProvider from "./hooks/useStateProvider";
import useWindowDimensions from "./hooks/useWindowDimensions"

import "react-calendar/dist/Calendar.css";
import "./App.scss";
import Personal from './pagini/Personal/Personal.jsx';
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
            <Route path="/noutati/adauga" element={<AddEditStiri/>} />
            <Route path="/edit/stire/:id" element={<AddEditStiri/>} /> 
            <Route path="/noutati/adauga/stire/preview" element={<PrevizualizareStiri />} />
            <Route path="/calendar/adauga" element={<AddEditMeciuri/>} />
            <Route path="/edit/meci/:id" element={<AddEditStiri/>} /> 
            {/* <Route path='/edit/meci/preview' element={<PrevizualizareStiri />}/> */}
            {/* <Route path="/calendar/adauga/meci/preview" element={<AddEditMeciuri/>} /> */}
            <Route path="/confirmation" element={<Confirmare />} />
           {/*
            <Route path="/my-account">
              <Route path="profile" element={<MyAccount />} />
              <Route path="security" element={<MyAccount />} />
              <Route path="notifications" element={<MyAccount />} />
              <Route path="messages" element={<MyAccount />} />
            </Route>*/}
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
            <Route path="/personal" element={
              <Layout>
                <Personal/>
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