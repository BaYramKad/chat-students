import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function MainPage() {
    const history = useHistory()
  return (<>
    <div>MainPage</div>
    <button onClick={() => history.push('/login')}>Выйти</button>
  </>)
}

export default MainPage
