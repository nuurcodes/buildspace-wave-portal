import React from 'react'
import NumberFormat from 'react-number-format'

type CustomProps = {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const NumberFormatCustom = React.forwardRef<NumberFormat, CustomProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          })
        }}
        allowNegative={false}
        isNumericString
      />
    )
  }
)

export default NumberFormatCustom
