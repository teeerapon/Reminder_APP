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
import { Outlet, useNavigate } from "react-router";
import AnimatedPage from './AnimatedPage';
import Axios from "axios"

const theme = createTheme();

export default function SignUp() {

  const [forms, setForms] = React.useState([{ Name: "", Tell: "", Email: "", Latitude: "", Longitude: "", Area_width: "", Area_road: "", Area_total: "", NumberArea: "", Remark: "" }]);
  const [size, setSize] = React.useState([{ farm: "", work: "", wa: "" }])
  const navigate = useNavigate();
  const [checked_name, setChecked_name] = React.useState(1)
  const [checked_tel, setChecked_tel] = React.useState(1)
  const [checked_email, setChecked_email] = React.useState(1)
  const [location, setLocation] = React.useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
    const FromValues = {
      Name: forms.Name,
      Tell: forms.Tell,
      Email: forms.Email,
      Latitude: location.coords.latitude,
      Longitude: location.coords.longitude,
      Area_width: forms.Area_width,
      Area_road: forms.Area_road,
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
    }
    setForms(FromValues)
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  const getUserGeolocationDetails = (event) => {
    event.preventDefault();
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  const handle_sumbitForms = (event) => {
    event.preventDefault();
    if (!forms.Name && !forms.Tell && !forms.Email) {
      setChecked_name(0)
      setChecked_tel(0)
      setChecked_email(0)
    } else if ((!forms.Name && !forms.Tell) && forms.Email !== undefined) {
      setChecked_name(0)
      setChecked_tel(0)
      setChecked_email(1)
    } else if ((!forms.Name && !forms.Email) && forms.Tell !== undefined) {
      setChecked_name(0)
      setChecked_tel(1)
      setChecked_email(0)
    } else if ((!forms.Tell && !forms.Email) && forms.Name !== undefined) {
      setChecked_name(1)
      setChecked_tel(0)
      setChecked_email(0)
    } else if (!forms.Tell && (forms.Email && forms.Name !== undefined)) {
      setChecked_name(1)
      setChecked_tel(0)
      setChecked_email(1)
    } else if (!forms.Email && (forms.Tell && forms.Name !== undefined)) {
      setChecked_name(1)
      setChecked_tel(1)
      setChecked_email(0)
    } else if (!forms.Name && (forms.Tell && forms.Email !== undefined)) {
      setChecked_name(0)
      setChecked_tel(1)
      setChecked_email(1)
    } else {
      setChecked_name(1)
      setChecked_tel(1)
      setChecked_email(1)

      const body = {
        Name: forms.Name,
        Tell: forms.Tell,
        Email: forms.Email,
        Latitude: forms.Latitude,
        Longitude: forms.Longitude,
        Area_width: forms.Area_width,
        Area_road: forms.Area_road,
        Area_total: ((!size.farm ? 0 : size.farm) * 1600) + ((!size.work ? 0 : size.work) * 400) + ((!size.wa ? 0 : size.wa) * 4),
        NumberArea: forms.NumberArea,
        Remark: forms.Remark,
      }
      const headers = {
        'Authorization': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      };
      Axios.post('http://vpnptec.dyndns.org:32001/api/NewNTI_Station_Create', body, { headers })
        .then(response => {
          if (response) {
            navigate('/Successfully_Page')
          }
        })
    }
  }

  const handleChange_remind_name = (event) => {
    event.preventDefault();
    const FromValues = {
      Name: event.target.value,
      Tell: forms.Tell,
      Email: forms.Email,
      Latitude: forms.Latitude,
      Longitude: forms.Longitude,
      Area_width: forms.Area_width,
      Area_road: forms.Area_road,
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
    }
    setForms(FromValues)
  }

  const handleChange_tel = (event) => {
    event.preventDefault();
    const FromValues = {
      Name: forms.Name,
      Tell: event.target.value,
      Email: forms.Email,
      Latitude: forms.Latitude,
      Longitude: forms.Longitude,
      Area_width: forms.Area_width,
      Area_road: forms.Area_road,
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
    }
    setForms(FromValues)
  }


  const handleChange_email = (event) => {
    event.preventDefault();
    const FromValues = {
      Name: forms.Name,
      Tell: forms.Tell,
      Email: event.target.value,
      Latitude: forms.Latitude,
      Longitude: forms.Longitude,
      Area_width: forms.Area_width,
      Area_road: forms.Area_road,
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
    }
    setForms(FromValues)
  }

  const handleChange_Area_width = (event) => {
    event.preventDefault();
    const FromValues = {
      Name: forms.Name,
      Tell: forms.Tell,
      Email: forms.Email,
      Latitude: forms.Latitude,
      Longitude: forms.Longitude,
      Area_width: event.target.value,
      Area_road: forms.Area_road,
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
    }
    setForms(FromValues)
  }

  const handleChange_Area_road = (event) => {
    event.preventDefault();
    const FromValues = {
      Name: forms.Name,
      Tell: forms.Tell,
      Email: forms.Email,
      Latitude: forms.Latitude,
      Longitude: forms.Longitude,
      Area_width: forms.Area_width,
      Area_road: event.target.value,
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
    }
    setForms(FromValues)
  }

  const handleChange_size_farm = (event) => {
    event.preventDefault();
    const FromValues = {
      farm: event.target.value,
      work: size.work,
      wa: size.wa
    }
    setSize(FromValues)
  }

  const handleChange_size_work = (event) => {
    event.preventDefault();
    const FromValues = {
      farm: size.farm,
      work: event.target.value,
      wa: size.wa
    }
    setSize(FromValues)
  }

  const handleChange_size_wa = (event) => {
    event.preventDefault();
    const FromValues = {
      farm: size.farm,
      work: size.work,
      wa: event.target.value
    }
    setSize(FromValues)
  }

  const handleChange_land_number = (event) => {
    event.preventDefault();
    const FromValues = {
      Name: forms.Name,
      Tell: forms.Tell,
      Email: forms.Email,
      Latitude: forms.Latitude,
      Longitude: forms.Longitude,
      Area_width: forms.Area_width,
      Area_road: forms.Area_road,
      Area_total: forms.Area_total,
      NumberArea: event.target.value,
      Remark: forms.Remark,
    }
    setForms(FromValues)
  }

  const handleChange_remark = (event) => {
    event.preventDefault();
    const FromValues = {
      Name: forms.Name,
      Tell: forms.Tell,
      Email: forms.Email,
      Latitude: forms.Latitude,
      Longitude: forms.Longitude,
      Area_width: forms.Area_width,
      Area_road: forms.Area_road,
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: event.target.value,
    }
    setForms(FromValues)
  }

  return (
    <ThemeProvider theme={theme}>
      <AnimatedPage>
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
              <Box component="form" noValidate sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ pb: 1 }} color={checked_name === 1 ? null : "error"}>
                      ชื่อจริง-นามสุกล
                    </Typography>
                    <TextField
                      size="small"
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      //variant="standard"
                      autoFocus
                      value={forms.Name}
                      onChange={handleChange_remind_name}
                      error={checked_name === 1 ? false : true}
                      helperText={checked_name === 1 ? null : "Incorrect entry."}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ pb: 1 }} color={checked_tel === 1 ? null : "error"}>
                      เบอร์โทรติดต่อ
                    </Typography>
                    <TextField
                      size="small"
                      required
                      fullWidth
                      id="tel"
                      name="tel"
                      //variant="standard"
                      autoComplete="tel"
                      value={forms.Tell}
                      onChange={handleChange_tel}
                      error={checked_tel === 1 ? false : true}
                      helperText={checked_tel === 1 ? null : "Incorrect entry."}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ pb: 1 }} color={checked_email === 1 ? null : "error"}>
                      อีเมล
                    </Typography>
                    <TextField
                      size="small"
                      required
                      fullWidth
                      id="email"
                      //variant="standard"
                      name="email"
                      autoComplete="email"
                      value={forms.Email}
                      onChange={handleChange_email}
                      error={checked_email === 1 ? false : true}
                      helperText={checked_email === 1 ? null : "Incorrect entry."}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ pb: 1 }}>
                      พิกัดสถานที่
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      //variant="standard"
                      name="gps"
                      id="gps"
                      value={!forms.Latitude ? null : `${forms.Latitude}, ${forms.Longitude}`}
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
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      ขนาดพื้นที่
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      size="small"
                      fullWidth
                      name="Area_width"
                      id="Area_width"
                      value={size.farm}
                      onChange={handleChange_size_farm}
                      InputProps={{
                        endAdornment: (
                          <React.Fragment>
                            <Divider sx={{ height: 20, m: 1 }} orientation="vertical" />
                            <Typography variant="body2" sx={{ pr: 2 }}>
                              ไร่
                            </Typography>
                          </React.Fragment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      size="small"
                      fullWidth
                      name="work"
                      id="work"
                      value={size.work}
                      onChange={handleChange_size_work}
                      InputProps={{
                        endAdornment: (
                          <React.Fragment>
                            <Divider sx={{ height: 20, m: 1 }} orientation="vertical" />
                            <Typography variant="body2" sx={{ pr: 2 }}>
                              งาน
                            </Typography>
                          </React.Fragment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      size="small"
                      fullWidth
                      name="wa"
                      id="wa"
                      value={size.wa}
                      onChange={handleChange_size_wa}
                      InputProps={{
                        endAdornment: (
                          <React.Fragment>
                            <Divider sx={{ height: 20, m: 1 }} orientation="vertical" />
                            <Typography variant="body2" sx={{ pr: 2 }}>
                              ตร.ว.
                            </Typography>
                          </React.Fragment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ pb: 1 }}>
                      หน้ากว้าง
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      //variant="standard"
                      name="Area_width"
                      id="Area_width"
                      value={forms.Area_width}
                      onChange={handleChange_Area_width}
                      InputProps={{
                        endAdornment: (
                          <React.Fragment>
                            <Divider sx={{ height: 20, m: 1 }} orientation="vertical" />
                            <Typography variant="body2" sx={{ pr: 2 }}>
                              เมตร
                            </Typography>
                          </React.Fragment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ pb: 1 }}>
                      ระยะห่างถนน
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      //variant="standard"
                      name="Area_road"
                      id="Area_road"
                      value={forms.Area_road}
                      onChange={handleChange_Area_road}
                      InputProps={{
                        endAdornment: (
                          <React.Fragment>
                            <Divider sx={{ height: 20, m: 1 }} orientation="vertical" />
                            <Typography variant="body2" sx={{ pr: 2 }}>
                              เมตร
                            </Typography>
                          </React.Fragment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ pb: 1 }}>
                      เลขที่ดิน
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      //variant="standard"
                      name="land_number"
                      id="land_number"
                      value={forms.NumberArea}
                      onChange={handleChange_land_number}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      fullWidth
                      name="remark"
                      label="อื่น ๆ"
                      multiline
                      rows={2}
                      id="remark"
                      value={forms.Remark}
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
      </AnimatedPage>
      <Outlet />
    </ThemeProvider>
  );
}