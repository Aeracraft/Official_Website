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

  const anyOnline = computed(() => servers.value.some(s => s.status?.status === 'online'))

  onMounted(() => {
    fetchAll()
    if (import.meta.client) {
      setInterval(fetchAll, appConfig.refreshInterval)
    }
  })

  return { servers, anyOnline, refresh: fetchAll }
}
