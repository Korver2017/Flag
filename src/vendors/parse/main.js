import Parse from "parse";

Parse.initialize("Ox33tQSpiscXrVvf4HKXsduw2ProZNCysXXGY5zT");
Parse.serverURL = 'https://parse.protype.tw/flag';

// Export
export default (() => {

  let parse = {};

  parse.get = () => {
    var Project = Parse.Object.extend ("Project");
    var query = new Parse.Query (Project);
    query.get ("mAaLOhSiXm")
      .then (resp => {
        let projects = resp.get ('projects');
        // return projects;
        console.log (projects);
      }, (error) => {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
        console.log (error);
      });
  }


  parse.delete = () => {
    var GameScore = Parse.Object.extend("GameScore");
    var gameScore = new GameScore();
    // After this, the playerName field will be empty
    gameScore.unset ("playerName");
    console.log ('deleted');
  }

  return parse;

})();

