#!/bin/bash

# Usage: ./replace-string.sh "old_string" "new_string" "search_directory" "exclude_patterns"
# The script searches for the exact string and replaces it with the provided one.
# It works recursively through the specified directory, excluding files/folders matching the patterns.

if [ "$#" -lt 3 ]; then
    echo "Usage: $0 <search_string> <replace_string> <search_directory> [exclude_patterns]"
    exit 1
fi

SEARCH_STRING=$1
REPLACE_STRING=$2
SEARCH_DIR=$3
EXCLUDE_PATTERNS=${4:-}

# Create an array of excluded patterns from the provided argument
IFS=',' read -ra EXCLUDE_ARRAY <<< "$EXCLUDE_PATTERNS"

# Construct the find command with exclusions
FIND_CMD="find \"$SEARCH_DIR\" -type f"

for pattern in "${EXCLUDE_ARRAY[@]}"; do
    FIND_CMD="$FIND_CMD ! -path \"*/$pattern/*\""
done

# Run the find command and replace the strings
eval "$FIND_CMD" -exec sed -i '' -e "s/\b$SEARCH_STRING\b/$REPLACE_STRING/g" {} +

echo "Replaced all occurrences of '$SEARCH_STRING' with '$REPLACE_STRING' in $SEARCH_DIR, excluding patterns: $EXCLUDE_PATTERNS."
