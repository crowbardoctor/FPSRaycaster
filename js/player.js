function Player(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.paces = 0;

    this.weapons = [
        new Weapon('Knife', 1, new Bitmap('assets/knife_hand.png', 319, 320)), 
        new Weapon('Gun', 2, new Bitmap('assets/knife_hand2.png', 319, 320)),
        new Weapon('SMG', 3, new Bitmap('assets/knife_hand2.png', 319, 320))
    ];

    this.actualWeapon = this.weapons[0];
    this.actualWeapon.displayInfo();
}

Player.prototype.rotate = function(angle) {
    this.direction = (this.direction + angle + CIRCLE) % (CIRCLE);
};

Player.prototype.walk = function(distance, map) {
    var dx = Math.cos(this.direction) * distance;
    var dy = Math.sin(this.direction) * distance;
    if (map.get(this.x + dx, this.y) <= 0) this.x += dx;
    if (map.get(this.x, this.y + dy) <= 0) this.y += dy;
    this.paces += distance;
};

Player.prototype.strafe = function(distance, map) {
    var dx = Math.cos(this.direction + 90) * distance;
    var dy = Math.sin(this.direction + 90) * distance;
    if (map.get(this.x + dx, this.y) <= 0) this.x += dx;
    if (map.get(this.x, this.y + dy) <= 0) this.y += dy;
}

Player.prototype.update = function(controls, map, seconds) {
    if (controls.left) this.rotate(-Math.PI * seconds);
    if (controls.right) this.rotate(Math.PI * seconds);
    if (controls.forward) this.walk(3 * seconds, map);
    if (controls.backward) this.walk(-3 * seconds, map);
    if (controls.strafe_left) this.strafe(-3 * seconds, map);
    if (controls.strafe_right) this.strafe(3 * seconds, map);
    if (controls.select_knife){
        this.actualWeapon = this.weapons[0];
        this.actualWeapon.displayInfo();
    }
    if (controls.select_gun){
        this.actualWeapon = this.weapons[1];
        this.actualWeapon.displayInfo();
    }
};
