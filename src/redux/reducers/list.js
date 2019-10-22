const initState = {
  loading: false,
  err: null,
  data: []
};

const list = (state = initState, action) => {
  switch(action.type) {
    case "FETCH_LIST_START":
      return {
        ...state,
        loading: true,
        err: null
      };
    case "FETCH_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        err: null,
        data: action.data
      };
    case "FETCH_LIST_ERROR":
      return {
        ...state,
        loading: false,
        err: action.error
      }
      case "FETCH_PAGE_SUCCESS":
        return {
          ...state,
          loading: false,
          err: null,
          data:  [...state.data, ...action.data],
        };
        case "FETCH_FIRSTLIST_SUCCESS":
          return {
            ...state,
            loading: false,
            err: null,
            data: action.data
          };
      case "USER_PAGE_RESET":
          return {
              ...state,
              data:[],
          }

    default:
      return state;
  }
}

export default list;
