import React from 'react';
import styled from 'styled-components'
import Button from '@globalComponents/DefaultButton'

const Wrapper = styled.div`
  padding-left: 0px;
  padding-right: 0px;
  position: relative;
`

const ImageWrapper = styled.div`
  width: ${props => (props.mini ? '100px' : '400px')};
  height: ${props => (props.mini ? '100px' : '300px')};
  background-color: black;
  position: relative;
  margin: auto;
  overflow: hidden;
`

const CustomImage = styled.img`
  top: 50%;
  left: 0px;
  transform: translateY(-50%);
  width: 100%;
  position: absolute;
`

const ButtonWrapper = styled.div`
  position: absolute;
  right: 10px;
  float: right;
  bottom: ${props => (props.mini ? null : 0)};
  top: ${props => (props.mini ? '50%' : null)};
  transform: ${props => (props.mini ? 'translateY(-50%)' : null)};
  width: 20%;
`

const CustomButton = ({ onClick }) => (
  <div>
    <Button
      label="EDITAR"
      onClick={onClick}
      secondary
    />
  </div>
)

const EditableBanner = ({
  currentBanner,
  onClickEdit,
  mini,
}) => (
  <Wrapper>
    <ImageWrapper mini={mini} >
      <CustomImage
        src={currentBanner}
      />
    </ImageWrapper>
    <ButtonWrapper mini={mini}>
      <CustomButton onClick={onClickEdit} />
    </ButtonWrapper>
  </Wrapper>
)

export default (EditableBanner)
