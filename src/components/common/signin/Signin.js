import React, { Component } from "react";

class Signin extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };
  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitButton = () => {
    fetch("http://smart-brain-apis.herokuapp.com/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          this.props.history.push("/home", { data });
        }
      });
  };
  render() {
    return (
      <main className="pa4 black-80 br2 ba black b--black-50 mv6 w-100 w-50-m w-25-l mw7 center">
        <div className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={this.onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={this.onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
              onClick={this.onSubmitButton}
            />
          </div>
          <div className="lh-copy mt3">
            <a href="/signup" className="f6 link dim black db">
              Sign up
            </a>
          </div>
        </div>
      </main>
    );
  }
}

export default Signin;
