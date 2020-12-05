import { FunctionDefinition } from 'serverless';

export type ServerlessTSFunctionMap = Record<string, ServerlessTSFunction>;

export interface ServerlessTSInstance {
	cli: {
		log(str: string): void;
	};
	config: {
		servicePath: string;
	};
	service: ServerlessTSService;
	package?: ServerlessTSPackage;
	pluginManager: ServerlessTSPluginManager;
}

export interface ServerlessTSService {
	provider: {
		name: string;
		runtime?: string;
	};
	custom?: {
		/**
		 * Custom options to be passed to this plugin.
		 * - tsconfigFilePath: Custom tsconfig file to be used instead of
		 *   default.
		 * - include/exclude: Specify external typescript files (not referenced
		 *   by lambda functions) to be included at the final bundle. */
		typeScript?: {
			tsconfigFilePath?: string;
			include?: string[];
			exclude?: string[];
		};
	};
	functions: ServerlessTSFunctionMap;
	getAllFunctions(): string[];
	getFunction(functionName: string): FunctionDefinition;
}

/** CLI Options */
export interface ServerlessTSOptions {
	/** The name of the function to run (should be required) */
	function?: string;
	/** Recompile and run a function locally on source changes */
	watch?: boolean;
	/** Path to JSON or YAML file holding input data */
	extraServicePath?: string;
	/** Input data */
	tsconfigFilePath?: string;
}

export interface ServerlessTSFunction
	extends Pick<FunctionDefinition, 'handler' | 'runtime'> {
	handler: string;
	package: ServerlessTSPackage;
	runtime?: string;
}

/** Optional deployment packaging configuration */
export interface ServerlessTSPackage {
	/** Specify the directories and files which should be included in the deployment package */
	include: string[];
	/** Specify the directories and files which should be excluded in the deployment package */
	exclude: string[];
	/** Config if Serverless should automatically exclude dev dependencies in the deployment package. Defaults to true */
	excludeDevDependencies?: boolean;
	/** Own package that should be used. You must provide this file. */
	artifact?: string;
	/** Enables individual packaging for each function. If true you must provide package for each function. Defaults to false */
	individually?: boolean;
}

export interface ServerlessTSPluginManager {
	spawn(command: string): Promise<void>;
}
