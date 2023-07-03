/*
    Panzer winRate Widget

    Coded by Dean Beedell
    Visuals created by Dean Beedell
    Sorted by Harry Whitfield

    email: dean.beedell@lightquick.co.uk
    http//lightquick.co.uk
*/

/*jslint for, multivar, this */

/*property
    MouseWheelPref, busy, charAt, charCodeAt, clockSize, copy, ctrlKey, data,
    duration, ease, endAngle, floor, freeBytes, hOffset, hRegistrationPoint,
    height, hoffset, interval, isNaN, itemExists, kEaseOut, keyCode, length,
    maxLength, milliseconds, minLength, onKeyDown, onMouseDown, onMouseUp,
    onMouseWheel, onPreferencesChanged, onTimerFired, onWakeFromSleep, onload,
    opacity, open, path, platform, pow, random, remove, rotation, round,
    scrollDelta, size, soundPref, src, srcHeight, srcWidth, start, startAngle,
    startTime, substring, tickSwitchPref, ticking, ticks, tooltip, totalBytes,
    userWidgetsFolder, vOffset, vRegistrationPoint, value, visible, voffset,
    volumes, width
*/


"use strict";

var mainWindow, background, surround, switchFacesButton, winRateMaxText, winRatePercText,winRateMaxTextArea,
        winRatePercTextArea,
        hourHand, hourShadow, minuteHand, minuteShadow, secondHand, secondShadow,
        bigReflection, windowReflection,
        startButton, stopButton, pin, prefs, tankHelp, helpbutton, tickSwitch,
        createLicence, setmenu, theDLSdelta, lprint, smallMinuteHand,
        helpButton, showFace, mainScreen, settooltip, checkLockWidget,
        dangerLamp, driveLetter, driveLetterText, buildVitality,
        helpWindow, changePrefs;

var driveLetterVar;
var windowx = 785, windowy = 622;
var backxo = 0, backyo = 0, backgroundxo = 7, backgroundyo = 0;
var surroundxo = 0, surroundyo = 0;
var switchFacesButtonxo = 710, switchFacesButtonyo = 267;
var dangerLampxo = 247, dangerLampyo = 150;
var driveLetterxo = 400, driveLetteryo = 140;

var driveLetterTextxo = 425, driveLetterTextyo = 177;

var startButtonxo = 710, startButtonyo = 135;
var stopButtonxo = 710, stopButtonyo = 395;
var secondxo = 416, secondyo = 313, secondxr = 11.5, secondyr = 245.5;
var secondshadowxo = 416, secondshadowyo = 313, secondshadowxr = 22.5, secondshadowyr = 260.5;

// macintosh
var winRatePercTextAreaxo = 295, winRatePercTextAreayo = 190;

// windows
var winRatePercTextxo = 315, winRatePercTextyo = 212;

var shadowOffset = 0;
var bigReflectionxo = 169, bigReflectionyo = 69;
var windowReflectionxo = 511, windowReflectionyo = 210;
var pinxo = 162, pinyo = 60;
var prefsxo = 161, prefsyo = 516;
var helpButtonxo = 625, helpButtonyo = 516;
var tickSwitchxo = 625, tickSwitchyo = 59;

var currIcon = "Resources/images/dock.png";

var counter = "Resources/sounds/counter.mp3";
var lock = "Resources/sounds/lock.mp3";
var till = "Resources/sounds/till01.mp3";
var ting = "Resources/sounds/ting.mp3";
var mistake = "Resources/sounds/mistake.wav";
var thhhh = "Resources/sounds/thhhh.mp3";
var winding = "Resources/sounds/winding.mp3";
var konPath2 = "";

var widgetName = "panzer WoT winrate.widget";
var applicationID = "0d5c24439df77a9ad56451fcaa3ca66a"; // the applications ID from WG.

var url = new URL();
var tempURL = "";

include("json2.js");
include("functions.js");
include("Resources/Licence/licence.js");

Number.isNaN = Number.isNaN || function (value) {       // polyfill
    return value !== value;
};

