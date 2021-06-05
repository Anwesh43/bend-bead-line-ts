const w : number = window.innerWidth 
const h : number = window.innerHeight 
const parts : number = 4 
const scGap : number = 0.02 / parts 
const strokeFactor : number = 90 
const sizeFactor : number = 2.9 
const backColor : string = "#bdbdbd"
const delay : number = 20 
const deg : number = Math.PI / 2 
const colors : Array<string> = [
    "#f44336",
    "#673AB7",
    "#00C853",
    "#304FFE",
    "#BF360C"
] 

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }
    static divideScale(scale : number, i : number,  n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }
    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawCircle(context : CanvasRenderingContext2D, x : number, y : number, r : number) {
        context.beginPath()
        context.arc(x, y, r, 0, 2 * Math.PI)
        context.fill()
    }

    static drawBendBeadLine(context : CanvasRenderingContext2D, scale : number) {
        const sf : number = ScaleUtil.sinify(scale)
        const sf1 : number = ScaleUtil.divideScale(sf, 0, parts)
        const sf2 : number = ScaleUtil.divideScale(sf, 1, parts)
        const sf3 : number = ScaleUtil.divideScale(sf, 2, parts)
        const sf4 : number = ScaleUtil.divideScale(sf, 3, parts)
        const size : number = Math.min(w, h) / sizeFactor 
        context.save()
        context.translate(w / 2, h / 2)
        for (var j = 0; j < 2; j++) {
            context.save()
            context.scale(1, 1 - 2 * j)
            if (sf1 > 0) {
                DrawingUtil.drawLine(context, 0, 0, 0, -size * 0.5 * sf1)
            }
            context.save()
            context.translate(0, -size)
            context.rotate(deg * sf4)
            if (sf2 > 0) {
                DrawingUtil.drawLine(context, 0, 0, 0, -size * 0.5 * sf2)
            }
            if (sf3 > 0) {
                DrawingUtil.drawCircle(context, 0, -size, (size / 10) * sf3)
            }
            context.restore()
            context.restore()
        }
        context.restore()
    }

    static drawBBLNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.strokeStyle = colors[i]
        context.lineWidth = Math.min(w, h) / strokeFactor 
        DrawingUtil.drawBendBeadLine(context, scale)
    }
}