import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom' // 추가
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter> {/* App을 HashRouter로 감싸기 */}
      <App />
    </HashRouter>
  </React.StrictMode>,
)
