import React from 'react'

function NotFound({location}) {
  return (
    <div>
      <h2>Following Page is not found {location.pathname}.</h2>
    </div>
  )
}

export default NotFound
