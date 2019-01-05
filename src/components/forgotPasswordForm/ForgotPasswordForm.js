import * as React from "react";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";

type Props = {
  submit: ({email: string}) => any
}

type State = {
  data: {
    email: string
  },
  loading: boolean,
  errors: {
    email?: string,
    global?: any,
    password?: string
  } 
}

class ForgotPasswordForm extends React.Component<Props, State> {
  state = {
    data: {
      email: ""
    },
    loading: false,
    errors: {
      email: "",
      password: ""
    }
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
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState(() => ({ loading: true }));
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = (data: {email: string }) => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Invalid email";
    return errors;
  };

  render() {
    const { errors, data } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        {errors.global && (
          <div key="error-global" className="alert alert-danger">{errors.global}</div>
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

        <button type="submit" className="password-recover-btn">
          Send Recover Password Link
        </button>

        <small className="form-bottom-links">
          <Link to="/signup">Sign Up</Link> |
          <Link to="/login">Login</Link>
        </small>
      </form>
    );
  }
}

export default ForgotPasswordForm;
