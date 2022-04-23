import React from 'react'
import './List.css'

const defaultProps = {
  isFullWidth: false,
  header: 'default header',
  children: <></>,
}

const List = ({ isFullWidth, header, children, ...props }: ListProps) => {
  return (
    <div
      {...props}
      className={isFullWidth ? 'list__container--large' : 'list__container'}
    >
      <div className={isFullWidth ? 'list__content--large' : 'list__content'}>
        <p>{header}</p>
        <div>{children}</div>
      </div>
    </div>
  )
}

List.defaultProps = defaultProps

export default List
