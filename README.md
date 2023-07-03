# panzer-WoT-winrate-gauge
 
Dieselpunk Desktop World of Tanks Win Rate widget, written in Javascript and XML 
for the Yahoo Widget (Konfabulator) Engine. Created for XP, Vista, Win7, 8, 10+ 
as well as the Apple Mac sierra + operating systems.

![panzer-hitrate750](https://github.com/yereverluvinunclebert/panzer-WoT-Hit-Rate-Gauge/assets/2788342/986ee9e5-271f-460b-8f29-729de0d077a4)

A Dieselpunk Win Rate widget - I created for the World of Tanks and War Thunder 
communities.This Panzer widget is a simple Win Rate gauge. Functional 
and gorgeous at the same time. The graphics are my own, I took original 
inspiration from a clock face by Italo Fortana. 

![Default](https://github.com/yereverluvinunclebert/panzer-WoT-Hit-Rate-Gauge/assets/2788342/8d892499-eeeb-4b9b-a39a-23fbe8cdcff4)

To find out how the widget operates, simply right click and select Help and a 
full explanation of all the buttons and windows is shown. Hovering over any 
control should supply a pop-up explaining each function.

Right clicking will bring up a menu of options. Double-clicking on the widget 
will cause a personalised Windows application to fire up. The first time you run 
it there will be no assigned function and so it will state as such and then pop 
up the preferences so that you can enter the command of your choice. The widget 
takes command line-style commands for windows. 

![yahoo-logo-small_111](https://github.com/yereverluvinunclebert/Steampunk-MediaPlayer-Ywidget/assets/2788342/c5668608-ab57-4665-a332-3bc9b7e07a9f)

All javascript widgets need an engine to function, in this case the widget uses 
the Yahoo Widget Konfabulator engine. The engine interprets the javascript and 
creates the widget according to the XML description and using the images you 
provide. 

![tank-help-750](https://github.com/yereverluvinunclebert/panzer-WoT-Hit-Rate-Gauge/assets/2788342/168c2951-30c4-498b-ac73-bc07a5588f61)

 
Built using: 

	RJTextEd Advanced Editor  https://www.rj-texted.se/ 
	Adobe Photoshop CS ver 8.0 (2003)  https://www.adobe.com/uk/products/photoshop/free-trial-download.html  
	Yahoo widgets SDK: runtime, debugger and documentation  
	
Tested on :

	ReactOS 0.4.14 32bit on virtualBox    
	Windows 7 Professional 32bit on Intel    
	Windows 7 Ultimate 64bit on Intel    
	Windows 7 Professional 64bit on Intel    
	Windows XP SP3 32bit on Intel    
	Windows 10 Home 64bit on Intel    
	Windows 10 Home 64bit on AMD    
	Windows 11 64bit on Intel 
   
 Dependencies:
 
 o A windows-alike o/s such as Windows XP, 7-11 or Apple Mac OSX 11.   
 o Installation of the yahoo widget SDK runtime engine  
 
	Yahoo widget engine for Windows - https://www.deviantart.com/users/outgoing?http://g6auc.me.uk/ywidgets_sdk_setup.exe  
	Yahoo widget engine for Mac - https://www.deviantart.com/users/outgoing?https://rickyromero.com/widgets/downloads/yahoo-widgets-4.5.2.dmg
 
 Running the widget using a javascript engine frees javascript from running only 
 within the captivity of a browser, you will now be able to run these widgets on 
 your Windows desktop as long as you have the correct widget engine installed.
 
![yahoo-logo-small_111](https://github.com/yereverluvinunclebert/Steampunk-MediaPlayer-Ywidget/assets/2788342/c5668608-ab57-4665-a332-3bc9b7e07a9f)
  
 Instructions for running Yahoo widgets on Windows
 =================================================
 
 1. Install yahoo widget SDK runtime engine
 2. Download the gauge from this repo.
 3. Unzip it
 4. Double-click on the resulting .KON file and it will install and run
 
 Instructions for running Yahoo widgets on Mac OS/X ONLY
 ========================================================
 
 1. Install yahoo widget SDK runtime engine for Mac
 2. Download the gauge from this repo.
 3. Unzip it
 4. For all all recent versions of Mac OS/X including Sierra, edit the following 
 file:
 
 com.yahoo.widgetengine.plist which is in /Users/xxx/Library/Preferences. Look 
 for these lines: 
    
   <key>DockOpen</key>  
   <string>false</string>  
 
 Change to false if it is true.
 
 5. Double-click on the widgets .KON file and it will install and run
 
 Wit these instructions you should be able to start Yahoo! Widgets and the 
 menubar item should appear. Widgets can then be started from the menubar or by 
 double-clicking on the KON file in the usual way.
 
 
Configuration with World of Tanks
  ========================================================
  
 Enter your username and numeric user ID (if you know it) when prompted.
 
 First issue: You will need your numeric user ID. You can get that from here:
 https://www.deviantart.com/users/outgoing?https://worldoftanks.com/en/community/accounts/#wot&at_search=
 Just enter your own username into the field there and hit enter.
 
 eg. https://www.deviantart.com/users/outgoing?https://worldoftanks.com/en/community/accounts/#wot&at_search=yereverluvinunclebert
 
 When you hit return, on the browser page that just opened, click on your 
 username (in green) where it says "battles, victories, experience"
 
 > yereverluvinunclebert < 16,688 55.17% 5,694,590
 
 and on the resulting page in the URL bar at the top you will see your user ID. 
 It will be something like:
 
 https://www.deviantart.com/users/outgoing?https://worldoftanks.com/en/community/accounts/1003670189-yereverluvinunclebert/
 
 - Type the number you find here (eg. 1003670189)
 
 That is your user ID. Open the widget Preferences, type it into the widget and 
 hit Enter. If it is a valid ID then after a few seconds the gauge will obtain 
 and register your win rate and indicate your noobness/unicumness.
 

 LICENCE AGREEMENTS:
 
 Copyright 2023 Dean Beedell
 
 In addition to the GNU General Public Licence please be aware that you may use
 any of my own imagery in your own creations but commercially only with my
 permission. In all other non-commercial cases I require a credit to the
 original artist using my name or one of my pseudonyms and a link to my site.
 With regard to the commercial use of incorporated images, permission and a
 licence would need to be obtained from the original owner and creator, ie. me.
 
![about](https://github.com/yereverluvinunclebert/panzer-WoT-Hit-Rate-Gauge/assets/2788342/160f7eef-21bd-4994-910c-a7c4f08016a1)


