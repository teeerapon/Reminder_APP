import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const theme = createTheme();

export default function SignUp() {

  const [forms, setForms] = React.useState(
    [
      {
        remind_name: "",
        tel: "",
        email: "",
        gps: "",
        remind_width: "",
        remind_distance: "",
        remind_area: "",
        land_number: "",
        remark: "",
      }
    ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper elevation={3} sx={{ p: 3, pt: 1, marginTop: 3, }}>
          <Box
            sx={{
              marginTop: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              ลงทะเบียน
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="ชื่อจริง-นามสุกล"
                    variant="standard"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="Tel"
                    label="เบอร์โทรติดต่อ"
                    name="Tel"
                    variant="standard"
                    autoComplete="Tel"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="อีเมล"
                    variant="standard"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    variant="standard"
                    name="location"
                    label="ที่อยู่ของผู้ลงทะเบียน"
                    id="location"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="standard"
                    name="gps"
                    label="พิกัดสถานที่"
                    id="gps"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    variant="standard"
                    name="remind_area"
                    label="ขนาดพื้นที่"
                    id="remind_area"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    variant="standard"
                    name="remind_width"
                    label="หน้ากว้าง"
                    id="remind_width"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    variant="standard"
                    name="remind_distance"
                    label="ระยะห่างถนน"
                    id="remind_distance"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="standard"
                    name="land_number"
                    label="เลขที่ดิน"
                    id="land_number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="remark"
                    label="อื่น ๆ"
                    multiline
                    rows={2}
                    id="remark"
                  />
                </Grid>
                {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}