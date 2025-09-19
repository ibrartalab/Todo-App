import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loader } from "./components/Loader";
import { store } from "./store/store";
import { Provider } from "react-redux";
import SearchContextProvider from "./context/SearchContext";
import ThemeContextProvider from "./context/ThemeContext";
import { useAppSelector } from "./hooks/redux/reduxHooks";
import { Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/dashboard/layout/DashboardLayout";
  

// This is the main application file where we set up routing and lazy loading of components
// The Suspense component is used to handle loading states for lazy-loaded components
const HomePage = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/Login"));
const SignupPage = lazy(() => import("./pages/Signup"));
const UserDashbaord = lazy(() => import("./pages/dashboard/DashboardHome"));
const AnalyticsPage = lazy(() => import("./pages/dashboard/Analytics"));
const BinPage = lazy(() => import("./pages/dashboard/Bin"));
const SettingsPage = lazy(() => import("./pages/dashboard/Settings"));

function App() {
  
  const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
    const userName = useAppSelector((state) => state.auth.userName);

    if (!userName) {
      return <Navigate to="/" replace />;
    } 

    return <>{children}</>;
  };

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeContextProvider>
            <SearchContextProvider>
                  <Suspense fallback={<Loader />}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/signup" element={<SignupPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route
                      path="/dashboard/:userName/"
                      element={
                        <PrivateRoutes>
                          <DashboardLayout />
                        </PrivateRoutes>
                      }
                      >
                        {/* Index route for dashboard */}
                        <Route index path="todos" element={<UserDashbaord />} />
                        {/* Add more nested routes here if needed */}
                        <Route path="analytics" element={<AnalyticsPage/>}/>
                        <Route path="bin" element={<BinPage/>} />
                        <Route path="settings" element={<SettingsPage/>} />
                      </Route>
                    </Routes>
                  </Suspense>
            </SearchContextProvider>
          </ThemeContextProvider>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
