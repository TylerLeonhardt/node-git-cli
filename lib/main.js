(function() {
  var cli, colors, err, pkg, program, git;

  program = require("commander");

  colors = require("colors");

  pkg = require("../package.json");

  cli = require("./cli");

  NodeGit = require("nodegit");

  program
    .version(pkg.version)
    .option("-m, --message [message]", "set message to be printed.")
    .option("--get [get]", "Get the value for a given key (optionally filtered by a regex matching the value). Returns error code 1 if the key was not found and the last value if multiple key values were found.");

  program.on("--help", function() {
    console.log("  Examples:");
    console.log("");
    console.log("    $ " + pkg.name + " --message hello");
  });

  program.parse(process.argv);

  function getMethods(obj) {
  var result = [];
  for (var id in obj) {
    try {
      if (typeof(obj[id]) == "function") {
        result.push(id + ": " + obj[id].toString());
      }
    } catch (err) {
      result.push(id + ": inaccessible");
    }
  }
  return result;
}
  var action = {
    "config": function(){
      console.log("calls config");
      var pathToRepo = require("path").resolve("./");
      NodeGit.Repository.open(pathToRepo).then(function (repo) {
        return repo.config();
      }).then(function(config) {
        console.log("after open default");
        // console.log(getMethods(config).join("\n"));
        return config.getString(program.get);
      }).then(function(stuff){
        console.log("after getString");
        console.log(stuff);
      },
      function(error) {
        console.log(error);
      });
    },
    "clone": function(){
      console.log("calls clone");
    },
    "rev-list": function(){
      var pathToRepo = require("path").resolve("./");
      NodeGit.Repository.open(pathToRepo).then(function (repo) {
        return NodeGit.Revwalk.create(repo);
      }).then(function(revwalk) {
        NodeGit.Reference.normalizeName("master", {})
          .then(function(fullname){
            console.log(fullname);
            revwalk.pushRef(fullname);
            return revwalk.getCommits(1);
          });
      }).then(function(commitArr) {
        console.log(commitArr[0].id().tostrS());
      }).catch(function(err){
        console.log(err);
      });
    },
    "checkout": function(){
      console.log("calls checkout");
      if(program.args.length <= 1){
        program.help();

      }else{
        console.log(program.args[1]);
        var pathToRepo = require("path").resolve("./");
        NodeGit.Repository.open(pathToRepo).then(function(repository) {
          return repository.checkoutBranch(branch, opts);
        }).then(function(param){
          console.log("done");
          console.log(param);
        });
      }
    }
  }

  if (process.argv.length === 2) {
    program.help();
  } else {
    if(program.args.length > 0){
      if(action[program.args[0]]){
        action[program.args[0]]();
      }
    }
    // try {
    //   cli.print({
    //     message: program.message
    //   });
    // } catch (_error) {
    //   err = _error;
    //   console.log("[", "node-cli-boilerplate".white, "]", err.toString().red);
    // }
  }

}).call(this);
