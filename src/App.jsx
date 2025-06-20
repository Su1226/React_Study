import { BrowserRouter } from 'react-router-dom';
import './App.css'
import Router1 from './RouterStudy/Router1/Router1';

import Index from './TodoList/pages';
import Router2 from './RouterStudy/Router2/Router2';
import Router3 from './RouterStudy/Router3/Router3';
import Router4 from './RouterStudy/Router4/Router4';
import MainRouter from './Auth/Routers/MainRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainRouterReactQuery from './Auth/Routers/MainRouterReactQuery';

function App() {

  // React Query를 사용하기 위해 설정해야 하는 값이 필요하다.
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // refetchOnWindowFocus: false,
        staleTime: 1000 * 60,
        retry: 0
      }
    }
  });

  return <BrowserRouter>
    {/* <Index /> */}
    {/* <Router1 /> */}
    {/* <Router2 /> */}
    {/* <Router3 /> */}
    {/* <Router4 /> */}
    {/* <MainRouter /> */}

    <QueryClientProvider client={queryClient}> 
      <MainRouterReactQuery />
    </QueryClientProvider>
  </BrowserRouter>
}

export default App;

// QueryClientProvider가 있어야 React Query를 사용할 수 있다. 
// 그 안에 ReactQuery를 사용하는 파일을 import 해야한다.