import { Route, Routes } from "react-router-dom";
import { NotificationContainer } from 'react-notifications'
import HomePage from "./components/pages/Homepage";
import StakePage from "./components/pages/Stake";
import 'react-notifications/lib/notifications.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stake" element={<StakePage />} />
      </Routes>
      <NotificationContainer />
    </>
  )
}

export default App;
