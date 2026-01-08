#!/bin/bash

# Stop Hook: AI 完成回答后的通知与分析
# 功能：发送系统通知、分析代码变更、推荐下一步操作

# 获取项目根目录
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"

# ============ 1. 发送系统通知 ============
send_notification() {
    local title="Claude Code"
    local message="AI 已完成回答"

    # 根据停止原因动态调整通知内容
    case "$CLAUDE_STOP_REASON" in
        "end_turn")
            message="✅ 回答完成"
            ;;
        "tool_use")
            message="🔧 正在执行工具..."
            ;;
        "max_tokens")
            message="⚠️ 达到 token 上限"
            ;;
        "stop_sequence")
            message="⏹️ 遇到停止序列"
            ;;
        *)
            message="✅ 任务完成"
            ;;
    esac

    # 如果有变更文件，追加统计信息
    if [ -d "$PROJECT_ROOT/.git" ]; then
        local changed_count=$(cd "$PROJECT_ROOT" && git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
        if [ "$changed_count" -gt 0 ]; then
            message="$message | 📁 $changed_count 个文件变更"
        fi
    fi

    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS: 使用 osascript 发送通知
        osascript -e "display notification \"$message\" with title \"$title\"" 2>/dev/null &
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
        # Windows: 使用 PowerShell 发送 Toast 通知
        powershell.exe -Command "[Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null; \$template = [Windows.UI.Notifications.ToastNotificationManager]::GetTemplateContent([Windows.UI.Notifications.ToastTemplateType]::ToastText02); \$textNodes = \$template.GetElementsByTagName('text'); \$textNodes.Item(0).AppendChild(\$template.CreateTextNode('$title')) | Out-Null; \$textNodes.Item(1).AppendChild(\$template.CreateTextNode('$message')) | Out-Null; \$toast = [Windows.UI.Notifications.ToastNotification]::new(\$template); [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier('Claude Code').Show(\$toast)" 2>/dev/null &
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux: 使用 notify-send
        if command -v notify-send &>/dev/null; then
            notify-send "$title" "$message" 2>/dev/null &
        fi
    fi
}

# ============ 2. 分析代码变更 ============
analyze_changes() {
    cd "$PROJECT_ROOT" || exit 0

    # 获取 git 变更
    STAGED=$(git diff --cached --name-only 2>/dev/null)
    UNSTAGED=$(git diff --name-only 2>/dev/null)
    UNTRACKED=$(git ls-files --others --exclude-standard 2>/dev/null)

    # 合并所有变更
    ALL_CHANGES=$(echo -e "${STAGED}\n${UNSTAGED}\n${UNTRACKED}" | grep -v '^$' | sort -u)

    if [ -z "$ALL_CHANGES" ]; then
        return 0
    fi

    echo ""
    echo "## 📊 本次变更分析"
    echo ""

    # 统计变更类型
    VUE_COUNT=$(echo "$ALL_CHANGES" | grep -c '\.vue$' || echo 0)
    TS_COUNT=$(echo "$ALL_CHANGES" | grep -c '\.ts$' || echo 0)
    SCSS_COUNT=$(echo "$ALL_CHANGES" | grep -c '\.scss$' || echo 0)
    TEST_COUNT=$(echo "$ALL_CHANGES" | grep -c '\.test\.' || echo 0)

    echo "| 类型 | 数量 |"
    echo "|------|------|"
    [ "$VUE_COUNT" -gt 0 ] && echo "| Vue 组件 | $VUE_COUNT |"
    [ "$TS_COUNT" -gt 0 ] && echo "| TypeScript | $TS_COUNT |"
    [ "$SCSS_COUNT" -gt 0 ] && echo "| SCSS 样式 | $SCSS_COUNT |"
    [ "$TEST_COUNT" -gt 0 ] && echo "| 测试文件 | $TEST_COUNT |"

    echo ""
    echo "**变更文件:**"
    echo "$ALL_CHANGES" | head -10 | while read -r file; do
        [ -n "$file" ] && echo "- \`$file\`"
    done

    TOTAL=$(echo "$ALL_CHANGES" | wc -l | tr -d ' ')
    [ "$TOTAL" -gt 10 ] && echo "- ... 及其他 $((TOTAL - 10)) 个文件"

    # 返回变更信息供推荐使用
    echo "$ALL_CHANGES"
}

# ============ 3. 智能推荐下一步 ============
recommend_next() {
    local changes="$1"

    if [ -z "$changes" ]; then
        return 0
    fi

    echo ""
    echo "## 💡 推荐下一步操作"
    echo ""

    # 检测是否有未提交的变更
    HAS_UNCOMMITTED=$(git status --porcelain 2>/dev/null | head -1)

    # 检测组件变更
    HAS_COMPONENT=$(echo "$changes" | grep -E 'ui-[^/]+/.*\.vue$' | head -1)

    # 检测 TypeScript 变更
    HAS_TS=$(echo "$changes" | grep '\.ts$' | head -1)

    # 检测测试文件
    HAS_TEST=$(echo "$changes" | grep '\.test\.' | head -1)

    # 检测 hooks 变更
    HAS_HOOK=$(echo "$changes" | grep -E 'hooks/use.*\.ts$' | head -1)

    RECOMMENDATIONS=()

    # 基于变更类型生成推荐
    if [ -n "$HAS_TS" ] || [ -n "$HAS_COMPONENT" ]; then
        RECOMMENDATIONS+=("1. **类型检查**: \`pnpm type-check\` - 确保类型安全")
    fi

    if [ -n "$HAS_COMPONENT" ]; then
        COMP_NAME=$(echo "$HAS_COMPONENT" | sed -E 's|.*/ui-([^/]+)/.*|\1|')
        RECOMMENDATIONS+=("2. **预览组件**: 启动开发服务器查看 \`ui-$COMP_NAME\` 效果")

        # 检查是否有对应测试
        if [ -z "$HAS_TEST" ]; then
            RECOMMENDATIONS+=("3. **补充测试**: 为变更的组件添加单元测试")
        fi
    fi

    if [ -n "$HAS_HOOK" ]; then
        RECOMMENDATIONS+=("4. **Hook 测试**: 验证组合式函数的行为")
    fi

    if [ -n "$HAS_UNCOMMITTED" ]; then
        RECOMMENDATIONS+=("5. **提交变更**: 使用 \`git commit\` 保存工作进度")
    fi

    # 输出推荐
    for rec in "${RECOMMENDATIONS[@]}"; do
        echo "$rec"
    done

    if [ ${#RECOMMENDATIONS[@]} -eq 0 ]; then
        echo "✅ 当前无待处理事项"
    fi
}

# ============ 主流程 ============
main() {
    # 发送系统通知（后台执行，不阻塞）
    send_notification

    # 分析变更并获取结果
    CHANGES=$(analyze_changes)

    # 基于变更推荐下一步
    recommend_next "$CHANGES"
}

main
