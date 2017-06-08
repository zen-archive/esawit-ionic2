export class HarvestBunchesModel {
	constructor (
			public location_GUID:string = "",
			public bunch_count:number = null,
			public created_ts:string=null,
			public createdby_GUID:string=null
	) { }
	
	toJson (stringify?: boolean):any {
		var doc = {
			location_GUID: this.location_GUID,
			bunch_count: this.bunch_count,
			created_ts:this.created_ts,
			createdby_GUID:this.createdby_GUID
		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}
}
