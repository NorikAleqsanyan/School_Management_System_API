module.exports = class UserDto{
    id;
    name;
    surname;
    email;
    type;
    constructor(model){
        this.id = model.id;
        this.name = model.name;
        this.surname = model.surname;
        this.email = model.email;
        this.type = model.type;
    } 
}