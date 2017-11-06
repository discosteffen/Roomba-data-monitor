/***************************************
|||||||||||||||||||||||||||||||||||||||
This work is licensed under a GNU General
Public License, v3.0.
gnu.org/licenses/gpl-3.0-standalone.html
Forked From Create2 DOCK Demo.
Copyright (©) 2016, (Bryce Peterson)
End of Web Output Commands
|||||||||||||||||||||||||||||||||||||||
***************************************/
/*--------------------------------------
             CONTRIBUTORS
----------------------------------------
   Steffen Haaker - - Andrew Nguyen
--------------------------------------*/
/***************************************/
//Below are the Roomba output variables
//Web output 'include' variables
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http); // Socket connection
var spawn = require('child_process').spawn,
<<<<<<< HEAD
    ls    = spawn('python',['trackingwebcam.py']);
=======
    ls = spawn('python', ['trackingwebcam.py']);
>>>>>>> 739e04a507b26ef6c77669f34cb20b71c831eb3b

// The variables below are for images
var x;
var y;
var x2;
var y2;

ls.stdout.on('data', function(data) {
    var str = data
    var x = str.toString().split(" ")[0];
    var y = str.toString().split(" ")[1];
    x2 = x.substring(1, 4);
    y2 = y.substring(0, 3);
    console.log("RealX: " + x2 + " RealY: " + y2)
});

ls.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
});

var hello = "hello there"
var temp;
var charge = 0;
var chargeState = 0;
var maxCharge = 0;
var current = 0;
var voltage = 0;
var charger;
var docked;

var leftBumper;
var rightBumper;
var lightBumper;

//Title: LightBumpers
//Type: boolean (true or false)
var lightBumpLeft;
var lightBumpFrontLeft;
var lightBumpCenterLeft;
var lightBumpCenterRight;
var lightBumpFrontRight;
var lightBumpRight;

//Title: Proximity Sensors
//Type: int
//Range: 0 - 4095
var proxLeft;
var proxFrontLeft;
var proxCenterLeft;
var proxCenterRight;
var proxFrontRight;
var proxRight;

//Title: Motors
//Type: int
//Usage: Speed
var motorLeft = 0;
var motorRight = 0;
<<<<<<< HEAD

var encoderLeft = 0;
var encoderRight = 0;

var mode = 0;


var drivestate = 1;

var timeout = 250;
var action = function(){
    if(x2 <= 100){
	robot.driveSpeed(0,50);
    }
    else if(x2 >= 380){
	robot.driveSpeed(50,0);
=======
var encoderLeft = 0; //Read the turns in the wheels
var encoderRight = 0; //Read the turns in the wheels
var mode = 0; //Control Mode: 1 is Auto -- 2 is Semi-Control -- 3 is Total Control
var drivestate = 1; //Roomba Drivestate
var timeout = 1000; //Constant integer timeout
var track = function() {
    if (x2 <= 150) {
        robot.driveSpeed(-50, 50);
    } else if (x2 >= 450) {
        robot.driveSpeed(50, -50);
    } else {
        robot.driveSpeed(50, 50);
>>>>>>> 739e04a507b26ef6c77669f34cb20b71c831eb3b
    }
    setTimeout(track, timeout)
}
<<<<<<< HEAD


app.get('/', function(req, res){
  res.sendFile(__dirname + '/App.html');
=======
//End of Variable Declarations
/***************************************/
//--------------------------------------
/***************************************/
//Boilercode Rumba Communications
//var io = require("socket.io").listen(server)
//Var app = require('express')();
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/App.html'); //Sends the App.html file
>>>>>>> 739e04a507b26ef6c77669f34cb20b71c831eb3b
});

io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
    });
});

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

io.sockets.on('connection', function(socket) {
    socket.emit('news', {
        hello: rightBumper
    });
    socket.emit('news', {
        hello: charge
    });
});

