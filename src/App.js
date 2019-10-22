import React from "react";
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import Demo from './demo';
import AddUser from "./add";
import Edit from './edit';
import Demo2 from './newdemo';

const WithRouterDemo = withRouter(Demo);
const WithRouterAddUser = withRouter(AddUser);
const WithRouterEdit = withRouter(Edit);
const WithRouterDemo2 = withRouter(Demo2);

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div >
          <Switch>
            <Route exact={true} path="/" component={() => <WithRouterDemo />} />
            <Route path="/adduser" component={() => <WithRouterAddUser />} />
            <Route path="/edituser" component={() => <WithRouterEdit />} />
            <Route path="/in" component={() => <WithRouterDemo2 />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;