// option/CustomOption.jsx
import React from 'react';
import { components } from 'react-select';

const CustomOption = (props) => {
  return (
    <components.Option {...props}>
      <div
        title={props.data.label} // 👈 Tooltip sẽ hiện khi hover
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {props.data.label}
      </div>
    </components.Option>
  );
};

export default CustomOption;
