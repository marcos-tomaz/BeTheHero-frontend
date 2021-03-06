import styled from 'styled-components'
import { Link } from 'react-router-dom'

const MainLink = styled(Link)`
  width: 100%;
  height: 60px;
  background: #e02041;
  border: 0;
  border-radius: 8px;
  color: #fff;
  font-weight: 700;
  margin-top: 16px;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
  line-height: 60px;
  transition: filter 0.2s;

  &:hover:not([disabled]),
  &:focus:not([disabled]) {
    filter: brightness(90%);
  }
  img {
    height: 100%;
  }
`

export default MainLink
