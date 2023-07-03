var data = filesystem.readFile("/Users/nhw/Desktop/info.json");
var obj = JSON.parse(data);
var all = obj.data["1003670189"].statistics.all;
print(all.spotted);	// should say 16297
printProperties(all, false);