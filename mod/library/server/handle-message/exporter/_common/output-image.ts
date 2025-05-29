/* eslint-disable max-statements */
import { ImageData } from "love.image";
import output_root from "~/library/server/handle-message/_common/output_root.ts";

const imagesFolderPath = `${output_root}images/`;

type ParameterType = typeof BlindType |
	typeof CardType |
	typeof CardType.config.center |
	typeof SMODS.Seal |
	typeof SMODS.Suit |
	typeof TagType |
	{
		atlas: string,
		key: string,
		pos: {
			x?: number,
			y: number
		},
		set?: string,
		soul_pos?: {
			extra?: {
				x: number,
				y: number
			},
			x: number,
			y: number
		}
	};

const outputImages = true;

const COLOR_WHITE = 255;

/**
 * Creates animation frames from a single row in the atlas.
 *
 * @param card - The card with only pos.y defined.
 * @param atlasData - The full sprite-sheet ImageData.
 * @param regionW - Width of one frame in pixels.
 * @param regionH - Height of one frame in pixels.
 * @returns Array of ImageData frames.
 * @noSelf
 */
const createAnimationFrames = (
	card: ParameterType,
	atlasData: ImageData,
	regionW: number,
	regionH: number
): ImageData[] => {
	// y-offset for this row of sprites:
	const rowY = Math.round(card.pos.y * regionH);

	// How many frames fit in the sheet’s width?
	const sheetW = atlasData.getWidth();
	const frameCount = Math.floor(sheetW / regionW);

	const frames: ImageData[] = [];

	for (let index = 0; index < frameCount; index++) {
		// New blank ImageData for one frame  [oai_citation:0‡Love2D](https://love2d.org/wiki/love.image.newImageData?utm_source=chatgpt.com)
		const frame = love.image.newImageData(regionW, regionH);

		// Copy the sub-rectangle from the sheet - paste(source, dx, dy, sx, sy, sw, sh)  [oai_citation:1‡Love2D](https://love2d.org/wiki/ImageData%3Apaste?utm_source=chatgpt.com)
		frame.paste(atlasData, 0, 0, index * regionW, rowY, regionW, regionH);
		frames.push(frame);
	}

	return frames;
};

/**
 * =========================
 * Utility Functions Section
 * =========================
 */

/**
 * Assigns the atlas property to the card if it is missing and set is defined.
 *
 * @param card - The card object to assign the atlas to.
 * @noSelf
 */
const assignAtlasIfNeeded = (card: ParameterType) => {
	if (!card.atlas && card.set !== undefined) {
		card.atlas = card.set;
	}
};

/**
 * Ensures that the atlas image data is loaded for the given card.
 *
 * @param card - The card object to check and load atlas image data for.
 * @param options0 - The root object
 * @param  options0.atlasGroup - The root object
 * @noSelf
 */
const ensureAtlasImageData = (
	card: ParameterType,
	{ atlasGroup }: { atlasGroup: typeof G.ANIMATION_ATLAS | typeof G.ASSET_ATLAS }
) => {
	if (
		outputImages &&
		card.atlas &&
		atlasGroup?.[card.atlas] &&
		atlasGroup[card.atlas].image_data === undefined
	) {
		const atlasItem: any = G.asset_atli.find((item) => (
			item.name === card.set ||
			(item.name === "tags" && card.set === "Tag") ||
			(item.name === "centers" && card.set === "Enhanced") ||
			(item.name === "centers" && card.set === "Back") ||
			(item.name === "blind_chips" && card.set === "Blind") ||
			(item.name === "chips" && card.set === "Stake") ||
			(item.name === "Tarot" && card.set === "Spectral") ||
			(item.name === "Tarot" && card.set === "Planet") ||
			(item.name === "cards_1" && card.atlas === "cards_1")
		)) ??
		G.animation_atli.find((item) => (
			item.name === card.set ||
			(item.name === "tags" && card.set === "Tag") ||
			(item.name === "centers" && card.set === "Enhanced") ||
			(item.name === "centers" && card.set === "Back") ||
			(item.name === "blind_chips" && card.set === "Blind") ||
			(item.name === "chips" && card.set === "Stake") ||
			(item.name === "Tarot" && card.set === "Spectral") ||
			(item.name === "Tarot" && card.set === "Planet") ||
			(item.name === "cards_1" && card.atlas === "cards_1")
		));

		if (atlasItem === undefined) {
			print(`Atlas item not found for card: ${card.key}`);
			print(`Looking for atlas with name: ${card.set} or ${card.atlas}`);
			print("Available asset_atli names:");
			for (const item of G.asset_atli) {
				print(`  - ${item.name}`);
			}
			print("Available animation_atli names:");
			for (const item of G.animation_atli) {
				print(`  - ${item.name}`);
			}
			print(tprint(card));

			return;
		}

		atlasGroup[card.atlas].image_data = love.image.newImageData(atlasItem.path);
	}
};

