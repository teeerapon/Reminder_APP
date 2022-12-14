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
import Stack from '@mui/material/Stack';

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
  const [valueOwner, setValueOwner] = React.useState('');
  const [showGPS, setShowGPS] = React.useState(false)
  const [valueGPS, setValueGPS] = React.useState('');
  const [value_GPS, setValue_GPS] = React.useState('');
  const [showOfferType, setShowOfferType] = React.useState(false)
  const [valueOfferType, setvalueOfferType] = React.useState('');
  const [value_OfferType, setvalue_OfferType] = React.useState('');
  const [provinces_List, setProvinces_List] = React.useState([]);
  const [amphures_List, setAmphures_List] = React.useState([])
  const [districts_List, setDistricts_List] = React.useState([]);
  const [showOtherOfferType, setShowOtherOfferType] = React.useState(false)
  const [show_Owner, setShow_Owner] = React.useState(false)
  const [showValueGPS, setShowValueGPS] = React.useState(false)
  const [alerts, setAlerts] = React.useState()

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

  const handleChange_amphures_List = async (event, name) => {
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

    await Axios.get('http://vpnptec.dyndns.org:32001/api/Districts_List', { headers })
      .then(response => {
        setDistricts_List(Array.prototype.filter.call((response.data), (x) => x.amphure_id == name.props.name))
        setChecked_District(1)
      });

  };

  const handleChange_provinces_List = async (event, name) => {
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

    await Axios.get('http://vpnptec.dyndns.org:32001/api/Amphures_List', { headers })
      .then(response => {
        setAmphures_List(Array.prototype.filter.call((response.data), (x) => x.province_id == name.props.name))
      });

  };

  const handleChange_ShowOwner = (event) => {
    if (event.target.value === '???????????? ???') {
      setValue(event.target.value);
      setShowOwner(false);
      setShow_Owner(true)
      setValueOwner('')
    } else {
      setValue(event.target.value);
      setShowOwner(true);
      setShow_Owner(false)
      setValueOwner(event.target.value)
    }
  };

  const handle_show_Owner = (event) => {
    setValueOwner(event.target.value);
    setShowOwner(true);
  }

  const handleChange_ShowGPS = (event) => {
    if (event.target.value === '???????????? ???') {
      setValueGPS(event.target.value);
      setShowValueGPS(true)
    } else {
      setValue_GPS(event.target.value)
      setValueGPS(event.target.value);
      setShowGPS(true);
      setShowValueGPS(false)
    }
  };

  const handle_showValueGPS = (event) => {
    setValue_GPS(event.target.value)
    setShowGPS(true);
  }

  const handleChange_ShowOfferType = (event) => {
    if (event.target.value === '???????????? ???') {
      setvalueOfferType(event.target.value);
      setShowOtherOfferType(true)
    } else {
      setvalue_OfferType(event.target.value)
      setvalueOfferType(event.target.value);
      setShowOfferType(true);
      setShowOtherOfferType(false)
    }
  };

  const handle_showOtherOfferType = (event) => {
    setvalue_OfferType(event.target.value)
    setShowOfferType(true);
  }

  const handle_sumbitForms = async (event) => {
    event.preventDefault();
    if (!forms.Name || !forms.Tell || !forms.Email || (!forms.Email ? [] : forms.Email).indexOf('@') < 0) {

      if (!forms.Name || !forms.Tell || !forms.Email) {
        alert('????????????????????????????????????????????????????????????????????????????????????????????????')
      } else if ((!forms.Email ? [] : forms.Email).indexOf('@') < 0) {
        alert('????????????????????????????????????????????????????????????????????????')
      }
      setChecked_name(!forms.Name ? 0 : 1)
      setChecked_tel(!forms.Tell ? 0 : 1)
      setChecked_email((!forms.Email || (!forms.Email ? [] : forms.Email).indexOf('@') < 0) ? 0 : 1)
      document.getElementById('firstName_lastName').scrollIntoView();

    } else if (showOwner === false) {

      alert('?????????????????????????????????????????????????????????????????????????????????????????????')
      document.getElementById('type_of_owner').scrollIntoView();

    } else if (!forms.Owner_Name || !forms.Owner_Tell || !(!forms.Owner_Tell ? [] : forms.Owner_Tell)[9]) {

      if (!forms.Owner_Name || !forms.Owner_Tell) {
        alert('?????????????????????????????????????????????' + value)
      } else if (!(!forms.Owner_Tell ? [] : forms.Owner_Tell)[9]) {
        alert('???????????????????????????????????????????????????' + value + '??????????????????????????????')
      }
      setChecked_Owner_Name(!forms.Owner_Name ? 0 : 1)
      setChecked_Owner_Tell((!forms.Owner_Tell || !(!forms.Owner_Tell ? [] : forms.Owner_Tell)[9]) ? 0 : 1)
      document.getElementById('type_of_owner').scrollIntoView();

    } else if (showGPS === false || valueOfferType === '') {

      if (showGPS === false) {
        alert('????????????????????????????????????????????????????????????????????????')
      } else if (valueOfferType === '') {
        alert('?????????????????????????????????????????????????????????????????????????????????')
      }
      document.getElementById('type_of_Area').scrollIntoView();

    } else if (!forms.NumberArea && !forms.sum_la_lo) {

      alert('????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? ?????????????????????????????????????????????')
      setChecked_NumberArea((!forms.NumberArea && !forms.sum_la_lo) ? 0 : 1)
      setChecked_Latitude((!forms.NumberArea && !forms.sum_la_lo) ? 0 : 1)

    } else if (!forms.District || !forms.Province) {
      alert('??????????????????????????????????????????????????????????????????????????????????????????????????????')
      setChecked_Tambol(0)
      setChecked_District(!forms.District ? 0 : 1)
      setChecked_Province(!forms.Province ? 0 : 1)
      setChecked_Postcode(0)
    } else {
      setChecked_name(1)
      setChecked_tel(1)
      setChecked_email(1)

      const latitude = !forms.sum_la_lo ? null : forms.sum_la_lo.split(',')[0]
      const logtitude = !forms.sum_la_lo ? null : forms.sum_la_lo.split(',')[1]

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
        Owner_Type: valueOwner,
        Area_Type: value_GPS,
        Tambol: forms.Tambol,
        District: forms.District,
        Province: forms.Province,
        Postcode: forms.Postcode,
        OfferType: value_OfferType
      }
      const headers = {
        'Authorization': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      };
      await Axios.post('http://vpnptec.dyndns.org:32001/api/NewNTI_Station_Create', body, { headers })
        .then(response => {
          if (response.data[0].RESPONSE !== undefined) {
            navigate('/Successfully_Page')
          } else {
            alert('??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????')
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
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <CssBaseline />
          <Paper elevation={3} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar id='firstName_lastName' sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                <b> ????????????????????????????????????????????????</b>
              </Typography>
              <Box component="form" noValidate sx={{ mt: 4 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body2" color={checked_name === 1 ? null : "error"}>
                      <b>????????????????????????-????????????????????? (?????????????????????) *</b>
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
                    <Typography id='type_of_owner' variant="body2" color={checked_tel === 1 ? null : "error"}>
                      <b>?????????????????????????????????????????? (?????????????????????) *</b>
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
                      <b> ??????????????? (?????????????????????) *</b>
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
                      <RadioGroup value={value} onChange={handleChange_ShowOwner}>
                        <FormControlLabel value="???????????????????????????????????????" control={<Radio size="small" sx={{ ml: 1 }} />} label={<Typography variant="body2">???????????????????????????????????????</Typography>} />
                        <FormControlLabel value="????????????????????????????????????????????????" control={<Radio size="small" sx={{ ml: 1 }} />} label={<Typography variant="body2">????????????????????????????????????????????????</Typography>} />
                        <Stack direction="row" spacing={1}>
                          <FormControlLabel value="???????????? ???" control={<Radio size="small" sx={{ ml: 1 }} />} label={<Typography variant="body2">???????????? ???</Typography>} />
                          {show_Owner === false ? null : <TextField size='small' variant="outlined" onChange={handle_show_Owner} />}
                        </Stack>
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" id='type_of_Area' color={checked_Owner_Name === 1 ? null : "error"}>
                      <b>????????????????????????-????????????????????? {showOwner === true ? `(${valueOwner})` : null} *</b>
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
                      <b>?????????????????????????????????????????? {showOwner === true ? `(${valueOwner})` : null} *</b>
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
                      <RadioGroup value={valueGPS} onChange={handleChange_ShowGPS}>
                        <FormControlLabel value="?????????????????????????????????" control={<Radio size="small" sx={{ ml: 1 }} />} label={<Typography variant="body2">?????????????????????????????????</Typography>} />
                        {/* <FormControlLabel value="????????????????????????????????????????????????????????????????????????" control={<Radio size="small" sx={{ ml: 1 }} />} label={<Typography variant="body2">????????????????????????????????????????????????????????????????????????</Typography>} /> */}
                        <FormControlLabel value="??????????????????????????????" control={<Radio size="small" sx={{ ml: 1 }} />} label={<Typography variant="body2">??????????????????????????????</Typography>} />
                        <FormControlLabel value="????????????????????????" control={<Radio size="small" sx={{ ml: 1 }} />} label={<Typography variant="body2">????????????????????????</Typography>} />
                        <Stack direction="row" spacing={1}>
                          <FormControlLabel value="???????????? ???" control={<Radio size="small" sx={{ ml: 1 }} />} label={<Typography variant="body2">???????????? ???</Typography>} />
                          {!showValueGPS ? null : <TextField size='small' variant="outlined" onChange={handle_showValueGPS} />}
                        </Stack>
                      </RadioGroup>
                    </FormControl>
                    <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
                    <RadioGroup value={valueOfferType} onChange={handleChange_ShowOfferType}>
                      <FormControlLabel value="?????????" control={<Radio size="small" sx={{ ml: 1 }} />} label={<Typography variant="body2">?????????</Typography>} />
                      <FormControlLabel value="?????????????????????" control={<Radio size="small" sx={{ ml: 1 }} />} label={<Typography variant="body2">?????????????????????</Typography>} />
                      <FormControlLabel value="?????????/?????????????????????" control={<Radio size="small" sx={{ ml: 1 }} />} label={<Typography variant="body2">?????????/?????????????????????</Typography>} />
                      <FormControlLabel value="???????????????????????????" control={<Radio size="small" sx={{ ml: 1 }} />} label={<Typography variant="body2">???????????????????????????</Typography>} />
                      <Stack direction="row" spacing={1}>
                        <FormControlLabel value="???????????? ???" control={<Radio size="small" sx={{ ml: 1 }} />} label={<Typography variant="body2">???????????? ???</Typography>} />
                        {!showOtherOfferType ? null : <TextField size='small' variant="outlined" onChange={handle_showOtherOfferType} />}
                      </Stack>
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color={checked_Latitude === 1 ? null : "error"}>
                      <b> ????????????????????????????????????</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <FormHelperText>* ???????????????????????? : 13.7986048, 100.663296</FormHelperText>
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
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color={checked_NumberArea === 1 ? null : "error"}>
                      <b> ???????????????????????????????????????????????? (????????????????????????????????????????????? ???????????????)</b>
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
                      <b>????????????????????????????????????????????????????????? *</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={checked_Province === 0 ? true : false}>
                      <FormHelperText>?????????????????????</FormHelperText>
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
                      <FormHelperText>???????????????/?????????</FormHelperText>
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
                      <FormHelperText>????????????</FormHelperText>
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
                      <FormHelperText>????????????????????????</FormHelperText>
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
                      <b> ?????????????????????????????????</b>
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
                              ?????????
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
                              ?????????
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
                              ??????.???.
                            </Typography>
                          </React.Fragment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ pb: 1 }}>
                      <b> ???????????????????????????</b>
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
                              ????????????
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
                      label="?????????????????????????????????????????? ???"
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