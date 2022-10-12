import React from "react";
import Header from "./Header";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
//this is the class for home
function Home() {
  return (
    <div>
      <Header />
      <Container style={{ marginTop: "70px", marginLeft: "-20px" }}>
        <Row>
          <Col>
            <div>
              <img
                src="./Home1.png"
                style={{ height: "500px", width: "300%" }
              }
              alt="homeImage"
              ></img>
            </div>
          </Col>
          <Col>
            <div style={{ marginLeft: "150px" }}>
              <h1>akash</h1>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
