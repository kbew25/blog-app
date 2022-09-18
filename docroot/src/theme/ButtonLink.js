import React from "react";
import { Link } from "theme-ui"

const ButtonLink = ({ variant = 'primary', ...props }) => (
  <Link {...props} sx={{
    appearance: 'none',
    textAlign: 'center',
    lineHeight: 'inherit',
    textDecoration: 'none',
    fontSize: 'inherit',
    fontWeight: 'normal',
    letterSpacing: 0,
    m: 0,
    px: 3,
    py: 2,
    border: 0,
    borderRadius: 4,
    variant: `buttons.${variant}`,
  }}/>
)

export default ButtonLink;
