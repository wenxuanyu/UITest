import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import { addUser, getList } from "./redux/action-creators";
import { createMuiTheme } from '@material-ui/core/styles';
import { lightBlue, blue } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';

import photo15 from './15.jpg';

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: blue,
  },
});

let namenone;
let emailnone;
let phonenone;


const useStyles = makeStyles(theme => ({
  container: {
    flexWrap: 'wrap',
    textAlign: "center"
  },
  textField: {
    textAlign: "center",
    height: 35,
    fontSize: 8,
    width: 300,
  },
  dense: {
    marginTop: 16,
  },
}));

const currencies = [
  { value: 'male', label: 'male', },
  {
    value: 'female', label: 'female',
  },
];

const ranklist = [
  { value: 'General', label: 'General', },
  { value: 'Colonel', label: 'Colonel', },
  { value: 'Major', label: 'Major', },
  { value: 'Captain', label: 'Captain', },
  { value: 'Lieutenant', label: 'Lieutenant', },
  { value: 'Warrant Officer', label: 'Warrant Officer', },
  { value: 'Sergeant', label: 'Sergeant', },
  { value: 'Corporal', label: 'Corporal', },
  { value: 'Specialist', label: 'Specialist', },
  { value: 'Private', label: 'Private', },
];

function TextFields(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    rank: '',
    date: '',
    phone: '',
    sex: '',
    email: '',
    superiorname: '',
    superior: { _id: null, name: '' },
    ds: 0,
    avatar: photo15,
  });

  function NameDisable() {
    let disableable1 = false;
    if (values.name) {
      disableable1 = true;
      namenone = 'none';
    }
    return disableable1;
  }


  function buttondisable() {
    let disable = true;
    if (NameDisable() && emailDisable() && phoneDisable()) {
      disable = false;
    }
    return disable;
  }

  const handleChange = name => event => {
    const value = event.target.value;
    if (name === 'superior') {
      const opName = props.list.data.filter((item) => {
        return item._id === value;
      })[0].name;
      setValues({ ...values, superior: { _id: value, name: opName } });
    } else { setValues({ ...values, [name]: value }); }
  };

  const handleclick = () => {
    props.addUser(values, props.history);
  };
  const cancelclick = name => event => {
    window.location.href = "http://localhost:3000/in";
  };
  const imgChange = name => event => {
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function () {
      setValues({ ...values, avatar: reader.result });
    }
  }

  const allList = props.list.data;

  const [selectedDate, setSelectedDate] = React.useState(new Date('2019-09-30'));

  function handleDateChange(date) {
    setSelectedDate(date.toLocaleDateString());
    setValues({ ...values, date: date.toLocaleDateString() });
  }

  phonenone = phoneDisable() ? 'none' : '';
  namenone = NameDisable() ? 'none' : '';
  emailnone = emailDisable() ? 'none' : '';

  function emailDisable() {
    let disableable2 = false;
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(values.email)) {
      disableable2 = true;
      emailnone = 'none';
    }
    return disableable2;
  }

  function phoneDisable() {
    let disableable3 = false;
    const regphone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (regphone.test(values.phone)) {
      disableable3 = true;
      phonenone = 'none';
    }
    return disableable3;
  }
  return (
    <ThemeProvider theme={theme}>
      <form className={classes.container} noValidate>
        <TextField
          required
          id="name"
          label="name"
          className={classes.textField}
          value={values.name}
          onChange={handleChange('name')}
          margin="normal"
          variant="outlined"
        />
        <br></br>
        <TextField
          id="rank"
          label="rank"
          className={classes.textField}
          value={values.rank}
          onChange={handleChange('rank')}
          margin="normal"
          variant="outlined"
          select
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }} >
          {ranklist.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br></br>
        <TextField
          required
          id="sex"
          label="Sex"
          className={classes.textField}
          value={values.sex}
          onChange={handleChange('sex')}
          margin="normal"
          variant="outlined"
          select
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }} >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br></br>
        <TextField
          required
          id="email"
          label="email"
          className={classes.textField}
          value={values.email}
          onChange={handleChange('email')}
          margin="normal"
          variant="outlined"
        />
        <br></br>
        <TextField
          style={{ fontSize: 10, height: 20, display: emailnone }}
          id="standard-helperText"
          defaultValue="your email is not correct."
          className={classes.textField}
          margin="normal"
        />
        <br></br>
        <TextField
          id="superior"
          label="superior"
          className={classes.textField}
          value={values.superior._id}
          onChange={handleChange('superior')}
          margin="normal"
          variant="outlined"
          select
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }} >
          {allList.map((option, key) => (
            /////////////////////////
            /*       <MenuItem key={key} value={{_id:option._id,name:option.name}}> */
            <MenuItem key={key} value={option._id} >
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <br></br>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            variant="outlined"
            format="MM/dd/yyyy"
            margin="normal"
            id="date"
            label="date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }} />
        </MuiPickersUtilsProvider>
        <br></br>
        <TextField
          id="phone"
          label="phone"
          value={values.phone}
          onChange={handleChange('phone')}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <br></br>
        <TextField
          style={{ fontSize: 10, height: 20, display: phonenone }}
          id="standard-helperText"
          defaultValue="your phone number is not correct."
          className={classes.textField}
          margin="normal"
        />
        <br></br>
        <TextField
          style={{ fontSize: 10, height: 25, display: namenone }}
          id="standard-helperText"
          defaultValue="please fill in the required field."
          className={classes.textField}
          margin="normal" />
        <br></br>
        <input accept="image/*"
          className={classes.input}
          style={{ display: 'none' }}
          src={values.avatar}
          id="avatar"
          type="file"
          onChange={imgChange('avatar')} />
        <label htmlFor="avatar">
          <Button variant="outlined" component="span" className={classes.button}>
            Upload avatar
     </Button>
        </label>
        <br></br>
        <Grid container justify="center" alignItems="center">
          <Avatar alt="Remy Sharp" src={values.avatar} className={classes.bigAvatar} />
        </Grid>
        <Button disabled={buttondisable()} color="primary" onClick={handleclick} variant="contained" className={classes.textField}>
          Add soldier
      </Button>
        <br></br>
        <Button color="primary" onClick={cancelclick()} variant="contained" className={classes.textField}>
          Cancel
      </Button>
      </form>
    </ThemeProvider>
  );
}

const mapStateToProps = state => {
  return {
    list: state.list
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: (value, event) => { dispatch(addUser(value, event)); },
    getList: () => { dispatch(getList()); },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TextFields) 