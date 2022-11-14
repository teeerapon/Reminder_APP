import logo from './logo.svg';
import './App.css';
import { IntlProvider } from 'react-intl';
import { styled, useTheme } from '@mui/material/styles';
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation, useParams } from "react-router";
import Reminder_Page from "./Reminder_page"
import Successfully_Page from "./Successfully"
import MuiAppBar from '@mui/material/AppBar';

function App() {
  const location = useLocation();
  const theme = useTheme();

  return (
    <IntlProvider>
      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Reminder_Page />} />
          <Route path="/Reminder_Page" element={<Reminder_Page />} />
          <Route path="/Successfully_Page" element={<Successfully_Page />} />
        </Routes>
      </AnimatePresence>
    </IntlProvider>
  );
}

export default App;
