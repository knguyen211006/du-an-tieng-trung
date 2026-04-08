// import { prisma } from "@/lib/prisma"

// export default async function LogsPage() {
//   const logs = await prisma.adminLog.findMany({
//     take: 50,
//     orderBy: { createdAt: "desc" },
//   })

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold">Nhật ký Hoạt động</h1>
//       <div className="border rounded-lg overflow-hidden bg-background">
//         <table className="w-full text-left text-sm">
//           <thead className="bg-secondary/50 uppercase text-xs font-bold">
//             <tr>
//               <th className="p-4">Hành động</th>
//               <th className="p-4">Chi tiết</th>
//               <th className="p-4 text-right">Thời gian</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y">
//             {logs.map((log) => (
//               <tr key={log.id} className="hover:bg-secondary/20 transition-colors">
//                 <td className="p-4 font-bold text-primary">{log.action}</td>
//                 <td className="p-4 font-mono text-xs max-w-md truncate">
//                   {JSON.stringify(log.metadata)}
//                 </td>
//                 <td className="p-4 text-right text-muted-foreground text-xs">
//                   {new Date(log.createdAt).toLocaleString('vi-VN')}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }