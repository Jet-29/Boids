class Boid {
    constructor(posX, posY, deltaX, deltaY, scale, colour, shape) {
        this.posX = posX;
        this.posY = posY;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
        this.scale = scale;
        this.colour = colour;
        this.shape = shape;
        this.lineLength = 3;
    }

    render() {
        if (this.shape === "ellipse")
        {
            fill(this.colour)
            noStroke()
            ellipse(this.posX, this.posY, 2 * this.scale, 2 * this.scale)
        }

        stroke(0);
        line(this.posX, this.posY, this.posX + this.deltaX * this.lineLength, this.posY + this.deltaY * this.lineLength);
    }
}