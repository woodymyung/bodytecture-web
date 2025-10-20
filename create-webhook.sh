#!/bin/bash

# Sanity 웹훅 생성 스크립트
# 사용법: ./create-webhook.sh YOUR_GITHUB_TOKEN

if [ "$#" -ne 1 ]; then
    echo "사용법: ./create-webhook.sh YOUR_GITHUB_TOKEN"
    exit 1
fi

GITHUB_TOKEN=$1

curl -X POST \
  "https://api.sanity.io/v2021-06-07/projects/yvgbicuy/hooks" \
  -H "Authorization: Bearer $SANITY_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"GitHub Auto Deploy\",
    \"url\": \"https://api.github.com/repos/woodymyung/bodytecture-web/dispatches\",
    \"dataset\": \"prod\",
    \"httpMethod\": \"POST\",
    \"headers\": {
      \"Authorization\": \"token $GITHUB_TOKEN\",
      \"Content-Type\": \"application/json\",
      \"User-Agent\": \"Sanity-Webhook\"
    },
    \"payload\": \"{\\\"event_type\\\": \\\"sanity-update\\\", \\\"client_payload\\\": {\\\"dataset\\\": \\\"{{dataset}}\\\", \\\"projectId\\\": \\\"{{projectId}}\\\"}}\",
    \"triggers\": [\"create\", \"update\", \"delete\"]
  }"

echo "웹훅이 생성되었습니다!"
