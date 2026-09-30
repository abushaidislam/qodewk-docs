import { authenticationIcons } from "./authentication";
import { brandIcons } from "./brands";
import { pageIcons } from "./pages";
import { pluginIcons } from "./plugins";
import { sectionIcons } from "./sections";

export const Icons = {
	...brandIcons,
	...sectionIcons,
	...authenticationIcons,
	...pluginIcons,
	...pageIcons,
	// Brand & Integration Aliases
	google: authenticationIcons.authenticationGoogle,
	googleAntigravity: authenticationIcons.authenticationGoogle,
	antigravity: authenticationIcons.authenticationGoogle,
	github: authenticationIcons.authenticationGitHub,
	githubActions: authenticationIcons.authenticationGitHub,
	githubCopilot: authenticationIcons.authenticationGitHub,
	copilot: authenticationIcons.authenticationGitHub,
	actions: authenticationIcons.authenticationGitHub,
	claude: () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1.2em"
			height="1.2em"
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93V17a1 1 0 0 1-2 0v-.07A6 6 0 0 1 6.07 12H6a1 1 0 0 1 0-2h.07A6 6 0 0 1 11 5.07V5a1 1 0 0 1 2 0v.07A6 6 0 0 1 17.93 10H18a1 1 0 0 1 0 2h-.07A6 6 0 0 1 13 16.93zM12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4z" />
		</svg>
	),
	claudeCode: () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1.2em"
			height="1.2em"
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 5a1 1 0 0 1 2 0v3.586l2.707-2.707a1 1 0 0 1 1.414 1.414L14.414 12l2.707 2.707a1 1 0 0 1-1.414 1.414L13 13.414V17a1 1 0 0 1-2 0v-3.586l-2.707 2.707a1 1 0 0 1-1.414-1.414L9.586 12 6.879 9.293a1 1 0 0 1 1.414-1.414L11 10.586V7z" />
		</svg>
	),
	cursor: () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1.2em"
			height="1.2em"
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<path d="M12 2L2 19.5h20L12 2zm0 4.2l5.6 9.8H6.4L12 6.2z" />
		</svg>
	),
	cursorIDE: () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1.2em"
			height="1.2em"
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<path d="M12 2L2 19.5h20L12 2zm0 4.2l5.6 9.8H6.4L12 6.2z" />
		</svg>
	),
	aider: pageIcons.terminal,
	copilotAndAider: authenticationIcons.authenticationGitHub,
	stickyPrComments: pageIcons.logs,
	cloudSharing: pageIcons.route,
	monorepoPackages: pageIcons.fileBoxIcon,
	receiptV1Protocol: pageIcons.scrollTextIcon,
	sqliteStorage: pageIcons.database,
	zeroSourceExfiltration: pageIcons.shieldCheck,
	hmacVerification: pageIcons.key,
	killSwitch: pageIcons.triangleAlertIcon,
	costFormula: pageIcons.gauge,
	frontierRateCards: pageIcons.database,
	provenance: pageIcons.shieldCheck,
	dualEngineProvenance: pageIcons.shieldCheck,
} as const;

export type IconKey = keyof typeof Icons;

