const FileSystem = require("fs");

const municipalities = require("./options.json")

const list = municipalities.map(m => ({
    name: m.name, 
    coords: [
      parseFloat(m.coords[0]), 
      parseFloat(m.coords[1])]
}))

FileSystem.writeFile('options.json', JSON.stringify(list), (error) => {
	if (error) throw error;
});
