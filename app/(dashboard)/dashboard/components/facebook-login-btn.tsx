"use client"
import React from 'react'
import FacebookLogin from '@greatsumini/react-facebook-login';
import { FacebookLoginProps } from '@greatsumini/react-facebook-login/dist/types/';
type Props = {}

const FacebookLoginBtn = ({ children, ...props }: FacebookLoginProps) => {
  return (
    <FacebookLogin {...props}> {children}</FacebookLogin> 
  )
}

export default FacebookLoginBtn