//===============================================================
// this function does the actual resizing
//===============================================================
function sizeClock() {
    var scale = Number(preferences.clockSize.value) / 100;

    function sc(img, hOffset, vOffset, hReg, vReg) {
        img.hOffset = Math.round(hOffset * scale);
        img.vOffset = Math.round(vOffset * scale);
        img.width = Math.round(img.srcWidth * scale);
        img.height = Math.round(img.srcHeight * scale);
        if (hReg !== undefined) {
            img.hRegistrationPoint = Math.round(hReg * scale);
        }
        if (vReg !== undefined) {
            img.vRegistrationPoint = Math.round(vReg * scale);
        }
    }

    mainWindow.width = Math.round(windowx * scale);
    mainWindow.height = Math.round(windowy * scale);

    sc(background, backgroundxo, backgroundyo);
    sc(surround, surroundxo, surroundyo);
    sc(switchFacesButton, switchFacesButtonxo, switchFacesButtonyo);
    sc(dangerLamp, dangerLampxo, dangerLampyo);
    sc(startButton, startButtonxo, startButtonyo);
    sc(stopButton, stopButtonxo, stopButtonyo);
    sc(secondHand, secondxo, secondyo, secondxr, secondyr);
    sc(secondShadow, secondshadowxo + shadowOffset, secondshadowyo + shadowOffset, secondshadowxr, secondshadowyr);

    sc(bigReflection, bigReflectionxo, bigReflectionyo);
    sc(windowReflection, windowReflectionxo, windowReflectionyo);
    sc(pin, pinxo, pinyo);
    sc(prefs, prefsxo, prefsyo);

    sc(helpButton, helpButtonxo, helpButtonyo);
    sc(tickSwitch, tickSwitchxo, tickSwitchyo);

    // macintosh
    winRatePercTextArea.size = Math.round(22 * scale);
    winRatePercTextArea.hOffset = Math.round(winRatePercTextAreaxo * scale);
    winRatePercTextArea.vOffset = Math.round(winRatePercTextAreayo * scale);

    // WINDOWS

    winRatePercText.size = Math.round(22 * scale);
    winRatePercText.hOffset = Math.round(winRatePercTextxo * scale);
    winRatePercText.vOffset = Math.round(winRatePercTextyo * scale);

}
//=====================
//End function
//=====================



//===============================================================
// this function is called by the main timer and does the gauge work
//===============================================================
function updateWinrate() {
    var a, usedPerc, freePerc, freeSpace, // systemMemoryLoad, systemMemoryTotalPhysical,
            paths, testAmount, suffix, power;
      var data;
      var obj;
      var all;
      var winP;
      var rot1;

	var rotateObject = function (obj, value) {
	    var animationDuration,
	        animationInterval = 60,

	        updateMe = function () {    // called during rotateAnimation
	            var now = animator.milliseconds, fraction, angle;

	            if (now >= (this.startTime + this.duration)) {
	                obj.rotation = this.endAngle;
	                obj.busy = false;
	                return false;
	            }
	            fraction = (now - this.startTime) / this.duration;
	            angle = animator.ease(this.startAngle, this.endAngle, fraction, animator.kEaseOut);
	            obj.rotation = angle;
	            return true;
	        },

	        rotateAnimation = function (startAngle, endAngle) {
	            var rotate = new CustomAnimation(animationInterval, updateMe);
	            rotate.duration = animationDuration;
	            rotate.startAngle = startAngle;
	            rotate.endAngle = endAngle;
	            animator.start(rotate);
	        };

	    obj.busy = true;
	    animationDuration = animationInterval * Math.floor(900 / animationInterval - 1);
	    rotateAnimation(obj.rotation, value);
	};
	updateTimer.interval = (preferences.sampleIntervalPref.value * 60);

	readURLdata();
	try
	{
		data = filesystem.readFile(url.outputFile);
		obj = JSON.parse(data);
		all = obj.data[userId].statistics.all;
	}
	catch( e )
	{
		alert("invalid user ID - enter a valid user ID");
		showWidgetPreferences();
		return;
	}
	print("valid user ID found ");
/*
   print(all.hits_percents);
   print(all.piercings_received);	
   print(all.piercings);	
   print(all.damage_received);	
   print(all.damage_dealt);	
*/
	// calculate the win rate
	winP = all.wins / all.battles;
	rot1 =  (300 * winP) + 30;  // adjust the scale as the gauge is not 360 but starts at 30 and ends at 330

	var eee = winP *100;
	//secondText.data = eee.toFixed(2);

	print( "percent " + winP);


    if (preferences.tickSwitchPref.value === "tick") {
        secondHand.rotation = rot1;
        secondShadow.rotation = secondHand.rotation;
    } else {
        // zero pointer smoothly
        rotateObject(secondHand, rot1);
        rotateObject(secondShadow, rot1);
    }


    winRatePercText.data = eee.toFixed(1); // returns " 23" (with one space)
    winRatePercText.tooltip = "user " + preferences.wotUserId.value + " win rate = " + winRatePercText.data + "%";

    winRatePercTextArea.data = winRatePercText.data
    winRatePercTextArea.tooltip = "user " + preferences.wotUserId.value + " win rate = " + winRatePercText.data + "%";



      if (winP < 0.50) {
          dangerLamp.src = "Resources/images/red-lamptrue.png";
      }
      if (winP >= 0.50 && winP < 0.54 ) {
          dangerLamp.src = "Resources/images/green-lamptrue.png";;
      }
      if (winP >= 0.54 && winP < 0.59 ) {
          dangerLamp.src = "Resources/images/blue-lamptrue.png";;
      }
      if (winP >= 0.59) {
          dangerLamp.src = "Resources/images/purple-lamptrue.png";;
      }
      
    buildVitality(currIcon, String(winRatePercTextArea.data)); // build the dock vitality
}
//=====================
//End function
//=====================



