import { useEffect } from "react";
import AppRouter from "./AppRouter";
import { AuthProvider } from "./services/AuthContext";
import { customizeColors } from "./utils/customColors";

function App() {

  useEffect(()=> {
    customizeColors()
  })

  return (
    <div className="app">
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
    </div> 
  )
}

export default App;
