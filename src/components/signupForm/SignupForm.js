import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { createUserRequest } from "../../actions/users";

type Props = {|
  submit: ({
    email: string,
    username: string,
    password: string
    }) => any,
  serverErrors: any
|}

type State = {
  data: {
    email: string,
    username: string,
    password: string
  },
  loading: boolean,
  errors: {
    email?: string,
    global?: string,
    username?: string,
    password?: string

  }
}

class SignupForm extends React.Component<Props, State> {
  state = {
    data: {
      email: "",
      username: "",
      password: ""
    },
    loading: false,
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.serverErrors });
  }

  onChange = (e: SyntheticInputEvent<HTMLInputElement> ) =>
    this.setState((prevState) => ({
      data: { ...prevState.data, [e.target.name]: e.target.value }
    }));

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
      username: string
    })  =>  {
    const errors = {};

    if (!isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
    if (!data.username) errors.username = "Can't be blank";

    return errors;
  };

  render() {
    const { data, errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={this.onChange}
            className={
              errors &&
              errors.email ? "form-control is-invalid" : "form-control"
            }
          />
          {errors &&
              errors.email &&
              <div className="invalid-feedback">{errors.email}</div>
          }
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={data.username}
            onChange={this.onChange}
            className={
              errors &&
              errors.username ? "form-control is-invalid" : "form-control"
            }
          />
          {errors &&
              errors.username &&
              <div className="invalid-feedback">{errors.username}</div>
          }
          
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
              errors &&
              errors.password ? "form-control is-invalid" : "form-control"
            }
          />
          {errors &&
              errors.password &&
              <div className="invalid-feedback">{errors.password}</div>
          }
        </div>

        <button type="submit" className="signup-btn">
          Sign Up
        </button>

        <small>
          or <Link to="/login">LOGIN</Link> if you have an account
        </small>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    serverErrors: state.formErrors.signup
  };
}

export default connect(mapStateToProps, { submit: createUserRequest })(
  SignupForm
);