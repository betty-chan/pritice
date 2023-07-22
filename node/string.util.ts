import { createCanvas } from 'canvas';

export function calculateTextWidth(text, fontSize) {
    const canvas = createCanvas(200, 200);
    const context = canvas.getContext('2d');
    context.font = `${fontSize}px Arial`;
    const metrics = context.measureText(text);
    return metrics.width;
}