"use client";

import { useEffect, useState } from "react";
import CardModal from "../modals/card";
import ProModal from "../modals/pro";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CardModal />
      <ProModal />
    </>
  );
};

export default ModalProvider;
