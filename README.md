# MCP React Frontend Server

## Overview
The **MCP React Frontend Server** is a Model Context Protocol (MCP) implementation designed to act as an Orchestration Core and Architectural Hub for React/Next.js applications. It enforces Feature-Sliced Design (FSD) boundaries, semantic naming conventions, and project-specific constraints. The server interacts with MCP clients (like IDEs or agents) to validate code architecture, prevent structural entropy, and scaffold standardized FSD entities through deterministic rules rather than ephemeral prompts.

## MCP Capabilities

### Tools

1. **`analyze_project`**
   - **Description**: Analyze project files for FSD violations and naming conventions.
   - **Input**:
     - `files` (*array of strings*): List of file paths to analyze (relative to project root).
     - `codeSnippets` (*array of objects, optional*): Objects containing `fileName` and `content` for deep linter analysis.
   - **Output**: JSON containing `status` (SUCCESS/ERROR), `summary` (total errors/warnings), `violations` array, and `recommendations` array.
   - **Behavior**: Delegates path analysis to `FsdAgent` and code snippet analysis to `LinterAgent`. The combined violations are processed by `RecommenderAgent` to generate actionable fixes.

2. **`get_rules`**
   - **Description**: Get current FSD and naming project rules.
   - **Input**: Empty object `{}`.
   - **Output**: JSON object detailing the corporate/project rules.
   - **Behavior**: Fetches configurations from `RulesProvider`.

3. **`scaffold_entity`**
   - **Description**: Generate a standardized FSD entity structure with API, types, schema, and converters.
   - **Input**:
     - `name` (*string*): The name of the entity.
     - `path` (*string*): The target directory path (relative to `src/entities`).
   - **Output**: Text message confirming the creation of the architecture.
   - **Behavior**: Generates folders (`api/`, `types/`, `schema/`, `converters/`, `ui/`) and boilerplate files including RTK Query services, Zod schemas, data converters, and a public API index.

## Architecture
The application is built on top of the **Next.js App Router** and the `@modelcontextprotocol/sdk`.

### Main Modules
- **`mcp-server.ts`**: The factory that creates the `McpServer` instance, registers tools, and bridges MCP SDK with internal logic.
- **`Agents`**:
  - `FsdAgent`: Responsible for cross-import checking and FSD semantic layer isolation constraints.
  - `LinterAgent`: Checks AST or string content against naming and structural rules.
  - `RecommenderAgent`: Generates mitigation steps for detected violations.
- **Transports**: Located in `src/app/api/mcp`. Exposes both `WebStandardStreamableHTTPServerTransport` (standard HTTP) and `SSEServerTransport` (Server-Sent Events) for different client compatibilities.

### Data Flow
1. **Request**: MCP Client connects via `/api/mcp`. Next.js routes the request.
2. **Processing**: The HTTP/SSE transport translates the request into the `McpServer`. For tool calls, the specific agent (`FsdAgent`, `LinterAgent`) is invoked.
3. **Response**: Analysis results are aggregated, serialized to JSON, wrapped in an MCP content block, and streamed back via the transport framework.

### External Dependencies
- `@modelcontextprotocol/sdk`: Core MCP logic.
- `next` / `react`: Driving the API routes and web interface.
- `zod`: Schema validation.

## Usage

Clients can connect to this server over HTTP or SSE depending on their MCP transport capabilities.

### Connecting to MCP Clients (e.g., Antigravity)

Add the following to your `mcp_config.json` manually:

#### 1. Local Stdio (Recommended)

Fastest and most stable for development. Uses the local script directly.

```json
{
  "mcpServers": {
    "mcp-react-frontend-local": {
      "command": "npx",
      "args": ["-y", "tsx", "scripts/mcp-stdio.ts"],
      "cwd": "D://<path_to_project_root>"
    }
  }
}
```

#### 2. Local HTTP

Connects over HTTP to a running server on `localhost:3000`. Requires `mcp-remote`.

```json
{
  "mcpServers": {
    "mcp-react-frontend-http": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "http://localhost:3000/api/mcp"]
    }
  }
}
```

#### 3. Remote (Vercel / Render)

> [!IMPORTANT]
> Initial connection can take **up to 60 seconds** due to server "warm-up" (cold start).

