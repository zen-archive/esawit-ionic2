export class HarvestBunchesModel {
	constructor (
			public location_GUID:string = "",
			public bunch_count:number = null
	) { }
	
	toJson (stringify?: boolean):any {
		var doc = {
			location_GUID: this.location_GUID,
			bunch_count: this.bunch_count
		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}
}
