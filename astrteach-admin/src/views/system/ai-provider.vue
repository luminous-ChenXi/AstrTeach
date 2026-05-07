<template>
  <div class="page-container">
    <div class="page-header">
      <div class="header-left">
        <div class="header-icon">
          <el-icon :size="22"><Cpu /></el-icon>
        </div>
        <div class="header-text">
          <h2>大模型设置</h2>
          <p>管理 AI 服务提供商、模型配置与 API 密钥</p>
        </div>
      </div>
      <el-button type="primary" class="header-btn" @click="handleAdd">
        <el-icon><Plus /></el-icon>
        添加服务
      </el-button>
    </div>

    <div class="tabs-bar">
      <div
        v-for="tab in tabs"
        :key="tab.name"
        class="tab-item"
        :class="{ active: activeTab === tab.name }"
        @click="activeTab = tab.name"
      >
        <el-icon :size="16"><component :is="tab.icon" /></el-icon>
        <span>{{ tab.label }}</span>
        <span class="tab-count">{{ getTabCount(tab.name) }}</span>
      </div>
    </div>

    <div class="toolbar">
      <el-input
        v-model="searchQuery"
        placeholder="搜索服务名称或模型..."
        class="search-input"
        clearable
        :prefix-icon="Search"
      />
    </div>

    <div class="provider-grid">
      <TransitionGroup name="card-fade">
        <div
          v-for="item in filteredProviders"
          :key="item.id"
          class="provider-card"
          :class="{ disabled: !item.enabled }"
        >
          <div class="card-top">
            <div class="provider-brand" :style="{ background: getProviderColor(item.provider) }">
              <span class="brand-text">{{ getProviderIcon(item.provider) }}</span>
            </div>
            <div class="card-actions">
              <el-switch
                v-model="item.enabled"
                size="small"
                @change="handleToggle(item)"
              />
            </div>
          </div>

          <div class="card-body">
            <h4 class="card-title">{{ item.name }}</h4>
            <span class="card-subtitle">{{ getProviderLabel(item.provider) }}</span>

            <div class="card-tags">
              <span v-if="item.model" class="tag model">{{ item.model }}</span>
              <span v-if="item.apiKeys && item.apiKeys.length > 0" class="tag keys">
                {{ item.apiKeys.length }} 个密钥
              </span>
              <span v-else class="tag no-keys">未配置密钥</span>
            </div>

            <div class=""info-value model-tag">{{ item.model || '未配置' }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">API 地址</span>
            <span class="info-value api-url" :title="item.apiBase">{{ item.apiBase }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">API Key</span>
            <span class="info-value">
              <template v-if="item.apiKeys && item.apiKeys.length > 0">
                <el-tag size="small" type="success">{{ item.apiKeys.length }} 个密钥</el-tag>
              </template>
              <template v-else>
                <el-tag size="small" type="danger">未配置</el-tag>
              </template>
            </span>
          </div>
          <div class="info-row">
            <span class="info-label">超时</span>
            <span class="info-value">{{ item.timeout || 120 }}s</span>
          </div>
        </div>

        <div class="card-footer">
          <el-button size="small" @click="handleTest(item)" :loading="testingId === item.id">
            <el-icon><Connection /></el-icon>
            测试
          </el-button>
          <el-button size="small" type="primary" link @click="handleEdit(item)">编辑</el-button>
          <el-button size="small" type="danger" link @click="handleDelete(item)">删除</el-button>
        </div>
      </el-card>

      <div class="provider-card add-card" @click="handleAdd">
        <el-icon :size="32" color="#c0c4cc"><Plus /></el-icon>
        <span style="margin-top: 8px; color: #909399; font-size: 14px">添加 AI 服务</span>
      </div>
    </div>

    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑 AI 服务' : '添加 AI 服务'"
      width="680px"
      destroy-on-close
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="formRules"
        label-width="100px"
        label-position="top"
      >
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="服务名称" prop="name">
              <el-input v-model="form.name" placeholder="如：OpenAI 主力模型" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务商" prop="provider">
              <el-select v-model="form.provider" placeholder="选择服务商" style="width: 100%" @change="handleProviderChange">
                <el-option-group label="国际平台">
                  <el-option label="OpenAI" value="openai" />
                  <el-option label="Anthropic (Claude)" value="anthropic" />
                  <el-option label="Google Gemini" value="gemini" />
                  <el-option label="xAI (Grok)" value="xai" />
                  <el-option label="Groq" value="groq" />
                  <el-option label="OpenRouter" value="openrouter" />
                </el-option-group>
                <el-option-group label="国内平台">
                  <el-option label="DeepSeek" value="deepseek" />
                  <el-option label="智谱 AI" value="zhipu" />
                  <el-option label="Moonshot (Kimi)" value="moonshot" />
                  <el-option label="MiniMax" value="minimax" />
                  <el-option label="硅基流动 (SiliconFlow)" value="siliconflow" />
                  <el-option label="百炼 (DashScope)" value="dashscope" />
                </el-option-group>
                <el-option-group label="本地部署">
                  <el-option label="Ollama" value="ollama" />
                  <el-option label="LM Studio" value="lmstudio" />
                  <el-option label="vLLM" value="vllm" />
                </el-option-group>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="服务类型" prop="providerType">
              <el-select v-model="form.providerType" placeholder="选择类型" style="width: 100%">
                <el-option label="对话模型" value="chat_completion" />
                <el-option label="语音转文字" value="speech_to_text" />
                <el-option label="文字转语音" value="text_to_speech" />
                <el-option label="嵌入模型" value="embedding" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模型名称" prop="model">
              <el-select
                v-model="form.model"
                placeholder="选择或输入模型"
                style="width: 100%"
                filterable
                allow-create
              >
                <el-option
                  v-for="m in currentModels"
                  :key="m.value"
                  :label="m.label"
                  :value="m.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="API 地址" prop="apiBase">
          <el-input v-model="form.apiBase" placeholder="如：https://api.openai.com/v1" />
        </el-form-item>

        <el-form-item label="API Key" prop="apiKeys">
          <div class="api-keys-wrapper">
            <div v-for="(_, index) in form.apiKeys" :key="index" class="api-key-row">
              <el-input
                v-model="form.apiKeys[index]"
                :type="showKeys[index] ? 'text' : 'password'"
                placeholder="输入 API Key"
                style="flex: 1"
              >
                <template #suffix>
                  <el-icon class="key-toggle" @click="showKeys[index] = !showKeys[index]">
                    <View v-if="!showKeys[index]" />
                    <Hide v-else />
                  </el-icon>
                </template>
              </el-input>
              <el-button
                type="danger"
                link
                @click="form.apiKeys.splice(index, 1); showKeys.splice(index, 1)"
                :disabled="form.apiKeys.length <= 1"
              >
                <el-icon><Delete /></el-icon>
              </el-button>
            </div>
            <el-button type="primary" link @click="form.apiKeys.push(''); showKeys.push(false)">
              <el-icon><Plus /></el-icon>
              添加 Key
            </el-button>
          </div>
        </el-form-item>

        <el-row :gutter="16">
          <el-col :span="8">
            <el-form-item label="超时时间 (秒)">
              <el-input-number v-model="form.timeout" :min="10" :max="600" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="API Version">
              <el-input v-model="form.apiVersion" placeholder="Azure 等需要" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="代理地址">
              <el-input v-model="form.proxy" placeholder="如：http://127.0.0.1:7890" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-collapse>
          <el-collapse-item title="高级配置" name="advanced">
            <el-form-item label="自定义请求头">
              <div class="kv-wrapper">
                <div v-for="(_, index) in customHeaderEntries" :key="'h' + index" class="kv-row">
                  <el-input v-model="customHeaderEntries[index].key" placeholder="Header 名称" style="flex: 1" />
                  <el-input v-model="customHeaderEntries[index].value" placeholder="Header 值" style="flex: 1" />
                  <el-button type="danger" link @click="customHeaderEntries.splice(index, 1)">
                    <el-icon><Delete /></el-icon>
                  </el-button>
                </div>
                <el-button type="primary" link @click="customHeaderEntries.push({ key: '', value: '' })">
                  <el-icon><Plus /></el-icon>
                  添加请求头
                </el-button>
              </div>
            </el-form-item>
            <el-form-item label="自定义请求体参数">
              <div class="kv-wrapper">
                <div v-for="(_, index) in customBodyEntries" :key="'b' + index" class="kv-row">
                  <el-input v-model="customBodyEntries[index].key" placeholder="参数名" style="flex: 1" />
                  <el-input v-model="customBodyEntries[index].value" placeholder="参数值" style="flex: 1" />
                  <el-button type="danger" link @click="customBodyEntries.splice(index, 1)">
                    <el-icon><Delete /></el-icon>
                  </el-button>
                </div>
                <el-button type="primary" link @click="customBodyEntries.push({ key: '', value: '' })">
                  <el-icon><Plus /></el-icon>
                  添加参数
                </el-button>
              </div>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitting" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import {
  ChatDotRound,
  Microphone,
  Plus,
  Connection,
  View,
  Hide,
  Delete,
  Notification,
} from '@element-plus/icons-vue'
import {
  getAiProviderList,
  createAiProvider,
  updateAiProvider,
  deleteAiProvider,
  toggleAiProvider,
  testAiProvider,
} from '@/api/ai-provider'

