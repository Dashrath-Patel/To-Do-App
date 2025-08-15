const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white/80 dark:bg-slate-800/40 backdrop-blur-sm border border-purple-200/50 dark:border-slate-700/50 rounded-xl p-6 hover:border-purple-400/60 dark:hover:border-purple-500/30 hover:bg-white/90 dark:hover:bg-slate-800/60 transition-all duration-300 group relative overflow-hidden shadow-lg shadow-purple-500/10">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-8 dark:opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-gray-700 dark:text-slate-400 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{value}</p>
        </div>
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          {icon}
        </div>
      </div>
      
      {/* Progress bar for visual appeal */}
      <div className="relative z-10 mt-4">
        <div className="w-full bg-purple-100/60 dark:bg-slate-700/50 rounded-full h-2">
          <div 
            className={`h-2 rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out shadow-sm`}
            style={{ width: `${Math.min((value / 10) * 100, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default StatsCard