/**
 * Retrieves the atlas image data for the given card, ensuring it is loaded.
 *
 * @param card - The card object for which to retrieve the atlas image data.
 * @param options0 - The root object
 * @param options0.atlasGroup - The root object
 * @noSelf
 */
const getAtlasData = (
	card: ParameterType,
	{ atlasGroup }: { atlasGroup: typeof G.ANIMATION_ATLAS | typeof G.ASSET_ATLAS }
) => {
	ensureAtlasImageData(card, { atlasGroup });

	return card.atlas ? atlasGroup?.[card.atlas]?.image_data : undefined;
};

/**
 * Calculates the logical and region dimensions for the given card.
 *
 * @param card - The card object for which to calculate dimensions.
 * @param options0 - The root object
 * @param options0.atlasGroup - The root object
 * @throws Error when card.atlas is undefined
 * @noSelf
 */
const getLogicalAndRegion = (
	card: ParameterType,
	{ atlasGroup }: { atlasGroup: typeof G.ANIMATION_ATLAS | typeof G.ASSET_ATLAS }
) => {
	if (!card.atlas) {
		throw new Error(`Card atlas is undefined for card: ${card.key}`);
	}

	const atlasScale = G.SETTINGS.GRAPHICS.texture_scaling;
	const logicalW = atlasGroup[card.atlas].px;
	const logicalH = atlasGroup[card.atlas].py;
	const regionW = Math.round(logicalW * atlasScale);
	const regionH = Math.round(logicalH * atlasScale);

	return {
		logicalH,
		logicalW,
		regionH,
		regionW
	};
};

/**
 * Saves the provided image data as a PNG file at the specified file path.
 *
 * @param imageData - The image data to save as a PNG.
 * @param filePath - The file path where the PNG should be saved.
 * @noSelf
 */
const saveImageData = (imageData: ImageData, filePath: string) => {
	if (love.filesystem.getInfo(filePath)) {
		love.filesystem.remove(filePath);
	}
	imageData.encode("png", filePath);
};

/**
 * Creates image data for a card from the atlas.
 *
 * @param card - The card object containing position metadata.
 * @param atlasData - The source atlas image data.
 * @param regionW - The width of the region to extract.
 * @param regionH - The height of the region to extract.
 * @noSelf
 */
const createImageData = (
	card: ParameterType,
	atlasData: ImageData,
	regionW: number,
	regionH: number
) => {
	const sourceX = Math.round((card.pos.x ?? 0) * regionW);
	const sourceY = Math.round((card.pos.y ?? 0) * regionH);

	const imageData = love.image.newImageData(regionW, regionH);

	imageData.paste(atlasData, 0, 0, sourceX, sourceY, regionW, regionH);

	return imageData;
};

/**
 * Creates extra image data for a card if soul_pos.extra is present.
 *
 * @param card - The card object containing soul_pos.extra metadata.
 * @param atlasData - The source atlas image data.
 * @param regionW - The width of the region to extract.
 * @param regionH - The height of the region to extract.
 * @noSelf
 */
const createExtraData = (
	card: ParameterType,
	atlasData: ImageData,
	regionW: number,
	regionH: number
) => {
	if (card.soul_pos?.extra) {
		const extraImageData = love.image.newImageData(regionW, regionH);

		extraImageData.paste(
			atlasData,
			0,
			0,
			Math.round(card.soul_pos.extra.x * regionW),
			Math.round(card.soul_pos.extra.y * regionH),
			regionW,
			regionH
		);

		return extraImageData;
	}
};

/**
 * Creates soul image data for a card if soul_pos is present.
 *
 * @param card - The card object containing soul_pos metadata.
 * @param atlasData - The source atlas image data.
 * @param regionW - The width of the region to extract.
 * @param regionH - The height of the region to extract.
 * @noSelf
 */
const createSoulData = (
	card: ParameterType,
	atlasData: ImageData,
	regionW: number,
	regionH: number
) => {
	if (card.soul_pos) {
		const soulImageData = love.image.newImageData(regionW, regionH);

		soulImageData.paste(
			atlasData,
			0,
			0,
			Math.round(card.soul_pos.x * regionW),
			Math.round(card.soul_pos.y * regionH),
			regionW,
			regionH
		);

		return soulImageData;
	}
};