interface ProviderItem {
  id: string
  name: string
  provider: string
  providerType: string
  apiBase: string
  apiKeys: string[]
  model: string
  apiVersion: string
  timeout: number
  proxy: string
  customHeaders: Record<string, string>
  customExtraBody: Record<string, unknown>
  status: string
  enabled: boolean
  schoolId: string
  createdAt: string
  updatedAt: string
}

const activeTab = ref('chat_completion')
const searchQuery = ref('')
const providers = ref<ProviderItem[]>([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const editingId = ref('')
const submitting = ref(false)
const testingId = ref('')
const formRef = ref<FormInstance>()
const showKeys = ref<boolean[]>([false])

const PROVIDER_PRESETS: Record<string, { apiBase: string; color: string; icon: string; label: string; models: { label: string; value: string }[] }> = {
  openai: {
    apiBase: 'https://api.openai.com/v1',
    color: '#10a37f',
    icon: 'OA',
    label: 'OpenAI',
    models: [
      { label: 'GPT-4o', value: 'gpt-4o' },
      { label: 'GPT-4o mini', value: 'gpt-4o-mini' },
      { label: 'GPT-4 Turbo', value: 'gpt-4-turbo' },
      { label: 'GPT-3.5 Turbo', value: 'gpt-3.5-turbo' },
      { label: 'o1', value: 'o1' },
      { label: 'o1-mini', value: 'o1-mini' },
      { label: 'o3-mini', value: 'o3-mini' },
    ],
  },
  anthropic: {
    apiBase: 'https://api.anthropic.com',
    color: '#d4a574',
    icon: 'AN',
    label: 'Anthropic',
    models: [
      { label: 'Claude 3.5 Sonnet', value: 'claude-3-5-sonnet-20241022' },
      { label: 'Claude 3.5 Haiku', value: 'claude-3-5-haiku-20241022' },
      { label: 'Claude 3 Opus', value: 'claude-3-opus-20240229' },
    ],
  },
  gemini: {
    apiBase: 'https://generativelanguage.googleapis.com/v1beta',
    color: '#4285f4',
    icon: 'GE',
    label: 'Google Gemini',
    models: [
      { label: 'Gemini 2.0 Flash', value: 'gemini-2.0-flash' },
      { label: 'Gemini 1.5 Pro', value: 'gemini-1.5-pro' },
      { label: 'Gemini 1.5 Flash', value: 'gemini-1.5-flash' },
    ],
  },
  deepseek: {
    apiBase: 'https://api.deepseek.com/v1',
    color: '#4d6bfe',
    icon: 'DS',
    label: 'DeepSeek',
    models: [
      { label: 'DeepSeek Chat', value: 'deepseek-chat' },
      { label: 'DeepSeek Reasoner', value: 'deepseek-reasoner' },
    ],
  },
  zhipu: {
    apiBase: 'https://open.bigmodel.cn/api/paas/v4',
    color: '#3b5cff',
    icon: 'ZP',
    label: '智谱 AI',
    models: [
      { label: 'GLM-4-Plus', value: 'glm-4-plus' },
      { label: 'GLM-4-Flash', value: 'glm-4-flash' },
      { label: 'GLM-4-Air', value: 'glm-4-air' },
    ],
  },
  moonshot: {
    apiBase: 'https://api.moonshot.cn/v1',
    color: '#6c5ce7',
    icon: 'MK',
    label: 'Moonshot',
    models: [
      { label: 'Moonshot-v1-8K', value: 'moonshot-v1-8k' },
      { label: 'Moonshot-v1-32K', value: 'moonshot-v1-32k' },
      { label: 'Moonshot-v1-128K', value: 'moonshot-v1-128k' },
    ],
  },
  xai: {
    apiBase: 'https://api.x.ai/v1',
    color: '#1a1a2e',
    icon: 'XA',
    label: 'xAI',
    models: [
      { label: 'Grok-2', value: 'grok-2' },
      { label: 'Grok-3', value: 'grok-3' },
      { label: 'Grok-3 Mini', value: 'grok-3-mini' },
    ],
  },
  groq: {
    apiBase: 'https://api.groq.com/openai/v1',
    color: '#f55036',
    icon: 'GQ',
    label: 'Groq',
    models: [
      { label: 'Llama 3.3 70B', value: 'llama-3.3-70b-versatile' },
      { label: 'Mixtral 8x7B', value: 'mixtral-8x7b-32768' },
    ],
  },
  openrouter: {
    apiBase: 'https://openrouter.ai/api/v1',
    color: '#6d28d9',
    icon: 'OR',
    label: 'OpenRouter',
    models: [
      { label: 'Auto', value: 'openrouter/auto' },
    ],
  },
  minimax: {
    apiBase: 'https://api.minimaxi.com/v1',
    color: '#ff6b35',
    icon: 'MM',
    label: 'MiniMax',
    models: [
      { label: 'MiniMax-Text-01', value: 'MiniMax-Text-01' },
    ],
  },
  siliconflow: {
    apiBase: 'https://api.siliconflow.cn/v1',
    color: '#7c3aed',
    icon: 'SF',
    label: '硅基流动',
    models: [
      { label: 'DeepSeek-V3', value: 'deepseek-ai/DeepSeek-V3' },
      { label: 'Qwen2.5-72B', value: 'Qwen/Qwen2.5-72B-Instruct' },
    ],
  },
  dashscope: {
    apiBase: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    color: '#ff6a00',
    icon: 'DQ',
    label: '百炼',
    models: [
      { label: 'Qwen-Max', value: 'qwen-max' },
      { label: 'Qwen-Plus', value: 'qwen-plus' },
      { label: 'Qwen-Turbo', value: 'qwen-turbo' },
    ],
  },
  ollama: {
    apiBase: 'http://127.0.0.1:11434/v1',
    color: '#333',
    icon: 'OL',
    label: 'Ollama',
    models: [
      { label: 'llama3', value: 'llama3' },
      { label: 'qwen2', value: 'qwen2' },
      { label: 'mistral', value: 'mistral' },
    ],
  },
  lmstudio: {
    apiBase: 'http://127.0.0.1:1234/v1',
    color: '#6366f1',
    icon: 'LM',
    label: 'LM Studio',
    models: [],
  },
  vllm: {
    apiBase: 'http://127.0.0.1:8000/v1',
    color: '#059669',
    icon: 'VL',
    label: 'vLLM',
    models: [],
  },
}

const getProviderColor = (provider: string) => PROVIDER_PRESETS[provider]?.color || '#909399'
const getProviderIcon = (provider: string) => PROVIDER_PRESETS[provider]?.icon || 'AI'
const getProviderLabel = (provider: string) => PROVIDER_PRESETS[provider]?.label || provider

const currentModels = computed(() => {
  return PROVIDER_PRESETS[form.provider]?.models || []
})

const customHeaderEntries = reactive<{ key: string; value: string }[]>([])
const customBodyEntries = reactive<{ key: string; value: string }[]>([])

const form = reactive({
  name: '',
  provider: '',
  providerType: 'chat_completion',
  apiBase: '',
  apiKeys: [''] as string[],
  model: '',
  apiVersion: '',
  timeout: 120,
  proxy: '',
})

const formRules: FormRules = {
  name: [{ required: true, message: '请输入服务名称', trigger: 'blur' }],
  provider: [{ required: true, message: '请选择服务商', trigger: 'change' }],
  providerType: [{ required: true, message: '请选择服务类型', trigger: 'change' }],
  apiBase: [{ required: true, message: '请输入 API 地址', trigger: 'blur' }],
}

const filteredProviders = computed(() => {
  let list = providers.value.filter(p => p.providerType === activeTab.value)
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.provider.toLowerCase().includes(q))
  }
  return list
})

