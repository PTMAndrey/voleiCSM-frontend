import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation
} from 'react-router-dom';
import { useLayoutEffect } from 'react';

import Navigare from './componente/Navigare/Navigare.jsx';
import Subsol from './componente/Subsol/Subsol';
import Alert from './componente/Alert/Alert';

import PaginaPrincipala from './pagini/PaginaPrincipala/PaginaPrincipala';
import Stiri from './pagini/Stiri/Stiri.jsx';
import Layout from './pagini/Layout/Layout.jsx'
import NotFound from './pagini/NotFound/NotFound.jsx';
import Stire from './pagini/Stiri/DetaliiStiri/Stire.jsx';
import AddEditStiri from './pagini/Stiri/AddEdit/AddEditStiri';
import AddEditMeciuri from './pagini/CalendarMeciuri/AddEdit/AddEditMeciuri';
import CalendarMeciuri from './pagini/CalendarMeciuri/CalendarMeciuri';
import Confirmare from './pagini/Confirmare/Confirmare';
import Personal from './pagini/Personal/Personal.jsx';
import Persoana from './pagini/Personal/DetaliiPersonal/Persoana';
import HeaderPersonal from './componente/Header/HeaderPersonal';
import AddEditPersonal from './pagini/Personal/AddEdit/Personal/AddEditPersonal';
import AddEditRaportCronologic from './pagini/Personal/AddEdit/RaportCronologic/AddEditRaportCronologic'
import Onboarding from './pagini/Onboarding/Onboarding.jsx'

import ProtectedRoute from './rute/RuteProtejate';
import useStateProvider from './hooks/useStateProvider';
import useWindowDimensions from './hooks/useWindowDimensions';

import 'react-calendar/dist/Calendar.css';
import './App.scss';
import Parteneri from './pagini/Parteneri/Parteneri.jsx';
import Viziune from './pagini/Detalii/Viziune/Viziune.jsx';
import Istorie from './pagini/Detalii/Istorie/Istorie.jsx';
import Premii from './pagini/Detalii/Premii/Premii.jsx';
import AddEditPremii from './pagini/Detalii/Premii/AddEdit/AddEditPremii.jsx';
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
                <Navigare expand={width >= 750 ? 'md' : false} />
                <ProtectedRoute />
                <Subsol />
              </>
            }
          >

            {/* protected rute */}
            <Route path='/noutati/adauga' element={<AddEditStiri />} />
            <Route path='/noutati/edit/:id' element={<AddEditStiri />} />

            <Route path='/calendar/adauga' element={<AddEditMeciuri />} />
            <Route path='/calendar/edit/:id' element={<AddEditMeciuri />} />

            <Route path='/personal/adauga' element={<AddEditPersonal />} />
            {/* <Route path='/personal/adauga/premii' element={<AddEditPremiiPersonal/>}/> */}
            <Route path='/personal/edit/:id' element={<AddEditPersonal />} />
            <Route path='/personal/adauga/roluri/:id' element={<AddEditRaportCronologic pagina="adaugaRoluri" />} />
            <Route path='/personal/adauga/premii/:id' element={<AddEditRaportCronologic pagina="adaugaPremii" />} />
            <Route path='/personal/edit/roluri/:id' element={<AddEditRaportCronologic pagina="editRoluri" />} />
            <Route path='/personal/edit/premii/:id' element={<AddEditRaportCronologic pagina="editPremii" />} />
            <Route path='/detalii/adauga/premii' element={<AddEditPremii />} />
            <Route path='/detalii/edit/premii/:id' element={<AddEditPremii />} />


            <Route path='/confirmare/noutati/' element={<Confirmare pagina={'Noutati'} />} />
            <Route path='/confirmare/personal/' element={<Confirmare pagina={'Personal'} />} />

            {/*
            <Route path='/my-account'>
              <Route path='profile' element={<MyAccount />} />
              <Route path='security' element={<MyAccount />} />
              <Route path='notifications' element={<MyAccount />} />
              <Route path='messages' element={<MyAccount />} />
            </Route>*/}
          </Route>

          <Route
            element={
              <>
                <Navigare expand={width >= 750 ? 'sm' : false} />
                <Outlet />
                <Subsol />
              </>
            }
          >
            {/* public rute */}
            <Route path='/' element={<PaginaPrincipala />} />

            <Route path='/noutati' element={
              <Layout>
                <Stiri />
              </Layout>
            } />
            <Route path='/noutati/:id' exact element={<Layout><Stire /></Layout>} />

            <Route path='/calendar' element={
              <Layout>
                <CalendarMeciuri />
              </Layout>
            } />
            <Route path='/personal' element={
              <Layout>
                <Personal />
              </Layout>
            } />
            <Route path='/personal/:id' exact element={<><HeaderPersonal /><Layout><Persoana /></Layout></>} />

            <Route path='/parteneri' element={<Layout><Parteneri /></Layout>} />
            <Route path='/detalii/viziune' element={<Layout><Viziune /></Layout>} />
            <Route path='/detalii/istorie' element={<Layout><Istorie /></Layout>} />
            <Route path='/detalii/premii' element={<Layout><Premii /></Layout>} />

            <Route path='/not-found' element={<Layout><NotFound /></Layout>} />
            <Route path='*' element={<Layout><NotFound /></Layout>} />

            {/* onboarding rute */}
            <Route path='/login' element={<Onboarding />} />
          </Route>

          {/*<Route path='/register' element={<Onboarding />} />
        <Route path='/forgot-password' element={<Onboarding />} />
        <Route path='/reset-password' element={<Onboarding />} /> */}

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
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return children
} 