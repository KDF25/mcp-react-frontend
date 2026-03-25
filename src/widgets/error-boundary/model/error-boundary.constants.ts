export const ERROR_BOUNDARY_HOC_USAGE = `import { withErrorBoundary } from "@/shared/ui";

function UserProfileWidget({ userId }: { userId: string }) {
  const { data, isLoading } = useGetUserProfileQuery(userId);

  if (isLoading) return <SkeletonProfile />;
  
  const formattedStats = data.stats.map(stat => ({
      ...stat,
      value: (stat.raw / stat.total) * 100
  }));

  return (
    <div className="flex flex-col gap-4">
      <UserProfileAvatar user={data.user} />
      <UserProfileStats stats={formattedStats} />
    </div>
  );
}

export const UserProfile = withErrorBoundary(UserProfileWidget, <UserProfileErrorUI />);`;

export const ERROR_BOUNDARY_COMPONENT_USAGE = `import { ErrorBoundary } from "@/shared/ui";

<ErrorBoundary fallback={<InlineErrorUI />}>
  <ComplexChart data={data} />
</ErrorBoundary>`;

export const ERROR_BOUNDARY_IMPLEMENTATION = `"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 rounded-lg flex flex-col items-start gap-2 border border-destructive/50 bg-destructive/10 text-destructive font-mono text-sm max-w-full overflow-x-auto">
            <span className="font-bold flex items-center gap-2">
              ⚠️ An error occurred while rendering this component.
            </span>
            <details className="mt-2 w-full">
              <summary className="cursor-pointer font-semibold opacity-80 hover:opacity-100">
                {this.state.error?.message || "Error"}
              </summary>
              <pre className="mt-2 text-xs opacity-70 whitespace-pre-wrap">
                {this.state.error?.stack}
              </pre>
            </details>
          </div>
        )
      );
    }

    return this.props.children;
  }
}`;

export const ERROR_BOUNDARY_HOC_IMPLEMENTATION = `import React, { ComponentType } from "react";
import { ErrorBoundary } from "./error-boundary";

export function withErrorBoundary<P extends object>(
  Component: ComponentType<P>,
  fallback?: React.ReactNode
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}`;
