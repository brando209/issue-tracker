import React, { useState } from 'react';
import { ButtonGroup, ToggleButton as Toggle } from 'react-bootstrap';

function ToggleButton({ radioValue, onSelect, ...props }) {
    return (
        <ButtonGroup toggle className="mx-2">
        {props.radios && props.radios.map((radio, idx) => (
          <Toggle
            key={idx}
            type="radio"
            variant="secondary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => onSelect(e.currentTarget.value)}
          >
            {radio.name}
          </Toggle>
        ))}
      </ButtonGroup>
    )
}

export default ToggleButton;