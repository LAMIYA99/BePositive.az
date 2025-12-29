"use client";
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

type Props = {
  sitekey: string;
  onChange: (token: string | null) => void;
  className?: string;
};

const LazyReCAPTCHA = forwardRef<any, Props>(({ sitekey, onChange, className }, ref) => {
  const [Component, setComponent] = useState<any>(null);
  const innerRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    import("react-google-recaptcha").then((mod) => {
      if (mounted) setComponent(() => mod.default);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useImperativeHandle(ref, () => ({
    reset: () => innerRef.current?.reset?.(),
    execute: (...args: any[]) => innerRef.current?.execute?.(...args),
  }));

  if (!Component) {
    return <div className={className} style={{ minHeight: 78 }} />;
  }

  return <Component ref={innerRef} sitekey={sitekey} onChange={onChange} className={className} />;
});

export default LazyReCAPTCHA;
