import { ErrorBoundaryHoc } from "./error-boundary-hoc";
import { ErrorBoundaryImplementation } from "./error-boundary-implementation";
import { ErrorBoundaryProhibitions } from "./error-boundary-prohibitions";

export function ErrorBoundaryGuidelines() {
	return (
		<div className="flex flex-col gap-6">
			<ErrorBoundaryImplementation />
			<ErrorBoundaryHoc />
			<ErrorBoundaryProhibitions />
		</div>
	);
}
