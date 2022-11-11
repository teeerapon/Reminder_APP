import logo from './logo.svg';
import './App.css';
import { IntlProvider } from 'react-intl';
import { styled, useTheme } from '@mui/material/styles';
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation, useParams } from "react-router";
import Reminder_page from "./Reminder_page"
import MuiAppBar from '@mui/material/AppBar';

function App() {
  const location = useLocation();
  const theme = useTheme();

  return (
    <IntlProvider>
      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Reminder_page />} />
        </Routes>
      </AnimatePresence>
    </IntlProvider>
  );
}

export default App;