/**
 * =========================
 * Canvas & Resize Section
 * =========================
 */

/**
 * Draws the main, extra, and soul image data to a canvas and returns the result.
 *
 * @param options - The options for drawing to the canvas.
 * @param options.imageData - The main image data to draw.
 * @param options.extraData - The extra image data to overlay.
 * @param options.soulData - The soul image data to overlay.
 * @param options.regionW - The width of the canvas.
 * @param options.regionH - The height of the canvas.
 * @noSelf
 */
const drawToCanvas = ({
	extraData,
	imageData,
	regionH,
	regionW,
	soulData
}: {
	extraData?: ImageData | undefined,
	imageData: ImageData,
	regionH: number,
	regionW: number,
	soulData?: ImageData | undefined
}) => {
	love.graphics.push();
	const previousCanvas = love.graphics.getCanvas();
	const canvas = love.graphics.newCanvas(regionW, regionH, {
		dpiscale: 1,
		readable: true,
		type: "2d"
	});

	love.graphics.setCanvas(canvas);
	love.graphics.clear(0, 0, 0, 0);
	love.graphics.setColor(COLOR_WHITE, COLOR_WHITE, COLOR_WHITE, COLOR_WHITE);
	love.graphics.setBlendMode("alpha", "premultiplied");
	love.graphics.draw(love.graphics.newImage(imageData), 0, 0);
	love.graphics.setBlendMode("alpha");
	if (extraData) {
		love.graphics.setBlendMode("alpha", "premultiplied");
		love.graphics.draw(love.graphics.newImage(extraData), 0, 0);
		love.graphics.setBlendMode("alpha");
	}
	if (soulData) {
		love.graphics.setBlendMode("alpha", "premultiplied");
		love.graphics.draw(love.graphics.newImage(soulData), 0, 0);
		love.graphics.setBlendMode("alpha");
	}
	love.graphics.setCanvas(previousCanvas);
	love.graphics.pop();

	return canvas.newImageData();
};

/**
 * Resizes the given image data to the logical width and height.
 *
 * @param imageData - The image data to resize.
 * @param logicalW - The target logical width.
 * @param logicalH - The target logical height.
 * @noSelf
 */
const resizeImageData = (imageData: ImageData, logicalW: number, logicalH: number) => {
	const outCanvas = love.graphics.newCanvas(logicalW, logicalH, {
		dpiscale: 1,
		readable: true,
		type: "2d"
	});

	love.graphics.push();
	const previousCanvas = love.graphics.getCanvas();

	love.graphics.setCanvas(outCanvas);
	love.graphics.clear(0, 0, 0, 0);
	love.graphics.setColor(COLOR_WHITE, COLOR_WHITE, COLOR_WHITE, COLOR_WHITE);

	const img = love.graphics.newImage(imageData);

	img.setFilter("nearest", "nearest");
	love.graphics.setBlendMode("alpha", "premultiplied");
	love.graphics.draw(
		img,
		0,
		0,
		0,
		logicalW / img.getWidth(),
		logicalH / img.getHeight()
	);
	love.graphics.setBlendMode("alpha");

	love.graphics.setCanvas(previousCanvas);
	love.graphics.pop();

	return (outCanvas as any).newImageData();
};

/**
 *
 * @param options0 - The root object
 * @param options0.filePath - The root object
 * @param options0.frameData - The root object
 * @param options0.logicalH - The root object
 * @param options0.logicalW - The root object
 * @param options0.regionH - The root object
 * @param options0.regionW - The root object
 * @noSelf
 */
const outputFrame = (
	{
		filePath,
		frameData,
		logicalH,
		logicalW,
		regionH,
		regionW
	}: {
		filePath: string,
		frameData: ImageData,
		logicalH: number,
		logicalW: number,
		regionH: number,
		regionW: number
	}
) => {
	let finalData = drawToCanvas({
		extraData: undefined,
		imageData: frameData,
		regionH,
		regionW,
		soulData: undefined
	});

	if (finalData.getWidth() !== logicalW || finalData.getHeight() !== logicalH) {
		finalData = resizeImageData(finalData, logicalW, logicalH);
	}
	const framePath = filePath;

	saveImageData(finalData, framePath);
};

/**
 *
 * @param options0 - The root object
 * @param options0.atlasData - The root object
 * @param options0.card - The root object
 * @param options0.fileNamePrefix - The root object
 * @param options0.filePath - The root object
 * @param options0.logicalH - The root object
 * @param options0.logicalW - The root object
 * @param options0.regionH - The root object
 * @param options0.regionW - The root object
 * @noSelf
 */
