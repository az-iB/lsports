import { error } from 'console'
import ModelLeagues from "../models/leagues"



const leagues = async (data) => {
   	if (data) {
   		data.forEach(function(league) {
			let leaguesModel = {
				id: league.Id,
		    name: league.Name,
		    location: league.LocationId,
		    sport: league.SportId,
		    current_season: league.Season
			};

			ModelLeagues.forge(leaguesModel).where({id:league.Id}).upsert();

		});
   	}
}

export default leagues
