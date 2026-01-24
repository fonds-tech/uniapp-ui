<template>
  <demo-page>
    <demo-basic />
    <demo-two-way />
    <demo-color />
    <demo-placeholder />
    <demo-disabled />
    <demo-closeable />
    <demo-show-header />
    <demo-title-style />
    <demo-swipeable />
    <demo-async />
    <demo-custom-field />
    <demo-events />
  </demo-page>
</template>

<script setup lang="ts">
import DemoAsync from "./components/demo-async.vue"
import DemoBasic from "./components/demo-basic.vue"
import DemoColor from "./components/demo-color.vue"
import DemoEvents from "./components/demo-events.vue"
import DemoTwoWay from "./components/demo-two-way.vue"
import DemoDisabled from "./components/demo-disabled.vue"
import DemoCloseable from "./components/demo-closeable.vue"
import DemoSwipeable from "./components/demo-swipeable.vue"
import DemoShowHeader from "./components/demo-show-header.vue"
import DemoTitleStyle from "./components/demo-title-style.vue"
import DemoCustomField from "./components/demo-custom-field.vue"
import DemoPlaceholder from "./components/demo-placeholder.vue"

definePage({
  style: { navigationBarTitleText: "Cascader 级联选择" },
})
</script>

<style lang="scss" scoped></style>
