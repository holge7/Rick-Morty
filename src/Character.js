export default class Character{
    constructor(json){
        this.id = json.id;
        this.name = json.name;
        this.status = json.status;
        this.species = json.species;
        this.type = json.type;
        this.gender = json.gender;
        this.origin = json.location.name;
        this.image = json.image;
    }
}