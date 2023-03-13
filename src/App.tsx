import './App.css'
import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import * as TeamNames from './data/MTeams.json';
import * as SampleSubmission from './data/SampleSubmission2023.json';

type SingleEliminationMatch = {
  id: number;
  name: string;
  nextMatchId: string | null;
  tournamentRoundText: string;
  startTime: string;
  state: "DONE" | "NO_SHOW" | "WALK_OVER" | "NO_PARTY" | "DONE" | "SCORE_DONE"
  participants: Participant[];
}

type Participant = {
  id: string;
  resultText: string | null;
  isWinner: boolean;
  status: 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null;
  name: string;
}

// TODO: Add some more matches
// Set up mocks with all the teams involved, find pictures of each team's logo
const matches: SingleEliminationMatch[] = [
  {
    "id": 260005,
    "name": "Final - Match",
    "nextMatchId": null, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
    "tournamentRoundText": "4", // Text for Round Header
    "startTime": "2021-05-30",
    "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
    "participants": [
      {
        "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
        "resultText": "WON", // Any string works
        "isWinner": false,
        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
        "name": "giacomo123"
      },
      {
        "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
        "resultText": null,
        "isWinner": true,
        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
        "name": "Ant"
      }
    ]
  }
]


export const SingleElimination = () => (
  <SingleEliminationBracket
    matches={matches}
    matchComponent={Match}
    svgWrapper={({ children, ...props }) => (
      <SVGViewer width={500} height={500} {...props}>
        {children}
      </SVGViewer>
    )}
  />
);

function App() {

  console.log('teamNames: ', TeamNames.teams.length);

  console.log('SampleSubmission: ', SampleSubmission.predictions)

  console.log('teams: ', TeamNames.teams);

  const teams = {};
  TeamNames.teams.forEach((team) => {
    teams[team.TeamID] = team.TeamName
  });

  console.log('team map: ', teams);

  const predictions = [];
  SampleSubmission.predictions.forEach((prediction) => {
    const split = prediction.ID.split("_");
    const year = parseInt(split[0]);
    const team1 = parseInt(split[1]);
    const team2 = parseInt(split[2]);

    console.log('year: ', year);
    console.log('team1Name: ', teams[team1]);
    console.log('team2Name: ', teams[team2]);
    console.log('prediction: ', prediction.Pred);

  })

  return (
    <div className="App">
      <SingleElimination />
    </div>
  )
}

export default App
