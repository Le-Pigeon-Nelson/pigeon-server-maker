// global popup

class PigeonSound {

    constructor(latlng) {
        this.number = PigeonSound.nb + 1;
        this.position = latlng;
        this.circle = new leaflet.circle(latlng, 50, {bubblingMouseEvents: false}).addTo(map);
        // this.circle.on("click", (e)=> {
        //     setBtnsCircle(e.target);
        //     popup.setLatLng(e.latlng).openOn(map);
        // });
        this.marker = new leaflet.marker(latlng, {
            draggable: true,
            icon: leaflet.icon.glyph({
                glyph: this.number,
                className: '' // groups by color
            })
        });
        this.marker.addTo(map);

        // prevent dragging when popup is opened
        // -------------------
        // this.marker.on('mousedown', function(evt){
        //     if (popup.isOpen()) evt.target.dragging.disable();
        // });
        // this.marker.on('mouseup', function(evt){
        //     if (popup.isOpen()) evt.target.dragging.enable();
        // });
        // -------------------
        this.marker.on("dragend", (e)=> {
            let position = e.target.getLatLng();
            let newposition = new leaflet.LatLng(position.lat, position.lng);
            if (pancheck.checked) map.panTo(newposition);
            this.circle.setLatLng(newposition);
        });
        this.marker.on("click", (e)=> {
            setBtnsCircle(this.circle);
            popup.setLatLng(e.latlng).openOn(map);
        });
        map.fitBounds(this.circle.getBounds());

        this.sounds = [];

        this.params = {
            "readOnce":true
        };

        this.group = PigeonSound.groups[0];

        PigeonSound.all.push(this);
        PigeonSound.nb += 1;
        
    }
    changeGroup() {
        // this.group
        this.marker.options.icon.changeColor();
        this.circle.setStyle({"color":"green"});
        this.marker.getIcon().div.style.filter="hue-rotate(130deg)";
        // this.marker._icon.classList.add("r50")
    }

    addSoundMp3() {
        this.sounds.push('');
    }
    addSoundText(text, lang) {
        this.sounds.push({"text":text, "lang":lang});
    }
    
    setReqAzimut(ref,comp,val){
        updateTableInfo(pSet);
    }
    setReadOnce(val){
        updateTableInfo(pSet);
    }
    setReqPeriod(val){
        updateTableInfo(pSet);
    }
    setForgetPosition(pos,comp,val){
        updateTableInfo(pSet);
    }
    setForgetTime(val){
        updateTableInfo(pSet);
    }

    getReqPosition(){
        return this.marker.getLatLng() + " < " + this.circle.getRadius();
    }
    getReqAzimut(){}
    getReadOnce(){return this.params.readOnce}
    getReqPeriod(){}
    getForgetPosition(){}
    getForgetTime(){}

    remove(){
        map.removeLayer(this.marker);
        map.removeLayer(this.circle);
        let i = PigeonSound.all.indexOf(this);
        PigeonSound.all.splice(i, 1);
        updateTableInfo(PigeonSound.all);
    }
    
    static all = [];
    static nb = 0;
    static groups = [{"name": "default"}];
}