//===============================================================
// general utility functions on graphic objects
//===============================================================
startButton.onMouseUp = function () {
    this.opacity = 255;
    reloadWidget();
};

prefs.onMouseDown = function () {
    prefs.src = "Resources/images/prefs02.png";
};


prefs.onMouseUp = function () {
    prefs.src = "Resources/images/prefs01.png";
    if (preferences.soundPref.value !== "disabled") {
        play(winding, false);
    }
    showWidgetPreferences();
};

helpButton.onMouseDown = function () {
    helpButton.opacity = 255;
};

function tankHelpShow() {
    helpWindow.visible = true;
    if (preferences.soundPref.value !== "disabled") {
        play(till, false);
    }
}

helpButton.onMouseUp = function () {
    helpButton.opacity = 1;
    tankHelpShow();
};

tankHelp.onMouseDown = function () {
    helpWindow.visible = false;
    if (preferences.soundPref.value !== "disabled") {
        play(ting, false);
    }
};



stopButton.onMouseDown = function () {
    this.opacity = 10;
    updateTimer.ticking = false;
    secondHand.visible = false;
    secondshadow.visible = false;
};

stopButton.onMouseUp = function () {
    this.opacity = 255;
};
//=====================
//End functions
//=====================

//the following function needs to operate on both the background and background2 faces, as the ctrl event can only be caught by the
//onMouseWheel itself on one object the event cannot be referred to by the key click on another object. The function would have to be duplicated
//for the background and background2 objects. Instead I have made the background object opacity to 1 so it seems as if it is not
//visible but it still responds to keyclicks and mousewheel movements even when supposedly 'invisible' - see the showFace function.

//=================================
// resizing on mouse scroll wheel combined with a CTRL key just as browsers
//=================================
background.onMouseWheel = function (event) {
    var size = Number(preferences.clockSize.value),
        maxLength = Number(preferences.clockSize.maxLength),
        minLength = Number(preferences.clockSize.minLength),
        ticks = Number(preferences.clockSize.ticks),
        step = Math.round((maxLength - minLength) / (ticks - 1));

    if (event.ctrlKey) {
        if (event.scrollDelta > 0) {
            if (preferences.MouseWheelPref.value === "up") {
                size -= step;
                if (size < minLength) {
                    size = minLength;
                }
            } else {
                size += step;
                if (size > maxLength) {
                    size = maxLength;
                }
            }
        } else if (event.scrollDelta < 0) {
            if (preferences.MouseWheelPref.value === "up") {
                size += step;
                if (size > maxLength) {
                    size = maxLength;
                }
            } else {
                size -= step;
                if (size < minLength) {
                    size = minLength;
                }
            }
        }
        preferences.clockSize.value = String(size);
        sizeClock();
    }
};
//=====================
//End function
//=====================

