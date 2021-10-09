/**
 * RequestAnimFrame
 * request an animation frame to browser
 */
window.requestAnimation = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;

/**
 *	StopAnimation
 *	cancel an animation previously threw trough requestAnimationFrame
 */
window.stopAnimation = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;


window.animStartTime = window.animationStartTime || window.webkitAnimationStartTime || window.mozAnimationStartTime || window.oAnimationStartTime || window.msAnimationStartTime;

//hàm lấy code  
function getText(txt) {
    var c = new Context();
    return c.textKey[c.arrTextShow.indexOf(txt)];
}
window.random = function(ceil) {
    "use strict";
    if ((ceil = parseInt(ceil, 0)) > 0) {
        return Math.abs(Math.floor(Math.random() * ceil + 1));
    } else {
        return Math.random();
    }
};
var iText = 1;
//CHỮ
var Context = function() {
    this.text;
    this.textKey = ['', 'A', 'I', 'U', 'E', 'O',
        'ICHI', 'NI', 'KA', 'KI', 'KU', 'KE', 'KO',
        'SA', 'SHI', 'SU', 'SE', 'SO',
        'YON', 'TA', 'CHI', 'TSU', 'TE', 'TO',
        'GO', 'SAN', 'NA', 'NI', 'NU', 'NE', 'NO',
        'ROKU', 'HA', 'HI', 'FU', 'HE', 'HO',
        'NANA', 'MA', 'MI', 'MU', 'ME', 'MO',
        'HACHI', 'YA', 'YU', 'YO',
        'KYUU', 'RA', 'RI', 'RU', 'RE', 'RO',
        'JYUU', 'WA', 'WO', 'N'
    ];
    this.arrTextShow = ['', 'あ', 'い', 'う', 'え', 'お',
        '一', '二', 'か', 'き', 'く', 'け', 'こ',
        'さ', 'し', 'す', 'せ', 'そ',
        '四', 'た', 'ち', 'つ', 'て', 'と',
        '五', '三', 'な', 'に', 'ぬ', 'ね', 'の',
        '六', 'は', 'ひ', 'ふ', 'へ', 'ほ',
        '七', 'ま', 'み', 'む', 'め', 'も',
        '八', 'や', 'ゆ', 'よ',
        '九', 'ら', 'り', 'る', 'れ', 'ろ',
        '十', 'わ', 'を', 'ん'
    ];
    this.text = this.textKey[iText];
    this.getTextK = function() { return this.text };
    this.getTextS = function() { return this.arrTextShow[this.textKey.indexOf(this.text)] };
    this.arrLength = function() { return this.textKey.length };
}

//VỊ TRÍ CỦA BONG BÓNG
var Position = function(x, y) {
    this.x = 0;
    this.y = 0;
    if (typeof x != 'undefined') this.setX(x);
    if (typeof y != 'undefined') this.setY(y);
};
// thay đổi vị trí
Position.prototype.getX = function() { return this.x; };
Position.prototype.getY = function() { return this.y; };
Position.prototype.setX = function(x) { this.x = parseInt(x); };
Position.prototype.setY = function(y) { this.y = parseInt(y); };

var Circle = function(game, code, position) {
    this.game = game;
    this.code = code;
    if (iText == this.code.arrLength()) {
        iText = 1;
    } else {
        iText++;
    }
    this.x = position.getX();
    this.y = position.getY();
    var color = '';
    var randomClor = (Math.floor(Math.random() * 10 - 1));
    if (randomClor == 1) {
        color = '#000';
    } else if (randomClor == 2) {
        color = '#ff0000';
    } else {
        color = '#eae305';
    }
    this.toDom = $('<span class="circle" onclick="removeC(this)" ><span>');
    //css circle
    this.toDom.css({
        background: color,
        left: this.x,
        top: this.y,
    });
    //text circle
    this.toDom.text(this.code.getTextS());
    //Insertion
    var screen = game.platform.screen;
    screen.append(this.toDom);
}


