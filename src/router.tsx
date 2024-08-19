import { ReactNode, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Home,
  Login,
  Register,
  Activation,
  Albums,
  Artists,
  Songs,
  Search,
  NotFound,
  About,
  ForgotPassword,
  ResetPassword,
  User,
  Artist,
  Album,
  Song,
} from "./pages/index";
import { Layout, AppContent } from "./layouts";
import { Loading } from "./components/index";
import { RootState } from "./store";

const Router: React.FC = () => {
  const token = useSelector((state: RootState) => state.login.token);

  const renderPage = (component: ReactNode) => (
    <Suspense fallback={<Loading />}>
      <AppContent page={component} />
    </Suspense>
  );

  const NotAuthRoute: React.FC<{ component: ReactNode }> = ({ component }) => {
    return token ? <Navigate to="/" replace /> : renderPage(component);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={renderPage(<Home />)} />
        <Route path="/login" element={<NotAuthRoute component={<Login />} />} />
        <Route path="/register" element={<NotAuthRoute component={<Register />} />}/>
        <Route path="/activation" element={<NotAuthRoute component={<Activation />} />}/>
        <Route path="/forgot-password" element={<NotAuthRoute component={<ForgotPassword />} />} />
        <Route path="/reset-password/:token" element={<NotAuthRoute component={<ResetPassword />} />} />
        <Route path="/albums" element={renderPage(<Albums />)} />
        <Route path="/artists" element={renderPage(<Artists />)} />
        <Route path="/songs" element={renderPage(<Songs />)} />
        <Route path="/search" element={renderPage(<Search />)} />
        <Route path="/about" element={renderPage(<About />)} />
        <Route path="/user/:username" element={renderPage(<User />)} />
        <Route path="/artist/:id" element={renderPage(<Artist />)} />
        <Route path="/album/:id" element={renderPage(<Album />)} />
        <Route path="/song/:id" element={renderPage(<Song />)} />
        <Route path="*" element={renderPage(<NotFound />)} />
      </Route>
    </Routes>
  );
}

export default Router;
