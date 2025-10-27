import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Music from "./pages/Music";
import Concerts from "./pages/Concerts";
import Blog from "./pages/Blog";
import ArticleDetail from "./pages/ArticleDetail";
import Contact from "./pages/Contact";
import Cagnotte from "./pages/Cagnotte";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import VerifyEmail from "./pages/VerifyEmail";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";

import AdminDashboard from "./pages/AdminDashboard";
import AdminListArticles from "./pages/AdminListArticles";
import AdminEditArticle from "./pages/AdminEditArticle";
import AdminListConcerts from "./pages/AdminListConcerts";
import AdminEditConcert from "./pages/AdminEditConcert";
import AdminListMusics from "./pages/AdminListMusics";
import AdminEditMusic from "./pages/AdminEditMusic";
import AdminMessages from "./pages/AdminMessages";
import AdminDonations from "./pages/AdminDonations";
import AdminUsers from "./pages/AdminUsers";
import AdminStats from "./pages/AdminStats";
import AdminComments from "./pages/AdminComments";

export default function App() {
  
  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-500 
      bg-[var(--bg)] text-[var(--text)]"
    >
    
      <Header
        logoSrc="/src/assets/logo.png"
        links={[
          { name: "Accueil", path: "/" },
          { name: "Musique", path: "/music" },
          { name: "Concerts", path: "/concerts" },
          { name: "Blog", path: "/blog" },
          { name: "Cagnotte", path: "/cagnotte" },
          { name: "Contact", path: "/contact" },
        ]}
      />

    
      <main className="flex-grow pt-20 md:pt-28 pb-16 md:pb-18">
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
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/articles"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout>
                  <AdminListArticles />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/articles/new"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout>
                  <AdminEditArticle />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/articles/edit/:id"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout>
                  <AdminEditArticle />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/concerts"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout>
                  <AdminListConcerts />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/concerts/new"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout>
                  <AdminEditConcert />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/concerts/edit/:id"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout>
                  <AdminEditConcert />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/musics"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout>
                  <AdminListMusics />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/musics/new"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout>
                  <AdminEditMusic />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/musics/edit/:id"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout>
                  <AdminEditMusic />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/comments"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout>
                  <AdminComments />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout>
                  <AdminMessages />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/donations"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout>
                  <AdminDonations />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout>
                  <AdminUsers />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/stats"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout>
                  <AdminStats />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

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









