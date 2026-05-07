import { User, Mail, Phone, School, BookOpen } from 'lucide-react'

const Profile = () => {
  return (
    <div className="animate-fade-in-up">
      <div className="page-header">
        <h1 className="page-title">个人中心</h1>
        <p className="page-subtitle">管理你的个人信息与学习设置</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="card col-span-1">
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-accent-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">李</div>
            <h3 className="text-[18px] font-bold text-text-primary">李明</h3>
            <p className="text-[13px] text-text-tertiary mt-1">七年级1班</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[13px]">
              <User size={16} className="text-text-tertiary" />
              <span className="text-text-secondary">用户名：</span>
              <span className="text-text-primary">liming</span>
            </div>
            <div className="flex items-center gap-3 text-[13px]">
              <School size={16} className="text-text-tertiary" />
              <span className="text-text-secondary">学校：</span>
              <span className="text-text-primary">实验中学</span>
            </div>
            <div className="flex items-center gap-3 text-[13px]">
              <BookOpen size={16} className="text-text-tertiary" />
              <span className="text-text-secondary">年级：</span>
              <span className="text-text-primary">七年级</span>
            </div>
            <div className="flex items-center gap-3 text-[13px]">
              <Mail size={16} className="text-text-tertiary" />
              <span className="text-text-secondary">邮箱：</span>
              <span className="text-text-primary">liming@example.com</span>
            </div>
            <div className="flex items-center gap-3 text-[13px]">
              <Phone size={16} className="text-text-tertiary" />
              <span className="text-text-secondary">手机：</span>
              <span className="text-text-primary">138****1234</span>
            </div>
          </div>
        </div>

        <div className="col-span-2 space-y-6">
          <div className="card">
            <h3 className="section-title mb-4">学习统计</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-primary-50">
                <div className="text-[24px] font-bold text-primary-600">28</div>
                <div className="text-[12px] text-text-tertiary mt-1">已完成作业</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-accent-50">
                <div className="text-[24px] font-bold text-accent-600">85</div>
                <div className="text-[12px] text-text-tertiary mt-1">平均分</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-warm-50">
                <div className="text-[24px] font-bold text-warm-500">92%</div>
                <div className="text-[12px] text-text-tertiary mt-1">作业完成率</div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="section-title mb-4">修改密码</h3>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-[13px] font-medium text-text-secondary mb-1.5">当前密码</label>
                <input type="password" className="input-field" placeholder="请输入当前密码" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-text-secondary mb-1.5">新密码</label>
                <input type="password" className="input-field" placeholder="请输入新密码" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-text-secondary mb-1.5">确认新密码</label>
                <input type="password" className="input-field" placeholder="请再次输入新密码" />
              </div>
              <button className="btn-primary">保存修改</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