const outputAnimation = ({
	atlasData,
	card,
	fileNamePrefix,
	filePath,
	logicalH,
	logicalW,
	regionH,
	regionW
}: {
	atlasData: ImageData,
	card: ParameterType,
	fileNamePrefix: string,
	filePath: string,
	logicalH: number,
	logicalW: number,
	regionH: number,
	regionW: number
}) => {
	const folderPath = `${imagesFolderPath}${fileNamePrefix}/`;

	love.filesystem.createDirectory(folderPath);
	const frames = createAnimationFrames(card, atlasData, regionW, regionH);

	outputFrame({
		filePath,
		frameData: frames[0],
		logicalH,
		logicalW,
		regionH,
		regionW
	});

	for (const [index, frameData] of frames.entries()) {
		outputFrame({
			filePath: `${folderPath}${fileNamePrefix}_${index}.png`,
			frameData,
			logicalH,
			logicalW,
			regionH,
			regionW
		});
	}
	const IS_WINDOWS = love.system.getOS() === "Windows";
	const SH_PREFIX = IS_WINDOWS ? "powershell.exe -command " : "";
	const common = "-threads 0 -thread_type slice -vsync 0";
	const EXPORT_FPS = 10;
	const FPS_FLAG = String(EXPORT_FPS);
	const QUOTE = IS_WINDOWS ? "\"" : "'";
	const INPUT_PATTERN = `${QUOTE}${folderPath}${fileNamePrefix}_%d.png${QUOTE}`;
	const GIF_FPSFLAG = String((100 / 3) * (EXPORT_FPS / 30));
	const filt_gif = `${QUOTE}format=rgba,fps=${GIF_FPSFLAG},split[a][b];[a]palettegen=reserve_transparent=1:stats_mode=single[p];[b][p]paletteuse=dither=bayer:bayer_scale=5:new=1${QUOTE}`;
	const gif_path = `${imagesFolderPath}${fileNamePrefix}.gif`;
	const filt_apng = `${QUOTE}format=rgba,fps=${FPS_FLAG}${QUOTE}`;
	const apng_path = `${imagesFolderPath}${fileNamePrefix}.apng`;
	const NULL_REDIRECT = IS_WINDOWS ? "> $null 2>&1" : "> /dev/null 2>&1";
	const ffmpegGifCommand = `${SH_PREFIX}ffmpeg -y ${common} -f image2 -framerate ${FPS_FLAG} -start_number 0 -i ${INPUT_PATTERN} -filter_complex ${filt_gif} -gifflags +transdiff -color_primaries bt709 -colorspace bt709 -color_trc bt709 -loop 0 ${gif_path} ${NULL_REDIRECT}`;
	const ffmpegApngCommand = `${SH_PREFIX}ffmpeg -y ${common} -f image2 -framerate ${FPS_FLAG} -start_number 0 -i ${INPUT_PATTERN} -filter_complex ${filt_apng} -plays 0 -pix_fmt rgba -compression_level 3 ${apng_path} ${NULL_REDIRECT}`;

	os.execute(ffmpegApngCommand);
	os.execute(ffmpegGifCommand);
};

/**
 *
 * @param card
 * @param prefix
 * @noSelf
 */
const outputImage = (card: ParameterType, prefix = "") => {
	let atlasGroup = G.ASSET_ATLAS;

	if (card.set === "Blind") {
		atlasGroup = G.ANIMATION_ATLAS;
	}

	assignAtlasIfNeeded(card);

	const atlasData = getAtlasData(card, { atlasGroup });

	if (!outputImages || !atlasData) {
		return;
	}

	const fileNamePrefix = `${prefix}${card.key.replaceAll("?", "_")}`;

	const filePath = `${imagesFolderPath}${fileNamePrefix}.png`;

	const {
		logicalH, logicalW, regionH, regionW
	} = getLogicalAndRegion(card, { atlasGroup });

	if (atlasGroup === G.ANIMATION_ATLAS) {
		outputAnimation({
			atlasData,
			card,
			fileNamePrefix,
			filePath,
			logicalH,
			logicalW,
			regionH,
			regionW
		});

		return;
	}

	let imageData = createImageData(card, atlasData, regionW, regionH);
	const extraData = createExtraData(card, atlasData, regionW, regionH);
	const soulData = createSoulData(card, atlasData, regionW, regionH);

	imageData = drawToCanvas({
		extraData,
		imageData,
		regionH,
		regionW,
		soulData
	});
	if (imageData.getWidth() !== logicalW || imageData.getHeight() !== logicalH) {
		imageData = resizeImageData(imageData, logicalW, logicalH);
	}
	saveImageData(imageData, filePath);
};

export default outputImage;
