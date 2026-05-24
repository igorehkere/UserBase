import { TrpcProvider } from "./lib/trpc";
import { AllUsersPage } from "./pages/AllUsersPage";


export function App() {

  return (
    <TrpcProvider>
      <AllUsersPage/>
    </TrpcProvider>
  )
}