//=================================
// initialise the main timer loop
//=================================
var updateTimer = new Timer();
updateTimer.ticking = true;
updateTimer.interval = preferences.sampleIntervalPref.value * 60;
//=================================
// timer ends
//=================================

// main timer loop
//=================================
updateTimer.onTimerFired = function () {
    updateWinrate();
};
//=====================
//End function
//=====================


var debugFlg = "";
//===========================================
// this function runs on startup
//===========================================
function startup() {
    debugFlg = preferences.debugflgPref.value;
    if (debugFlg === "1") {
        preferences.imageEditPref.hidden=false;
        preferences.imageCmdPref.hidden=false;
    } else {
        preferences.imageEditPref.hidden=true;		
        preferences.imageCmdPref.hidden=true;
    }	
	sizeClock();
	setTextAreas();
	mainScreen();
	createLicence(mainWindow);
	getServerID();
	getUserID();
	setmenu();
	settooltip();
	checkLockWidget();
	buildVitality(currIcon, 0); // build the dock vitality
}
//=====================
//End function
//=====================


//===============================================================
// this function is called when the server ID is blank
//===============================================================
function getServerID() {
    var userServerInput;
    print ("preferences.serverIdentPref.value "+preferences.serverIdentPref.value);
	if (preferences.serverIdentPref.value === "" || (preferences.serverIdentPref.value === "none")) {
	   userServerInput = searchForm("WoT Server", "Enter", "Cancel", "Select your server name and hit Enter. Otherwise hit cancel and we will abort.", "Server", preferences.serverIdentPref.value, "popup",["NA","EU","RU1","RU2","SEA","KR"]);
	   if ((userServerInput === null) || (userServerInput === "") ) {
			return; //abort
		} else {
			preferences.serverIdentPref.value = userServerInput;
		}
	}
}
//=====================
//End function
//=====================

//===============================================================
// this function is called when the user ID is blank
//===============================================================
function getUserID() {
    var userIdInput, userNameInput, webAddress;
// if the id field is empty then open a dialog to extract the username from the user
// use that to open a URL for the user to view the ID
// https://worldoftanks.com/en/community/accounts/#wot&at_search=yereverluvinunclebert
// open a dialog for the user to type in the UID that is then saved to the prefs.
    if (preferences.wotUserId.value === "") {

	   userIdInput = searchForm("WoT UserID Search", "Enter", "Cancel", "Enter your WoT NUMERIC user ID if you know it (it is a number) and hit Enter. Otherwise hit cancel and we will find it another way.", "User ID", preferences.wotUserId.value, "text", [""]);
	   if ((userIdInput === null) || (userIdInput === "")) {
			    userNameInput = searchForm("WoT Username Search", "Enter", "Cancel", "Now we have to help you find out your user ID from Wargaming. Type just your WoT username in full and then hit Enter (password NOT required - NEVER give your password to anyone).", "WoT User name", preferences.wotUserName.value, "text",[""]);
			    if ((userNameInput === null) || (userNameInput === "")) {
			        return;
			    }
			    preferences.wotUserName.value = userNameInput;
			    webAddress = "https:\//worldoftanks.com\/en\/community\/accounts\/#wot&at_search="+userNameInput;
			    openURL(webAddress);
			    userIdInput = searchForm("WoT UserID Search", "Enter", "Cancel", "This is a ONE-OFF task - you will never need to do it again. On your browser page that just opened, click on your username (in green) where it says battles, victories, experience and on the resulting page in the URL bar at the top you will see your user ID. It will be something like: worldoftanks.com/en/community/accounts/ - Type the number you find here (eg. 1003670189) that is your user ID and hit Enter, otherwise hit cancel. If it is a valid ID then after a few seconds the gauge will obtain and register your win rate and measure your noobness.", "User ID", preferences.wotUserId.value, "text");
			    if ((userIdInput === null) || (userIdInput === "")) {
			        return;
			    } else {
						preferences.wotUserId.value = userIdInput;
				 }
	    } else {
	    	    preferences.wotUserId.value = userIdInput;
	    }
    } else {
    	
	    print("%INFO-I-ACCESSWG, Now accessing WG's system to get the WoT user information"); 
	    updateTimer.interval = 1; // the interval is temporarily reduced and the update is triggered
	 }
}
//=====================
//End function
//=====================


