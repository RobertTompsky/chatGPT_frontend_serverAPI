import styles from './styles/App.module.scss'
import { Header } from '@/widgets/Header'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Outlet />
    </div>
  )
}

export default App