//Chỉ số
var Stat = function(game) {

    this.game = game;
    //Điểm
    this.score = 0;
    this.screenScore = $('#score');
    //Thời gian
    this.timeStart = 0;
    this.time = this.timeStart;
    this.screenTime = $('#timer');
    //Lượt chơi
    this.life = this.game.missable;
    this.screenLife = $('#life');

};
//Thay đổi chỉ số trên màn hình
Stat.prototype.display = function() {
    this.screenScore.text(this.score);
    this.screenTime.text(this.time);
    this.screenLife.text(this.life);
};

var Game = function(p) {
    this.missable = 1;
    this.platform = p;
    this.score = new Stat(this);
}

Game.prototype.loop = 50;
Game.prototype.move = 0;
//init
Game.prototype.init = function() {
    this.platform.screen.html('');
    this.stat = new Stat(this);
};

//Click remove Circle
var arrows = 3;
var checkArrow = 0;

function removeC(c) {
    if (checkArrow == 1) {
        c.remove();
        checkArrow = 0;
        arrows--;
    }
    $('#arrow').text(arrows);
}

//XOÁ BONG BÓNG NẾU GÕ ĐÚNG
Game.prototype.removeCircle = function() {
    var game = this;
    game.platform.screen.children().each(function() {
        var circle = {
            get: $(this),
            text: getText($(this).text()),
            color: $(this).css("background-color")
        };
        for (i = 0; i <= arrText.length; i++) {
            var arr = arrText.slice(i, arrText.length);
            if (circle.text == arr) {
                //nếu gõ trúng bóng màu đen thì trò chơi kết thúc
                if (circle.color == 'rgb(0, 0, 0)') {
                    game.platform.switchState(game.platform.overGame);
                } else if (circle.color == 'rgb(255, 0, 0)') {
                    $(this).remove();
                    game.stat.score = game.stat.score + 2;
                } else {
                    $(this).remove();
                    game.stat.score++;
                }
                arrText = "";
                break;
            }
        }
    });
};

//Thêm bong bóng
Game.prototype.addCircle = function() {
    var randomX = random(this.platform.screen.width() - 45);
    var randomY = 5;
    var p = new Position(randomX, randomY); // Random position
    if (this.loop >= 100) {
        var c = new Circle(this, new Context(), p);
        this.loop = 0;
    }
};

//CHƠI GAME
Game.prototype.play = function(game) {
    game.addCircle();
    if ((new Date().getSeconds() - game.stat.timeStart) >= 1) {
        game.stat.time++;
        game.stat.timeStart = new Date().getSeconds();
    }
    game.platform.screen.children().each(function() {
        var circle = {
            get: $(this),
            position: $(this).offset(),
            color: $(this).css("background-color")
        };
        // KẾT THÚC
        if (circle.get.position().top >= 550) {
            if (circle.color != 'rgb(0, 0, 0)') {
                game.stat.life--;
            }
            circle.get.remove();
        } else {
            circle.position.top = circle.position.top + game.move;
            circle.get.offset(circle.position);
        }
    });
    game.stat.display(); //hiện thị điểm
    game.loop += 0.5;
    // Kiểm tra kết thúc game
    if (game.stat.life <= 0) {
        game.platform.switchState(game.platform.overGame); //HIỆN THÔNG BÁO KẾT THÚC
    } else {
        game.platform.plays = requestAnimation(function() { game.play(game); }); // TIẾP TỤC CHƠI
    }
};

var State = function() {
    "use strict";
    this.enter = function() {};
    this.leave = function() {};
};

function iconinstion() {
    this.screen = $('#instructscreen');
    $('#thongbao').find('li').each(function() { $(this).hide(); });
    $('#showlog').show();
    this.screen.fadeIn(300);
}

function closelog() {

    this.screen = $('#startscreen');
    $('#thongbao').find('li').each(function() { $(this).hide(); });
    $('#showlog').show();
    this.screen.fadeIn(300);
}

