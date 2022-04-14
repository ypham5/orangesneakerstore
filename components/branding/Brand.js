import React from "react"
import Image from 'next/image'
import Logo from '../../static/svg/branding/orange-logo.svg';
const Brand = () => {
  return <Image src={Logo} width="300" alt="Orange Logo" />;
}

export default Brand
