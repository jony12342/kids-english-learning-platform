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

        {/* 学习场景选择 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* 魔法花园 */}
          <a
            href="/garden"
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg transform transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="text-6xl mb-4 animate-wiggle">🌸</div>
            <h2 className="font-size-medium font-bold text-primary-blue mb-2">
              魔法花园
            </h2>
            <p className="font-size-small text-gray-600 mb-4">
              跟猫头鹰老师一起学单词！
            </p>
            <div className="flex items-center gap-2 text-primary-green">
              <span className="font-bold">开始学习</span>
              <span>→</span>
            </div>
          </a>

          {/* 探险森林 */}
          <a
            href="/forest"
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg transform transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="text-6xl mb-4 animate-wiggle">🌲</div>
            <h2 className="font-size-medium font-bold text-primary-blue mb-2">
              探险森林
            </h2>
            <p className="font-size-small text-gray-600 mb-4">
              跟森林动物对话练习！
            </p>
            <div className="flex items-center gap-2 text-primary-green">
              <span className="font-bold">开始探险</span>
              <span>→</span>
            </div>
          </a>

          {/* 快乐厨房 */}
          <a
            href="/kitchen"
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg transform transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="text-6xl mb-4 animate-wiggle">🧁</div>
            <h2 className="font-size-medium font-bold text-primary-blue mb-2">
              快乐厨房
            </h2>
            <p className="font-size-small text-gray-600 mb-4">
              做蛋糕学英语词汇！
            </p>
            <div className="flex items-center gap-2 text-primary-green">
              <span className="font-bold">开始做蛋糕</span>
              <span>→</span>
            </div>
          </a>
        </div>

        {/* 每日任务和查看进度 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <a
            href="/tasks"
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg transform transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="text-4xl">📋</div>
              <div className="text-left">
                <div className="font-size-small font-bold text-primary-blue">
                  每日任务
                </div>
                <div className="text-xs text-gray-600">
                  完成任务赢取奖励
                </div>
              </div>
            </div>
          </a>

          <a
            href="/progress"
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg transform transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="text-4xl">📊</div>
              <div className="text-left">
                <div className="font-size-small font-bold text-primary-blue">
                  查看学习进度
                </div>
                <div className="text-xs text-gray-600">
                  了解你的学习成果
                </div>
              </div>
            </div>
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

        {/* 角色编辑器 */}
        <a
          href="/character"
          className="inline-block bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg transform transition hover:scale-105 active:scale-95 cursor-pointer mb-8"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="text-4xl">🎨</div>
            <div className="text-left">
              <div className="font-size-small font-bold text-primary-blue">
                创建我的角色
              </div>
              <div className="text-xs text-gray-600">
                定制专属学习伙伴
              </div>
            </div>
          </div>
        </a>

        {/* 家长入口 */}
        <div className="text-white/80 text-sm mb-4">
          <a href="/parent" className="hover:text-white underline">
            👨‍👩‍👧 家长入口 →
          </a>
        </div>
      </div>
    </main>
  );
}
