export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-yellow via-primary-orange to-primary-pink flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* 标题 */}
        <h1 className="font-size-large font-bold text-white mb-8 animate-bounce-gentle">
          ✨ Kids English Learning ✨
        </h1>

        {/* 副标题 */}
        <p className="font-size-medium text-white mb-12">
          跟AI老师一起快乐学英语！
        </p>

        {/* 欢迎卡片 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8">
          <div className="text-6xl mb-4 animate-wiggle">
            🦉
          </div>
          <h2 className="font-size-medium font-bold text-primary-blue mb-4">
            欢迎来到魔法花园！
          </h2>
          <p className="font-size-small text-gray-600 mb-6">
            我是猫头鹰老师Owl，今天我们要一起学单词哦！
          </p>

          {/* 开始按钮 */}
          <a
            href="/garden"
            className="min-touch-target bg-primary-green hover:bg-primary-green/80 text-white font-size-medium font-bold py-4 px-8 rounded-full shadow-lg transform transition hover:scale-105 active:scale-95"
          >
            开始学习 🎉
          </a>
        </div>

        {/* 特性展示 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-4xl mb-2">🎤</div>
            <h3 className="font-size-small font-bold text-primary-blue mb-1">语音对话</h3>
            <p className="text-sm text-gray-600">跟AI老师说话学英语</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-4xl mb-2">🌟</div>
            <h3 className="font-size-small font-bold text-primary-blue mb-1">趣味学习</h3>
            <p className="text-sm text-gray-600">游戏化快乐学习</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-4xl mb-2">⭐</div>
            <h3 className="font-size-small font-bold text-primary-blue mb-1">奖励多多</h3>
            <p className="text-sm text-gray-600">星星徽章等你收集</p>
          </div>
        </div>

        {/* 家长入口 */}
        <div className="text-white/80 text-sm">
          <a href="#" className="hover:text-white underline">
            家长入口 →
          </a>
        </div>
      </div>
    </main>
  );
}
