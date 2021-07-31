import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import FaceRecognition from "../../common/facerecognition/FaceRecognition";
import Logo from "../../common/logo/Logo";
import Navigation from "../../common/navigation/Navigation";
import Rank from "../../common/rank/Rank";
import ImageLinkForm from "../../ImageLinkForm/ImageLinkForm";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      imgSrc: "",
      user: this.props?.location?.state?.data,
      box: {},
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch("http://smart-brain-apis.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.imgSrc,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("http://smart-brain-apis.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  setImgSrc = (event) => {
    this.setState({ imgSrc: event.target.value });
  };

  signOut = () => {
    this.setState({ user: null });
    this.props.history.push("/signin");
  };

  render() {
    console.log(this.state);
    if (this.state.user != undefined) {
      const { name, entries } = this.state.user;
      return (
        <div className="home">
          <Navigation signOut={this.signOut}></Navigation>
          <Logo></Logo>
          <Rank name={name} entries={entries}></Rank>
          <ImageLinkForm
            setImgSrc={this.setImgSrc}
            onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition
            imgSrc={this.state.imgSrc}
            box={this.state.box}
          ></FaceRecognition>
        </div>
      );
    } else {
      return <Redirect to="/signin"></Redirect>;
    }
  }
}

export default Home;