var StartGame = function(game) {
    this.game = game;

    this.screen = $('#startscreen');
    this.enter = function() {
        $(document).off('keyup');
        game.platform.stopAnim();
        game.init();
        //Ẩn
        $('#thongbao').find('li').each(function() { $(this).hide(); });
        $('#btnreturn').hide();
        //Hiện
        $('#btnstart').show();
        $('.iconinst').show();
        $('#showlog').show();
        this.screen.fadeIn(300);
        $('#iconinst').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            game.platform.switchState(game.platform.pauseGame);
            return false;
        });


        $('#btnstart').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            game.move = 0;
            iText = 1;
            arrows = 3;
            $('#arrow').text(arrows);
            game.platform.switchState(game.platform.playGame);
            return false;
        });
    };
};
StartGame.prototype = new State();
//
var arrText = "";
var PlayGame = function(game) {
    this.game = game;
    this.enter = function() {
        game.stat.timeStart = new Date().getSeconds();

        //ẨN 
        $('#thongbao').find('li').each(function() { $(this).hide(); });
        $('#showlog').hide();
        $('#btnstart').hide();
        $('.iconinst').hide();
        game.platform.stopAnim();

        if (game.stat.time % 20 == 0) {
            game.move++;
        }
        $(document).on('keyup', function(e) {
            // Removing circle
            if (e.keyCode >= 48 && e.keyCode <= 90) {
                arrText += String.fromCharCode(e.keyCode);
                game.removeCircle();
            } else {
                if (e.keyCode == 32) {
                    game.platform.switchState(game.platform.pauseGame);
                }
            }
        });

        $('.life').on('click', function() {
            if (game.stat.score >= 5) {
                game.stat.life++;
                game.stat.score = game.stat.score - 5;
            }
        });

        $('.arrow').on('click', function() {
            if (arrows > 0) {
                checkArrow = 1;
            } else
            if (game.stat.score >= 5) {
                arrows++;
                game.stat.score = game.stat.score - 5;
                $('#arrow').text(arrows);
                checkArrow = 1;
            }
        });
        game.platform.plays = requestAnimation(function() { game.play(game); });
    };
    this.leave = function() {
        $(document).off('keyup');
    };
};
PlayGame.prototype = new State();

// //TẠM DỪNG GAME
var PauseGame = function(game) {
    this.game = game;
    this.screen = $('#instructscreen');
    this.enter = function() {
        $('#showlog').show();
        this.screen.fadeIn(300);
        $('.iconClose').hide();
        //dừng game
        game.platform.stopAnim();
        $(document).on('keyup', function(e) {
            if (e.keyCode == 32) {
                $('#thongbao').find('li').each(function() { $(this).hide(); });
                $('#showlog').hide();
                game.platform.switchState(game.platform.playGame);
            }
        });
    };
    this.leave = function() { $(document).off('keyup'); };
};
PauseGame.prototype = new State();

//KẾT THÚC GAME
var OverGame = function(game) {
    this.game = game;
    this.screen = $('#overscreen');
    this.enter = function() {
        var result = $('<ul><li> Số điểm của bạn ' + game.stat.score + '</li><li> Thời gian chơi: ' + game.stat.time + '</li></ul>');
        $('#result').append(result);
        game.platform.stopAnim();
        //hiện thông báo
        $('#showlog').show();
        $('#btnreturn').show();
        $('.iconinst').show();
        this.screen.fadeIn(300);
        $('#btnreturn').on('click', function(e) {
            game.platform.switchState(game.platform.startGame);
            return false;
        });
    };
};
OverGame.prototype = new State();

// PLATFORM
var Platform = function() {
    var obj = this;
};

Platform.prototype.plays = undefined;
Platform.prototype.switchState = function(state) {
    this.current_state.leave();
    this.current_state = state;
    this.current_state.enter();
};

Platform.prototype.stopAnim = function() {
    if (typeof this.plays != 'undefined') {
        stopAnimation(this.plays);
        this.plays = undefined;
    }
};

Platform.prototype.init = function() {
    this.plays = undefined;
    this.game = new Game(this);
    this.screen = $('#game-container');
    this.startGame = new StartGame(this.game);
    this.playGame = new PlayGame(this.game);
    this.pauseGame = new PauseGame(this.game);
    this.overGame = new OverGame(this.game);
    this.current_state = this.startGame;
    this.switchState(this.current_state);
};