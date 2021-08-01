const data = require("./CarGens_ZoneVehicles");

generateCar();

function generateCar() {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].models.length === 0) {
            continue;
        }

        if(Math.floor(Math.random() * 20) >= 10)
            continue;

            // No checks for boats etc. - might cause weird spawns
        const model = data[i].models[ Math.floor(Math.random() * data[i].models.length) ];
        if(model === "squal" || model === "tropic" || model === "pounder" || model === "biff" || model === "bus")
            continue;

        if(model === "mixer" || model === "mixer2" || model === "hauler"  && (Math.floor(Math.random() * 20) >= 10))
            continue


            let veh = mp.vehicles.new(model, new mp.Vector3(data[i].x, data[i].y, data[i].z), {
                heading: data[i].heading,
                numberPlate: getRandomNumberPlate(),
            });


        if(model === "taxi") {
            const primary = (Math.floor(Math.random() * 10) >= 5) ? 88 : 126;
            veh.setColor(primary, 118);
        } else
            veh.setColor(Math.floor(Math.random() * (159 + 1)), Math.floor(Math.random() * (159 + 1)));

        count++;
    }


    console.log(`Created ${count} vehicles.`);
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
