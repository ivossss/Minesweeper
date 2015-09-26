function createGameDifficulty(verticalTiles, horizontalTiles, numberOfMines) {
    return {
        verticalTiles: verticalTiles,
        horizontalTiles: horizontalTiles,
        numberOfMines: numberOfMines
    }
}

function getGameDifficulty(level) {
    switch (level) {
        case 'easy':
            return createGameDifficulty(9, 9, 10);
        case 'intermediate':
            return createGameDifficulty(16, 16, 40);
        case 'hard':
            return createGameDifficulty(16, 30, 90);
        default :
            console.log('Not implemented game difficulty.');
            break;
    }
}

function getDefaultTileProperties() {
    return {
        tileSizeInPx: 40,
        tilesOffsetFromCanvasInPx: 5,
        gapBetweenTilesInPx: 3
    }
}

function calculateCanvasSize(difficulty, tileProperties) {
    var canvasWidthInPx,
        canvasHeightInPx;

    canvasWidthInPx = (2 * tileProperties.tilesOffsetFromCanvasInPx) +
        (tileProperties.tileSizeInPx * difficulty.horizontalTiles) +
        (tileProperties.gapBetweenTilesInPx * (difficulty.horizontalTiles - 1));

    canvasHeightInPx = (2 * tileProperties.tilesOffsetFromCanvasInPx) +
        (tileProperties.tileSizeInPx * difficulty.verticalTiles) +
        (tileProperties.gapBetweenTilesInPx * (difficulty.verticalTiles - 1));

    return {
        canvasWidthInPx: canvasWidthInPx,
        canvasHeightInPx: canvasHeightInPx
    }
}

function calculateTileSize(difficulty, tileProperties, dimension, isWidth) {
    var tileSizeInPx,
        tileSizeAsIntegerInPx;

    if (isWidth) {
        tileSizeInPx = (dimension - (2 * tileProperties.tilesOffsetFromCanvasInPx) -
            (tileProperties.gapBetweenTilesInPx * (difficulty.horizontalTiles - 1)))
            / difficulty.horizontalTiles;
    }
    else {
        tileSizeInPx = (dimension - (2 * tileProperties.tilesOffsetFromCanvasInPx) -
            (tileProperties.gapBetweenTilesInPx * (difficulty.verticalTiles - 1)))
            / difficulty.verticalTiles;
    }

    // If it is not an integer the tiles become blurry.
    tileSizeAsIntegerInPx = Math.floor(tileSizeInPx);
    return tileSizeAsIntegerInPx;
}

//function calculateTileSizeByHeight(difficulty, tileProperties, hight) {
//    var tileSizeInPx,
//        tileSizeAsIntegerInPx;
//
//
//
//    tileSizeAsIntegerInPx = Math.floor(tileSizeInPx);
//    return tileSizeAsIntegerInPx;
//}

function prepareGameSettings(level) {
    var MINE_SYMBOL = '*',
        gameDifficulty,
        tileProperties,
        canvasSize,
        containerWidthInPx = $('.container').width(),
        headingButtonsHeightInPx = $('.heading').height() + $('.buttons').height() + 2, // plus 2 pixels to hide the scrollbar
        windowHeightInPx = $(window).height();

    gameDifficulty = getGameDifficulty(level);
    tileProperties = getDefaultTileProperties();
    canvasSize = calculateCanvasSize(gameDifficulty, tileProperties);

    // If the tiles get outside of the width of container, resize them to fit.
    if (canvasSize.canvasWidthInPx > containerWidthInPx) {
        // Recalculate tile size and store it.
        tileProperties.tileSizeInPx = calculateTileSize(gameDifficulty, tileProperties, containerWidthInPx, true);
        // Recalculate the canvas size and store it.
        canvasSize = calculateCanvasSize(gameDifficulty, tileProperties);
    }

    // If the tiles get outside of the height of window, resize them to fit.
    if (canvasSize.canvasHeightInPx + headingButtonsHeightInPx > windowHeightInPx) {
        tileProperties.tileSizeInPx = calculateTileSize(gameDifficulty, tileProperties, windowHeightInPx - headingButtonsHeightInPx, false);
        canvasSize = calculateCanvasSize(gameDifficulty, tileProperties);
    }

    return {
        tileSizeInPx: tileProperties.tileSizeInPx,
        tilesOffsetFromCanvasInPx: tileProperties.tilesOffsetFromCanvasInPx,
        gapBetweenTilesInPx: tileProperties.gapBetweenTilesInPx,
        mineSymbol: MINE_SYMBOL,
        difficulty: gameDifficulty,
        canvasSize: canvasSize
    };

    // change to tileProperties
}