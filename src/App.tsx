import './App.css'
import * as TeamNames from './data/MTeams.json';
import * as SampleSubmission from './data/SampleSubmission2023.json';
import { demoMatches, SingleElimination } from './components/SingleElimination';

function App() {

  // Make a map of team ids to names
  const teams: Record<string, string> = {};
  TeamNames.teams.forEach((team) => {
    teams[team.TeamID] = team.TeamName
  });

  // Make a map of match ID's to predictions.
  // See SampleSubmission2023.json for more info.
  // id format: 2023_<team1Id>_<team2Id>,
  const predictions: Record<string, string> = {}
  SampleSubmission.predictions.forEach((prediction) => {
    predictions[prediction.ID] = prediction.Pred;
  })

  demoMatches.forEach((match) => {
    // Iterate through each match and print out who is playing who, as well as the prediction for the match.
    const team1 = match.participants[0];
    const team2 = match.participants[1];

    // may be a little confusing, but:
    // teams in Kaggle's submission format have four digit ids.
    // anything else that's a UUID is something that is just in there for mocking purposes at the moment.
    // Matches where players are undecided will have UUIDs as a team id (or a name of name BLANK, ---)

    // Might be good idea to move this into a filter function instead
    if (team1.id.length > 4 || team2.id.length > 4) {
      // console.log('returning early: ');
      // console.log('uuid team1 id: ', team1.id);
      // console.log('uuid team1 name: ', team1.name);

      // console.log('uuid team2 id: ', team2.id);
      // console.log('uuid team2.name: ', team2.name);
      return;
    }

    // console.log('team1 id: ', team1.id);
    // console.log('team1 name: ', team1.name);

    // console.log('team2 id: ', team2.id);
    // console.log('team2.name: ', team2.name);


    // NOTE: lower team ids go first.
    // smash ids together and get the prediction.
    const lowerId = Math.min(parseInt(team1.id), parseInt(team2.id));
    const higherId = Math.max(parseInt(team1.id), parseInt(team2.id));
    const predictionId = `2023_${lowerId}_${higherId}`;

    const predictionResult = predictions[predictionId];
    console.log('predictionResult: ', predictionResult);
  })

  return (
    <div className="App">
      <SingleElimination />
    </div>
  )
}

export default App;
