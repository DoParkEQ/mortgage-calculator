import React from 'react'
import { formatNumber } from '../utils'

type InputProps = {
  isActive: boolean
  min: number
  max: number
  prefix: string
  postfix: string
  onChange: (e) => void
  value: string
  style: React.CSSProperties
}

const defaultProps = {
  isActive: true,
  min: -Infinity,
  max: Infinity,
  prefix: '',
  postfix: '',
  onChange: (e) => e,
  value: '',
  style: {},
}

const Input = ({
  isActive,
  min,
  max,
  prefix,
  postfix,
  onChange,
  value,
  ...props
}: InputProps) => {
  return (
    <div
      {...props}
      tabIndex={0}
      className={isActive ? 'input__container' : 'input__container--disabled'}
    >
      <span>{prefix}</span>
      <input
        style={{ backgroundColor: !isActive ? '#efefef4d' : '#fff' }}
        min={min}
        max={max}
        type="text"
        disabled={!isActive}
        value={value}
        onChange={(e) => {
          const numberVal = formatNumber(e.target.value)
          if (numberVal >= min && numberVal <= max) {
            onChange(e)
          }
        }}
      />
      <span>{postfix}</span>
    </div>
  )
}

Input.defaultProps = defaultProps

export default Input
