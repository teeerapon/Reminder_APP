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
import InputAdornment from '@mui/material/InputAdornment';
import { Outlet, useNavigate } from "react-router";
import AnimatedPage from './AnimatedPage';
import Axios from "axios"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const theme = createTheme();

export default function SignUp() {

  const [forms, setForms] = React.useState([{ Name: "", Tell: "", Email: "", Owner_Name: "", Owner_Tell: "", Latitude: "", Longitude: "", Area_width: "", Area_total: "", NumberArea: "", Remark: "", Tambol: "", District: "", Province: "", Postcode: "" }]);
  const [size, setSize] = React.useState([{ farm: "", work: "", wa: "" }])
  const navigate = useNavigate();
  const [checked_name, setChecked_name] = React.useState(1)
  const [checked_tel, setChecked_tel] = React.useState(1)
  const [checked_Owner_Name, setChecked_Owner_Name] = React.useState(1)
  const [checked_Owner_Tell, setChecked_Owner_Tell] = React.useState(1)
  const [checked_email, setChecked_email] = React.useState(1)
  const [checked_NumberArea, setChecked_NumberArea] = React.useState(1)
  const [checked_Tambol, setChecked_Tambol] = React.useState(1)
  const [checked_District, setChecked_District] = React.useState(1)
  const [checked_Province, setChecked_Province] = React.useState(1)
  const [checked_Postcode, setChecked_Postcode] = React.useState(1)
  const [checked_Latitude, setChecked_Latitude] = React.useState(1)
  const [checked_Longitude, setChecked_Longitude] = React.useState(1)
  const [showOwner, setShowOwner] = React.useState(false)
  const [value, setValue] = React.useState('');
  const [showGPS, setShowGPS] = React.useState(false)
  const [valueGPS, setValueGPS] = React.useState('');

  const handleChange_ShowOwner = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setShowOwner(true);
  };

  const handleChange_ShowGPS = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueGPS(event.target.value);
    setShowGPS(true);
  };

  const handle_sumbitForms = (event) => {
    event.preventDefault();
    if (!forms.Name && !forms.Tell && !forms.Email) {
      setChecked_name(0)
      setChecked_tel(0)
      setChecked_email(0)
    } else if (showOwner === false) {
      alert('กรุณาระบุประเภทของผู้เสนอที่ดิน')
    } else if (!forms.Owner_Name && !forms.Owner_Tell) {
      setChecked_Owner_Name(0)
      setChecked_Owner_Tell(0)
    } else if (showGPS === false) {
      alert('กรุณาระบุประเภทของที่ดิน')
    } else if (!forms.NumberArea && !forms.Latitude && !forms.Longitude) {
      setChecked_NumberArea(0)
      setChecked_Latitude(0)
      setChecked_Longitude(0)
    } else if (!forms.Tambol && !forms.District && !forms.Province && !forms.Postcode) {
      setChecked_Tambol(0)
      setChecked_District(0)
      setChecked_Province(0)
      setChecked_Postcode(0)
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
        Area_total: ((!size.farm ? 0 : size.farm) * 1600) + ((!size.work ? 0 : size.work) * 400) + ((!size.wa ? 0 : size.wa) * 4),
        NumberArea: forms.NumberArea,
        Remark: forms.Remark,
        Owner_Type: value,
        Area_Type: valueGPS,
        Tambol: forms.Tambol,
        District: forms.District,
        Province: forms.Province,
        Postcode: forms.Postcode
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
      Owner_Name: forms.Owner_Name,
      Owner_Tell: forms.Owner_Tell,
      Latitude: forms.Latitude,
      Longitude: forms.Longitude,
      Area_width: forms.Area_width,
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
      Tambol: forms.Tambol,
      District: forms.District,
      Province: forms.Province,
      Postcode: forms.Postcode
    }
    setForms(FromValues)
    setChecked_name(1)
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
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
      Tambol: forms.Tambol,
      District: forms.District,
      Province: forms.Province,
      Postcode: forms.Postcode
    }
    setForms(FromValues)
    setChecked_tel(1)
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
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
      Tambol: forms.Tambol,
      District: forms.District,
      Province: forms.Province,
      Postcode: forms.Postcode
    }
    setForms(FromValues)
    setChecked_email(1)
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
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
      Tambol: forms.Tambol,
      District: forms.District,
      Province: forms.Province,
      Postcode: forms.Postcode
    }
    setForms(FromValues)
    setChecked_Owner_Name(1)
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
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
      Tambol: forms.Tambol,
      District: forms.District,
      Province: forms.Province,
      Postcode: forms.Postcode
    }
    setForms(FromValues)
    setChecked_Owner_Tell(1)
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
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
      Tambol: forms.Tambol,
      District: forms.District,
      Province: forms.Province,
      Postcode: forms.Postcode
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

  const handleChange_Latitude = (event) => {
    event.preventDefault();
    const FromValues = {
      Name: forms.Name,
      Tell: forms.Tell,
      Email: forms.Email,
      Owner_Name: forms.Owner_Name,
      Owner_Tell: forms.Owner_Tell,
      Latitude: event.target.value,
      Longitude: forms.Longitude,
      Area_width: forms.Area_width,
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
      Tambol: forms.Tambol,
      District: forms.District,
      Province: forms.Province,
      Postcode: forms.Postcode
    }
    setForms(FromValues)
    setChecked_NumberArea(1)
    setChecked_Latitude(1)
    setChecked_Longitude(1)
    setChecked_NumberArea(1)
  }

  const handleChange_Longitude = (event) => {
    event.preventDefault();
    const FromValues = {
      Name: forms.Name,
      Tell: forms.Tell,
      Email: forms.Email,
      Owner_Name: forms.Owner_Name,
      Owner_Tell: forms.Owner_Tell,
      Latitude: forms.Latitude,
      Longitude: event.target.value,
      Area_width: forms.Area_width,
      Area_total: forms.Area_total,
      NumberArea: event.target.value,
      Remark: forms.Remark,
      Tambol: forms.Tambol,
      District: forms.District,
      Province: forms.Province,
      Postcode: forms.Postcode
    }
    setForms(FromValues)
    setChecked_NumberArea(1)
    setChecked_Latitude(1)
    setChecked_Longitude(1)
    setChecked_NumberArea(1)
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
      Area_total: forms.Area_total,
      NumberArea: event.target.value,
      Remark: forms.Remark,
      Tambol: forms.Tambol,
      District: forms.District,
      Province: forms.Province,
      Postcode: forms.Postcode
    }
    setForms(FromValues)
    setChecked_NumberArea(1)
    setChecked_Latitude(1)
    setChecked_Longitude(1)
    setChecked_NumberArea(1)
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
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: event.target.value,
      Tambol: forms.Tambol,
      District: forms.District,
      Province: forms.Province,
      Postcode: forms.Postcode
    }
    setForms(FromValues)
  }

  const handleChange_Tambol = (event) => {
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
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
      Tambol: event.target.value,
      District: forms.District,
      Province: forms.Province,
      Postcode: forms.Postcode
    }
    setForms(FromValues)
    setChecked_Tambol(1)
  }

  const handleChange_District = (event) => {
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
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
      Tambol: forms.Tambol,
      District: event.target.value,
      Province: forms.Province,
      Postcode: forms.Postcode
    }
    setForms(FromValues)
    setChecked_District(1)
  }

  const handleChange_Province = (event) => {
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
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
      Tambol: forms.Tambol,
      District: forms.District,
      Province: event.target.value,
      Postcode: forms.Postcode
    }
    setForms(FromValues)
    setChecked_Province(1)
  }

  const handleChange_Postcode = (event) => {
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
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
      Tambol: forms.Tambol,
      District: forms.District,
      Province: forms.Province,
      Postcode: event.target.value
    }
    setForms(FromValues)
    setChecked_Postcode(1)
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
                    <Typography variant="body2" color={checked_name === 1 ? null : "error"}>
                      ชื่อจริง-นามสุกล (ผู้แจ้ง) *
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
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
                    <Typography variant="body2" color={checked_tel === 1 ? null : "error"}>
                      เบอร์โทรติดต่อ (ผู้แจ้ง) *
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
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
                    <Typography variant="body2" color={checked_email === 1 ? null : "error"}>
                      อีเมล (ผู้แจ้ง) *
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
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
                    <FormControl>
                      <RadioGroup row value={value} onChange={handleChange_ShowOwner}>
                        <FormControlLabel value="เจ้าของที่ดิน" control={<Radio size="small" />} label={<Typography variant="body2">เจ้าของที่ดิน</Typography>} />
                        <FormControlLabel value="นายหน้าขายที่ดิน" control={<Radio size="small" />} label={<Typography variant="body2">นายหน้าขายที่ดิน</Typography>} />
                        {/* <FormControlLabel value="อื่น ๆ" control={<Radio />} label={<Typography variant="body2">อื่น ๆ</Typography>} /> */}
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color={checked_Owner_Name === 1 ? null : "error"}>
                      ชื่อจริง-นามสกุล {showOwner === true ? `(${value})` : null} *
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      required
                      fullWidth
                      id="Owner_Name"
                      name="Owner_Name"
                      value={forms.Owner_Name}
                      onChange={handleChange_Owner_Name}
                      error={checked_Owner_Name === 1 ? false : true}
                      helperText={checked_Owner_Name === 1 ? null : "Incorrect entry."}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color={checked_Owner_Tell === 1 ? null : "error"}>
                      เบอร์โทรติดต่อ {showOwner === true ? `(${value})` : null} *
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      required
                      fullWidth
                      id="Owner_Tell"
                      name="Owner_Tell"
                      value={forms.Owner_Tell}
                      onChange={handleChange_Owner_Tell}
                      error={checked_Owner_Tell === 1 ? false : true}
                      helperText={checked_Owner_Tell === 1 ? null : "Incorrect entry."}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl>
                      <RadioGroup row value={valueGPS} onChange={handleChange_ShowGPS}>
                        <FormControlLabel value="ที่ดินเปล่า" control={<Radio size="small" />} label={<Typography variant="body2">ที่ดินเปล่า</Typography>} />
                        <FormControlLabel value="ที่ดินพร้อมสิ่งปลูกสร้าง" control={<Radio size="small" />} label={<Typography variant="body2">ที่ดินพร้อมสิ่งปลูกสร้าง</Typography>} />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      พิกัดสถานที่
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      size="small"
                      fullWidth
                      //variant="standard"
                      name="latitude"
                      id="latitude"
                      value={forms.Latitude}
                      onChange={handleChange_Latitude}
                      error={checked_Latitude === 1 ? false : true}
                      helperText={checked_Latitude === 1 ? null : "Incorrect entry."}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography variant="body2" color="black">
                              Latitude
                            </Typography>
                            <Divider sx={{ height: 20, m: 1 }} orientation="vertical" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      size="small"
                      fullWidth
                      //variant="standard"
                      name="longitude"
                      id="longitude"
                      value={forms.Longitude}
                      onChange={handleChange_Longitude}
                      error={checked_Longitude === 1 ? false : true}
                      helperText={checked_Longitude === 1 ? null : "Incorrect entry."}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography variant="body2" color="black">
                              Longitude
                            </Typography>
                            <Divider sx={{ height: 20, m: 1 }} orientation="vertical" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color={checked_NumberArea === 1 ? null : "error"}>
                      เลขที่ฉโฉนดที่ดิน (แปลงใดแปลงหนึ่ง ถ้ามี)
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
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
                      ข้อมูลที่อยู่ที่ดิน *
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      size="small"
                      fullWidth
                      name="Province"
                      id="Province"
                      value={forms.Province}
                      onChange={handleChange_Province}
                      InputProps={{
                        startAdornment: (
                          <React.Fragment>
                            <Typography variant="body2">
                              จังหวัด
                            </Typography>
                            <Divider sx={{ height: 20, m: 1 }} orientation="vertical" />
                          </React.Fragment>
                        ),
                      }}
                      error={checked_Province === 1 ? false : true}
                      helperText={checked_Province === 1 ? null : "Incorrect entry."}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      size="small"
                      fullWidth
                      name="District"
                      id="District"
                      value={forms.District}
                      onChange={handleChange_District}
                      InputProps={{
                        startAdornment: (
                          <React.Fragment>
                            <Typography variant="body2">
                              อำเภอ
                            </Typography>
                            <Divider sx={{ height: 20, m: 1 }} orientation="vertical" />
                          </React.Fragment>
                        ),
                      }}
                      error={checked_District === 1 ? false : true}
                      helperText={checked_District === 1 ? null : "Incorrect entry."}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      size="small"
                      fullWidth
                      name="Tambol"
                      id="Tambol"
                      value={forms.Tambol}
                      onChange={handleChange_Tambol}
                      InputProps={{
                        startAdornment: (
                          <React.Fragment>
                            <Typography variant="body2">
                              ตำบล
                            </Typography>
                            <Divider sx={{ height: 20, m: 1 }} orientation="vertical" />
                          </React.Fragment>
                        ),
                      }}
                      error={checked_Tambol === 1 ? false : true}
                      helperText={checked_Tambol === 1 ? null : "Incorrect entry."}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      size="small"
                      fullWidth
                      name="Postcode"
                      id="Postcode"
                      value={forms.Postcode}
                      onChange={handleChange_Postcode}
                      InputProps={{
                        startAdornment: (
                          <React.Fragment>
                            <Typography variant="body2">
                              ไปรษณีย์
                            </Typography>
                            <Divider sx={{ height: 20, m: 1 }} orientation="vertical" />
                          </React.Fragment>
                        ),
                      }}
                      error={checked_Postcode === 1 ? false : true}
                      helperText={checked_Postcode === 1 ? null : "Incorrect entry."}
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
                  <Grid item xs={12}>
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
                  <Grid item xs={12} sx={{ mt: 1 }}>
                    <TextField
                      size="small"
                      fullWidth
                      name="remark"
                      label="รายละเอียดอื่น ๆ"
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