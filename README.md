node-cli-boilerplate
===

a simple node command line interface application boilerplate for getting up and running quickly.

it sets you up with a simple node app that basically acts like `echo`. You input a message with the message option and it prints it back to you.

it uses commander.js and colors as dependencies to aid with easy options parsing and aesthetically pleasing printing. As for dev dependencies mocha is included with a simple unit test set up for the print function. You can run this with `make test`. gulp is included if you wish to continue with the coffeescript source.

*note:_uses gulp.js to convert coffeescript src but this isn't intrusive and you can just work with the javascript source._

###to get up and running

* clone the repo

            git clone https://github.com/jh3y/node-cli-boilerplate.git
    
* install the dependencies

	cd node-cli-boilerplate
	npm install
    
* make the bin file executable

            chmod u+x bin/cli
    
* run the boilerplate with

            ./bin/cli
    
* start hacking!


###any problems?
contact me, I'll be happy to help you out. Tweet me at __@_jh3y__


@jh3y
