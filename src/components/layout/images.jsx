"use client";
import React from "react";
import { IKImage } from "imagekitio-next";


const Images = (props) => {
  return (
    <IKImage urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT} {...props} />
  )
}

export default Images