import { TrpcProvider } from "./lib/trpc";
import { AllUsersPage } from "./pages/AllUsersPage";
import "./styles/global.scss"

export function App() {

  return (
    <TrpcProvider>
      <AllUsersPage/>
    </TrpcProvider>
  )
}

