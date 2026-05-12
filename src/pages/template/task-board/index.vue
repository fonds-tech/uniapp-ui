<template>
  <view class="page">
    <view class="head">
      <view class="head__row">
        <text class="head__title">项目看板</text>
        <ui-dropdown-menu>
          <ui-dropdown-item v-model="filterBy" :options="filterOptions" />
          <ui-dropdown-item v-model="sortBy" :options="sortOptions" />
        </ui-dropdown-menu>
      </view>

      <view class="head__stats">
        <view class="stat">
          <text class="stat__value">{{ stats.todo }}</text>
          <text class="stat__label">待办</text>
        </view>
        <view class="stat">
          <text class="stat__value">{{ stats.doing }}</text>
          <text class="stat__label">进行中</text>
        </view>
        <view class="stat">
          <text class="stat__value">{{ stats.done }}</text>
          <text class="stat__label">已完成</text>
        </view>
      </view>

      <view class="head__filter">
        <ui-button size="small" plain icon="filter" @click="showFilter = true">项目筛选</ui-button>
      </view>
    </view>

    <ui-popup v-model:show="showFilter" position="right" :custom-style="{ width: '70%', height: '100%' }">
      <view class="filter-panel">
        <text class="filter-panel__title">项目筛选</text>
        <view class="filter-panel__body">
          <ui-tree-select v-model:main-active-index="filterCate" v-model:active-id="filterProject" :items="filterItems" height="100%" />
        </view>
        <view class="filter-panel__footer">
          <ui-button block plain @click="showFilter = false">取消</ui-button>
          <ui-button block type="primary" @click="onApplyFilter">应用</ui-button>
        </view>
      </view>
    </ui-popup>

    <ui-collapse v-model="activeGroups" :border="false">
      <ui-collapse-item v-for="g in groups" :key="g.id" :name="g.id">
        <template #title>
          <view class="group-title">
            <ui-icon :name="g.icon" size="36rpx" :color="g.color" />
            <text class="group-title__name">{{ g.name }}</text>
            <ui-tag :type="g.tagType" plain>{{ g.tasks.length }}</ui-tag>
          </view>
        </template>

        <view class="tasks">
          <view v-for="t in g.tasks" :key="t.id" class="task" @click="onClickTask(t)">
            <view class="task__head">
              <ui-text-ellipsis :content="t.title" :rows="1" />
              <ui-tooltip :content="t.deadline" placement="left">
                <ui-tag :type="t.priority" plain>{{ t.priorityLabel }}</ui-tag>
              </ui-tooltip>
            </view>
            <view class="task__progress">
              <ui-progress :percent="t.progress" stroke-width="6rpx" :show-pivot="false" :color="t.progressColor" />
            </view>
            <view class="task__foot">
              <ui-avatar-group :max-count="3">
                <ui-avatar v-for="(bg, i) in t.assignees" :key="i" :background="bg" size="40rpx" />
              </ui-avatar-group>
              <text class="task__date">{{ t.deadline }}</text>
            </view>
          </view>
        </view>
      </ui-collapse-item>
    </ui-collapse>

    <view class="pagination">
      <ui-pagination v-model="page" :total="50" :page-size="10" />
    </view>

    <ui-float-button icon="plus" type="primary" @click="onAdd" />
  </view>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"
import { ref, computed } from "vue"

definePage({
  style: { navigationBarTitleText: "项目看板" },
})

const toast = useToast()

const filterOptions = [
  { text: "全部", value: "all" },
  { text: "我的", value: "mine" },
  { text: "团队", value: "team" },
]
const filterBy = ref("all")

const sortOptions = [
  { text: "时间排序", value: "time" },
  { text: "优先级", value: "priority" },
]
const sortBy = ref("time")

const page = ref(1)
const activeGroups = ref(["todo", "doing"])

const showFilter = ref(false)
const filterCate = ref(0)
const filterProject = ref<number | string>("")

const filterItems = [
  { text: "前端项目", children: [{ id: "p1", text: "组件库" }, { id: "p2", text: "管理后台" }, { id: "p3", text: "官网" }] },
  { text: "后端项目", children: [{ id: "p4", text: "API 网关" }, { id: "p5", text: "用户服务" }] },
  { text: "移动端", children: [{ id: "p6", text: "iOS App" }, { id: "p7", text: "Android App" }, { id: "p8", text: "鸿蒙版" }] },
]

