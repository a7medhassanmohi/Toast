
import styles from "./App.module.scss"
import { ToastProvider,PlayGround } from "./Components"
function App() {

  return (
    <ToastProvider>
    <PlayGround/>
    </ToastProvider>
  )
}

export default App
