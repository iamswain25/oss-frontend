import React, { Component } from "react";
import Main from "Main";
import logo from "./assets/styles/img/oss_logo.png"
// import image from "./assets/styles/img/image.png"
// import img2 from "./assets/styles/img/oss_logo_banner.png"

import { Container, Form, Button, Header, Segment, Image } from "semantic-ui-react";
class App extends Component {
  state = {
    REACT_APP_EOSIO_PRIVATE_KEY: "5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5",
    show: true
  };
  onPrivateKeyChange = ({ target }) =>
    this.setState({ REACT_APP_EOSIO_PRIVATE_KEY: target.value });
  nextStep = e => {
    this.setState({ show: false });
  };
  render1() {
    return (
      <Segment placeholder style={{ padding: "20%" }}>
        <Container>
          {/* <Image src={image} size='small'/> */}
          <Image src={logo} size='large'/>
          <Header as="h1">Welcome to your Online Smart Storage</Header>
          <Form>
            <Form.Field style={{ maxWidth: "100%" }}>
              <label>Enter Private Key</label>
              <input
                type="text"
                value={this.state.REACT_APP_EOSIO_PRIVATE_KEY}
                placeholder="5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5"
                maxLength="51"
                minLength="51"
                onChange={this.onPrivateKeyChange}
                // style={{  }}
              />
            </Form.Field>
            <Button type="submit" onClick={this.nextStep}>
              Enter
            </Button>
          </Form>
        </Container>
      </Segment>
    );
  }
  render2() {
    return <Main />;
  }
  render() {
    console.log(this.state.show);
    return this.state.show ? this.render1() : this.render2();
  }
}
App.displayName = "App"; // Tell React Dev Tools the component name

export default App;
