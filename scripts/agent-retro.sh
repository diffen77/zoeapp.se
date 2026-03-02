#!/bin/bash
# agent-retro.sh — Automatic retrospective extraction for agent learning

set -e

AGENT="john"
WORKSPACE="/Users/diffen/.openclaw/workspace-john"
MEMORY_DIR="$WORKSPACE/memory"
TODAY=$(date +%Y-%m-%d)
RETRO_FILE="$MEMORY_DIR/retro-$TODAY.md"

# Create memory directory if it doesn't exist
mkdir -p "$MEMORY_DIR"

# Initialize arrays
declare -a strong_points
declare -a weak_points
declare -a improvements

# === 1. Extract from git log (last 5 commits) ===
if [ -d "$WORKSPACE/.git" ]; then
  git_log=$(cd "$WORKSPACE" && git log -5 --oneline 2>/dev/null || echo "No git repo")
  
  if [[ "$git_log" != "No git repo" ]]; then
    # Check for commit patterns
    if echo "$git_log" | grep -q "feat:"; then
      strong_points+=("Features implemented on time")
    fi
    if echo "$git_log" | grep -q "fix:"; then
      strong_points+=("Bugs identified and fixed")
    fi
    if echo "$git_log" | grep -q "auto-commits"; then
      strong_points+=("Auto-commits enabled (Aider working)")
    fi
    
    # Check for uncommitted changes
    uncommitted=$(cd "$WORKSPACE" && git status --short 2>/dev/null | wc -l)
    if [ "$uncommitted" -gt 0 ]; then
      weak_points+=("Uncommitted changes: $uncommitted files")
    fi
  fi
fi

# === 2. Extract from recent activity ===
# These are placeholder extractions based on predictable patterns
strong_points+=("Commits pushed to main")
improvements+=("Review stderr logs for any missed errors")
improvements+=("Verify all tests pass before marking Done")

# === 3. Deduplication and filtering ===
declare -a final_strong
declare -a final_weak
declare -a final_improvements

for item in "${strong_points[@]}"; do
  if [[ ! " ${final_strong[@]} " =~ " ${item} " ]]; then
    final_strong+=("$item")
  fi
done

for item in "${weak_points[@]}"; do
  if [[ ! " ${final_weak[@]} " =~ " ${item} " ]]; then
    final_weak+=("$item")
  fi
done

for item in "${improvements[@]}"; do
  if [[ ! " ${final_improvements[@]} " =~ " ${item} " ]]; then
    final_improvements+=("$item")
  fi
done

# === 4. Build JSON ===
JSON=$(cat <<EOF
{
  "date": "$TODAY",
  "agent": "$AGENT",
  "strongPoints": [
EOF
)

for i in "${!final_strong[@]}"; do
  JSON+="\"${final_strong[$i]}\""
  if [ $((i + 1)) -lt ${#final_strong[@]} ]; then
    JSON+=", "
  fi
done

JSON+=$(cat <<EOF
  ],
  "weakPoints": [
EOF
)

for i in "${!final_weak[@]}"; do
  JSON+="\"${final_weak[$i]}\""
  if [ $((i + 1)) -lt ${#final_weak[@]} ]; then
    JSON+=", "
  fi
done

JSON+=$(cat <<EOF
  ],
  "improvements": [
EOF
)

for i in "${!final_improvements[@]}"; do
  JSON+="\"${final_improvements[$i]}\""
  if [ $((i + 1)) -lt ${#final_improvements[@]} ]; then
    JSON+=", "
  fi
done

JSON+=$(cat <<EOF
  ]
}
EOF
)

# === 5. Write to retro file ===
cat > "$RETRO_FILE" <<EOFMD
# Retrospective — $TODAY

**Agent:** $AGENT

## Strong Points
$(for item in "${final_strong[@]}"; do echo "- $item"; done)

## Weak Points
$(for item in "${final_weak[@]}"; do echo "- $item"; done)

## Improvements
$(for item in "${final_improvements[@]}"; do echo "- $item"; done)

## Raw JSON
\`\`\`json
$JSON
\`\`\`
EOFMD

# === 6. POST to /api/learn ===
if command -v curl &> /dev/null; then
  curl -s -X POST "http://localhost:3000/api/learn" \
    -H "Content-Type: application/json" \
    -d "$JSON" > /dev/null 2>&1 || true
fi

echo "✓ Retro written to $RETRO_FILE"
