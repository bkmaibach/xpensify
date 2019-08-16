// A HOC is a react component that renders another component! So Useful?!?
// Resuse code with render hijacking. prop manipulation, and abstract state
import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
  <div>
    <h1>Info about HOC</h1>
    <p>The info is : {props.info}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private info or something, please don't share!</p>}
      <WrappedComponent {...props}/>
    </div>
  );
};

const withAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated && <button>Logout</button>}
      <WrappedComponent {...props}/>
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = withAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info="Here are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="Here are the details" />, document.getElementById('app'));