import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SearchBar from './search';
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import { findandsearchUser,getList, deleteUser, getPage, searchUser, getSuperiorView, getSubordinateView, getSortedData, getNoCircleSuperiorData, resetData } from "./redux/action-creators";
import TableSortLable from '@material-ui/core/TableSortLabel';
import photo10 from './10.jpg';
import "./newdemo.css";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);
var id1;
const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

class Usertable2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,
      input: '',
      sortActiveFlag: [false, false, false, false, false, false, false],
    };
  }

  componentDidMount() {
    this.props.getPage(this.state.pageNo);
    if (typeof this.refs.myscroll.addEventListener !== "undefined") {
      this.refs.myscroll.addEventListener("scroll", () => {
        if (this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >= this.refs.myscroll.scrollHeight) {
          this.handleNextPage(this.state.pageNo);
        }
      })
    }
  }

  handleNextPage = (pageNo) => {
    this.setState({ pageNo: this.state.pageNo + 1 });
    this.props.getPage(pageNo + 1);
  }

  handleAdd = () => {
    this.props.getList();
    this.props.history.push('/adduser');
  }

  handleDelete = values => {
    this.props.deleteUser(values,this.props.history);
    this.setState({ ...this.state, pageNo: 1, input: '', sortActiveFlag: [false, false, false, false, false, false, false] });
  };

  handleReset = () => {
    this.props.resetData();
    this.setState({ ...this.state, pageNo: 1, input: '', sortActiveFlag: [false, false, false, false, false, false, false] });
    this.props.getPage(1);
  }

  handleEdit = values => {
    this.props.getNoCircleSuperiorData(values._id);
    this.props.history.push({
      pathname: '/edituser', state: values
    })
  }

  handleInput = e => {
    if (e.target.value) {
       this.refs.myscroll.addEventListener("scroll", this.handleScroll);
      this.props.searchUser(e.target.value);
      this.setState({
        ...this.state,
        input: e.target.value
      });
    } else {
        this.refs.myscroll.addEventListener("scroll", this.handleScroll);
      this.props.resetData();
      this.setState({
        ...this.state,
        input: e.target.value
      });
    }
  }

  handleSortActive = id => {
    if (this.state.input.length === 0) {
      this.refs.myscroll.removeEventListener("scroll", this.handleScroll);
      if (id === 'name') { id1 = 0; }
      if (id === 'sex') { id1 = 1; }
      if (id === 'rank') { id1 = 2; }
      if (id === 'date') { id1 = 3; }
      if (id === 'phone') { id1 = 4; }
      if (id === 'email') { id1 = 5; }
      if (id === 'superior') { id1 = 6; }
      if (!this.state.sortActiveFlag[id1]) {
        this.setState({
          ...this.state,
          sortActiveFlag: this.state.sortActiveFlag.map((ele, index) => {
            return index === id1 ? true : false
          })
        });
      } else {
        if (this.state.orderBy) {
          this.props.getSortedData(id, 1);
        } else {
          this.props.getSortedData(id, -1);
        }
        this.setState({
          ...this.state,
          orderBy: !this.state.orderBy
        });
      }
    }
    else {
      this.refs.myscroll.removeEventListener("scroll", this.handleScroll);
      if (id === 'name') { id1 = 0; }
      if (id === 'sex') { id1 = 1; }
      if (id === 'rank') { id1 = 2; }
      if (id === 'date') { id1 = 3; }
      if (id === 'phone') { id1 = 4; }
      if (id === 'email') { id1 = 5; }
      if (id === 'superior') { id1 = 6; }
      console.log(id1)
      if (!this.state.sortActiveFlag[id1]) {
        this.setState({
          ...this.state,
          sortActiveFlag: this.state.sortActiveFlag.map((ele, index) => {
            return index === id1 ? true : false
          })
        });
      } else {
        if (this.state.orderBy) {
          this.props.findandsearchUser(id, 1, this.state.input);
        } else {
          this.props.findandsearchUser(id, -1, this.state.input);
        }
        this.setState({
          ...this.state,
          orderBy: !this.state.orderBy
        });
      }
    }
  }

    handleClickSuperiorView = (id) => {
      this.props.getSuperiorView(id);
    }

    handleClickSubordinateView = (id) => {
      this.props.getSubordinateView(id);
    }

    render() {
      const sortActiveFlag = this.state.sortActiveFlag;
      const input1 = this.state.input;
      const orderBy = this.state.orderBy;
      let { list } = this.props;
      console.log(this.props);
      return (
        <body>

        <Paper
          ref="myscroll"
          style={{ height: "600px", overflow: "auto" }}>
          <body align="center"><img alt='this' src={photo10} style={{ width: 550 }} /></body>
          <body style={{ position: 'relative', width: 280, left: 900, height: 40 }} >
            <button style={{ fontSize: 16, margin: 20, width: 110, height: 30, backgroundColor: '#5579ED', color: '#FFFFFF' }} variant="contained" onClick={this.handleAdd}>New soldier</button>
            <button style={{ fontSize: 16, margin: 20, width: 90, height: 30, backgroundColor: '#5579ED', color: '#FFFFFF' }} variant="contained" onClick={this.handleReset}>Reset</button> </body>
          <body> <SearchBar style={{ margin: 10 }} onChange={this.handleInput} value={this.state.input} /></body>
          <Table>
            <TableHead>
              <TableRow >
                <StyledTableCell align="center" style={{ fontSize: 14, backgroundColor: '#E4F4FB', color: '#00A6DE' }}>avatar </StyledTableCell>
                <StyledTableCell align="center" style={{ fontSize: 14, backgroundColor: '#E4F4FB', color: '#00A6DE' }}>name
            <TableSortLable active={input1.length === 0 && sortActiveFlag[0]} direction={orderBy ? "desc" : "asc"} onClick={() => this.handleSortActive('name')} /></StyledTableCell>
                <StyledTableCell align="center" style={{ fontSize: 14, backgroundColor: '#E4F4FB', color: '#00A6DE' }}>sex
            <TableSortLable active={input1.length === 0 && sortActiveFlag[1]} direction={orderBy ? "desc" : "asc"} onClick={() => this.handleSortActive('sex')} /></StyledTableCell>
                <StyledTableCell align="center" style={{ fontSize: 14, backgroundColor: '#E4F4FB', color: '#00A6DE' }}>rank
            <TableSortLable active={input1.length === 0 && sortActiveFlag[2]} direction={orderBy ? "desc" : "asc"} onClick={() => this.handleSortActive('rank')} /></StyledTableCell>
                <StyledTableCell align="center" style={{ fontSize: 14, backgroundColor: '#E4F4FB', color: '#00A6DE' }}>date
            <TableSortLable active={input1.length === 0 && sortActiveFlag[3]} direction={orderBy ? "desc" : "asc"} onClick={() => this.handleSortActive('date')} /></StyledTableCell>
                <StyledTableCell align="center" style={{ fontSize: 14, backgroundColor: '#E4F4FB', color: '#00A6DE' }}>phone
            <TableSortLable active={input1.length === 0 && sortActiveFlag[4]} direction={orderBy ? "desc" : "asc"} onClick={() => this.handleSortActive('phone')} /></StyledTableCell>
                <StyledTableCell align="center" style={{ fontSize: 14, backgroundColor: '#E4F4FB', color: '#00A6DE' }}>email
            <TableSortLable active={input1.length === 0 && sortActiveFlag[5]} direction={orderBy ? "desc" : "asc"} onClick={() => this.handleSortActive('email')} /></StyledTableCell>
                <StyledTableCell align="center" style={{ fontSize: 14, backgroundColor: '#E4F4FB', color: '#00A6DE' }}>superior</StyledTableCell>
                <StyledTableCell align="center" style={{ fontSize: 14, backgroundColor: '#E4F4FB', color: '#00A6DE' }}>#of D.S.</StyledTableCell>
                <StyledTableCell align="center" style={{ fontSize: 14, backgroundColor: '#E4F4FB', color: '#00A6DE' }}>delete</StyledTableCell>
                <StyledTableCell align="center" style={{ fontSize: 14, backgroundColor: '#E4F4FB', color: '#00A6DE' }}>edit</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {list.data.map(row => (
                <StyledTableRow key={row.name}>
                  {/*             <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>  */}
                  <StyledTableCell align="center">{<img alt='this' src={row.avatar} style={{ width: 50, borderRadius: '30%' }} />}</StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.sex}</StyledTableCell>
                  <StyledTableCell align="center">{row.rank}</StyledTableCell>
                  <StyledTableCell align="center">{row.date}</StyledTableCell>
                  <StyledTableCell align="center">{<div><a href={'facetime:${rowData.phone}'} >{row.phone}</a></div>}</StyledTableCell>
                  <StyledTableCell align="center">{<div><a href={'mailto:${rowData.email}'} terget="_blank">{row.email}</a></div>}</StyledTableCell>
                  <StyledTableCell align="center">{<button variant="outlined" style={{ border: 'none' }} onClick={() => this.handleClickSuperiorView(row.superior._id)}>{row.superior.name}</button>}</StyledTableCell>
                  <StyledTableCell align="center">{<button variant="outlined" style={{ border: 'none' }} onClick={() => this.handleClickSubordinateView(row._id)}>{row.sub.length}</button>}</StyledTableCell>
                  <StyledTableCell align="center">{<button style={{ fontSize: 16, width: 70, height: 34, backgroundColor: '#5579ED', color: '#FFFFFF' }} onClick={() => this.handleDelete(row)}>delete</button>} </StyledTableCell>
                  <StyledTableCell align="center">{<button style={{ fontSize: 16, width: 70, height: 34, backgroundColor: '#5579ED', color: '#FFFFFF' }} onClick={() => this.handleEdit(row)}>edit</button>}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        </body>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      list: state.list
    };
  }

  const mapDispatchToProps = dispatch => {
    return {
      getList: () => { dispatch(getList()); },
      getSuperiorView: (id) => { dispatch(getSuperiorView(id)); },
      getSubordinateView: (id) => { dispatch(getSubordinateView(id)); },
      deleteUser: (value,event) => { dispatch(deleteUser(value,event)); },
      getSortedData: (id, order) => dispatch(getSortedData(id, order)),
      searchUser: (value) => { dispatch(searchUser(value)); },
      getPage: (pageNo) => { dispatch(getPage(pageNo)); },
      resetData: () => { dispatch(resetData()); },
      getNoCircleSuperiorData: (id) => { dispatch(getNoCircleSuperiorData(id)); },
      findandsearchUser:(id,order,index) => {dispatch(findandsearchUser(id,order,index))}
    };
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Usertable2);