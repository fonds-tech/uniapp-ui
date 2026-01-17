#!/bin/bash

# 获取脚本所在目录的上级目录（.claude 目录）
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CLAUDE_DIR="$(dirname "$SCRIPT_DIR")"
SKILLS_DIR="$CLAUDE_DIR/skills"
AGENTS_DIR="$CLAUDE_DIR/agents"

# 解析 YAML frontmatter 中的 description
parse_description() {
    local file="$1"
    awk '/^---$/{p=!p; next} p && /^description:/{sub(/^description:[[:space:]]*/, ""); print; exit}' "$file"
}

# 输出技能列表
if [ -d "$SKILLS_DIR" ]; then
    SKILLS=$(find "$SKILLS_DIR" -name "SKILL.md" -type f 2>/dev/null | sort)
    if [ -n "$SKILLS" ]; then
        echo "## 可用技能 (Skills)"
        echo ""
        while IFS= read -r skill_path; do
            skill_name=$(basename "$(dirname "$skill_path")")
            description=$(parse_description "$skill_path")
            echo "- **$skill_name**: $description"
        done <<< "$SKILLS"
        echo ""
    fi
fi

# 输出代理列表
if [ -d "$AGENTS_DIR" ]; then
    AGENTS=$(find "$AGENTS_DIR" -name "*.md" -type f 2>/dev/null | sort)
    if [ -n "$AGENTS" ]; then
        echo "## 可用代理 (Agents)"
        echo ""
        while IFS= read -r agent_path; do
            agent_name=$(basename "$agent_path" .md)
            description=$(parse_description "$agent_path")
            echo "- **$agent_name**: $description"
        done <<< "$AGENTS"
        echo ""
    fi
fi

cat << 'EOF'
> 根据任务匹配合适的技能或代理，启用时在回复开头注明：`🔧 已启用技能: xxx` 或 `🔧 已启用代理: xxx`
EOF
