export class Render {
    protected name: String;
    protected shortRange: Boolean;
    protected vector: Vector3Mp;
    protected blipID: number;
    protected width: number;
    protected height: number;
    protected dimension: number;
    protected markerID: number;

    protected colShape: ColshapeMp;
    protected blip: BlipMp;
    protected marker: MarkerMp;

    protected blipDDistance: number;

    protected markerColor: number[];
    protected blipColor: number;

    constructor(name: String, shortRange: Boolean, vector: Vector3Mp, blipID: number, width: number, height: number, markerID: number, dimension: number, markerColor: number[] = [255,0,0,255], blipColor = 4, blipDDistance = 100){
        this.name = name;
        this.shortRange = shortRange;
        this.vector = vector;
        this.blipID = blipID;
        this.width = width;
        this.height = height;
        this.markerID = markerID;
        this.dimension = dimension;

        this.blipDDistance = blipDDistance;

        this.markerColor = markerColor;
        this.blipColor = blipColor;

        this.colShape = this.renderColShape();
        this.blip = this.renderBlip();
        this.marker = this.renderMarker();
    };

    private renderMarker(){
        return mp.markers.new(this.markerID, this.vector, this.width,{
            direction: this.vector,
            rotation: new mp.Vector3(0, 0, 0),
            color: [this.markerColor[0], this.markerColor[1], this.markerColor[2], this.markerColor[3]],
            visible: true,
            dimension: this.dimension
        });

    }
    private renderBlip(){
        return mp.blips.new(this.blipID, this.vector,
            {
                name: String(this.name),
                color: this.blipColor,
                drawDistance: this.blipDDistance,
                shortRange: Boolean(this.shortRange),
            });
    }

    private renderColShape(){
        return mp.colshapes.newRectangle(this.vector.x, this.vector.y, this.width, this.height);
    }

    public get getColShape() : ColshapeMp {
        return this.colShape;
    }

    public get getMarker() : MarkerMp {
        return this.marker;
    }

    public get getBlip() : BlipMp {
        return this.blip;
    }


}