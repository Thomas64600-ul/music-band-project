import { Suspense } from "react";
import Loader from "../components/Loader";
import AdminLayout from "./AdminLayout";

export default function AdminWrapper({ children }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader />
        </div>
      }
    >
      <AdminLayout>{children}</AdminLayout>
    </Suspense>
  );
}