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
        tilesOffsetFromCanvasInPx: 0,
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
        tileSizeAsIntegerInPx,
        additionalHeightInPx = 15; // to hide scrollbar

    if (isWidth) {
        tileSizeInPx = (dimension - (2 * tileProperties.tilesOffsetFromCanvasInPx) -
            (tileProperties.gapBetweenTilesInPx * (difficulty.horizontalTiles - 1)))
            / difficulty.horizontalTiles;
    }
    else {
        tileSizeInPx = (dimension - (2 * tileProperties.tilesOffsetFromCanvasInPx) -
            (tileProperties.gapBetweenTilesInPx * (difficulty.verticalTiles - 1)) - additionalHeightInPx)
            / difficulty.verticalTiles;
    }

    // If it is not an integer the tiles become blurry.
    tileSizeAsIntegerInPx = Math.floor(tileSizeInPx);
    return tileSizeAsIntegerInPx;
}

function getDefaultTileValueProperties() {
    return {
        valueXOffset: 13,
        valueYOffset: 30,
        fontStyle: 'bold 28px Consolas'
    }
}

function calculateValueProperties(tileSizeInPx) {
    var FONT_SIZE_FACTOR = 1.4,
        X_OFFSET_FACTOR = 3.3,
        Y_OFFSET_FACTOR = 1.4,
        fontSize;

    fontSize = tileSizeInPx / FONT_SIZE_FACTOR;

    return {
        valueXOffset: tileSizeInPx / X_OFFSET_FACTOR,
        valueYOffset: tileSizeInPx / Y_OFFSET_FACTOR,
        fontStyle: 'bold ' + fontSize + 'px Consolas'
    }
}

function prepareGameSettings(level) {
    var MINE_SYMBOL = '*',
        gameDifficulty,
        tileProperties,
        canvasSize,
        tileValueProperties,
        containerWidthInPx = $('.container').width(),
        headingButtonsHeightInPx = $('.heading').height() + $('.buttons').height(),
        windowHeightInPx = $(window).height();

    gameDifficulty = getGameDifficulty(level);
    tileProperties = getDefaultTileProperties();
    canvasSize = calculateCanvasSize(gameDifficulty, tileProperties);
    tileValueProperties = getDefaultTileValueProperties();

    // If the tiles get outside of the width of container, resize them to fit.
    if (canvasSize.canvasWidthInPx > containerWidthInPx) {
        // Recalculate tile size and store it.
        tileProperties.tileSizeInPx = calculateTileSize(gameDifficulty, tileProperties, containerWidthInPx, true);
        // Recalculate the canvas size and store it.
        canvasSize = calculateCanvasSize(gameDifficulty, tileProperties);
        tileValueProperties = calculateValueProperties(tileProperties.tileSizeInPx);
    }

    // If the tiles get outside of the height of window, resize them to fit.
    if (canvasSize.canvasHeightInPx + headingButtonsHeightInPx > windowHeightInPx) {
        tileProperties.tileSizeInPx = calculateTileSize(gameDifficulty, tileProperties, windowHeightInPx - headingButtonsHeightInPx, false);
        canvasSize = calculateCanvasSize(gameDifficulty, tileProperties);
        tileValueProperties = calculateValueProperties(tileProperties.tileSizeInPx);
    }

    return {
        tileSizeInPx: tileProperties.tileSizeInPx,
        tilesOffsetFromCanvasInPx: tileProperties.tilesOffsetFromCanvasInPx,
        gapBetweenTilesInPx: tileProperties.gapBetweenTilesInPx,
        tileValueProperties : tileValueProperties,
        mineSymbol: MINE_SYMBOL,
        difficulty: gameDifficulty,
        canvasSize: canvasSize
    };

    // change to tileProperties
}