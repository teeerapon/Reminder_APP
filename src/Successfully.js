import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Outlet, useNavigate } from "react-router";
import AnimatedPage from './AnimatedPage';
import Button from '@mui/material/Button';

function Copyright() {
  const navigate = useNavigate();
  return (
    <Typography variant="body2" color="text.secondary">
      {'ส่งคำตอบเพิ่มเติม © '}
      <Link color="inherit" href='/Reminder_Page'>
        Click
      </Link>
    </Typography>
  );
}

export default function StickyFooter() {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <AnimatedPage>
        <CssBaseline />
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            บันทึกข้อมูลสำเร็จ
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {'ขอบคุณสำหรับข้อมูลของท่าน เราจะติดต่อไปภายหลัง'} <br/>
          </Typography>
        </Container>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Copyright />
          </Container>
        </Box>
      </AnimatedPage>
      <Outlet />
    </Box>
  );
}