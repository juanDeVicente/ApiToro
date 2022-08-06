import https from 'https';

export class GetData {
	private chache: any | undefined;

	constructor() {
		
	}

	async GetDataToros(): Promise<any>
	{
		if (this.chache == undefined)
		{
			this.chache = await this.getPromise();
		}

		return this.chache!;
	}

	private getPromise(): Promise<string> {
		return new Promise<string>((resolve, reject) => 
		{
			https.get(process.env.TOROS_FILE_JSON_PATH!, (res) => 
			{
				let body = '';
				res.on('data', (chunk) => {
					body += chunk;
				});

				res.on('end', () => 
				{
					try {
						resolve(JSON.parse(body));
					} catch (error) {
						reject(error);
					}
				});

				res.on('error', (error) => 
				{
					reject(error);
				})
			});
		});
	}
}