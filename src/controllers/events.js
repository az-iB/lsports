import { error } from 'console'
import ModelFixtures from '../models/fixtures'
import ModelPeriods from '../models/periods'
import ModelScoreboards from '../models/scoreboards'
import ModelResults from '../models/results'
import ModelParticipants from '../models/participants'
import async from 'async'


const delay = (duration) =>
  new Promise(resolve => setTimeout(resolve, duration));
const events = async (data) => {
   	if (data) {

   		// data.forEach(function(event) {
      async.forEachOf(data, (event, key, callback) => {
        return delay(1000).then(function() {
          let fixtureModel = {
            id: event.FixtureId,
              league: event.Fixture.League.Id,
              start: event.Fixture.StartDate
          };
          ModelFixtures.forge(fixtureModel).where({id:event.FixtureId}).upsert()
          .then(fixture => {

            event.Fixture.Participants.forEach(function(participant) {
              console.log("participant added")
              let participantModel = {
                id: participant.Id,
                name: participant.Name,
                fixture: fixture.id
              };
              ModelParticipants.forge(participantModel).where({id:participant.Id}).upsert()
              .then(participant => {})
              .catch((err => {console.log(err)}))
            });
            if (event.Livescore) {
              let scoreboardModel = new ModelScoreboards({
                // ID: event.Livescore.Scoreboard
                status: event.Livescore.Scoreboard.Status,
                period: event.Livescore.Scoreboard.CurrentPeriod,
                time: event.Livescore.Scoreboard.Time
              });
              scoreboardModel.save()
              .then( model => {
              })
              .catch((error) => { console.log(error) });

              if (event.Livescore.Periods) {
                event.Livescore.Periods.forEach(function(period) {
                  let periodModel = new ModelPeriods({
                    type: period.Type,
                    fixture: fixture.id,
                    finished: period.IsFinished,
                    confirmed: period.IsConfirmed
                  });
                  periodModel.save()
                  .then( model => {
                      period.Results.forEach(function(result) {
                        let resultModel ={
                          position: result.Position,
                          value: result.Value,
                          period: model.attributes.id
                        };
                        ModelResults.forge(resultModel).upsert();
                      });
                  })
                  .catch(function (err) {
                    console.log(err.stack)
                  });
                });
              }
            }
        })
        .catch(function (err) {
          console.log(err.stack)
        })

      })
      .catch(function (err){
        console.log(err.stack)
      });
		});
   	}
}


export default events
