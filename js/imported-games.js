(function () {
    var games = [
        { folder: 'soccer-skills', image: 'soccer-skills.png' },
        { folder: 'deepest-sword', image: 'deepest-sword.jpg' },
        { folder: 'just-fall', image: 'just-fall.jpg' },
        { folder: 'roblox', image: 'roblox.png' },
        { folder: 'HexGL', image: 'hexgl.png' },
        { folder: 'vex6', image: 'vex6.png' },
        { folder: 'fake-virus', image: 'fake-virus.png' },
        { folder: 'dragon-vs-bricks', image: 'dragon-vs-bricks.jpg' },
        { folder: 'sky-car-stunt', image: 'sky-car-stunt.png' },
        { folder: 'champion-island', image: 'champion-island.png' },
        { folder: 'dante', image: 'dante.png' },
        { folder: 'snowrider3d', image: 'snowrider3d.png' },
        { folder: 'adventure-drivers', image: 'adventure-drivers.png' },
        { folder: 'astray', image: 'astray.png' },
        { folder: 'kitchen-gun-game', image: 'kitchen-gun-game.png' },
        { folder: 'slime-rush-td', image: 'slime-rush-td.png' },
        { folder: 'twitch-tetris', image: 'twitch-tetris.png' },
        { folder: 'angry-sharks', image: 'angry-sharks.png' },
        { folder: 'rolling-forests', image: 'rolling-forests.png' },
        { folder: 'cars-simulator', image: 'cars-simulator.png' },
        { folder: 'motox3m-pool', image: 'motox3m-pool.jpg' },
        { folder: 'ns-shaft', image: 'ns-shaft.png' },
        { folder: 'bacon-may-die', image: 'bacon-may-die.png' },
        { folder: 'ctr', image: 'ctr.png' },
        { folder: 'adarkroom', image: 'adarkroom.png' },
        { folder: 'generic-fishing-game', image: 'generic-fishing-game.png' },
        { folder: 'tactical-weapon-pack-2', image: 'tactical-weapon-pack-2.png' },
        { folder: '2048-multitask', image: '2048-multitask.png' },
        { folder: 'duke-nukem-2', image: 'duke-nukem-2.jpg' },
        { folder: 'grindcraft', image: 'grindcraft.png' },
        { folder: 'noob-steve-parkour', image: 'noob-steve-parkour.png' },
        { folder: 'google-feud', image: 'google-feud.png' },
        { folder: 'spelunky', image: 'spelunky.png' },
        { folder: 'sort-the-court', image: 'sort-the-court.png' },
        { folder: 'mindustry', image: 'mindustry.png' },
        { folder: 'volley-random', image: 'volley-random.png' },
        { folder: 'stick-merge', image: 'stick-merge.png' },
        { folder: 'cluster-rush', image: 'cluster-rush.jpg' },
        { folder: '10-minutes-till-dawn', image: '10-minutes-till-dawn.png' },
        { folder: 'webgl-fluid-simulation', image: 'webgl-fluid-simulation.png' },
        { folder: 'DOOMORI', image: 'doomori.png' },
        { folder: 'santy-is-home', image: 'santy-is-home.png' },
        { folder: 'you-are-bezos', image: 'you-are-bezos.png' },
        { folder: 'there-is-no-game', image: 'there-is-no-game.png' },
        { folder: 'rabbit-samurai', image: 'rabbit-samurai.png' },
        { folder: 'gravity-soccer', image: 'gravity-soccer.png' },
        { folder: 'georgeandtheprinter', image: 'georgeandtheprinter.png' },
        { folder: 'mineblocks', image: 'mineblocks.png' },
        { folder: 'gimme-the-airpod', image: 'gimme-the-airpod.png' },
        { folder: 'scratcharia', image: 'scratcharia.png' },
        { folder: 'win-the-whitehouse', image: 'win-the-whitehouse.png' },
        { folder: 'station-141', image: 'station-141.png' },
        { folder: 'merge-round-racers', image: 'merge-round-racers.png' },
        { folder: 'shuttledeck', image: 'shuttledeck.png' },
        { folder: 'hungry-lamu', image: 'hungry-lamu.png' },
        { folder: 'fnaw', image: 'fnaw.png' },
        { folder: 'glass-city', image: 'glass-city.png' },
        { folder: 'froggys-battle', image: 'froggys-battle.png' },
        { folder: 'xx142-b2exe', image: 'xx142-b2exe.png' },
        { folder: 'flappy-bird', image: 'flappy-bird.png' },
        { folder: 'Stickman-Survival', image: 'stickman-survival.png' },
        { folder: 'waterworks', image: 'waterworks.png' },
        { folder: 'roblox copy', image: 'roblox-copy.png' },
        { folder: 'ballistic-chickens', image: 'ballistic-chickens.png' },
        { folder: 'chill-radio', image: 'chill-radio.png' },
        { folder: 'doctor-acorn2', image: 'doctor-acorn2.jpg' },
        { folder: 'snowbattle', image: 'snowbattle.png' },
        { folder: 'sleepingbeauty', image: 'sleepingbeauty.png' },
        { folder: 'slope-ball', image: 'slope-ball.jpg' },
        { folder: 'evolution', image: 'evolution.png' },
        { folder: 'backrooms-2d', image: 'backrooms-2d.png' },
        { folder: 'defend-the-tank', image: 'defend-the-tank.png' },
        { folder: 'protektor', image: 'protektor.jpg' },
        { folder: 'ages-of-conflict', image: 'ages-of-conflict.jpg' },
        { folder: 'ShapeShootout', image: 'shapeshootout.png' },
        { folder: 'precision-client', image: 'precision-client.png' },
        { folder: 'particle-clicker', image: 'particle-clicker.png' },
        { folder: 'factoryballs', image: 'factoryballs.png' },
        { folder: 'om-bounce', image: 'om-bounce.png' },
        { folder: '1v1space', image: '1v1space.png' },
        { folder: 'circlo', image: 'circlo.png' },
        { folder: 'game-inside', image: 'game-inside.png' },
        { folder: 'cubefield', image: 'cubefield.png' },
        { folder: 'ninjavsevilcorp', image: 'ninjavsevilcorp.png' },
        { folder: 'amidst-the-clouds', image: 'amidst-the-clouds.png' },
        { folder: 'the-hotel', image: 'the-hotel.png' },
        { folder: 'tiny-islands', image: 'tiny-islands.png' },
        { folder: 'veloce', image: 'veloce.png' },
        { folder: 'tube-jumpers', image: 'tube-jumpers.jpg' },
        { folder: 'rabbit-samurai2', image: 'rabbit-samurai2.png' },
        { folder: 'jetpack-joyride', image: 'jetpack-joyride.jpg' },
        { folder: 'my-rusty-submarine', image: 'my-rusty-submarine.png' },
        { folder: 'tanuki-sunset', image: 'tanuki-sunset.png' },
        { folder: 'edge-surf', image: 'edge-surf.png' },
        { folder: 'highrisehop', image: 'highrisehop.png' },
        { folder: 'btts', image: 'btts.png' },
        { folder: 'stickman-golf', image: 'stickman-golf.png' },
        { folder: 'aquapark-slides', image: 'aquapark-slides.png' },
        { folder: 'happy-hop', image: 'happy-hop.png' },
        { folder: 'backrooms', image: 'backrooms.png' }
    ];

    function displayName(folder) {
        return folder.replace(/[-_]+/g, ' ').replace(/\b\w/g, function (letter) {
            return letter.toUpperCase();
        });
    }

    var grid = document.getElementById('gameGallery');
    if (!grid) return;

    games.forEach(function (game, index) {
        var card = document.createElement('a');
        card.className = 'gl-card';
        card.href = 'games/' + encodeURIComponent(game.folder) + '/';
        card.style.setProperty('--i', grid.children.length + index);

        var art = document.createElement('span');
        art.className = 'gl-art';

        var image = document.createElement('img');
        image.src = 'images/' + game.image;
        image.alt = '';
        image.loading = 'lazy';
        image.decoding = 'async';

        var play = document.createElement('span');
        play.className = 'gl-play';
        play.textContent = 'Play';

        var title = document.createElement('h3');
        title.textContent = displayName(game.folder);

        art.appendChild(image);
        art.appendChild(play);
        card.appendChild(art);
        card.appendChild(title);
        grid.appendChild(card);
    });
})();