const fetchProviders = async () => {
  try {
    const res = await getAiProviderList({ size: 100 })
    providers.value = res.data?.items || []
  } catch {
    providers.value = []
  }
}

const handleProviderChange = (val: string) => {
  const preset = PROVIDER_PRESETS[val]
  if (preset) {
    form.apiBase = preset.apiBase
    if (val === 'ollama' || val === 'lmstudio') {
      form.apiKeys = ['ollama']
    } else if (form.apiKeys.length === 1 && !form.apiKeys[0]) {
      form.apiKeys = ['']
    }
  }
}

const resetForm = () => {
  form.name = ''
  form.provider = ''
  form.providerType = activeTab.value
  form.apiBase = ''
  form.apiKeys = ['']
  form.model = ''
  form.apiVersion = ''
  form.timeout = 120
  form.proxy = ''
  customHeaderEntries.splice(0)
  customBodyEntries.splice(0)
  showKeys.value = [false]
}

const handleAdd = () => {
  isEdit.value = false
  editingId.value = ''
  resetForm()
  dialogVisible.value = true
}

const handleEdit = (item: ProviderItem) => {
  isEdit.value = true
  editingId.value = item.id
  form.name = item.name
  form.provider = item.provider
  form.providerType = item.providerType
  form.apiBase = item.apiBase
  form.apiKeys = item.apiKeys && item.apiKeys.length > 0 ? [...item.apiKeys] : ['']
  form.model = item.model
  form.apiVersion = item.apiVersion || ''
  form.timeout = item.timeout || 120
  form.proxy = item.proxy || ''
  showKeys.value = form.apiKeys.map(() => false)

  customHeaderEntries.splice(0)
  if (item.customHeaders) {
    Object.entries(item.customHeaders).forEach(([key, value]) => {
      customHeaderEntries.push({ key, value })
    })
  }

  customBodyEntries.splice(0)
  if (item.customExtraBody) {
    Object.entries(item.customExtraBody).forEach(([key, value]) => {
      customBodyEntries.push({ key, value: String(value) })
    })
  }

  dialogVisible.value = true
}

