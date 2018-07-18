import { error } from 'console'
import ModelLocations from "../models/locations"



const locations = async (data) => {
	
   	if (data) {
   		data.forEach(function(location) {
			let locationsModel = {
				id: location.Id,
			    name: location.Name
			};
			ModelLocations.forge(locationsModel).where({id:location.Id}).upsert();

		});
   	}
}

export default locations