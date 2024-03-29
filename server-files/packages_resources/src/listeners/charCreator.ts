const fs = require("fs");

const freemodeCharacters = [mp.joaat("mp_m_freemode_01"), mp.joaat("mp_f_freemode_01")];
const creatorPlayerPos = new mp.Vector3(402.8664, -996.4108, -99.00027);
const creatorPlayerHeading = -185.0;

// this will increase by 1 every time a player is sent to the character creator
let creatorDimension = 1;

mp.events.add("playerReady", (player) => {
    player.colorForOverlayIdx = function(index: number) {
        let color;

        switch (index) {
            case 1:
                color = this.customCharacter.BeardColor;
                break;

            case 2:
                color = this.customCharacter.EyebrowColor;
                break;

            case 5:
                color = this.customCharacter.BlushColor;
                break;

            case 8:
                color = this.customCharacter.LipstickColor;
                break;

            case 10:
                color = this.customCharacter.ChestHairColor;
                break;

            default:
                color = 0;
        }

        return color;
    };

    player.defaultCharacter = function() {
        this.customCharacter = {
            Gender: 0,

            Parents: {
                Father: 0,
                Mother: 0,
                Similarity: 1.0,
                SkinSimilarity: 1.0
            },

            Features: [],
            Appearance: [],

            Hair: {
                Hair: 0,
                Color: 0,
                HighlightColor: 0
            },

            EyebrowColor: 0,
            BeardColor: 0,
            EyeColor: 0,
            BlushColor: 0,
            LipstickColor: 0,
            ChestHairColor: 0
        };

        for (let i = 0; i < 20; i++) this.customCharacter.Features.push(0.0);
        for (let i = 0; i < 10; i++) this.customCharacter.Appearance.push({Value: 255, Opacity: 1.0});
        player.applyCharacter();
    };

    player.applyCharacter = function() {
        this.setCustomization(
            this.customCharacter.Gender == 0,

            this.customCharacter.Parents.Mother,
            this.customCharacter.Parents.Father,
            0,

            this.customCharacter.Parents.Mother,
            this.customCharacter.Parents.Father,
            0,

            this.customCharacter.Parents.Similarity,
            this.customCharacter.Parents.SkinSimilarity,
            0.0,

            this.customCharacter.EyeColor,
            this.customCharacter.Hair.Color,
            this.customCharacter.Hair.HighlightColor,

            this.customCharacter.Features
        );

        this.setClothes(2, this.customCharacter.Hair.Hair, 0, 2);
        for (let i = 0; i < 10; i++) this.setHeadOverlay(i, [this.customCharacter.Appearance[i].Value, this.customCharacter.Appearance[i].Opacity, this.colorForOverlayIdx(i), 0]);
    };

    player.loadCharacter = async function() {
        await pool.query('SELECT `clothing` FROM `gp_users` WHERE `userName` = ?', [this.name]).then(([rows]:any) => {
            this.customCharacter = rows[0]["clothing"];
            this.applyCharacter();
        }).catch((err: any) => {
            console.log(err);
            this.defaultCharacter();
        })
    };

    player.saveCharacter = async function() {
        await pool.query('UPDATE `gp_users` SET `clothing` = ? WHERE `userName` = ?', [JSON.stringify(this.customCharacter), player.name]).then(() => {
            console.log(`${player.name}'s clothing has been updated`);
        }).catch((err: any) => console.log(err));
    };

    player.sendToCreator = function() {
        player.position = creatorPlayerPos;
        player.heading = creatorPlayerHeading;
        player.dimension = creatorDimension;
        player.usingCreator = true;
        player.changedGender = false;
        player.call("toggleCreator", [true, JSON.stringify(player.customCharacter)]);

        creatorDimension++;
    };

    player.sendToWorld = function() {
        player.usingCreator = false;
        player.changedGender = false;
        player.call("toggleCreator", [false]);
        player.call('toggleUI', [true]);
        player.spawn();
        //server.auth.spawnPlayer(player);
    };
});

mp.events.add("creator_GenderChange", (player, gender) => {
    player.model = freemodeCharacters[gender];
    player.position = creatorPlayerPos;
    player.heading = creatorPlayerHeading;
    player.changedGender = true;
});

mp.events.add("creator_Save", (player, gender, parentData, featureData, appearanceData, hairAndColorData) => {
    player.customCharacter.Gender = gender;
    player.customCharacter.Parents = JSON.parse(parentData);
    player.customCharacter.Features = JSON.parse(featureData);
    player.customCharacter.Appearance = JSON.parse(appearanceData);

    let hairAndColors = JSON.parse(hairAndColorData);
    //test

    let custom = "test";
    console.log(custom)
    player.customCharacter.Hair = {Hair: hairAndColors[0], Color: hairAndColors[1], HighlightColor: hairAndColors[2]};
    player.customCharacter.EyebrowColor = hairAndColors[3];
    player.customCharacter.BeardColor = hairAndColors[4];
    player.customCharacter.EyeColor = hairAndColors[5];
    player.customCharacter.BlushColor = hairAndColors[6];
    player.customCharacter.LipstickColor = hairAndColors[7];
    player.customCharacter.ChestHairColor = hairAndColors[8];

    player.saveCharacter();
    player.applyCharacter();
    player.sendToWorld();
});

mp.events.add("creator_Leave", (player) => {
    if (player.changedGender) player.loadCharacter(); // revert back to last save if gender is changed
    player.applyCharacter();
    player.sendToWorld();
});