const buildCustomHeaders = () => {
  const headers: Record<string, string> = {}
  customHeaderEntries.forEach(e => {
    if (e.key && e.value) headers[e.key] = e.value
  })
  return Object.keys(headers).length > 0 ? headers : undefined
}

const buildCustomExtraBody = () => {
  const body: Record<string, unknown> = {}
  customBodyEntries.forEach(e => {
    if (e.key && e.value) {
      try {
        body[e.key] = JSON.parse(e.value)
      } catch {
        body[e.key] = e.value
      }
    }
  })
  return Object.keys(body).length > 0 ? body : undefined
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate()

  submitting.value = true
  try {
    const payload = {
      ...form,
      apiKeys: form.apiKeys.filter(k => k.trim()),
      customHeaders: buildCustomHeaders(),
      customExtraBody: buildCustomExtraBody(),
    }

    if (isEdit.value) {
      await updateAiProvider(editingId.value, payload)
      ElMessage.success('更新成功')
    } else {
      await createAiProvider(payload)
      ElMessage.success('创建成功')
    }
    dialogVisible.value = false
    fetchProviders()
  } catch {
    // error handled by interceptor
  } finally {
    submitting.value = false
  }
}

const handleToggle = async (item: ProviderItem) => {
  try {
    await toggleAiProvider(item.id)
    ElMessage.success(item.enabled ? '已启用' : '已禁用')
  } catch {
    item.enabled = !item.enabled
  }
}

