import { useState } from 'react'
import { Brain, Send } from 'lucide-react'

const chatHistory = [
  { role: 'user', content: '请帮我解释一元一次方程的解法' },
  { role: 'assistant', content: '一元一次方程是只含有一个未知数，且未知数的最高次数为1的方程。解一元一次方程的基本步骤：\n\n1. **去分母**：方程两边同乘以最小公倍数\n2. **去括号**：利用分配律展开\n3. **移项**：将含未知数的项移到一边，常数项移到另一边\n4. **合并同类项**\n5. **系数化为1**：两边同除以未知数的系数\n\n例如：解方程 2x + 3 = 7\n- 移项：2x = 7 - 3 = 4\n- 系数化为1：x = 4 ÷ 2 = 2\n\n所以 x = 2 是方程的解。' },
]

const AiTutor = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(chatHistory)

  const handleSend = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { role: 'user', content: input }])
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '这是一个模拟回复。在实际应用中，这里会调用 AI 接口来生成智能回答。'
      }])
    }, 1000)
  }

  return (
    <div className="animate-fade-in-up">
      <div className="page-header">
        <h1 className="page-title">AI 答疑</h1>
        <p className="page-subtitle">智能学习助手，随时为你解答疑问</p>
      </div>

      <div className="card" style={{ height: 'calc(100vh - 220px)', display: 'flex', flexDirection: 'column' }}>
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-4 rounded-xl text-[14px] leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-surface-overlay text-text-primary'
              }`}>
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2 text-primary-600">
                    <Brain size={16} />
                    <span className="text-[12px] font-semibold">AI 助手</span>
                  </div>
                )}
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="输入你的问题..."
            className="input-field flex-1"
          />
          <button onClick={handleSend} className="btn-primary">
            <Send size={16} />
            发送
          </button>
        </div>
      </div>
    </div>
  )
}

export default AiTutor
