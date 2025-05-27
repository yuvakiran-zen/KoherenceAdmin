import { RiApps2Line, RiCalendarTodoLine, RiListCheck2, RiUserLine } from 'react-icons/ri'
import { motion } from 'framer-motion'

const Dashboard = () => {
  const stats = [
    { name: 'Total Programs', value: '24', icon: RiApps2Line, color: 'from-blue-500 to-blue-600' },
    { name: 'Active Routines', value: '87', icon: RiCalendarTodoLine, color: 'from-purple-500 to-purple-600' },
    { name: 'Created Steps', value: '156', icon: RiListCheck2, color: 'from-pink-500 to-pink-600' },
    { name: 'Registered Users', value: '2,145', icon: RiUserLine, color: 'from-green-500 to-green-600' },
  ]

  const recentPrograms = [
    { id: 1, name: 'Mindfulness Fundamentals', category: 'meditation', participants: 14 },
    { id: 2, name: 'Yoga for Beginners', category: 'yoga', participants: 28 },
    { id: 3, name: 'Advanced Meditation', category: 'meditation', participants: 12 },
  ]

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">Overview of your Koherence platform</p>
      </div>

      {/* Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {stats.map((stat, index) => (
          <motion.div 
            key={index} 
            variants={item}
            className="card p-6 flex items-center space-x-4"
          >
            <div className={`rounded-full p-3 bg-gradient-to-r ${stat.color} text-white`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent programs & activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent programs */}
        <motion.div 
          className="card lg:col-span-2 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold mb-4">Recent Programs</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                </tr>
              </thead>
              <tbody>
                {recentPrograms.map((program) => (
                  <tr key={program.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 text-sm text-gray-900 font-medium">{program.name}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                        {program.category}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-500">{program.participants} users</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Activity */}
        <motion.div 
          className="card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-lg font-semibold mb-4">Platform Activity</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">New Users (30d)</div>
              <div className="text-sm font-semibold text-green-600">+24%</div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '68%' }}></div>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm font-medium">Program Engagement</div>
              <div className="text-sm font-semibold text-blue-600">+12%</div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm font-medium">Routine Completion</div>
              <div className="text-sm font-semibold text-purple-600">+8%</div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '52%' }}></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard