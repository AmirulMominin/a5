import { getMe } from "@/service/getMe";
import DashboardSidebar from "../_components/dashboard/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const user = await getMe()
  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      
      {/* Sidebar */}
      <aside className="w-[20%] min-w-[220px] border-r bg-muted/30">
        <DashboardSidebar user = {user}/>
      </aside>

      {/* Dashboard content */}
      <main className="w-[80%] flex-1 p-6">
        {children}
      </main>

    </div>
  );
}