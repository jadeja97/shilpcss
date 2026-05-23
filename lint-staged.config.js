const lintStagedConfig = {
	// function here prevents file names appended to the script
	"*": () => "pnpm check",
};

export default lintStagedConfig;