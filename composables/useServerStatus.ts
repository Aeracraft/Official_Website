interface ServerStatus {
  type: string
  status: 'online' | 'offline'
  host: string
  motd: string
  pureMotd: string
  version: string
  protocol: number
  players: {
    online: number
    max: number
    sample: string
  }
  icon: string
  delay: number
  cached: boolean
}

interface ServerConfig {
  name: string
  host: string
  port: number
}

export interface ServerWithStatus extends ServerConfig {
  status: ServerStatus | null
  loading: boolean
  error: string | null
}

export function useServerStatus() {
  const appConfig = useAppConfig()
  const servers = ref<ServerWithStatus[]>(
    appConfig.servers.map(s => ({
      ...s,
      status: null,
      loading: true,
      error: null
    }))
  )

  const refreshInterval = ref(appConfig.refreshInterval)
  let timer: ReturnType<typeof setInterval> | null = null

  async function fetchOne(index: number) {
    const s = servers.value[index]
    const cfg = appConfig.servers[index]
    try {
      s.loading = true
      s.error = null
      const url = `${appConfig.motdApiBase}/status?host=${cfg.host}:${cfg.port}`
      s.status = await $fetch<ServerStatus>(url)
    } catch (e: any) {
      s.error = e.message || 'Failed'
      s.status = null
    } finally {
      s.loading = false
    }
  }

  async function fetchAll() {
    await Promise.all(servers.value.map((_, i) => fetchOne(i)))
  }

  function startTimer() {
    stopTimer()
    if (import.meta.client && refreshInterval.value > 0) {
      timer = setInterval(fetchAll, refreshInterval.value)
    }
  }

  function stopTimer() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  function setRefreshInterval(ms: number) {
    refreshInterval.value = ms
    if (import.meta.client) {
      localStorage.setItem('server_refresh_interval', String(ms))
    }
    startTimer()
  }

  const anyOnline = computed(() => servers.value.some(s => s.status?.status === 'online'))

  onMounted(() => {
    const saved = localStorage.getItem('server_refresh_interval')
    if (saved) refreshInterval.value = Number(saved)
    fetchAll()
    startTimer()
  })

  onUnmounted(() => {
    stopTimer()
  })

  return { servers, anyOnline, refresh: fetchAll, refreshInterval, setRefreshInterval }
}
