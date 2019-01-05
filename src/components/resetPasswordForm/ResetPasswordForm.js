import React from "react";

type Props = {|
  token: string,
  submit: ({
    token: string,
    password: string,
  }) => any
|}

type State = {
  data: {
      token: string,
      password: string,
      passwordConfirmation: string
  },
  loading: boolean,
  errors: {
    email?: string,
    global?: any,
    password?: string,
    passwordConfirmation?: string
  } 
}

class ResetPasswordForm extends React.Component<Props, State> {
  state = {
    data: {
      token: this.props.token,
      password: "",
      passwordConfirmation: ""
    },
    loading: false,
    errors: {}
  };

  onChange = (e: SyntheticInputEvent<HTMLInputElement> ) =>
    this.setState((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        [e.target.name]: e.target.value
      }
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
            errors: err.response.data.errors,
            loading: false
          }))
        );
    }
  };

  validate = (data: {
      token: string,
      password: string,
      passwordConfirmation: string
    }) => {
    const errors = {};
    if (!data.password) errors.password = "Can't be blank";
    if (data.password !== data.passwordConfirmation)
      errors.password = "Passwords must match";
    return errors;
  };

  render() {
    const { errors, data } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
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

        <div className="form-group">
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            value={data.passwordConfirmation}
            onChange={this.onChange}
            className={
              errors.passwordConfirmation
                ? "form-control is-invalid"
                : "form-control"
            }
          />
            {errors && errors.passwordConfirmation &&
              <div className="invalid-feedback">
                {errors.passwordConfirmation}
              </div>

            }
        </div>

        <button type="submit">
          Reset Password
        </button>
      </form>
    );
  }
}

export default ResetPasswordForm;
