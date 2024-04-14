#!/bin/bash

# Define root directory for generated documentation
base_dir="docs/"

# Removes backslashes from all occurrences of "\@"
find "$base_dir" -type f -exec sed -i 's/\\@/@/g' {} +

# Copy CSS override to docs/assets/style.css
echo '' >> "$base_dir/assets/style.css" && cat typedoc/overrides/typedoc-override.css >> "$base_dir/assets/style.css"

# Uncomment to disable JS override script
#exit 0

# Copy JS override file to docs/assets/docs.js
cp typedoc/overrides/typedoc-override.js "$base_dir/assets/docs.js"

find "$base_dir" -type f -name "*.html" | while IFS= read -r file; do
  # Calculate depth
  relative_path="${file#$base_dir/}"
  depth=$(grep -o "/" <<< "$relative_path" | wc -l)
  
  # Create the prefix based on depth
  prefix=""
  for ((i=1; i<depth; i++)); do
    prefix+="../"
  done

  # Use sed to insert the script with the correct prefix
  sed -i "s|</head>|<script defer src=\"${prefix}assets/docs.js\"></script>\n</head>|" "$file"
done