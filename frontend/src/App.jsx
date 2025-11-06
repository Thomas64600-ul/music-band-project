import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import AdminWrapper from "./layouts/AdminWrapper";


const PlayerGlobal = lazy(() => import("./components/PlayerGlobal"));

const Home = lazy(() => import("./pages/Home"));
const Music = lazy(() => import("./pages/Music"));
const Concerts = lazy(() => import("./pages/Concerts"));
const Blog = lazy(() => import("./pages/Blog"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Cagnotte = lazy(() => import("./pages/Cagnotte"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminListArticles = lazy(() => import("./pages/AdminListArticles"));
const AdminEditArticle = lazy(() => import("./pages/AdminEditArticle"));
const AdminListConcerts = lazy(() => import("./pages/AdminListConcerts"));
const AdminEditConcert = lazy(() => import("./pages/AdminEditConcert"));
const AdminListMusics = lazy(() => import("./pages/AdminListMusics"));
const AdminEditMusic = lazy(() => import("./pages/AdminEditMusic"));
const AdminMessages = lazy(() => import("./pages/AdminMessages"));
const AdminDonations = lazy(() => import("./pages/AdminDonations"));
const AdminUsers = lazy(() => import("./pages/AdminUsers"));
const AdminStats = lazy(() => import("./pages/AdminStats"));
const AdminComments = lazy(() => import("./pages/AdminComments"));

export default function App() {
  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-500 
      bg-[var(--bg)] text-[var(--text)]"
    >
      <Header
        logoSrc="/logo-small.webp"
        links={[
          { name: "Accueil", path: "/" },
          { name: "Musique", path: "/music" },
          { name: "Concerts", path: "/concerts" },
          { name: "Blog", path: "/blog" },
          { name: "Cagnotte", path: "/cagnotte" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <main className="flex-grow pt-20 md:pt-28 pb-36 md:pb-40">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[50vh]">
              <Loader />
            </div>
          }
        >
          <Routes>
           
            <Route path="/" element={<Home />} />
            <Route path="/music" element={<Music />} />
            <Route path="/concerts" element={<Concerts />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<ArticleDetail />} />
            <Route path="/cagnotte" element={<Cagnotte />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminWrapper>
                    <AdminDashboard />
                  </AdminWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/articles"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminWrapper>
                    <AdminListArticles />
                  </AdminWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/articles/:id"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminWrapper>
                    <AdminEditArticle />
                  </AdminWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/concerts"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminWrapper>
                    <AdminListConcerts />
                  </AdminWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/concerts/:id"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminWrapper>
                    <AdminEditConcert />
                  </AdminWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/musics"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminWrapper>
                    <AdminListMusics />
                  </AdminWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/musics/:id"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminWrapper>
                    <AdminEditMusic />
                  </AdminWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/comments"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminWrapper>
                    <AdminComments />
                  </AdminWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/messages"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminWrapper>
                    <AdminMessages />
                  </AdminWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/donations"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminWrapper>
                    <AdminDonations />
                  </AdminWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminWrapper>
                    <AdminUsers />
                  </AdminWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/stats"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminWrapper>
                    <AdminStats />
                  </AdminWrapper>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <PlayerGlobal />
      </Suspense>

      <div style={{ height: "110px" }}></div>

      <Footer
        siteTitle="REVEREN"
        socials={[
          { name: "Instagram", url: "https://instagram.com" },
          { name: "YouTube", url: "https://youtube.com" },
          { name: "Spotify", url: "https://spotify.com" },
        ]}
      />
    </div>
  );
}






