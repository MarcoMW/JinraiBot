const { createCanvas } = require('canvas');

function startGame(gameInfo) {
    //presets
    gameInfo['maxrounds'] = 10;
    gameInfo['boardstates'] = []

    //starting values
    gameInfo['round'] = 1;

    gameInfo = generateBoard(gameInfo);
    gameInfo['solutions'] = gyulhapSolutions(gameInfo['currentboard']);
    gameInfo['commands'] = ['gyul', 'hap', 'board', 'ready'];
}

function generateBoard(gameInfo) {
    if(gameInfo['boardstates'].length > 0 && gameInfo['boardstates'][0].length == 9) {
        gameInfo['currentboard'] = gameInfo['boardstates'].pop();
    } else {
        var elements = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
        var newEntry = [];
        for(let i = 27; i > 18; i--){
            pos = Math.floor(Math.random() * 27);
            newEntry = newEntry.concat(elements.splice(pos, 1));
        }
        gameInfo['currentboard'] = newEntry;
    }
    return gameInfo;
}

function gyulhapSolutions(intlist) {
    returnCandidates = []
    for (let i=0; i < intlist.length-2; i++) {
        for(let j=i+1; j < intlist.length-1; j++) {
            for(let k=j+1; k < intlist.length; k++) {
                var check1 = (intlist[i]+intlist[j]+intlist[k])%3 == 0;
                var check2 = (Math.floor(intlist[i]/3)+Math.floor(intlist[j]/3)+Math.floor(intlist[k]/3))%3 == 0;
                var check3 = (Math.floor(intlist[i]/9)+Math.floor(intlist[j]/9)+Math.floor(intlist[k]/9))%3 == 0;
                if(check1 && check2 && check3) {
                    returnCandidates.push([i+1,j+1,k+1]);
                }
            }
        }
    }
    return returnCandidates;
}

function gyulhap_canvas(structure) {
    const canvas = createCanvas(420, 420);
    const startPoints = [[30,30], [160,30], [290,30], [30,160], [160,160], [290,160], [30,290], [160,290], [290,290]]
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#800000';
    ctx.fillRect(0, 0, 420, 420);
    for(var i=0; i < 9; i++) {
        gyulhap_square(ctx, structure[i], startPoints[i]);
    }
    return canvas.toBuffer();
}

function gyulhap_square(ctx, number, edgepoints) {
    fillStyles = ['black', 'gray', 'white'];
    ctx.fillStyle = fillStyles[Math.floor(number/9)%3];
    ctx.fillRect(edgepoints[0], edgepoints[1], 100, 100);
    colors = ['#800000', '#4169E1', '#FFD700']
    ctx.fillStyle = colors[number%3];
    switch(Math.floor(number/3)%3) {
        case 0: //square
            ctx.fillRect(edgepoints[0]+20, edgepoints[1]+20, 60, 60);
            break;
        case 1: //triangle
            ctx.beginPath();
            ctx.moveTo(edgepoints[0]+50, edgepoints[1]+20);
            ctx.lineTo(edgepoints[0]+80, edgepoints[1]+80);
            ctx.lineTo(edgepoints[0]+20, edgepoints[1]+80);
            ctx.fill();
            break;
        case 2: //circle
            ctx.beginPath();
            ctx.arc(edgepoints[0]+50, edgepoints[1]+50, 30, 0, 2*Math.PI);
            ctx.fill();
            break;
    }
}

module.exports = {
    startGame: function(gameInfo) {
        return startGame(gameInfo);
    },
    update: function(gameInfo, action, args){
        return gameInfo;
    },
    canvas: function(structure) {
        return gyulhap_canvas(structure);
    }
}