```json
{
  "mcpServers": {
    "mcp-react-frontend-remote": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp-react-frontend.vercel.app/api/mcp"]
    }
  }
}
```

```json
{
  "mcpServers": {
    "mcp-react-frontend-remote": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp-react-frontend.onrender.com/api/mcp"]
    }
  }
}
```


### Supported Rules & Patterns Scope
The MCP server enforces a highly deterministic, strict architectural contract defined in `src/entities/rules/config/default-rules.json`. The validation scope guarantees structural integrity across the following domains:

**1. Feature-Sliced Design (FSD) Topology**
- **Unidirectional Dependency Flow**: Strictly validates import boundaries across `app` → `pages` → `widgets` → `features` → `entities` → `shared`.
- **Cross-Layer Isolation**: Detects and prohibits private cross-imports, enforcing mandatory barrel-export (`index.ts`) usage.

**2. Semantic Naming & Typing Contracts**
- **Pattern Enforcement**: Mandates `kebab-case` for file systems.
- **Type Prefixing/Suffixing**: Validates strict prefixes (`I` for interfaces, `T` for types, `ENUM_` for enums) and DTO backend suffixes (`*Backend`, `-backend.interface.ts`).
- **Framework Awareness**: Intelligently excludes Next.js App Router reserved files (`page`, `layout`, etc.) and React hooks (`use*`) from generic naming constraints.

**3. Structural Integrity & Boilerplate Constraints**
- **Entity Anatomy**: Rejects FSD entities missing mandatory internal sub-modules (`api`, `types`, `schema`, `converters`, `ui`).
- **File Fingerprinting**: Validates extension semantics (`*.schema.ts`, `*.converters.ts`, `*.service.ts`).

**4. Code Quality & Safety (Linter)**
- **Runtime Safety**: Hard bans on `console.*` usage and `any` types.
- **TypeScript Strictness**: Prohibits native TypeScript `enum` usage (forcing object/const maps) and mandates strict typing.

**5. UI & Design Token Constraints**
- **Atomic Styling**: Restricts utility prefixes to authorized layout/spacing tokens (`bg-`, `text-`, `p-`, `m-`, `gap-`, `flex-`, `grid-`).
- **Color Palette Isolation**: Strictly forbids raw Tailwind color primitives (e.g., `slate`, `red`, `blue`, `emerald`), forcing the application to use semantic CSS variables and design tokens.
- **Class Merging**: Mandates the `cn` utility wrapper for dynamic class composition.

**6. Implementation Protocol Validation**
- **RTK Query**: Validates API code-splitting via `injectEndpoints`, centralized tags, and base queries.
- **DTO Converters**: Requires symmetric data transformation (`mapToFrontend`, `mapToBackend`) between network boundaries and domain models.
- **Zod Schemas**: Validates payload schema definitions against strongly typed `i18n` localization keys.
- **Mocking (MSW)**: Ensures mock handlers are properly registered and isolated.
- **Error Boundaries**: Validates the presence of `ErrorBoundary` wrappers and `withErrorBoundary` HOCs on dynamic or volatile UI components.
- **Theme Segregation**: Controls the usage of `ThemeProvider` and `useTheme` hooks for stable DOM synchronization.


## Configuration
- **Environment Variables**:
  - `NEXT_PUBLIC_APP_URL` — Used for resolving the base application URL (defaults to `http://localhost:3000`).
- **Configs**: Handled internally by `RulesProvider` (FSD constraints).
- **Secrets**: Not defined in code.

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Build the project (includes TypeScript compilation and Next.js build)
npm run build

# 3. Start the application
npm run dev
# Server will be available at http://localhost:3000
```
*Requirements*: Node.js 18+ (inferred from Next 14+), npm.

## Limitations
- **State Persistence**: The MCP Server connection promises (`mcpConnectPromise`) and instances are cached on the NodeJS `global` object. This could cause issues or race conditions in serverless deployments if the instance is frozen or repeatedly cold-started.
- **Hardcoding**: The scaffold tool implicitly hardcodes the `src/entities/` prefix for generating files.
- **Validation Constraints**: There are no advanced authentication constraints (API keys, CORS origins act transparently with `*`) built into the route handlers by default. Anyone with network access to the API route can call the underlying tools.
