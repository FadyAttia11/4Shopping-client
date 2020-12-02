import chroma from 'chroma-js';

export const categoryOptions = [
    { value: 't-shirt', label: 'T-Shirt' },
    { value: 'shirt', label: 'Shirt' },
    { value: 'sweatshirt', label: 'Sweatshirt' },
    { value: 'jeans', label: 'Jeans' },
    { value: 'sweatpants', label: 'Sweatpants' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'sneakers', label: 'Sneakers' }
]

export const colourOptions = [
    { value: 'black', label: 'Black', color: '#000000'},
    { value: 'white', label: 'White', color: '#cccccc'},
    { value: 'blue', label: 'Blue', color: '#0052CC'},
    { value: 'green', label: 'Green', color: '#36B37E'},
    { value: 'red', label: 'Red', color: '#FF5630'},
    { value: 'yellow', label: 'Yellow', color: '#FFC400'},
    { value: 'orange', label: 'Orange', color: '#FF8B00'},
    { value: 'purple', label: 'Purple', color: '#5243AA'},
    { value: 'grey', label: 'Silver', color: '#A9A9A9'}
]

export const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color)
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : null,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',
  
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
        },
      }
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      }
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      },
    }),
}