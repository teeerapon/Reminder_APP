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
import { Outlet, useNavigate } from "react-router";
import AnimatedPage from './AnimatedPage';
import Axios from "axios"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';

const theme = createTheme();

export default function SignUp() {

  const [forms, setForms] = React.useState([{ Name: "", Tell: "", Email: "", Owner_Name: "", Owner_Tell: "", Area_width: "", Area_total: "", NumberArea: "", Remark: "", Tambol: "", District: "", Province: "", Postcode: "", sum_la_lo: "" }]);
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
  const [showOwner, setShowOwner] = React.useState(false)
  const [value, setValue] = React.useState('');
  const [showGPS, setShowGPS] = React.useState(false)
  const [valueGPS, setValueGPS] = React.useState('');
  const [showOfferType, setShowOfferType] = React.useState(false)
  const [valueOfferType, setvalueOfferType] = React.useState('');
  const [provinces_List, setProvinces_List] = React.useState([]);
  const [amphures_List, setAmphures_List] = React.useState([])
  const [districts_List, setDistricts_List] = React.useState([]);

  React.useEffect(() => {
    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    Axios.get('http://vpnptec.dyndns.org:32001/api/Provinces_List', { headers })
      .then(response => setProvinces_List(response.data));


  }, []);

  const handleChange_districts_List = (event, name) => {
    event.preventDefault();
    const FromValues = {
      Name: forms.Name,
      Tell: forms.Tell,
      Email: forms.Email,
      Owner_Name: forms.Owner_Name,
      Owner_Tell: forms.Owner_Tell,
      Area_width: forms.Area_width,
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
      Tambol: event.target.value,
      District: forms.District,
      Province: forms.Province,
      Postcode: name.props.name,
      sum_la_lo: forms.sum_la_lo
    }
    setForms(FromValues)
    setChecked_Tambol(1)
    setChecked_Postcode(1)
  };

  const handleChange_amphures_List = (event, name) => {
    event.preventDefault();
    const FromValues = {
      Name: forms.Name,
      Tell: forms.Tell,
      Email: forms.Email,
      Owner_Name: forms.Owner_Name,
      Owner_Tell: forms.Owner_Tell,
      Area_width: forms.Area_width,
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
      Tambol: forms.Tambol,
      District: event.target.value,
      Province: forms.Province,
      Postcode: forms.Postcode,
      sum_la_lo: forms.sum_la_lo
    }
    setForms(FromValues)

    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    Axios.get('http://vpnptec.dyndns.org:32001/api/Districts_List', { headers })
      .then(response => {
        setDistricts_List(Array.prototype.filter.call((response.data), (x) => x.amphure_id == name.props.name))
        setChecked_District(1)
      });

  };

  const handleChange_provinces_List = (event, name) => {
    event.preventDefault();
    setChecked_Province(1)
    const FromValues = {
      Name: forms.Name,
      Tell: forms.Tell,
      Email: forms.Email,
      Owner_Name: forms.Owner_Name,
      Owner_Tell: forms.Owner_Tell,
      Area_width: forms.Area_width,
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
      Tambol: forms.Tambol,
      District: forms.District,
      Province: event.target.value,
      Postcode: forms.Postcode,
      sum_la_lo: forms.sum_la_lo
    }
    setForms(FromValues)

    const headers = {
      'Authorization': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    Axios.get('http://vpnptec.dyndns.org:32001/api/Amphures_List', { headers })
      .then(response => {
        setAmphures_List(Array.prototype.filter.call((response.data), (x) => x.province_id == name.props.name))
      });

  };

  const handleChange_ShowOwner = (event) => {
    setValue(event.target.value);
    setShowOwner(true);
  };

  const handleChange_ShowGPS = (event) => {
    setValueGPS(event.target.value);
    setShowGPS(true);
  };

  const handleChange_ShowOfferType = (event) => {
    setvalueOfferType(event.target.value);
    setShowOfferType(true);
  };

  const handle_sumbitForms = (event) => {
    event.preventDefault();
    if (!forms.Name && !forms.Tell && !forms.Email) {
      alert('กรุณาระบุข้อมูลผู้แจ้ง')
      setChecked_name(0)
      setChecked_tel(0)
      setChecked_email(0)
    } else if (showOwner === false) {
      alert('กรุณาระบุประเภทของผู้เสนอที่ดิน')
    } else if (!forms.Owner_Name && !forms.Owner_Tell) {
      alert('กรุณาระบุข้อมูล' + value)
      setChecked_Owner_Name(0)
      setChecked_Owner_Tell(0)
    } else if (showGPS === false) {
      alert('กรุณาระบุประเภทของที่ดิน')
    } else if (!forms.NumberArea && !forms.sum_la_lo) {
      alert('กรุณาระบุข้อมูลพิกัดสถานที่หรือเลขที่โฉนดที่ดิน อย่างใดอย่างนึง')
      setChecked_NumberArea(0)
      setChecked_Latitude(0)
    } else if (!forms.District && !forms.Province) {
      alert('กรุณาระบุข้อมูลข้อมูลที่อยู่ที่ดิน')
      setChecked_Tambol(0)
      setChecked_District(0)
      setChecked_Province(0)
      setChecked_Postcode(0)
    } else {
      setChecked_name(1)
      setChecked_tel(1)
      setChecked_email(1)

      const latitude = forms.sum_la_lo.split(',')[0]
      const logtitude = forms.sum_la_lo.split(',')[1]

      const body = {
        Name: forms.Name,
        Tell: forms.Tell,
        Email: forms.Email,
        Owner_Name: forms.Owner_Name,
        Owner_Tell: forms.Owner_Tell,
        Latitude: latitude,
        Longitude: logtitude,
        Area_width: forms.Area_width,
        Area_total: ((!size.farm ? 0 : size.farm) * 1600) + ((!size.work ? 0 : size.work) * 400) + ((!size.wa ? 0 : size.wa) * 4),
        NumberArea: forms.NumberArea,
        Remark: forms.Remark,
        Owner_Type: value,
        Area_Type: valueGPS,
        Tambol: forms.Tambol,
        District: forms.District,
        Province: forms.Province,
        Postcode: forms.Postcode,
        OfferType: valueOfferType
      }

      console.log(body);
      const headers = {
        'Authorization': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      };


      console.log('in NewNTI_Station_Create #############');
      Axios.post('http://vpnptec.dyndns.org:32001/api/NewNTI_Station_Create', body, { headers })
        .then(response => {
          if (response) {
            navigate('/Successfully_Page')
          } else {
            alert('การบันทึกข้อมูลผิดพลาดกรุณาลองใหม่อีกครั้ง')
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
      Area_width: forms.Area_width,
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
      Tambol: forms.Tambol,
      District: forms.District,
      Province: forms.Province,
      Postcode: forms.Postcode,
      sum_la_lo: forms.sum_la_lo
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
      Area_width: forms.Area_width,
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
      Tambol: forms.Tambol,
      District: forms.District,
      Province: forms.Province,
      Postcode: forms.Postcode,
      sum_la_lo: forms.sum_la_lo
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
      Area_width: forms.Area_width,
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
      Tambol: forms.Tambol,
      District: forms.District,
      Province: forms.Province,
      Postcode: forms.Postcode,
      sum_la_lo: forms.sum_la_lo
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
      Area_width: forms.Area_width,
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
      Tambol: forms.Tambol,
      District: forms.District,
      Province: forms.Province,
      Postcode: forms.Postcode,
      sum_la_lo: forms.sum_la_lo
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
      Area_width: forms.Area_width,
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
      Tambol: forms.Tambol,
      District: forms.District,
      Province: forms.Province,
      Postcode: forms.Postcode,
      sum_la_lo: forms.sum_la_lo
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
      Area_width: event.target.value,
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
      Tambol: forms.Tambol,
      District: forms.District,
      Province: forms.Province,
      Postcode: forms.Postcode,
      sum_la_lo: forms.sum_la_lo
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

  const handleChange_Latitude_Longitude = (event) => {
    event.preventDefault();
    const FromValues = {
      Name: forms.Name,
      Tell: forms.Tell,
      Email: forms.Email,
      Owner_Name: forms.Owner_Name,
      Owner_Tell: forms.Owner_Tell,
      Area_width: forms.Area_width,
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: forms.Remark,
      Tambol: forms.Tambol,
      District: forms.District,
      Province: forms.Province,
      Postcode: forms.Postcode,
      sum_la_lo: event.target.value
    }
    setForms(FromValues)
    setChecked_Latitude(1)
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
      Area_width: forms.Area_width,
      Area_total: forms.Area_total,
      NumberArea: event.target.value,
      Remark: forms.Remark,
      Tambol: forms.Tambol,
      District: forms.District,
      Province: forms.Province,
      Postcode: forms.Postcode,
      sum_la_lo: forms.sum_la_lo
    }
    setForms(FromValues)
    setChecked_NumberArea(1)
    setChecked_Latitude(1)
  }

  const handleChange_remark = (event) => {
    event.preventDefault();
    const FromValues = {
      Name: forms.Name,
      Tell: forms.Tell,
      Email: forms.Email,
      Owner_Name: forms.Owner_Name,
      Owner_Tell: forms.Owner_Tell,
      Area_width: forms.Area_width,
      Area_total: forms.Area_total,
      NumberArea: forms.NumberArea,
      Remark: event.target.value,
      Tambol: forms.Tambol,
      District: forms.District,
      Province: forms.Province,
      Postcode: forms.Postcode,
      sum_la_lo: forms.sum_la_lo
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
                      type="number"
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
                      type="email"
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
                      type="number"
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
                    <FormControl>
                       <RadioGroup row value={valueOfferType} onChange={handleChange_ShowOfferType}>

                        <FormControlLabel value="ขาย" control={<Radio size="small" />} label={<Typography variant="body2">ขาย</Typography>} />
                        <FormControlLabel value="เช่า" control={<Radio size="small" />} label={<Typography variant="body2">เช่า</Typography>} />
                        <FormControlLabel value="ขาย/เช่า" control={<Radio size="small" />} label={<Typography variant="body2">ขาย/เช่า</Typography>} />
                        <FormControlLabel value="ทำปั้มเอง" control={<Radio size="small" />} label={<Typography variant="body2">ทำปั้มเอง</Typography>} />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color={checked_Latitude === 1 ? null : "error"}>
                      พิกัดสถานที่
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      fullWidth
                      //variant="standard"
                      name="latitude_logtitude"
                      id="latitude_logtitude"
                      value={forms.sum_la_lo}
                      onChange={handleChange_Latitude_Longitude}
                      error={checked_Latitude === 1 ? false : true}
                      helperText={checked_Latitude === 1 ? null : "Incorrect entry."}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color={checked_NumberArea === 1 ? null : "error"}>
                      เลขที่โฉนดที่ดิน (แปลงใดแปลงหนึ่ง ถ้ามี)
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
                    <FormControl fullWidth error={checked_Province === 0 ? true : false}>
                      <FormHelperText>จังหวัด</FormHelperText>
                      <Select size="small" onChange={(event, name) => handleChange_provinces_List(event, name)} value={forms.Province}>
                        {provinces_List.map((name) => (
                          <MenuItem
                            name={`${name.id}`}
                            value={`${name.name_th}`}
                          >
                            {name.name_th}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth disabled={!forms.Province ? true : false} error={checked_District === 0 ? true : false}>
                      <FormHelperText>อำเภอ/เขต</FormHelperText>
                      <Select size="small" onChange={(event, name) => handleChange_amphures_List(event, name)} value={forms.District}>
                        {amphures_List.map((name) => (
                          <MenuItem
                            name={name.id}
                            value={name.name_th}
                          >
                            {name.name_th}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                    <FormControl fullWidth disabled={!forms.District ? true : false} error={checked_Tambol === 0 ? true : false}>
                      <FormHelperText>ตำบล</FormHelperText>
                      <Select size="small" onChange={(event, name) => handleChange_districts_List(event, name)} value={forms.Tambol}>
                        {districts_List.map((name) => (
                          <MenuItem
                            name={name.zip_code}
                            value={name.name_th}
                          >
                            {name.name_th}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth disabled={!forms.Tambol ? true : false} error={checked_Postcode === 0 ? true : false}>
                      <FormHelperText>ไปรษณีย์</FormHelperText>
                      <TextField
                        size="small"
                        fullWidth
                        name="Postcode"
                        id="Postcode"
                        value={forms.Postcode}
                      />
                    </FormControl>
                  </Grid> */}
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