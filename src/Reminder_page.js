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
import { useGeolocated } from "react-geolocated";

const theme = createTheme();

export default function SignUp() {

  const [forms, setForms] = React.useState([{ Name: "", Tell: "", Email: "", Owner_Name: "", Owner_Tell: "", Latitude: "", Longitude: "", Area_width: "", Area_road: "", Area_total: "", NumberArea: "", Remark: "" }]);
  const [size, setSize] = React.useState([{ farm: "", work: "", wa: "" }])
  const navigate = useNavigate();
  const [checked_name, setChecked_name] = React.useState(1)
  const [checked_tel, setChecked_tel] = React.useState(1)
  const [checked_email, setChecked_email] = React.useState(1)
  const [checked_NumberArea, setChecked_NumberArea] = React.useState(1)
  const [checked_Latitude_Longitude, setChecked_Latitude_Longitude] = React.useState(1)
  const { coords } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const getLocation = () => {
    const FromValues = {
      Name: forms.Name,
      Tell: forms.Tell,
      Email: forms.Email,
      Owner_Name: forms.Owner_Name,
      Owner_Tell: forms.Owner_Tell,
      Latitude: coords.latitude ?? null,
      Longitude: coords.longitude ?? null,
      Area_width: forms.Area_width,
      Area_road: forms.Area_road,
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
    }
    setForms(FromValues)
  }


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
      if (!forms.NumberArea && !forms.Latitude && !forms.Longitude) {
        alert('กรุณากรอกข้อมูล พิกัดสถานที่ หรือ เลขที่ฉโฉนดที่ดิน')
        setChecked_NumberArea(0)
        setChecked_Latitude_Longitude(0)
      } else {
        setChecked_name(1)
        setChecked_tel(1)
        setChecked_email(1)

        const body = {
          Name: forms.Name,
          Tell: forms.Tell,
          Email: forms.Email,
          Owner_Name: forms.Owner_Name,
          Owner_Tell: forms.Owner_Tell,
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
  }

  const handleChange_remind_name = (event) => {
    event.preventDefault();
    const FromValues = {
      Name: event.target.value,
      Tell: forms.Tell,
      Email: forms.Email,
      Owner_Name: forms.Owner_Name,
      Owner_Tell: forms.Owner_Tell,
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
      Owner_Name: forms.Owner_Name,
      Owner_Tell: forms.Owner_Tell,
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
      Owner_Name: forms.Owner_Name,
      Owner_Tell: forms.Owner_Tell,
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

  const handleChange_Owner_Name = (event) => {
    event.preventDefault();
    const FromValues = {
      Name: forms.Name,
      Tell: forms.Tell,
      Email: forms.Email,
      Owner_Name: event.target.value,
      Owner_Tell: forms.Owner_Tell,
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

  const handleChange_Owner_Tell = (event) => {
    event.preventDefault();
    const FromValues = {
      Name: forms.Name,
      Tell: forms.Tell,
      Email: forms.Email,
      Owner_Name: forms.Owner_Name,
      Owner_Tell: event.target.value,
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
      Owner_Name: forms.Owner_Name,
      Owner_Tell: forms.Owner_Tell,
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
      Owner_Name: forms.Owner_Name,
      Owner_Tell: forms.Owner_Tell,
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
      Owner_Name: forms.Owner_Name,
      Owner_Tell: forms.Owner_Tell,
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
      Owner_Name: forms.Owner_Name,
      Owner_Tell: forms.Owner_Tell,
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
                ลงทะเบียนผู้แจ้ง
              </Typography>
              <Box component="form" noValidate sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ pb: 1 }} color={checked_name === 1 ? null : "error"}>
                      ชื่อจริง-นามสุกล (ผู้แจ้ง)
                    </Typography>
                    <TextField
                      size="small"
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      autoFocus
                      value={forms.Name}
                      onChange={handleChange_remind_name}
                      error={checked_name === 1 ? false : true}
                      helperText={checked_name === 1 ? null : "Incorrect entry."}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ pb: 1 }} color={checked_tel === 1 ? null : "error"}>
                      เบอร์โทรติดต่อ (ผู้แจ้ง)
                    </Typography>
                    <TextField
                      size="small"
                      required
                      fullWidth
                      id="tel"
                      name="tel"
                      value={forms.Tell}
                      onChange={handleChange_tel}
                      error={checked_tel === 1 ? false : true}
                      helperText={checked_tel === 1 ? null : "Incorrect entry."}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ pb: 1 }} color={checked_email === 1 ? null : "error"}>
                      อีเมล (ผู้แจ้ง)
                    </Typography>
                    <TextField
                      size="small"
                      required
                      fullWidth
                      id="email"
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
                      ชื่อจริง-นามสกุล (เจ้าของที่ดิน)
                    </Typography>
                    <TextField
                      size="small"
                      required
                      fullWidth
                      id="Owner_Name"
                      name="Owner_Name"
                      value={forms.Owner_Name}
                      onChange={handleChange_Owner_Name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ pb: 1 }} >
                      เบอร์โทรติดต่อ (เจ้าของที่ดิน)
                    </Typography>
                    <TextField
                      size="small"
                      required
                      fullWidth
                      id="Owner_Tell"
                      name="Owner_Tell"
                      value={forms.Owner_Tell}
                      onChange={handleChange_Owner_Tell}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ pb: 1 }} color={checked_Latitude_Longitude === 1 ? null : "error"}>
                      พิกัดสถานที่
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      //variant="standard"
                      name="gps"
                      id="gps"
                      value={!forms.Latitude ? null : `${forms.Latitude}, ${forms.Longitude}`}
                      error={checked_Latitude_Longitude === 1 ? false : true}
                      helperText={checked_Latitude_Longitude === 1 ? null : "Incorrect entry."}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <Divider sx={{ height: 20, m: 1 }} orientation="vertical" />
                            <IconButton type="button" sx={{ p: '10px' }} color="primary" onClick={getLocation}>
                              <DirectionsIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ pb: 1 }} color={checked_NumberArea === 1 ? null : "error"}>
                      เลขที่ฉโฉนดที่ดิน
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      //variant="standard"
                      name="land_number"
                      id="land_number"
                      value={forms.NumberArea}
                      onChange={handleChange_land_number}
                      error={checked_NumberArea === 1 ? false : true}
                      helperText={checked_NumberArea === 1 ? null : "Incorrect entry."}
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
                            <Typography variant="body2" >
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
                            <Typography variant="body2">
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
                            <Typography variant="body2">
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
                            <Typography variant="body2">
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
                            <Typography variant="body2">
                              เมตร
                            </Typography>
                          </React.Fragment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 1 }}>
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