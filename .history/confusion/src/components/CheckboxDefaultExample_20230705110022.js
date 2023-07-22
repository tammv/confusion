import React from "react";

import __noop from "@atlaskit/ds-lib/noop";

import { Checkbox } from "@atlaskit/checkbox";

const CheckboxDefaultExample = () => {
  return (
    <Checkbox value="iu Mai" label="Default checkbox" onChange={__noop} name="checkbox-default" testId="cb-default" />
  );
};

export default CheckboxDefaultExample;
