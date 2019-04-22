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

  parse.set = (projects) => {
    var Project = Parse.Object.extend ("Project");
    var project = new Project ();

    project.save ().then((projects) => {
      project.set ('projects', 'test')
    }, (error) => {
      // The save failed.
      // error is a Parse.Error with an error code and message.
    });
  }


  // gameScore.set("score", 1337);
  // gameScore.set("playerName", "Sean Plott");
  // gameScore.set("cheatMode", false);
  // gameScore.set("skills", ["pwnage", "flying"]);

  // gameScore.save().then((gameScore) => {
  //   // Now let's update it with some new data. In this case, only cheatMode and score
  //   // will get sent to the cloud. playerName hasn't changed.
  //   gameScore.set("cheatMode", true);
  //   gameScore.set("score", 1338);
  //   return gameScore.save();
  // });


  parse.delete = () => {
    var GameScore = Parse.Object.extend("GameScore");
    var gameScore = new GameScore();
    // After this, the playerName field will be empty
    gameScore.unset ("playerName");
    console.log ('deleted');
  }

  return parse;

})();

