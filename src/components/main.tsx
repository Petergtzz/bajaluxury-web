"use client";

import React from "react";
import { LoginForm } from "./login-form";

export default function Main() {
  return (
    <div className="main">
      <video
        className="bgvideo"
        src="https://qvfyv6rrab.ufs.sh/f/iq2bdhwTfBnr0ZKbQHRbXkrpMJSl3OLWqPNYHTxUv5A76sog"
        autoPlay
        loop
        muted
      />
      <div className="overlay" />
      <div className="login-form">
        <LoginForm />
      </div>
    </div>
  );
}
