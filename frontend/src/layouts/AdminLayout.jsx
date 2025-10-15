import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex bg-[#0A0A0A] min-h-screen text-[#F2F2F2]">
      <AdminSidebar />
      <main className="flex-1 ml-0 md:ml-64 p-6">{children}</main>
    </div>
  );
}