const handleTest = async (item: ProviderItem) => {
  testingId.value = item.id
  try {
    await testAiProvider(item.id)
    ElMessage.success('连接测试成功')
  } catch {
    // error handled by interceptor
  } finally {
    testingId.value = ''
  }
}

const handleDelete = async (item: ProviderItem) => {
  try {
    await ElMessageBox.confirm(`确定删除「${item.name}」？此操作不可恢复。`, '删除确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    await deleteAiProvider(item.id)
    ElMessage.success('删除成功')
    fetchProviders()
  } catch {
    // cancelled or error
  }
}

watch(activeTab, () => {
  searchQuery.value = ''
})

fetchProviders()
</script>

<style lang="scss" scoped>
.page-container {
  .page-header {
    margin-bottom: 20px;
    h2 { font-size: 20px; font-weight: 700; color: #303133; margin: 0; }
    p { font-size: 14px; color: #909399; margin-top: 4px; }
  }

  .provider-tabs {
    margin-bottom: 16px;

    .tab-label {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
  }

  .provider-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .provider-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 16px;
  }

  .provider-card {
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: translateY(-2px);
    }

    &.provider-disabled {
      opacity: 0.6;
    }

    .card-header {
      .card-title-row {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .provider-icon {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        .icon-text {
          color: #fff;
          font-size: 13px;
          font-weight: 700;
        }
      }

      .card-title-info {
        flex: 1;
        min-width: 0;

        h4 {
          margin: 0;
          font-size: 15px;
          color: #303133;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .provider-badge {
          font-size: 12px;
          color: #909399;
        }
      }
    }

    .card-body {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #f0f0f0;

      .info-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 0;

        .info-label {
          font-size: 13px;
          color: #909399;
          flex-shrink: 0;
        }

        .info-value {
          font-size: 13px;
          color: #606266;
          text-align: right;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .model-tag {
          background: #ecf5ff;
          color: #409eff;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 12px;
        }

        .api-url {
          font-family: 'SFMono-Regular', Consolas, monospace;
          font-size: 12px;
        }
      }
    }

    .card-footer {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #f0f0f0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  .add-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 220px;
    cursor: pointer;
    border: 2px dashed #dcdfe6;
    transition: all 0.3s ease-in-out;

    &:hover {
      border-color: #409eff;
      background: #f5f7fa;
    }
  }

  .api-keys-wrapper {
    width: 100%;

    .api-key-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;

      .key-toggle {
        cursor: pointer;
      }
    }
  }

  .kv-wrapper {
    width: 100%;

    .kv-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
  }
}
</style>
