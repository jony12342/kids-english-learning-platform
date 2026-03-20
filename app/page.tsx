export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-yellow via-primary-orange to-primary-pink flex flex-col items-center justify-center p-4 md:p-8">
      <div className="max-w-6xl mx-auto w-full">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-bounce-gentle">
            ✨ Kids English Learning ✨
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            跟AI老师一起快乐学英语！
          </p>
        </div>

        {/* 主要学习场景 - 大卡片 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">🎮 学习场景</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* 单词学习 */}
            <a
              href="/words"
              className="group bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl active:scale-95 cursor-pointer border-4 border-white/30"
            >
              <div className="text-7xl mb-4 animate-wiggle group-hover:scale-110 transition-transform">📚</div>
              <h2 className="text-2xl font-bold text-primary-blue mb-2">
                单词学习
              </h2>
              <p className="text-gray-600 mb-4">
                看图片学单词，练习发音！
              </p>
              <div className="flex items-center gap-2 text-primary-green font-bold">
                <span>开始学习</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>

            {/* 短句学习 */}
            <a
              href="/sentences"
              className="group bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl active:scale-95 cursor-pointer border-4 border-white/30"
            >
              <div className="text-7xl mb-4 animate-wiggle group-hover:scale-110 transition-transform">💬</div>
              <h2 className="text-2xl font-bold text-primary-blue mb-2">
                短句学习
              </h2>
              <p className="text-gray-600 mb-4">
                学习日常用语，大胆开口！
              </p>
              <div className="flex items-center gap-2 text-primary-green font-bold">
                <span>开始练习</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>

            {/* 魔法花园 */}
            <a
              href="/garden"
              className="group bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl active:scale-95 cursor-pointer border-4 border-white/30"
            >
              <div className="text-7xl mb-4 animate-wiggle group-hover:scale-110 transition-transform">🌸</div>
              <h2 className="text-2xl font-bold text-primary-blue mb-2">
                魔法花园
              </h2>
              <p className="text-gray-600 mb-4">
                跟猫头鹰老师一起学单词！
              </p>
              <div className="flex items-center gap-2 text-primary-green font-bold">
                <span>开始学习</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>

            {/* 探险森林 */}
            <a
              href="/forest"
              className="group bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl active:scale-95 cursor-pointer border-4 border-white/30"
            >
              <div className="text-7xl mb-4 animate-wiggle group-hover:scale-110 transition-transform">🌲</div>
              <h2 className="text-2xl font-bold text-primary-blue mb-2">
                探险森林
              </h2>
              <p className="text-gray-600 mb-4">
                跟森林动物对话练习！
              </p>
              <div className="flex items-center gap-2 text-primary-green font-bold">
                <span>开始探险</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>

            {/* 快乐厨房 */}
            <a
              href="/kitchen"
              className="group bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl active:scale-95 cursor-pointer border-4 border-white/30"
            >
              <div className="text-7xl mb-4 animate-wiggle group-hover:scale-110 transition-transform">🧁</div>
              <h2 className="text-2xl font-bold text-primary-blue mb-2">
                快乐厨房
              </h2>
              <p className="text-gray-600 mb-4">
                做蛋糕学英语词汇！
              </p>
              <div className="flex items-center gap-2 text-primary-green font-bold">
                <span>开始做蛋糕</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>

            {/* 趣味游戏 */}
            <a
              href="/games"
              className="group bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl active:scale-95 cursor-pointer border-4 border-white/30"
            >
              <div className="text-7xl mb-4 animate-wiggle group-hover:scale-110 transition-transform">🎴</div>
              <h2 className="text-2xl font-bold text-primary-blue mb-2">
                趣味游戏
              </h2>
              <p className="text-gray-600 mb-4">
                玩卡片游戏记单词！
              </p>
              <div className="flex items-center gap-2 text-primary-green font-bold">
                <span>开始游戏</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>

            {/* 泡泡射击 */}
            <a
              href="/bubble-game"
              className="group bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl active:scale-95 cursor-pointer border-4 border-white/30"
            >
              <div className="text-7xl mb-4 animate-wiggle group-hover:scale-110 transition-transform">🫧</div>
              <h2 className="text-2xl font-bold text-primary-blue mb-2">
                泡泡射击
              </h2>
              <p className="text-gray-600 mb-4">
                戳泡泡学单词，超好玩！
              </p>
              <div className="flex items-center gap-2 text-primary-green font-bold">
                <span>开始玩</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          </div>
        </div>

        {/* 功能区 - 中等卡片 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">📚 学习工具</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* 每日任务 */}
            <a
              href="/tasks"
              className="group bg-gradient-to-br from-blue-50 to-blue-100 backdrop-blur-sm rounded-2xl p-6 shadow-lg transform transition-all hover:scale-105 hover:shadow-xl active:scale-95 cursor-pointer border-2 border-blue-200"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">📋</div>
              <h3 className="text-lg font-bold text-primary-blue mb-1">每日任务</h3>
              <p className="text-sm text-gray-600">完成任务赢奖励</p>
            </a>

            {/* 学习进度 */}
            <a
              href="/progress"
              className="group bg-gradient-to-br from-purple-50 to-purple-100 backdrop-blur-sm rounded-2xl p-6 shadow-lg transform transition-all hover:scale-105 hover:shadow-xl active:scale-95 cursor-pointer border-2 border-purple-200"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">📊</div>
              <h3 className="text-lg font-bold text-primary-blue mb-1">学习进度</h3>
              <p className="text-sm text-gray-600">查看学习成果</p>
            </a>

            {/* 角色创建 */}
            <a
              href="/character"
              className="group bg-gradient-to-br from-pink-50 to-pink-100 backdrop-blur-sm rounded-2xl p-6 shadow-lg transform transition-all hover:scale-105 hover:shadow-xl active:scale-95 cursor-pointer border-2 border-pink-200"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">🎨</div>
              <h3 className="text-lg font-bold text-primary-blue mb-1">我的角色</h3>
              <p className="text-sm text-gray-600">定制学习伙伴</p>
            </a>

            {/* 家长入口 */}
            <a
              href="/parent"
              className="group bg-gradient-to-br from-indigo-50 to-indigo-100 backdrop-blur-sm rounded-2xl p-6 shadow-lg transform transition-all hover:scale-105 hover:shadow-xl active:scale-95 cursor-pointer border-2 border-indigo-200"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">👨‍👩‍👧</div>
              <h3 className="text-lg font-bold text-primary-blue mb-1">家长中心</h3>
              <p className="text-sm text-gray-600">查看学习报告</p>
            </a>
          </div>
        </div>

        {/* 特性展示 - 小卡片 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white/90 mb-4 text-center">✨ 为什么选择我们</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md text-center">
              <div className="text-3xl mb-2">🎤</div>
              <h3 className="text-sm font-bold text-primary-blue mb-1">语音对话</h3>
              <p className="text-xs text-gray-600">跟AI老师说话</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md text-center">
              <div className="text-3xl mb-2">🌟</div>
              <h3 className="text-sm font-bold text-primary-blue mb-1">趣味学习</h3>
              <p className="text-xs text-gray-600">游戏化学习</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md text-center">
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="text-sm font-bold text-primary-blue mb-1">奖励多多</h3>
              <p className="text-xs text-gray-600">星星徽章收集</p>
            </div>
          </div>
        </div>

        {/* 底部提示 */}
        <div className="text-center text-white/70 text-sm">
          <p>🎯 每天学习一点点，英语进步看得见！</p>
        </div>
      </div>
    </main>
  );
}
