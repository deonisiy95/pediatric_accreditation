const list = [
  {
    title: 'ФИО',
    file: 'fio'
  },
  {
    title: 'Возраст',
    file: 'age_1_month'
  },
  {
    title: 'Термометрия',
    file: '36_7'
  },
  {
    title: 'Измерение роста',
    file: '53sm'
  },
  {
    title: 'Измерение веса',
    file: '3800'
  },
  {
    title: 'Измерения окружности головы',
    file: '36_7'
  },
  {
    title: 'Измерения окружности грудной клетки',
    file: '35_5'
  },
  {
    title: 'Оценка состояния кожных покровов',
    file: 'skin_normal'
  },
  {
    title: 'Оценка состояния подкожно-жировой клетчатки',
    file: 'fat_normal'
  },
  {
    title: 'Осмотр и пальпация головы',
    file: 'head_2_2'
  },
  {
    title: 'Осмотр грудной клетки',
    file: 'chest_normal'
  },
  {
    title: 'Оценка мышечного тонуса. Верхние конечности и нижние конечности',
    file: 'hyper'
  },
  {
    title: 'Проведения аускультации легких',
    file: 'breath_normal'
  },
  {
    title: 'Оценка частоты дыхательных движений',
    file: '40_per_min'
  },
  {
    title: 'Проведения аускультации сердца',
    file: 'heart_normal'
  },
  {
    title: 'Оценка частоты сердечных сокращений',
    file: '140_per_min'
  },
  {
    title: 'Пальпация живота',
    file: 'belly_normal'
  },
  {
    title: 'Осмотр наружных половых органов',
    file: 'her_normal'
  },
  {
    title: 'Вопрос о характере мочеиспускания',
    file: 'urine_normal'
  },
  {
    title: 'Вопрос о характере стула',
    file: 'poop_normal'
  },
  {
    title: 'Поисковый рефлекс – поглаживание пальцем угла рта',
    file: 'ref_1'
  },
  {
    title: 'Хоботковый рефлекс – постучать пальцем по губам ребенка',
    file: 'ref_2'
  },
  {
    title: 'Ладонно-ротовой рефлекс',
    file: 'ref_3'
  },
  {
    title: 'Верхний хватательный рефлекс',
    file: 'ref_4'
  },
  {
    title: 'Рефлекс Моро',
    file: 'ref_5'
  },
  {
    title: 'Рефлекс опоры',
    file: 'ref_6'
  },
  {
    title: 'Рефлекс автоматической ходьбы',
    file: 'ref_7'
  },
  {
    title: 'Защитный рефлекс',
    file: 'ref_8'
  },
  {
    title: 'Рефлекс ползания',
    file: 'ref_9'
  },
  {
    title: 'Осмотр полости рта и зева',
    file: 'mouth_normal'
  }
];

let position = 0;
let started = false;
let timer = null;
const startSound = new Audio(`./audio/start.wav`);
const oneMinSound = new Audio(`./audio/one_min.wav`);

const handleClick = (event) => {
  if (!started) {
    playSound(`./audio/start.wav`, event.target, list[position].title);
    started = true;
    startTimer();
    return;
  }

  if (position >= list.length) {
    return;
  }

  const title = list[position + 1] ? list[position + 1].title : '';

  playSound(`./audio/one/${list[position].file}.wav`, event.target, title);

  position += 1;
};

const changeTitle = (title) => {
  document.getElementById('title').innerText = title;
}

const changeTimer = (timer) => {
  document.getElementById('timer').innerText = timer;
}

const playSound = (filePath, target, title) => {
  const audio = new Audio(filePath);
  target.setAttribute('disabled', 'true');

  audio.addEventListener('ended', () => {
    changeTitle(title);
    target.removeAttribute('disabled');
  });

  audio.play();
}

const secondToTime = (sec_num) => {
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (minutes < 10) {minutes = "0" + minutes;}
  if (seconds < 10) {seconds = "0" +seconds;}

  return minutes + ':' + seconds;
}

const startTimer = () => {
  let seconds = -1;
  const tick = () => {
    seconds++;

    if (seconds === 540) {
      oneMinSound.play();
    }

    changeTimer(secondToTime(seconds))

    setTimeout(tick,1000);
  }

  tick();
  timer = setTimeout(tick,1000);
}

window.onload = function () {
  document.getElementById('main-button').addEventListener('click', handleClick);
}
