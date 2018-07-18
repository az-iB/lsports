import { error } from 'console'
import ModelSport from "../models/sports"



const lsports = async (data) => {
	
   	if (data) {
   		data.forEach(function(sport) {
			let sportModel = {
				id: sport.Id,
			    name: sport.Name
			};
			ModelSport.forge(sportModel).where({id:sport.Id}).upsert();
		});
   	}
}


export default lsports