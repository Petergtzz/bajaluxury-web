"use client";

import React from "react";
import { LoginForm } from "./login-form";

export default function Main() {
  return (
    <section className="relative flex items-center justify-center h-screen">
      <video
        className="bgvideo"
        src="https://qvfyv6rrab.ufs.sh/f/iq2bdhwTfBnrBSyXelumbHzsTaEiJjYprwKLUxB8ROl9V7Gv"
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        preload="auto"
      />
      <div className="overlay" />
      <div className="login-form">
        <LoginForm />
      </div>
    </section>
  );
}
