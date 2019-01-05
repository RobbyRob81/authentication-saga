import * as React from 'react';
import {Link} from 'react-router-dom';
import Validator from 'validator';

type Props = {|
  submit: ({
    email: string,
    password: string
    }) => any
|}

type State = {
  data: {
    email: string,
    password: string
  },
  loading: boolean,
  errors: {
    email?: string,
    global?: any,
    password?: string,
  }
}

class LoginForm extends React.PureComponent<Props, State>{
   state = {
    data: {
      email: "",
      password: ""
    },
    loading: false,
    errors: {}
  };

  onChange = (e: SyntheticInputEvent<HTMLInputElement> ) =>
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });

  onSubmit = (e: SyntheticEvent<>) => {
    e.preventDefault();
    const {data} = this.state;
    const errors = this.validate(data);
    this.setState(() => ({ errors }));

    if (Object.keys(errors).length === 0) {
      this.setState(() => ({ loading: true }));
      this.props
        .submit(data)
        .catch(err =>
          this.setState(() => ({
            errors: err.response.data.errors, loading: false }))
        );
    }
  };

  validate = (data: {
      email: string,
      password: string,
    })  => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };
  render(){
    const { data, errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        {errors.global && (
          <div className="alert alert-danger">{errors.global}</div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={this.onChange}
            className={
              errors.email ? "form-control is-invalid" : "form-control"
            }
          />
          <div className="invalid-feedback">{errors.email}</div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={this.onChange}
            className={
              errors.password ? "form-control is-invalid" : "form-control"
            }
          />
          <div className="invalid-feedback">{errors.password}</div>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>

        <small className="form-text text-center">
          <Link to="/signup">Sign up</Link> if you don't have an account<br />
          <Link to="/forgot_password">Forgot Password?</Link>
        </small>
      </form>
    );
  }
}

export default LoginForm;
