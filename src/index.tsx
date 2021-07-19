import { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import 'rsuite/dist/styles/rsuite-default.css'
import 'rsuite-color-picker/lib/styles.css'
import './index.scss'

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)
