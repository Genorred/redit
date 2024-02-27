import {BrowserRouter} from "react-router-dom";
import AppRouter from "../widgets/router/AppRouter.tsx";
import {NavBar} from "../widgets/navigation";
import {QueryClient, QueryClientProvider, useQueryClient} from "@tanstack/react-query";

function App() {
    // function useDebounce(callback, delay) {
    //     const timer = useRef(null)
    //     const debouncedCallback = useCallback((...args) => {
    //         if (timer.current) {
    //             clearTimeout(timer.current)
    //         }
    //         timer.current = setTimeout(() => {
    //             callback(...args)
    //         }, delay)
    //     }, [callback, delay])
    //     return debouncedCallback
    // }
    const queryClient = new QueryClient()
  return (
      <QueryClientProvider client={queryClient}>
          <BrowserRouter>
              <NavBar/>
              <AppRouter/>
          </BrowserRouter>
      </QueryClientProvider>
  )
}

export default App
