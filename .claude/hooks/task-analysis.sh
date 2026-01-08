#!/bin/bash

# 获取脚本所在目录的上级目录（.claude 目录）
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CLAUDE_DIR="$(dirname "$SCRIPT_DIR")"
SKILLS_DIR="$CLAUDE_DIR/skills"

# 检查技能目录是否存在
if [ ! -d "$SKILLS_DIR" ]; then
    exit 0
fi

# 获取技能列表
SKILLS=$(find "$SKILLS_DIR" -name "SKILL.md" -type f 2>/dev/null | sort)

if [ -z "$SKILLS" ]; then
    exit 0
fi

# 解析 YAML frontmatter 中的 description
parse_description() {
    local file="$1"
    # 提取 --- 之间的 YAML，然后获取 description 字段
    awk '/^---$/{p=!p; next} p && /^description:/{sub(/^description:[[:space:]]*/, ""); print; exit}' "$file"
}

echo "## 可用技能"
echo ""

while IFS= read -r skill_path; do
    skill_name=$(basename "$(dirname "$skill_path")")
    description=$(parse_description "$skill_path")

    echo "- **$skill_name**: $description"
done <<< "$SKILLS"

cat << 'EOF'

> 根据用户任务匹配技能，若启用请在回复开头注明：`🔧 已启用技能: xxx`
EOF
