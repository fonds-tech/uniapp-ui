<template>
  <div class="hero-install">
    <div class="hero-install__tabs">
      <button
        v-for="t in tabs"
        :key="t.key"
        :class="['hero-install__tab', { active: active === t.key }]"
        type="button"
        @click="active = t.key"
      >
        {{ t.key }}
      </button>
    </div>
    <div class="hero-install__bar">
      <span class="hero-install__prompt">$</span>
      <code class="hero-install__cmd">{{ current.cmd }}</code>
      <button class="hero-install__copy" type="button" :title="copied ? '已复制' : '复制'" @click="copy">
        <svg v-if="!copied" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"

const tabs = [
  { key: "pnpm", cmd: "pnpm add uniapp-ui" },
  { key: "npm", cmd: "npm install uniapp-ui" },
  { key: "yarn", cmd: "yarn add uniapp-ui" },
]

const active = ref("pnpm")
const copied = ref(false)
const current = computed(() => tabs.find((t) => t.key === active.value)!)

async function copy() {
  try {
    await navigator.clipboard.writeText(current.value.cmd)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  }
  catch {
    // ignore
  }
}
</script>
