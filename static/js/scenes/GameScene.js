export default class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");
        console.log("GameScene.constructor()");

        this.level;
        this.player;
        this.cursor;
        this.timedEvent;
        this.resetFlagEvent;
        this.air_particle;
        this.hitByParticle = false;
    }

    preload() {
        console.log("GameScene.preload()");
    }

    create () {
        console.log("GameScene.create()");
        //342 > 310 > 294
        this.back = this.add.tileSprite(7200/2,600/2,7200,600,'Back');

        level = this.add.image(0, 600, 'Mid').setOrigin(0,1);

        this.matter.world.setBounds(0, 0, 7200, 600, 32, true, true, false, true);
        this.cameras.main.setBounds(0, 0, 7200, 600);

        var path = '0 294 38 310 68 342 97 342 126 310 156 294 196 294 231 310 260 342 289 342 318 310 353 294 388 294 422 310 452 342 481 342 511 310 544 294 581 294 615 310 644 342 '+
                  '672 342 703 310 737 294 772 294 805 310 836 342 865 342 896 310 929 294 965 294 998 310 1029 342 1055 342 1085 310 1119 294 1158 294 1189 310 1221 342 1221 600 0 600';

        var verts = this.matter.verts.fromPath(path);
        var ground = this.matter.add.fromVertices(620, 407, verts, { ignoreGravity: true, isStatic: true }, true, 0.01, 10);

        this.player = this.matter.add.image(50, 50, 'amoeba');
        this.player.xType = "player";
        this.player.setBody({
          type: 'polygon',
          sides: 7,
          radius: 13
        });

        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
          //console.log("collisionstart");
          if(bodyA.gameObject != null && bodyB.gameObject != null) {
            //console.log(bodyB);
            if(bodyB.gameObject.xType == "air_particle" && bodyA.gameObject.xType == "air_particle") {
              //console.log("HIT_B");
              bodyB.gameObject.visible = false;
              bodyB.gameObject.destroy();
              bodyA.gameObject.visible = false;
              bodyA.gameObject.destroy();
              //bodyB.destroy();
            }
            else if(bodyA.gameObject.xType == "air_particle" && bodyB.gameObject.xType == "player") {
              bodyA.gameObject.visible = false;
              bodyA.gameObject.destroy();
              this.hitByParticle = true;
              bodyB.gameObject.setVelocityX(7);
              this.resetFlagEvent = this.time.delayedCall(2000, this.resetFlag, [], this);
            }
            else if(bodyB.gameObject.xType == "air_particle" && bodyA.gameObject.xType == "player") {
              bodyB.gameObject.visible = false;
              bodyB.gameObject.destroy();
              this.hitByParticle = true;
              bodyA.gameObject.setVelocityX(7);
              this.resetFlagEvent = this.time.delayedCall(2000, this.resetFlag, [], this);
            }
          }
        }, this);

        this.cursor = this.input.keyboard.createCursorKeys();

        this.cameras.main.startFollow(this.player, true, 0.09, 0.09);  //make camera follow the player
        this.timedEvent = this.time.addEvent({ delay: Phaser.Math.Between(300,2000), callback: this.onEvent, callbackScope: this, loop: true });

        this.front = this.add.tileSprite(7200/2,600/2,7200,600,'Front');
    }

    update() {
        this.back.tilePositionX -= 10.5;
        if(this.cursor.left.isDown && !this.hitByParticle){
          this.player.setVelocityX(-4);
          this.front.tilePositionX -= 3.25;
        }

        if(this.cursor.right.isDown && !this.hitByParticle) {
          this.player.setVelocityX(4);
          this.front.tilePositionX += 3.25;
        }

        if(this.cursor.up.isDown) {
          this.player.setVelocityY(-3);
        }
    }

    resetFlag() {
      this.hitByParticle = false;
    }

    onEvent() {
      var air_particle = this.matter.add.image(-10 ,Phaser.Math.Between(50, 280), 'air');
      air_particle.xType = "air_particle";
      air_particle.setBody({
          type: 'polygon',
          sides: 7,
          radius: 13
        }
      );
      air_particle.setIgnoreGravity(true);
      air_particle.setFrictionAir(0);
      air_particle.setVelocityX(10);
    }
};