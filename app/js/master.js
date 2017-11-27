class Tomato {
  constructor() {
    this.testNotify();

    this.min = 0;
    this.sec = 5;

    document.getElementById('start').onclick = () => {
      this.time();
    } 
  }

  testNotify() {
    if (!('Notification' in window)) {
      alert('Ваш браузер не поддерживает декстопные приложения');
    }
    else if (Notification.premission !== 'denied') {
      Notification.requestPermission(function(premission) {
        console.log('Success');
        return true;
      });
    }
  }

  notify() {
    let notification = new Notification('Pomodoro Clock says:', {
      dir: 'auto',
      icon: "https://pp.userapi.com/c840234/v840234665/302df/EFnxoLbHk_Y.jpg",
      body: 'Время отдахнуть, ниндзя.'
    });
    console.log('Оповещение запустилось!');
  }

  time() {

    let pook = function() {
      console.log('Hello!');
    }

    let timer = setInterval( () => {
     
      if (this.min < 10) {
        if (this.sec >= 10) document.getElementById('pomodoroTimer').innerHTML='0'+this.min+':'+this.sec;
        if (this.sec < 10) document.getElementById('pomodoroTimer').innerHTML='0'+this.min+':0'+this.sec;
              
      } else {
        if (this.sec >= 10) document.getElementById('pomodoroTimer').innerHTML=this.min+':'+this.sec;
        if (this.sec < 10) document.getElementById('pomodoroTimer').innerHTML=this.min+':0'+this.sec;      
      }

      if (this.sec == 0) {
        this.min--;
        this.sec = 59;
      }
      this.sec--;
      if (this.min < 0) {
        clearInterval(timer);
        this.notify();
      }


    }, 1000);

  }

  stop() {   
  }
}

let tomato = new Tomato();
