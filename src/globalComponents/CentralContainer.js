import React, { PropTypes } from 'react';
import styled from 'styled-components'

const MainWrapper = styled.div`
  width: 500px;
  margin: 115px auto 15px auto;
`

const CentralContainer = ({
  children,
}) => (
  <MainWrapper>
    {children}
  </MainWrapper>
  )

CentralContainer.propTypes = {
  children: PropTypes.node,
};

CentralContainer.defaultProps = {
  children: {},
}

export default CentralContainer
