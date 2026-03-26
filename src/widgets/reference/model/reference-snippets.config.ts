export const REFERENCE_CODE_STDIO = `{
  "mcpServers": {
    "mcp-react-frontend-local": {
      "command": "npx",
      "args": ["-y", "tsx", "scripts/mcp-stdio.ts"],
      "cwd": "D://<path_to_project_root>"
    }
  }
}`;

export const REFERENCE_CODE_HTTP = `{
  "mcpServers": {
    "mcp-react-frontend-http": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "http://localhost:3000/api/mcp"]
    }
  }
}`;

export const REFERENCE_CODE_REMOTE_VERCEL = `{
  "mcpServers": {
    "mcp-react-frontend-remote": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp-react-frontend.vercel.app/api/mcp"]
    }
  }
}`;

export const REFERENCE_CODE_REMOTE_ONRENDER = `{
  "mcpServers": {
    "mcp-react-frontend-remote": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp-react-frontend.onrender.com/api/mcp"]
    }
  }
}`;
