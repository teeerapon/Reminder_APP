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
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DirectionsIcon from '@mui/icons-material/Directions';
import InputAdornment from '@mui/material/InputAdornment';

const theme = createTheme();

export default function SignUp() {

  const [forms, setForms] = React.useState([{ remind_name: "", tel: "", email: "", remind_location: "", gps: "", remind_width: "", remind_distance: "", remind_area: "", land_number: "", remark: "", }]);
  const [checked_name, setChecked_name] = React.useState(1)
  const [checked_tel, setChecked_tel] = React.useState(1)
  const [checked_email, setChecked_email] = React.useState(1)

  const getUserGeolocationDetails = () => {
    fetch(
      "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572"
    )
      .then(response => response.json())
      .then(data => {
        const FromValues = {
          remind_name: forms.remind_name,
          tel: forms.tel,
          email: forms.email,
          remind_location: forms.remind_location,
          gps: data.IPv4 + ' (' + data.city + ',' + data.country_name + ')',
          remind_width: forms.remind_width,
          remind_distance: forms.remind_distance,
          remind_area: forms.remind_area,
          land_number: forms.land_number,
          remark: forms.remark,
        }
        setForms(FromValues)
        console.log(data);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const handle_sumbitForms = async () => {
    if (!forms.remind_name && !forms.tel && !forms.email) {
      setChecked_name(0)
      setChecked_tel(0)
      setChecked_email(0)
    } else if ((!forms.remind_name && !forms.tel) && forms.email !== undefined) {
      setChecked_name(0)
      setChecked_tel(0)
      setChecked_email(1)
    } else if ((!forms.remind_name && !forms.email) && forms.tel !== undefined) {
      setChecked_name(0)
      setChecked_tel(1)
      setChecked_email(0)
    } else if ((!forms.tel && !forms.email) && forms.remind_name !== undefined) {
      setChecked_name(1)
      setChecked_tel(0)
      setChecked_email(0)
    } else if (!forms.tel && (forms.email && forms.remind_name !== undefined)) {
      setChecked_name(1)
      setChecked_tel(0)
      setChecked_email(1)
    } else if (!forms.email && (forms.tel && forms.remind_name !== undefined)) {
      setChecked_name(1)
      setChecked_tel(1)
      setChecked_email(0)
    } else if (!forms.remind_name && (forms.tel && forms.email !== undefined)) {
      setChecked_name(0)
      setChecked_tel(1)
      setChecked_email(1)
    } else {
      setChecked_name(1)
      setChecked_tel(1)
      setChecked_email(1)
    }
  }

  const handleChange_remind_name = (event) => {
    event.preventDefault();
    const FromValues = {
      remind_name: event.target.value,
      tel: forms.tel,
      email: forms.email,
      remind_location: forms.remind_location,
      gps: forms.gps,
      remind_width: forms.remind_width,
      remind_distance: forms.remind_distance,
      remind_area: forms.remind_area,
      land_number: forms.land_number,
      remark: forms.remark,
    }
    setForms(FromValues)
  }

  const handleChange_tel = (event) => {
    event.preventDefault();
    const FromValues = {
      remind_name: forms.remind_name,
      tel: event.target.value,
      email: forms.email,
      remind_location: forms.remind_location,
      gps: forms.gps,
      remind_width: forms.remind_width,
      remind_distance: forms.remind_distance,
      remind_area: forms.remind_area,
      land_number: forms.land_number,
      remark: forms.remark,
    }
    setForms(FromValues)
  }


  const handleChange_email = (event) => {
    event.preventDefault();
    const FromValues = {
      remind_name: forms.remind_name,
      tel: forms.tel,
      email: event.target.value,
      remind_location: forms.remind_location,
      gps: forms.gps,
      remind_width: forms.remind_width,
      remind_distance: forms.remind_distance,
      remind_area: forms.remind_area,
      land_number: forms.land_number,
      remark: forms.remark,
    }
    setForms(FromValues)
  }

  const handleChange_remind_location = (event) => {
    event.preventDefault();
    const FromValues = {
      remind_name: forms.remind_name,
      tel: forms.tel,
      email: forms.email,
      remind_location: event.target.value,
      gps: forms.gps,
      remind_width: forms.remind_width,
      remind_distance: forms.remind_distance,
      remind_area: forms.remind_area,
      land_number: forms.land_number,
      remark: forms.remark,
    }
    setForms(FromValues)
  }


  const handleChange_gps = (event) => {
    event.preventDefault();
    const FromValues = {
      remind_name: forms.remind_name,
      tel: forms.tel,
      email: forms.email,
      remind_location: forms.remind_location,
      gps: event.target.value,
      remind_width: forms.remind_width,
      remind_distance: forms.remind_distance,
      remind_area: forms.remind_area,
      land_number: forms.land_number,
      remark: forms.remark,
    }
    setForms(FromValues)
  }

  const handleChange_remind_width = (event) => {
    event.preventDefault();
    const FromValues = {
      remind_name: forms.remind_name,
      tel: forms.tel,
      email: forms.email,
      remind_location: forms.remind_location,
      gps: forms.gps,
      remind_width: event.target.value,
      remind_distance: forms.remind_distance,
      remind_area: forms.remind_area,
      land_number: forms.land_number,
      remark: forms.remark,
    }
    setForms(FromValues)
  }

  const handleChange_remind_distance = (event) => {
    event.preventDefault();
    const FromValues = {
      remind_name: forms.remind_name,
      tel: forms.tel,
      email: forms.email,
      remind_location: forms.remind_location,
      gps: forms.gps,
      remind_width: forms.remind_width,
      remind_distance: event.target.value,
      remind_area: forms.remind_area,
      land_number: forms.land_number,
      remark: forms.remark,
    }
    setForms(FromValues)
  }

  const handleChange_remind_area = (event) => {
    event.preventDefault();
    const FromValues = {
      remind_name: forms.remind_name,
      tel: forms.tel,
      email: forms.email,
      remind_location: forms.remind_location,
      gps: forms.gps,
      remind_width: forms.remind_width,
      remind_distance: forms.remind_distance,
      remind_area: event.target.value,
      land_number: forms.land_number,
      remark: forms.remark,
    }
    setForms(FromValues)
  }

  const handleChange_land_number = (event) => {
    event.preventDefault();
    const FromValues = {
      remind_name: forms.remind_name,
      tel: forms.tel,
      email: forms.email,
      remind_location: forms.remind_location,
      gps: forms.gps,
      remind_width: forms.remind_width,
      remind_distance: forms.remind_distance,
      remind_area: forms.remind_area,
      land_number: event.target.value,
      remark: forms.remark,
    }
    setForms(FromValues)
  }

  const handleChange_remark = (event) => {
    event.preventDefault();
    const FromValues = {
      remind_name: forms.remind_name,
      tel: forms.tel,
      email: forms.email,
      remind_location: forms.remind_location,
      gps: forms.gps,
      remind_width: forms.remind_width,
      remind_distance: forms.remind_distance,
      remind_area: forms.remind_area,
      land_number: forms.land_number,
      remark: event.target.value,
    }
    setForms(FromValues)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper
          elevation={3}
          sx={{
            p: 3,
            pt: 1,
            mt: 2,
            mb: 2,
          }}
        >
          <Box
            sx={{
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
                  <Typography variant="body2" color={checked_name === 1 ? null : "error"}>
                    ชื่อจริง-นามสุกล
                  </Typography>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    variant="standard"
                    autoFocus
                    value={forms.remind_name}
                    onChange={handleChange_remind_name}
                    error={checked_name === 1 ? false : true}
                    helperText={checked_name === 1 ? null : "Incorrect entry."}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color={checked_tel === 1 ? null : "error"}>
                    เบอร์โทรติดต่อ
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    id="tel"
                    name="tel"
                    variant="standard"
                    autoComplete="tel"
                    value={forms.tel}
                    onChange={handleChange_tel}
                    error={checked_tel === 1 ? false : true}
                    helperText={checked_tel === 1 ? null : "Incorrect entry."}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color={checked_email === 1 ? null : "error"}>
                    อีเมล
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    variant="standard"
                    name="email"
                    autoComplete="email"
                    value={forms.email}
                    onChange={handleChange_email}
                    error={checked_email === 1 ? false : true}
                    helperText={checked_email === 1 ? null : "Incorrect entry."}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    ที่อยู่ของผู้ลงทะเบียน
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    variant="standard"
                    name="remind_location"
                    id="remind_location"
                    value={forms.remind_location}
                    onChange={handleChange_remind_location}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    พิกัดสถานที่
                  </Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    name="gps"
                    id="gps"
                    value={forms.gps}
                    onChange={handleChange_gps}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <Divider sx={{ height: 20, m: 1 }} orientation="vertical" />
                          <IconButton type="button" sx={{ p: '10px' }} color="primary" onClick={getUserGeolocationDetails}>
                            <DirectionsIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2">
                    ขนาดพื้นที่
                  </Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    name="remind_area"
                    id="remind_area"
                    value={forms.remind_area}
                    onChange={handleChange_remind_area}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2">
                    หน้ากว้าง
                  </Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    name="remind_width"
                    id="remind_width"
                    value={forms.remind_width}
                    onChange={handleChange_remind_width}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2">
                    ระยะห่างถนน
                  </Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    name="remind_distance"
                    id="remind_distance"
                    value={forms.remind_distance}
                    onChange={handleChange_remind_distance}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    เลขที่ดิน
                  </Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    name="land_number"
                    id="land_number"
                    value={forms.land_number}
                    onChange={handleChange_land_number}
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
                    value={forms.remark}
                    onChange={handleChange_remark}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handle_sumbitForms}
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