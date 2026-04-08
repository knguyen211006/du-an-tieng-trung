// import { prisma } from "@/lib/prisma"
// import { Card } from "@/components/ui/card"

// export default async function UsersPage() {
//   const users = await prisma.user.findMany({
//     orderBy: { createdAt: "desc" },
//   })

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold">Quản lý Người dùng</h1>
//       <div className="grid gap-4">
//         {users.map((u) => (
//           <Card key={u.id} className="p-4 flex justify-between items-center border-2 hover:border-primary/30 transition-all">
//             <div>
//               <div className="font-bold text-lg">{u.name || "Chưa đặt tên"}</div>
//               <div className="text-sm text-muted-foreground">{u.email}</div>
//             </div>
//             <div className="flex gap-4 items-center">
//               <span className="text-xs font-mono bg-secondary px-2 py-1 rounded">ID: {u.id.slice(-6)}</span>
//               <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.role === 'ADMIN' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
//                 {u.role}
//               </span>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }