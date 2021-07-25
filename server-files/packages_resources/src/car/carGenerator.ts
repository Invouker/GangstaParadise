const data = require("./CarGens_ZoneVehicles");

let count = 0;
for (let i = 0; i < data.length; i++) {
    if (data[i].models.length === 0) {
        continue;
    }

    // No checks for boats etc. - might cause weird spawns
    let veh = mp.vehicles.new(data[i].models[ Math.floor(Math.random() * data[i].models.length) ], new mp.Vector3(data[i].x, data[i].y, data[i].z), {
        heading: data[i].heading,
        numberPlate: getRandomNumberPlate(),
    });

    veh.setColor(Math.floor(Math.random() * (159 + 1)), Math.floor(Math.random() * (159 + 1)));

    count++;
}

function getRandomNumberPlate() {
    let result           = '';
    let result2           = '';
    let characters       = 'abcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    for ( var i = 0; i < 3; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    result2 = characters.charAt(Math.floor(Math.random() * charactersLength));


    return result + "-" + Math.floor(Math.random() * 99) + " " + result2;
}

console.log(`Created ${count} vehicles.`);