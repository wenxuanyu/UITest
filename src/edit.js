import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import { editUser,getNoCircleSuperiorData } from "./redux/action-creators";
import { createMuiTheme } from '@material-ui/core/styles';
import { lightBlue, blue } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker,} from '@material-ui/pickers';


const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: blue,
  },
});

const useStyles = makeStyles(theme => ({
  container: {
    display: 'center',  
    flexWrap: 'wrap', 
    textAlign: "center",
  },
  textField: {
    textAlign: "center",
     width: 300, 
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 400,
  },
}));

const currencies = [
  {
    value: 'male',
    label: 'male',  },
  {
    value: 'female',
    label: 'female',  },
];

const ranklist = [
  { value: 'General',label: 'General',},
  { value: 'Colonel',label: 'Colonel',
  },
  { value: 'Major',label: 'Major',
  },
  { value: 'Captain',label: 'Captain',
  },
  { value: 'Lieutenant',label: 'Lieutenant',
  },
  { value: 'Warrant Officer',label: 'Warrant Officer',
  },
  { value: 'Sergeant',label: 'Sergeant',
  },
  { value: 'Corporal', label: 'Corporal',
  },
  { value: 'Specialist',label: 'Specialist',
  },
  { value: 'Private', label: 'Private',
  },
];


 function Edit(props) {
   console.log(props);
  const allList = props.list.data;
    const classes = useStyles();
    function NameDisable(){
      let visiable1=true;
      if (values.name){
          visiable1=false;
      }
      return visiable1;
    }
    const [values, setValues] = React.useState({ 
    _id:props.location.state._id, 
    name: props.location.state.name,
    rank:props.location.state.rank,
    phone: props.location.state.phone,
    sex: props.location.state.sex,
    date: props.location.state.date,
    avatar:props.location.state.avatar,
    superior:props.location.state.superior,
    email:props.location.state.email,
    ds:props.location.state.ds,
    sub:props.location.state.sub,
  });

  //const userId=values._id;
  //this.props.getNoCircleSuperiorData(userId);

  //props.getNoCircleSuperiorData(values._id);
  //console.log(this.props.allowSuperiorData)
 // const allowSuperiorData = this.props.allowSuperiorData;

  const handleChange = name => event => {
    const value = event.target.value;
    if(name === 'superior'){
      const opName =  props.list.data.filter( (item) =>{
        return item._id === value;
      })[0].name;
      setValues({ ...values, superior:{ _id: value , name: opName} });
    }else{
      setValues({ ...values, [name]: value });
    }};
///////////////////////////
  const handleEdit = name => event => {   
    values._id=props.location.state._id;
      props.editUser(values,props.history) ;
  };

  const imgChange = name => event =>{         
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload= function () {
      setValues({...values, avatar: reader.result});
    }} 

    const [selectedDate, setSelectedDate] = values.date;

    function handleDateChange(date) {
      setSelectedDate(date);
      setValues({ ...values, date: date});
    }

    const cancelclick = name => event => {   
      window.location.href="http://localhost:3000/in"; 
    };  

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
        required
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
        required
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
        <MenuItem key={key} name ='test' value={option._id} > 
        {option.name}
    </MenuItem>
     ))}
    </TextField>
     <br></br>  
     <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          variant="outline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date"
          label="date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
      <br></br>
      <TextField
        id="phone"
        label="phone"
        value={values.phone}
        onChange={handleChange('phone')}
        type="number"
        className={classes.textField}
        margin="normal"
        variant="outlined"
      /> 
      <br></br>
      <TextField
       disabled={ !NameDisable()}
        error={ NameDisable()}
        id="standard-error"
        label="Error"
        defaultValue="please fill in the required field."
        className={classes.textField}
        margin="normal"
      />
        <br></br>
      <input accept="image/*"
      className={classes.input}
      src={values.avatar}
      style={{ display: 'none' }}
      id="avatar"
      type="file"
      onChange={imgChange('avatar')}
      />
      <label htmlFor="avatar">
     <Button variant="outlined" component="span" className={classes.button}>
      Upload avatar
     </Button>
     </label>
      <br></br> 
      <Grid container justify="center" alignItems="center">
      <Avatar alt="Remy Sharp" src={ values.avatar}  className={classes.bigAvatar} />
      </Grid> 
      <br></br>
      <Button disabled={NameDisable()}  color="primary" onClick={handleEdit()} variant="contained" className={classes.textField}>
       Edit soldier
      </Button>
      <br></br> 
      <Button  color="primary" onClick={cancelclick()} variant="contained" className={classes.textField}>
       Cancel
      </Button>
    </form>
    </ThemeProvider>   
       
  );
}

const mapStateToProps = state => {
  return {
    list: state.list,
    allowSuperiorData: state.allowSuperior
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getNoCircleSuperiorData: (id) => dispatch(getNoCircleSuperiorData(id)),
    editUser: (value,event) => { dispatch(editUser(value,event)); }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Edit) 