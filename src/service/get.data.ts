import fs from 'fs';

export class GetData {
	private chache: string | undefined;

	constructor() {
		
	}

	GetDataToros(): string
	{
		if (this.chache == undefined)
		{
			var data = fs.readFileSync(process.env.TOROS_FILE_JSON_PATH!);
			this.chache = JSON.parse(data.toString());
		}

		return this.chache!;
	}
}