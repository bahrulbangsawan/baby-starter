#!/bin/bash

# Unset old environment variable if it exists
unset ANTHROPIC_AUTH_TOKEN

# Set correct environment variables
export ANTHROPIC_API_KEY="YOUR_API_KEY"
export ANTHROPIC_BASE_URL="https://api.z.ai/api/anthropic"

# Display confirmation (hiding sensitive key)
echo "✅ Environment variables set:"
echo "   ANTHROPIC_BASE_URL = $ANTHROPIC_BASE_URL"
echo "   ANTHROPIC_API_KEY = [HIDDEN FOR SECURITY]"
