import { text } from '../../fixtrue';

export default class BaseballGame {
  constructor() {
    this.computerInputNumbers = this.getRandom();
  }

  getRandom() {
    try {
      const minVal = 1;
      const maxVal = 9;
      let random = '';
      let table;
      (table = []).length = 10;
      table.fill(false);

      let cnt = 0;
      while (cnt < 3) {
        let number = Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
        if (table[number]) {
          continue;
        } else {
          table[number] = true;
          random += number;
          cnt++;
        }
      }

      return random;
    } catch (error) {
      alert(error);
    }
  }

  judge(computerInputNumbers, userInputNumbers) {
    try {
      let strike = 0;
      let ball = 0;
      for (let i = 0; i < 3; i++) {
        if (computerInputNumbers[i] === userInputNumbers[i]) {
          strike++;
        } else if (computerInputNumbers.includes(userInputNumbers[i])) {
          ball++;
        }
      }

      return [strike, ball];
    } catch (error) {
      alert(error);
    }
  }

  play(computerInputNumbers, userInputNumbers) {
    try {
      const [strike, ball] = this.judge(computerInputNumbers, userInputNumbers);
      let responseString = '';

      if (ball) {
        responseString += `${ball}${text.ball}`;
      }

      if (strike) {
        responseString += ` ${strike}${text.strike}`;
      }

      if (ball === 0 && strike === 0) {
        responseString = text.nothing;
      }

      if (strike === 3) {
        responseString = text.correct;
      }

      return responseString;
    } catch (error) {
      alert(error);
    }
  }

  cleanResult() {
    try {
      const result_div = document.getElementById('result');

      while (result_div.hasChildNodes()) {
        result_div.removeChild(result_div.firstChild);
      }
    } catch (error) {
      alert(error);
    }
  }

  resetInputNumbers() {
    try {
      const userInput = document.getElementById('user-input');
      userInput.value = '';
    } catch (error) {
      alert(error);
    }
  }

  restart() {
    try {
      this.resetInputNumbers();
      this.cleanResult();
      this.computerInputNumbers = this.getRandom();
    } catch (error) {
      alert(error);
    }
  }

  renderResult(string) {
    try {
      const result_div = document.getElementById('result');
      const response_p = document.createElement('p');
      response_p.innerHTML = string;
      result_div.appendChild(response_p);

      if (string === text.correct) {
        const restart_div = document.createElement('div');
        restart_div.id = 'restart';

        let restart_p = document.createElement('p');
        restart_p.innerHTML = text.askRestart;
        restart_div.appendChild(restart_p);

        const restart_button = document.createElement('button');
        restart_button.innerHTML = text.restart;
        restart_button.id = 'game-restart-button';
        restart_button.addEventListener('click', this.restart.bind(this));
        restart_div.appendChild(restart_button);

        result_div.appendChild(restart_div);
      }
    } catch (error) {
      alert(error);
    }
  }
}
