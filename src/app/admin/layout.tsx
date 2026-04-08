export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-container">
      {/* Khung layout chung cho toàn bộ khu vực Admin */}
      {children}
    </div>
  );
}