//===============================================================
// this function is called when the widget loads
//===============================================================
widget.onload = function () {
    startup();
};
//=====================
//End function
//=====================

//===============================================================
// this function is called when the widget prefs are changed
//===============================================================
widget.onPreferencesChanged = function () {
    changePrefs();
    startup();
};
//=====================
//End function
//=====================

//===============================================================
// this function is called when the widget wakes up
//===============================================================
widget.onWakeFromSleep = function () {
    updateWinrate();
};
//=====================
//End function
//=====================

//===============================================================
// this function defines the keyboard events captured
//===============================================================
mainWindow.onKeyDown = function (event) {
    if (event.keyCode === 116) {        //F5
        print("pressing " + event.keyCode);
        reloadWidget();
    }
};
//=====================
//End function
//=====================




//======================================================================================
// Function to make text areas visible rather than text objects
//======================================================================================
function setTextAreas() {
    if (system.platform === "macintosh") {
      winRatePercTextArea.visible = true;
    } else {
      winRatePercText.visible = true;
    }
}
//=====================
//End function
//=====================



//===============================================================
// this function fires the main event on a double click
//===============================================================
background.onMultiClick = function() {
	if (preferences.soundPref.value !== "disabled") {
		play(ting, false);
	}
	updateTimer.interval = 1;
	//updateWinrate(); // the interval is temporarily reduced and the update is triggered quickly
};
//=====================
//End function
//=====================



//===============================================================
// this function 
//===============================================================
function readURLdata() {
      // read the data
      url.outputFile = system.widgetDataFolder + "tmp.json" ;

      if (preferences.wotUserId.value == "") {
           preferences.wotUserId.value = "1003670189"; //hard coded to read mine
      };
      if (preferences.wotUserName.value == "") {
           preferences.wotUserName.value = "yereverluvinunclebert"; //hard coded to read mine
      };      
      
      userId = preferences.wotUserId.value;
 
      print ("userId being tested now "+ userId);
      // http://api.worldoftanks.com/wot/account/list/?application_id=demo&search=yereverluvinunclebert
      var tempURL = "http://api.worldoftanks.com/2.0/account/info/?application_id=" + applicationID + "&account_id=" + userId;
      url.location = tempURL;
      url.fetch();

      }
//=====================
//End function
//=====================



//===============================================================
// this function 
//===============================================================
function execForm(formDef, formTitle, formButtonOK, formButtonCancel) {
    var formFields = [];
    var formResults;

    formDef.forEach(function (ele) {
        var formField = new FormField();
        formField.name = ele[0];
        formField.title = ele[1];
        formField.type = ele[2];
        formField.option = ele[3];
        formField.defaultValue = ele[4];
        formField.description = ele[5];
        formFields.push(formField);
    });

    formResults = form(formFields, formTitle, formButtonOK, formButtonCancel);
    return formResults;
}
//=====================
//End function
//=====================



//===============================================================
// this function 
//===============================================================
function searchForm(formTitle, formButtonOK, formButtonCancel, formLinkDesc, formPrompt, formDefaultValue, formType, formOption) {
    var link;
    var formDef = [
        ["link", formPrompt, formType, formOption, formDefaultValue, formLinkDesc]
    ];
    var formResults = execForm(formDef, formTitle, formButtonOK, formButtonCancel);
    var result = null;

    if (formResults !== null) {
        link = formResults[0];
        result = link;
    }
    return result;
}
//=====================
//End function
//=====================

