import React, { PropsWithChildren, memo } from "react";
import { Button } from "@mui/material";

type ButtonComponentType = {
  onButtonChange: () => void;
};

export const ButtonComponent: React.FC<PropsWithChildren<ButtonComponentType>> =
  memo(({ children, onButtonChange }) => {
    return <Button className="table_button" onClick={onButtonChange}>{children}</Button>;
  });
