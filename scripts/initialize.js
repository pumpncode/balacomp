import { join } from "@std/path";

const {
	Command,
	copyFile,
	cwd
} = Deno;

const environmentExampleFilePath = join(cwd(), ".example.env");

const environmentFilePath = join(cwd(), ".env");

await copyFile(environmentExampleFilePath, environmentFilePath);

const npmInstallCommand = new Command(
	"npm",
	{
		args: ["install"],
		stderr: "inherit",
		stdout: "inherit"
	}
);

await npmInstallCommand.output();
