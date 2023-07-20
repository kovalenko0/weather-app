import React from 'react'
import './error-page.css'
import {Link, useNavigate} from 'react-router-dom'

export type Props = {
  error: React.ReactNode
  home?: boolean
}

export const ErrorPage: React.FC<Props> = props => {
  const navigate = useNavigate()
  return <div className="error-page">
    <img className="error-page-icon" src="/triangle-exclamation.svg" alt="Error" />
    <div className="error-page-error">
      {props.error}
    </div>
    {
      props.home
        && <Link to="/">Go to Home page</Link>
        || <a href="/" onClick={e => {
          e.preventDefault()
          navigate(-1)
        }}>Go back</a>
    }
  </div>
}
