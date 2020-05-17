enchant();
/*

Core
- rootScene
-- Sprite (bear)

*/

window.onload = function() {

  var core = new Core(320, 320);
  core.preload('chara1.png');
  core.fps = 15;
  core.rootScene.backgroundColor = 'gray';
  core.onload = function() {

    // くまクラス
    var Bear = Class.create(Sprite, { 
      initialize: function(x, y) {
        Sprite.call(this, 32, 32);
        this.image = core.assets['chara1.png'];
        this.x = x;
        this.y = y;
        this.frame = 4;
        this.opacity = (rand(80) + 20) / 100;
        
        this.tl.moveBy(rand(100), 0, 40, enchant.Easing.BOUNCE_EASEOUT)
               .moveBy(-rand(200), -rand(20), rand(20)); // x方向に0~100, y方向に0, 40フレームで動けという命令

        this.on('enterframe', () => {
          // 入力に応じた移動
          if (core.input.left) {
            this.x -= 5;
          } else if (core.input.right) {
            this.x += 5;
          } else if (core.input.up) {
            this.y -= 5;
          } else if (core.input.down) {
            this.y += 5;
          }
    
          // スマホ用のタッチ操作
          // this.on('touchstart', function() { // this.on() = this.addEventListner()
          //   core.rootScene.removeChild(this);
          // })
    
          // 画面を触ったらその位置にくまを移動
          // core.rootScene.on('touchstart', e => {
          //   this.x = e.x;
          //   this.y = e.y;
          // });
    
          // this.frame = this.age % 3;
          if (this.x > 320) {
            this.x = 0;
          }

          // 敵との当たり判定(intersect)
          // if (this.intersect(enemy)) {
          //   labelHit.text = 'Hit!';
          // }
          // 敵との当たり判定(within)
          // if (this.within(enemy, 20)) {
          //   labelHit.text = "Hit!";
          //   core.pushScene(gameOverScene);
          //   core.stop();
          // } else {
          //   labelHit.text = "remote";
          // }
        });
        core.rootScene.addChild(this);
      }
    });

    var bears = [];
    for (var i = 0; i < 10; ++i) {
      bears[i] = new Bear(rand(320), rand(320));
    }

    // 敵
    var enemy = new Sprite(32, 32);
    enemy.image = core.assets['chara1.png'];
    enemy.x = 80;
    enemy.y = 0;
    enemy.frame = 5;

    var gameOverScene = new Scene();
    gameOverScene.backgroundColor = 'black';

    // 経過時間を表示するラベル
    var labelTime = new Label();
    labelTime.x = 250;
    labelTime.y = 5;
    labelTime.color = 'green';
    labelTime.font = '14px Arial';
    labelTime.text = 'remote';
    labelTime.on('enterframe', () => {
      labelTime.text = (core.frame / core.fps).toFixed(2) ;
    });

    // 当たり判定を表示するラベル
    var labelHit = new Label();
    labelHit.x = 250;
    labelHit.y = 250;
    labelHit.color = 'red';
    labelHit.font = '14px Arial';
    labelHit.text = '0';

    core.rootScene.addChild(enemy);
    core.rootScene.addChild(labelTime);
    core.rootScene.addChild(labelHit);
  }
  core.start();
};

// 0~nまでのランダムな整数を生成
function rand(n) {
  return Math.floor(Math.random() * (n + 1));
}