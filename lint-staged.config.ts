const lintStagedConfig = {
	// function here prevents file names appended to the script
  // this will run on whole project
  // TODO: fix this
	"*": () => "pnpm check",
};

export default lintStagedConfig;