import React from 'react'

interface ErrorMessageProps {
  message: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <p role="alert" className="dark-red fw6 bg-washed-red pa2 br2 mb3">
    {message}
  </p>
)

export default ErrorMessage
