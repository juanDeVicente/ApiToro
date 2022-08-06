export class Environment
{
	constructor() {

	}

	validate(): boolean {
		return process.env.PRIVATE_KEY_PATH != undefined &&
			process.env.CERT_KEY_PATH != undefined &&
			process.env.TOROS_FILE_JSON_PATH != undefined &&
			process.env.PORT != undefined
		;
	}

	toString(): string {
		return `process.env.TOROS_FILE_JSON_PATH: ${process.env.TOROS_FILE_JSON_PATH}\n` + 
			`process.env.PORT: ${process.env.PORT}\n`
		;
	}
}