function onApplyFilter() {
  showFilter.value = false
  toast.success("筛选已应用")
}

const groups = ref([
  {
    id: "todo",
    name: "待办",
    icon: "clock",
    color: "warning",
    tagType: "warning",
    tasks: [
      { id: 1, title: "完成首页 UI 设计稿评审", priority: "danger" as const, priorityLabel: "高", progress: 0, progressColor: "warning", deadline: "今天", assignees: ["primary", "warning"] },
      { id: 2, title: "用户调研报告整理", priority: "warning" as const, priorityLabel: "中", progress: 0, progressColor: "warning", deadline: "明天", assignees: ["danger"] },
    ],
  },
  {
    id: "doing",
    name: "进行中",
    icon: "loading",
    color: "primary",
    tagType: "primary",
    tasks: [
      { id: 3, title: "API 接口联调 + 错误处理", priority: "danger" as const, priorityLabel: "高", progress: 65, progressColor: "primary", deadline: "本周五", assignees: ["primary", "success", "warning"] },
      { id: 4, title: "组件库审查与重构", priority: "warning" as const, priorityLabel: "中", progress: 80, progressColor: "primary", deadline: "下周一", assignees: ["primary"] },
    ],
  },
  {
    id: "done",
    name: "已完成",
    icon: "check",
    color: "success",
    tagType: "success",
    tasks: [
      { id: 5, title: "登录注册流程开发", priority: "info" as const, priorityLabel: "低", progress: 100, progressColor: "success", deadline: "5-15", assignees: ["danger", "success"] },
    ],
  },
])

const stats = computed(() => ({
  todo: groups.value[0].tasks.length,
  doing: groups.value[1].tasks.length,
  done: groups.value[2].tasks.length,
}))

function onClickTask(t: { title: string }) {
  toast.text(t.title)
}

function onAdd() {
  toast.text("新建任务")
}
</script>

<style lang="scss" scoped>
.page {
  background: var(--ui-color-background-page);
  min-height: 100vh;
  padding-bottom: 160rpx;
}

.head {
  padding: var(--ui-spacing-lg) var(--ui-spacing-md);
  background: var(--ui-color-background);

  &__filter {
    display: flex;
    margin-top: var(--ui-spacing-md);
    justify-content: flex-end;
  }

  &__row {
    display: flex;
    align-items: center;
    margin-bottom: var(--ui-spacing-lg);
    justify-content: space-between;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-lg);
    font-weight: var(--ui-font-weight-bold);
  }

  &__stats {
    gap: var(--ui-spacing-md);
    display: flex;
  }
}

.stat {
  flex: 1;
  display: flex;
  padding: var(--ui-spacing-md);
  background: var(--ui-color-background-section);
  align-items: center;
  border-radius: var(--ui-radius-md);
  flex-direction: column;

  &__value {
    color: var(--ui-color-primary);
    font-size: var(--ui-font-size-lg);
    font-weight: var(--ui-font-weight-bold);
  }

  &__label {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
    margin-top: var(--ui-spacing-xs);
  }
}

.group-title {
  gap: var(--ui-spacing-sm);
  display: flex;
  align-items: center;

  &__name {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-bold);
  }
}

.tasks {
  gap: var(--ui-spacing-md);
  display: flex;
  padding: var(--ui-spacing-md);
  flex-direction: column;
}

.task {
  gap: var(--ui-spacing-sm);
  padding: var(--ui-spacing-md);
  background: var(--ui-color-background);
  box-shadow: var(--ui-shadow-xs);
  border-radius: var(--ui-radius-md);

  &__head {
    gap: var(--ui-spacing-sm);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__date {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }
}

.pagination {
  padding: var(--ui-spacing-md);
}

.filter-panel {
  height: 100%;
  display: flex;
  background: var(--ui-color-background);
  flex-direction: column;

  &__title {
    color: var(--ui-color-text);
    display: block;
    padding: var(--ui-spacing-lg);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
    border-bottom: 1rpx solid var(--ui-color-border-light);
  }

  &__body {
    flex: 1;
    overflow: hidden;
  }

  &__footer {
    gap: var(--ui-spacing-md);
    display: flex;
    padding: var(--ui-spacing-md);
    border-top: 1rpx solid var(--ui-color-border-light);
  }
}
</style>
