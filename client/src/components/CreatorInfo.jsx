import React from "react";
import styled from "styled-components";

const CreatorInfo = () => {
  return (
    <Container>
      <h2>Creator Information</h2>
      <p>This is where information about the creator will go.</p>
    </Container>
  );
};

const Container = styled.div`
  color: #fff;
  padding: 2rem;
  text-align: center;

  h2 {
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
  }
`;

export default CreatorInfo;
