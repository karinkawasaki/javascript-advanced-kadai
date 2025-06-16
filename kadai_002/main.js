// 画面に表示する文字列を入れる変数（ここではuntypedという名前にする）を準備する
let untyped = '';
let typed = '';
let score = 0; // 修正: scoreの初期値を0に設定

// getElementById()メソッドでHTML要素（ここではuntypedfieldという名前にする）を取得する
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const count = document.getElementById('count');

// タイプ数をカウントする変数
let typeCount = 0; // 初期値を0に設定

// 複数のテキストを格納する配列
const textLists = [
    'Hello World', 'This is my App', 'How are you?',
    'Today is sunny', 'I love JavaScript!', 'Good morning',
    'I am Japanese', 'Let it be', 'Samurai',
    'Typing Game', 'Information Technology',
    'I want to be a programmer', 'What day is today?',
    'I want to build a web app', 'Nice to meet you',
    'Chrome Firefox Edge Safari', 'machine learning',
    'Brendan Eich', 'John Resig', 'React Vue Angular',
    'Netscape Communications', 'undefined null NaN',
    'Thank you very much', 'Google Apple Facebook Amazon',
    'ECMAScript', 'console.log', 'for while if switch',
    'var let const', 'Windows Mac Linux iOS Android',
    'programming'
];

// ランダムなテキストを表示
const createText = () => {
    // 正タイプした文字列をクリア
    typed = '';
    typedfield.textContent = typed;

    // 配列のインデックス数からランダムな数値を生成する
    let random = Math.floor(Math.random() * textLists.length);

    // 配列からランダムにテキストを取得し画面に表示する
    untyped = textLists[random];
    untypedfield.textContent = untyped;
};

// キー入力の判定
const keyPress = e => {
    // 誤タイプの判定
    if (e.key !== untyped.substring(0, 1)) {
        wrap.classList.add('mistyped');

        // 100ms後に背景色を元に戻す
        setTimeout(() => {
            wrap.classList.remove('mistyped');
        }, 100);
        return;
    }

    // 正タイプの判定
    score++;
    typeCount++; // 正しい入力の場合にカウントアップ
    document.getElementById('typecounter').textContent = typeCount; // HTMLに反映
    wrap.classList.remove('mistyped');
    typed += untyped.substring(0, 1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    // テキストがなくなったら新しいテキストを表示
    if (untyped === '') {
        createText();
    }
};

// タイピングスキルのランクを判定
const rankCheck = score => {
    // テキストを格納する変数を作る
    let text = '';

    // スコアに応じて異なるメッセージを変数textに格納する
    if (score < 100) {
        text = `あなたはCランクです。\nBランクまであと${100 - score}文字です`;
    } else if (score < 200) {
        text = `あなたはBランクです。\nAランクまであと${100 - score}文字です`;
    } else if (score < 300) {
        text = `あなたはAランクです。\nSランクまであと${100 - score}文字です`;
    } else if (score >= 300) {
        text = `あなたはSランクです。\nおめでとうございます！`;
    }
    // 生成したメッセージと一緒に文字列を返す
    return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
  clearInterval(id);

  // タイムアップのメッセージを表示
  untypedfield.textContent = 'タイムアップ！';
  typedfield.textContent = '';

  // 少しの遅延を入れてからランクを確認
  setTimeout(() => {
    const result = confirm(rankCheck(score));

    if (result == true) {
      window.location.reload();
    }
  }, 10); // 10mm秒後にランクの確認
};

// カウントダウンタイマー
const timer = () => {
    // タイマー部分のHTML要素（p要素）を取得する
    let time = count.textContent;

    const id = setInterval(() => {
        // カウントダウンする
        time--;
        count.textContent = time;

        // カウントが0になったらタイマーを停止する
        if (time <= 0) {
            gameOver(id);
        }
    }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {
    // カウントダウンタイマーを開始する
    timer();

    // ランダムなテキストを表示する
    createText();
    start.style.display = 'none';
    typecounter.style.display = 'block'; // typecounterを表示

    // キーボードのイベント処理
    document.addEventListener('keypress', keyPress);
});

// 初期画面の設定
untypedfield.textContent = 'スタートボタンで開始';
typecounter.textContent = typeCount;  // 初期値を設定