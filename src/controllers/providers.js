import { error } from 'console'
import ModelProvider from "../models/providers"



const providers = async (data) => {
	
   	if (data) {
   		data.forEach(function(provider) {
			let providerModel = {
				id: provider.Id,
			    name: provider.Name
			};
			ModelProvider.forge(providerModel).where({id:provider.Id}).upsert();
		});
   	}
}

export default providers