import React, { useState, useEffect } from 'react';

import classes from './CustomSelect.module.scss';

function CustomSelect(props) {
  // Props:
  // selectWidth: string
  // selectHeight: string
  // placeholder: string
  // options: array<{label: string, value: string}>
  // value: {value: string}
  // onChange: function(newValue: {label: string, value: string})

  // TODO: Loading Overlay

  // const [selectedOption, setSelectedOption] = useState(null);
  const [optionsState, setOptionsState] = useState([]); // array<{label: string, value: string}>
  const [inputFieldValue, setInputFieldValue] = useState('');
  const [inputFieldPlaceholder, setInputFieldPlaceholder] = useState(props.placeholder);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const DEFAULT_SELECT_WIDTH = '300px';
  const DEFAULT_SELECT_HEIGHT = '55px';

  useEffect(() => {
    const newOptionsState = props.options.map(option => {
      return {...option, isClosed: true}
    });
    setOptionsState(newOptionsState);
  }, [props.options]);

  useEffect(() => {
    // set selected option = props.value and emit onChange
    if (props.value) {
      const foundOption = optionsState.find(option => option.value === props.value);
      if (foundOption) {
        setInputFieldValue(foundOption.label);
        props.onChange({ value: foundOption.value, label: foundOption.label });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  const onInputFieldFocus = () => {
    setInputFieldPlaceholder('Type to filter');
    setIsDropdownOpen(true);

    // const newOptionsState = optionsState.map(option => {
    //   return {
    //     ...option,
    //     isClosed: false,
    //   }
    // });
    // setOptionsState(newOptionsState);
    toggleAllOptionsState(true);
  }

  const onInputFieldBlur = () => {
    setInputFieldPlaceholder(props.placeholder);
    setIsDropdownOpen(false);
  }

  const onInputFieldInput = (event) => {
    setIsDropdownOpen(true);

    setInputFieldValue(event.target.value);

    let inputValue = event.target.value.toLowerCase();
    // let valueSubstring;

    const labelArr = optionsState.map(option => option.label);

    if (inputValue.length > 0) {
      for (let j = 0; j < labelArr.length; j++) {
        if (!(inputValue.substring(0, inputValue.length) === labelArr[j].substring(0, inputValue.length).toLowerCase())) {
          optionsState[j].isClosed = true;
        } else {
          optionsState[j].isClosed = false;
        }
      }
    } else {
      for (let i = 0; i < optionsState.length; i++) {
        optionsState[i].isClosed = false;
      }
    }
    
    setOptionsState(optionsState);
  }

  const toggleAllOptionsState = (isOpen) => {
    const newOptionsState = optionsState.map((option) => {
      return {
        ...option,
        isClosed: !isOpen,
      }
    });
    setOptionsState(newOptionsState);
  }

  const onDropdownItemClick = (option) => {
    setInputFieldValue(option.label);
    toggleAllOptionsState(false);

    props.onChange({ value: option.value, label: option.label });
  }

  return (
    <form
      className={classes['select-element']}
      onSubmit={(event) => {event.preventDefault()}}
      style={{
        width: props.selectWidth ? props.selectWidth : DEFAULT_SELECT_WIDTH,
        height: props.selectHeight ? props.selectHeight : DEFAULT_SELECT_HEIGHT,
      }}
    >
      <input
        className={classes['chosen-value']}
        type="text"
        value={inputFieldValue}
        placeholder={inputFieldPlaceholder}
        onChange={(event) => onInputFieldInput(event)}
        onFocus={() => onInputFieldFocus()}
        onBlur={() => onInputFieldBlur()}
        style={{
          height: props.selectHeight ? props.selectHeight : DEFAULT_SELECT_HEIGHT,
        }}
      />
      <ul
        className={`${classes['value-list']} ${isDropdownOpen ? `${classes['open']}` : ''}`}
        style={{
          paddingInlineStart: 0,
          marginTop: props.selectHeight ? props.selectHeight : DEFAULT_SELECT_HEIGHT,
        }}
      >
        {optionsState.map(option => {
          return (
            <li
              key={option.value}
              className={`${option.isClosed ? `${classes['closed']}` : ''}`}
              onClick={() => onDropdownItemClick(option)}
              style={{height: props.selectHeight ? props.selectHeight : DEFAULT_SELECT_HEIGHT}}
            >{option.label}</li>
          );
        })}
      </ul>
    </form>
  );
}

export default CustomSelect;