io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
        console.log('chat msg' + msg);
    });
});
//Emitting Data to the Web
//Emit all of the following on the opened socket
io.on('connection', function(socket) { // Notify for a new connection and pass the socket as parameter.
    console.log('new connection');
<<<<<<< HEAD
    setInterval(function () {
//        console.log('emit new value', rightBumper);
				socket.emit('temp', temp); // Emit on the opened socket.
        socket.emit('rBump', rightBumper); // Emit on the opened socket.
	socket.emit('lBump', leftBumper); // Emit on the opened socket.
	socket.emit('lightBumpLeft', lightBumpLeft); // Emit on the opened socket.
				socket.emit('lightBumpFrontLeft', lightBumpFrontLeft); // Emit on the opened socket.
				socket.emit('lightBumpCenterLeft', lightBumpCenterLeft); // Emit on the opened socket.
				socket.emit('lightBumpCenterRight', lightBumpCenterRight); // Emit on the opened socket.
				socket.emit('lightBumpFrontRight', lightBumpFrontRight); // Emit on the opened socket.
				socket.emit('lightBumpRight', lightBumpRight); // Emit on the opened socket.
				socket.emit('charge', charge); // Emit on the opened socket.
				socket.emit('proxLeft', proxLeft); // Emit on the opened socket.
				socket.emit('proxFrontLeft', proxFrontLeft); // Emit on the opened socket.
				socket.emit('proxCenterLeft', proxCenterLeft); // Emit on the opened socket.
				socket.emit('proxCenterRight', proxCenterRight); // Emit on the opened socket.
				socket.emit('proxFrontRight', proxFrontRight); // Emit on the opened socket.
				socket.emit('proxRight', proxRight); // Emit on the opened socket.
=======
    setInterval(function() {
        socket.emit('temp', temp);
        socket.emit('rBump', rightBumper);
        socket.emit('lBump', leftBumper);
        socket.emit('lightBumpLeft', lightBumpLeft);
        socket.emit('lightBumpFrontLeft', lightBumpFrontLeft);
        socket.emit('lightBumpCenterLeft', lightBumpCenterLeft);
        socket.emit('lightBumpCenterRight', lightBumpCenterRight);
        socket.emit('lightBumpFrontRight', lightBumpFrontRight);
        socket.emit('lightBumpRight', lightBumpRight);
        socket.emit('charge', charge);
        socket.emit('proxLeft', proxLeft);
        socket.emit('proxFrontLeft', proxFrontLeft);
        socket.emit('proxCenterLeft', proxCenterLeft);
        socket.emit('proxCenterRight', proxCenterRight);
        socket.emit('proxFrontRight', proxFrontRight);
        socket.emit('proxRight', proxRight);
>>>>>>> 739e04a507b26ef6c77669f34cb20b71c831eb3b
        socket.emit('chargeState', chargeState);
        socket.emit('maxCharge', maxCharge);
        socket.emit('motorLeft', motorLeft);
        socket.emit('motorRight', motorRight);
        socket.emit('current', current);
        socket.emit('voltage', voltage);
        socket.emit('docked', docked);
        socket.emit('charger', charger);
        socket.emit('mode', mode);
    }, 100);
});
<<<<<<< HEAD


http.listen(3000, function(){
  console.log('listening on *:3000');
});


function updateData(){
	temp = robot.data.temperature;
	console.log("Temp:" + robot.data.temperature);

  //console.log("all data test: " + robot.data);
	//console.log("Charging State:" + robot.data.chargeState);

	// battery data
    charge = robot.data.charge;
    if(charge > maxCharge){
	console.log("Fully charged")
    }
    else{
	console.log("Charging")
    }
    
    //console.log("Current charge:" + robot.data.charge);
    chargeState = robot.data.chargeState;
    maxCharge = robot.data.maxCharge;
    current = robot.data.current;
    voltage = robot.data.current;
	// bumper sensors
	leftBumper = robot.data.bumpLeft;
	rightBumper = robot.data.bumpRight;

    /// ligth bump true false prox sensors
 	lightBumpLeft = robot.data.lightBumpLeft;
 	lightBumpFrontLeft = robot.data.lightBumpFrontLeft;
	lightBumpCenterLeft = robot.data.lightBumpCenterLeft;
	lightBumpCenterRight = robot.data.lightBumpCenterRight;
	lightBumpFrontRight = robot.data.lightBumpFrontRight;
	lightBumpRight = robot.data.lightBumpRight;


	// proximity sensors //0 - 4095
	proxLeft = robot.data.proxLeft;
	proxFrontLeft = robot.data.proxFrontLeft ;
	proxCenterLeft = robot.data.proxCenterLeft ;
	proxCenterRight = robot.data.proxCenterRight ;
	proxFrontRight = robot.data.proxFrontRight;
	proxRight = robot.data.proxRight ;


  charger = robot.data.charger;
  docked = robot.data.docked;

  mode = robot.data.mode;

  encoderLeft = robot.data.encoderLeft;
  encoderRight = robot.data.encoderRight;
  console.log(encoderLeft);
	console.log(encoderRight);

=======
//var http = require('http').Server(app);
http.listen(3000, function() {
    console.log('listening on *:3000');
});
//End of Boilercode Rumba Communications
/***************************************/
//--------------------------------------
/***************************************/
//Updates from the data of the Roomba
//View the Realtime Updates On the monitor
function updateData() {
    temp = robot.data.temperature;
    console.log("Temp:" + robot.data.temperature);
    charge = robot.data.charge; //Roomba Battery Data 0 - 2697
    chargeState = robot.data.chargeState; //State of the Charge
    maxCharge = robot.data.maxCharge; // 2697
    current = robot.data.current; // Current Output
    voltage = robot.data.voltage; // Voltage Output
    //Roomba Bump Sensors
    leftBumper = robot.data.bumpLeft;
    rightBumper = robot.data.bumpRight;

    //Roomba Light Bump Sensors w/ Boolean Values
    //(Boolean: True or False)
    lightBumpLeft = robot.data.lightBumpLeft;
    lightBumpFrontLeft = robot.data.lightBumpFrontLeft;
    lightBumpCenterLeft = robot.data.lightBumpCenterLeft;
    lightBumpCenterRight = robot.data.lightBumpCenterRight;
    lightBumpFrontRight = robot.data.lightBumpFrontRight;
    lightBumpRight = robot.data.lightBumpRight;

    // proximity sensors
    //0 - 4095
    proxLeft = robot.data.proxLeft;
    proxFrontLeft = robot.data.proxFrontLeft;
    proxCenterLeft = robot.data.proxCenterLeft;
    proxCenterRight = robot.data.proxCenterRight;
    proxFrontRight = robot.data.proxFrontRight;
    proxRight = robot.data.proxRight;

    charger = robot.data.charger;
    docked = robot.data.docked;
    //Control Mode: 1 is Auto -- 2 is Semi-Control -- 3 is Total Control
    mode = robot.data.mode;

    encoderLeft = robot.data.encoderLeft;
    encoderRight = robot.data.encoderRight;
    console.log(encoderLeft);
    console.log(encoderRight);
>>>>>>> 739e04a507b26ef6c77669f34cb20b71c831eb3b
}
//End of the Web Output
//********************************************
//-----------TODO need to add IO -------------
//********************************************
//Custom Roomba Control Functions
var create = require('create2');
var robot, turnRobot, stopTurn;

function start() {
    create.prompt(function(p) {
        create.open(p, main)
    });
}

//Main Program:
function main(r) {
<<<<<<< HEAD
	robot = r; handleInput(robot);

	//Enter Full Mode:
	robot.full(); var run = 1;

	//setTimeout(function(){robot.showText("Hello World!", 500, true)}, 500);
	//We'll play this song whenever entering user-control:
	robot.setSong(0, [[72,32],[76,32],[79,32],[72,32]]);

	//Handle First onChange:
	robot.onChange = function() {
		if(robot.data.charger || robot.data.docked) { robot.start(); run = 0; }
		else { /*robot.play(0); */driveLogic(); } robot.onChange = onchange;
	}

	//Handle onChange Events:
	function onchange(chg) {
/*	    if(robot.data.mode == 1 && charge >= 2650){
		robot.data.mode = 3;
//		robot.drive(-100, -100); drRun = 1;		
		console.log("undock")
	    }
*/
	    if(robot.data.mode == 3 && run == 1) { //FULL mode:
			//lightBumper is a macro for all light bump sensors (lightBumpLeft, lightBumpRight, etc)
			//Unfortunately, no similar macro exists for cliff sensors or bumper switches due to the way the data is delivered.
			if(chg.lightBumper || chg.bumpLeft || chg.bumpRight || chg.dropLeft || chg.dropRight || chg.clean || chg.docked) {
				driveLogic(); //Run drive logic only when sensor values change.
			}

		    //Charging Station Detected! Since it's in front of the robot anyway... Start Auto-Docking!
		    // if battery is low start docking
		if(charge <= 500)/*&&(robot.data.irLeft == 172 || robot.data.irRight == 172))*/
		   {
				robot.drive(0,0); run = -1; robot.showText("SEEK", 500, false, robot.autoDock);
			}
		} else if(robot.data.mode == 1) { //PASSIVE mode:
			if(chg.clean && robot.data.clean) { //Clean Pressed:
				if(robot.data.docked) robot.clean(); //Start backing up if clean pressed while docked.
				else preventDefault(function(){run = 1; driveLogic()}); //Prevent default.
			}
			if(chg.docked && robot.data.docked) { //Robot Docked:
				setUndock(0); robot.full(); robot.showText("DOCK", 500, false, robot.start);
			} else if(chg.docked/* && !robot.data.charger*/ && !robot.data.docked) { //Robot Undocked:
				setUndock(1);
			} else if(chg.dropLeft || chg.dropRight) { //Docking Interrupted:
				if(run == -1) {robot.full();robot.showText("RST", 500, false, robot.autoDock)}
				//else setUndock(1);
			}
		}
	}

	//Logic to Start and Stop Moving Robot:
	function driveLogic() {
		//We're in user-control (FULL mode) and can control the robot. (Your main program would be here!)
		if(robot.data.lightBumper || robot.data.bumpLeft || robot.data.bumpRight) robot.driveSpeed(0,0); //Disable motors.
		else robot.driveSpeed(robot.data.dropLeft?0:0,robot.data.dropRight?0:0); //Enable motors if wheels are up.
		if(robot.data.clean || robot.data.docked) {robot.driveSpeed(0,0);robot.start()} //Back to PASSIVE mode.
		// this is where our output data could be.
		updateData();
	}

	//Enable and disable undocking timer:
	var dTmr; function setUndock(e) {
		if(dTmr) clearTimeout(dTmr); //Cancel timer if already running.
		if(e) { run = 1; robot.start(); dTmr = setTimeout(function() {
			robot.full(); run = 1; dTmr = setTimeout(function(){robot.showText
			("UNDOCK", 250, true);robot.play(0);driveLogic();dTmr=null},250);
		}, 4400); } else run = 0;
	}

	//Turns robot when 't' is pressed:
	var drRun = 0, drAngle = 0;
	turnRobot = function() {
		if(robot.data.mode == 3 && drRun) { //If already turning:
			run = 0; if(drAngle) drAngle = 0; else //Set desired angle to original angle.
			drAngle = (robot.motorRad==1)?64:-64; //Continue in current motor direction.
			robot.drive(100, (drAngle-angle<0)?-1:1); drRun = 1;
		} else if(robot.data.mode == 3 && run == 1) { //Start new turn in opposite direction:
			run = 0; drAngle = drAngle<0?64:-64; angle = 0; drRun = 1;
			robot.drive(100, (drAngle-angle<0)?-1:1);
		}
	}


	var angle = 0; //Count Angle Changes Using Encoders:
	robot.onMotion = function() {
		updateData(); // had to place this here to get correct updated data for webmonitor
		angle += robot.delta.angle; console.log("Angle:", angle);
		if(((drAngle >= 0 && angle >= drAngle) || (drAngle < 0 && angle
		<= drAngle)) && drRun) { drRun = 0; run = 1; driveLogic(); }
	}

	//Prevent Default Behavior of Buttons in Passive Mode:
	function preventDefault(func) {
		setTimeout(function(){robot.full();if(func)setTimeout(func,500)},1400);
	}
}

function handleInput(robot) {
	//Process user input, quit on 'exit'
	const rl = require('readline').createInterface
	({input:process.stdin, output:process.stdout});
	rl.on('line', function(text) {
		if(text == "exit" || text == "quit") {
			console.log("Exiting..."); process.exit();
		} else if(text == "t") {
			turnRobot(); //Turn Robot.
		} else if(text == "s") {
			stop(); //Stop Turning.
		} else if(text == "stop") {
			stop(); //Turn Robot.
		} else if(text == "w") {
			forward(); //Turn Robot.
		} else if(text == "x") {
			backward(); //Turn Robot.
		} else if(text == "a") {
			turnLeft(); //Turn Robot.
		} else if(text == "d") {
			turnRight(); //Turn Robot.
		} else if(text == "ball") {
		    action();

//	setTimeout(function(){ballfollow()},i * 1000);
		} else if(text == "wander") {
		    setTimeout(function(){robot.driveSpeed(100,100)},0);
		    setTimeout(function(){robot.driveSpeed(-100,-100)},2500);

		} else if(text == "undock"){
		    //undock();
		    mode = 3;
		} else if(text == "mode1"){
		    mode = 1;
		} else if(text == "dock"){
		    robot.drive(0,0); run = -1; robot.showText("SEEK", 500, false, robot.autoDock);
		    
		}
	    
	    
	});
=======
    robot = r;
    handleInput(robot);
    //Enter Full Mode:
    robot.full();
    var run = 1;
    //We'll play this song whenever entering user-control:
    robot.setSong(0, [
        [72, 32],
        [76, 32],
        [79, 32],
        [72, 32]
    ]);
    //Handle First onChange:
    robot.onChange = function() {
        if (robot.data.charger || robot.data.docked) {
            robot.start();
            run = 0;
        } else { /*robot.play(0); */
            driveLogic();
        }
        robot.onChange = onchange;
    }

    //Handle onChange Events:
    function onchange(chg) {
        if (robot.data.mode == 3 && run == 1) { //If Mode for 3 (Full Control)
            fullControl();
        } else if (robot.data.mode == 1) { //If Mode for 1 (Passive Control)
            passiveControl();
        }
    }

    function fullControl() { //Mode 3 (Full Control)
        if (chg.lightBumper || chg.bumpLeft || chg.bumpRight || chg.dropLeft || chg.dropRight || chg.clean || chg.docked) { /*NOTE: lightBumper is a macro for all light bump sensors (lightBumpLeft, lightBumpRight, etc)*/
            //If Sensor Values Change...
            driveLogic(); //Run Drive Logic
        }
        if (robot.data.irLeft == 172 || robot.data.irRight == 172) { //Charging Station Detected! Start Auto-Docking!
            robot.drive(0, 0);
            run = -1;
            robot.showText("SEEK", 500, false, robot.autoDock);
        }
    }

    function passiveControl() { //Mode 1 (Passive Control)
        if (chg.clean && robot.data.clean) { //Clean Pressed:
            if (robot.data.docked) robot.clean(); //Start backing up if clean pressed while docked.
            else preventDefault(function() {
                run = 1;
                driveLogic()
            }); //Prevent default.
        }
        if (chg.docked && robot.data.docked) {
            //If the Robot is Docked...
            setUndock(0);
            robot.full();
            robot.showText("DOCK", 500, false, robot.start);
        } else if (chg.docked /* && !robot.data.charger*/ && !robot.data.docked) {
            //If the Robot is Undocked...
            setUndock(1);
        } else if (chg.dropLeft || chg.dropRight) {
            //If the Docking is Interrupted...
            if (run == -1) {
                robot.full();
                robot.showText("RST", 500, false, robot.autoDock)
            }
        }
    }

    function driveLogic() { //Logic to Start and Stop Moving Robot: (FULL CONTROL)
        if (robot.data.lightBumper || robot.data.bumpLeft || robot.data.bumpRight) robot.driveSpeed(0, 0); //Disable motors if bump
        else robot.driveSpeed(robot.data.dropLeft ? 0 : 0, robot.data.dropRight ? 0 : 0); //Enable motors if wheels are ready
        if (robot.data.clean || robot.data.docked) {
            robot.driveSpeed(0, 0);
            robot.start()
        } //Switch to mode 1 (Passive Control)
        updateData(); //Output Data
    }

    //Enable and disable undocking timer:
    var dTmr;

    function setUndock(e) {
        if (dTmr) clearTimeout(dTmr); //Cancel timer if already running.
        if (e) {
            run = 1;
            robot.start();
            dTmr = setTimeout(function() {
                robot.full();
                run = 1;
                dTmr = setTimeout(function() {
                    robot.showText("UNDOCK", 250, true);
                    robot.play(0);
                    driveLogic();
                    dTmr = null
                }, 250);
            }, 4400);
        } else run = 0;
    }

    //Turns robot when 't' is pressed:
    var drRun = 0,
        drAngle = 0;
    turnRobot = function() {
        if (robot.data.mode == 3 && drRun) {
            //If already turning...
            run = 0;
            if (drAngle) drAngle = 0;
            else //Set desired angle to original angle.
                drAngle = (robot.motorRad == 1) ? 64 : -64; //Continue in current motor direction.
            robot.drive(100, (drAngle - angle < 0) ? -1 : 1);
            drRun = 1;
        } else if (robot.data.mode == 3 && run == 1) {
            //If not already turning...
            run = 0;
            drAngle = drAngle < 0 ? 64 : -64;
            angle = 0;
            drRun = 1; //Start new turn in opposite direction:
            robot.drive(100, (drAngle - angle < 0) ? -1 : 1);
        }
    }

    var angle = 0; //Count Angle Changes Using Encoders:
    robot.onMotion = function() {
        updateData(); // had to place this here to get correct updated data for webmonitor
        angle += robot.delta.angle;
        console.log("Angle:", angle);
        if (((drAngle >= 0 && angle >= drAngle) || (drAngle < 0 && angle <=
                drAngle)) && drRun) {
            drRun = 0;
            run = 1;
            driveLogic();
        }
    }

    //Prevent Default Behavior of Buttons in Passive Control Mode:
    function preventDefault(func) { //In mode 1
        setTimeout(function() {
            robot.full();
            if (func) setTimeout(func, 500)
        }, 1400);
    }
}
//End of Robot Control Functions
/***************************************/
//--------------------------------------
/***************************************/
//User Robot Controls
function handleInput(robot) {
    //Process user input, quit on 'exit'
    const rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('line', function(text) {
        if (text == "exit" || text == "quit") {
            console.log("Exiting...");
            process.exit();
        } else if (text == "s" || text == "stop") {
            stop(); //Stop
        } else if (text == "w") {
            forward(); //  'w' + [Enter] = Move Forward
        } else if (text == "x") {
            backward(); // 'x' + [Enter] = Move Backwards
        } else if (text == "a") {
            turnLeft(); // 'a' + [Enter] = Turn Left
        } else if (text == "d") {
            turnRight(); // 'd' + [Enter] = Turn Right
        } else if (text == "track") {// 'track' + [Enter] = Follow / Track Color
            track();
        } else if (text == "wander") {
            setTimeout(function() {
                robot.driveSpeed(100, 100)
            }, 0);
            setTimeout(function() {
                robot.driveSpeed(-100, -100)
            }, 2500);

        }
    });
>>>>>>> 739e04a507b26ef6c77669f34cb20b71c831eb3b
}


//Stop turning when 's' is pressed:
stopTurn = function() {
    if (robot.data.mode == 3 && drRun) { //If already turning:
        run = 1;
        drRun = 0;
        driveLogic(); //Stop turn.
    }
}

forward = function() {
    motorLeft = 100;
    motorRight = 100;
    robot.driveSpeed(100, 100);
}

backward = function() {
    motorLeft = -100;
    motorRight = -100;
    robot.driveSpeed(-100, -100);
}


turnRight = function() {
    motorLeft = 100;
    motorRight = -100;
    robot.driveSpeed(100, -100);
}

turnLeft = function() {
    motorLeft = -100;
    motorRight = 100;
    robot.driveSpeed(-100, 100);
}

<<<<<<< HEAD
undock = function(){
    console.log("undocking");
//    robot.full(); var run = 1;    
    robot.data.mode = 3;
    run = 1;
}


ballfollow = function(){
  if(x2 <= 150){
    robot.driveSpeed(-50,50);
  }
  else if(x2 >= 450){
    robot.driveSpeed(50,-50);
  }
  else {
    robot.driveSpeed(0,0);
  }
=======
stop = function() {
    motorLeft = 0;
    motorRight = 0;
    robot.driveSpeed(0, 0);
>>>>>>> 739e04a507b26ef6c77669f34cb20b71c831eb3b
}

start();
