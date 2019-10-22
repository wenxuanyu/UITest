import  React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';

import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import Search from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button'

import { connect } from "react-redux";
import { getList, deleteUser,searchUser} from "./redux/action-creators";

const tableIcons = {
     Add: forwardRef((props, ref) => {}) ,
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  };

class Usertable extends React.Component {
  componentDidMount() {
      this.props.getList();
      }

  handleAdd = () => {
    this.props.history.push('/adduser');
  }

  handleDelete = values  => {
    this.props.deleteUser(values);    
  };

  handleEdit = values => {   
     this.props.history.push({
      pathname: '/edituser', state: values })
  }

  HandleSort = values =>{
    this.props.sortUser(values);    
  }

  HandleSearch = values =>{
    this.props.searchUser(values);    
  }

  render() {
    const  {list} = this.props;
    return (
      <MaterialTable 
        options={ {search: true}}
        icons={tableIcons}
        title={<Button color="inherit" variant="contained"  onClick={this.handleAdd}>AddUser</Button>}
        columns={[
          { title: 'avatar', field: 'avatar', sorting: false,
          render: rowData => <img alt='this' src={rowData.avatar} style={{width: 50, borderRadius: '30%'}}/>
        } , 
          { title: 'name', field: 'name' /* , customSort: */,cellStyle: {
            backgroundColor: '#E4F4FB',
            color: '#061B5A'
          }},
          { title: 'Sex', field: 'sex' , cellStyle: {
            backgroundColor: '#E4F4FB',
            color: '#061B5A'
          }},
          { title: 'rank', field: 'rank' , cellStyle: {
            backgroundColor: '#E4F4FB',
            color: '#061B5A'
          }},
          { title: 'date', field: 'date' ,cellStyle: {
            backgroundColor: '#E4F4FB',
            color: '#061B5A'
          }},
          { title: 'email', field: 'email',
          render: rowData =><div><a href={'mailto:${rowData.email}'} terget="_blank">{rowData.email}</a></div> },      
          { title: 'phone', field: 'phone' ,
          render: rowData =><div><a href={'facetime:${rowData.phone}'} >{rowData.phone}</a></div> },
          { title: 'superior', field: 'superior' , 
           render: rowData =><div>{rowData.superior}</div>}, 
          { title: '# of D.S.', field: 'ds' , 
          cellStyle: {
            backgroundColor: '#E4F4FB',
            color: '#061B5A'
          }},
        ]}
        data={list.data}       
        actions={[
          {
            icon: 'edit',
            tooltip: 'edit User',
            onClick: (event, rowData) => {this.handleEdit(rowData)}
          },
          {
            icon: 'delete',
            tooltip: 'delete User',
            onClick: (event, rowData) =>  {this.handleDelete(rowData._id)}
          },
          {
            icon: 'Reset',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => this.props.getList(),
          }
        ]}
        options={{
          actionsColumnIndex: -1
        }}
        components={{
          Action: props => (           
            <Button
              onClick={(event) => props.action.onClick(event, props.data)}
              color="primary"
              variant="contained" 
              style={{textTransform: 'none'}} 
              size="small"
            >
              {props.action.icon}
            </Button>                 
          ),
          Pagination:props=>{
            return null;
          }          
        }}
      />       
    )}}

const mapStateToProps = state => {
  return {
    list: state.list
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getList: () => { dispatch(getList()); },
    deleteUser:(value)=> { dispatch(deleteUser(value));},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Usertable) ;