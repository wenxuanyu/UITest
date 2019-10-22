import axios from "axios";

const fetchListStart = () => {
  return {
    type: "FETCH_LIST_START"
  };
}

const fetchListSuccess = (res) => {
  return {
    type: "FETCH_LIST_SUCCESS",
    data: res.data
  };
}


const fetchPageSuccess = (res) => {
  return {
    type: "FETCH_PAGE_SUCCESS",
    data: res.data
  };
}

const fetchListError = (err) => {
  return {
    type: "FETCH_LIST_ERROR",
    error: err
  };
}

export const getList = () => {
  return (dispatch) => {
    dispatch(fetchListStart());
    axios.get("http://localhost:8888/api/users", {})
      .then(res => {
        dispatch(fetchListSuccess(res));
      })
      .catch(err => {
        dispatch(fetchListError(err));
        alert("fail to get userlist, please try again.");
      });
  };
}

export const addUser = (values, event) => {
  return (dispatch) => {
    dispatch(resetData());
    axios.post('http://localhost:8888/api/users', {
      ...values
    })
      .then(function (response) {
        event.push('/in');
      })
      .catch(function (error) {
        console.log(error);
        alert("fail to add user, please try again.");
      });
  };
}

export const deleteUser = (values, event) => {
  return (dispatch) => {
    axios.delete('http://localhost:8888/api/users/' + values._id, { data: values })
      .then(function (response) {
        window.location.href = "http://localhost:3000/in";
      })
      .catch(function (error) {
        console.log(error);
        alert("fail to delete user, please try again.");
      });
  };
}

export const editUser = (values, event) => {
  return (dispatch) => {
    dispatch(resetData());
    axios.put('http://localhost:8888/api/users/' + values._id, {
      ...values
    })
      .then(function (response) {
        event.push('/in');
      })
      .catch(function (error) {
        console.log(error);
        alert("fail to edit user, please try again.");
      });
  };
}

export const getSortedData = (id, order) => {
  return (dispatch, getState) => {
    axios.get('http://localhost:8888/api/sort' + id + '/' + order)
      .then(res => {
        dispatch(fetchListSuccess(res));
      })
      .catch(function (error) {
        console.log(error);
        alert("fail to sort user, please try again.");
      });
  }
}

export const searchUser = (key) => {
  return (dispatch, getState) => {
    axios.get('http://localhost:8888/api/find' + key)
      .then(res => {
        dispatch(fetchListSuccess(res));
      })
      .catch(err => {
        dispatch(fetchListError(err));
        alert("fail to get userlist, please try again.");
      });
  };
}

export const findandsearchUser = (id, order, key) => {
  return (dispatch, getState) => {
    dispatch(resetData());
    axios.get('http://localhost:8888/api/find' + key + '/sort' + id + '/' + order)
      .then(res => {
        dispatch(fetchListSuccess(res));
      })
      .catch(err => {
        dispatch(fetchListError(err));
        alert("fail to get userlist, please try again.");
      });
  };
}

export const getNoCircleSuperiorData = (id) => {
  return (dispatch, getState) => {
    axios.get(`http://localhost:8888/api/superior/${id}`)
      .then(res => {
        dispatch(fetchListSuccess(res));
      })
      .catch(err => {
        dispatch(fetchListError(err));
      });
  }
}

export const getPage = (pageNo) => {
  return (dispatch) => {
    dispatch(fetchListStart());
    axios.get(`http://localhost:8888/api/users${pageNo}`)
      .then(res => {
        dispatch(fetchPageSuccess(res));
      }).catch(err => {
        dispatch(fetchListError(err));
      })
  }
}

export const getSuperiorView = (id) => {
  return (dispatch, getState) => {
    axios.get(`http://localhost:8888/api/users/${id}`)
      .then(res => {
        dispatch(fetchListSuccess(res));
      })
      .catch(err => {
        dispatch(fetchListError(err));
      });
  }
}

export const getSubordinateView = (id) => {
  return (dispatch, getState) => {
    axios.get(`http://localhost:8888/api/subordinateview/${id}`)
      .then(res => {
        dispatch(fetchListSuccess(res));
      })
      .catch(err => {
        dispatch(fetchListError(err));
      });
  }
}

export const resetData = () => {
  return {
    type: "USER_PAGE_RESET",
    data: []
  };
}
