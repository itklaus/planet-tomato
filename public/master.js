console.log('Hello, Klaus!');

class Tomato {

  constructor(params) {
    
    this.session = params.session || 25;
    this.break = params.session || 5;
    this.isTrue = true;

    this.testNotify();
   
    document.getElementById('timeStart').onclick = () => {
      this.time(this.session, 60);
    }
    document.getElementById('reset').onclick = () => {
      this.reset();
    }
  }
  
  testNotify() {
    if (!('Notification' in window)) {
      alert('Ваш браузер не поддержвает декстопные приложения');
    }
    else if (Notification.premission !== 'denied') {
      Notification.requestPermission(function(premission) {
        console.log('Success');
        return true;
      });
    }
  }

  notify() {
    let notifycation = new Notification('Pomodoro Clock says:', {
      dir: 'auto',
      icon: "https://pp.userapi.com/c840234/v840234665/302df/EFnxoLbHk_Y.jpg",
      body: 'Ниндзя, время!'
    });
    console.log('Оповещение запустилось');
  }

  reset() {
    clearInterval(this.timer);
    document.getElementById('start').innerHTML='25:00';
  }

  time(min, isArg) {

    let sec = 59;
    min--;

    this.timer = setInterval( () => {

      if (min < 10) {
        if (sec >= 10) document.getElementById('start').innerHTML='0'+min+':'+sec;
        if (sec < 10) document.getElementById('start').innerHTML='0'+min+':0'+sec;
      } else {
        if (sec >=10) document.getElementById('start').innerHTML=min+':'+sec;
        if (sec < 10) document.getElementById('start').innerHTML=min+':0'+sec;
      }

      if (sec == 0) {
        min--;
        sec = 60;
      }
      sec--;
      if (min < 0) {
        clearInterval(this.timer);
        this.notify();
        if (this.isTrue) {
          this.time(5, 60);
          this.isTrue = false;
        }
      }

    }, 1000);
  }

}

let params = {};

let tomato = new Tomato(params);
