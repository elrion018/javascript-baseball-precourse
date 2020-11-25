export default class BaseballGame {
  constructor() {
    this.computerInputNumbers = this.getRandom()
  }

  getRandom() {
    try {
      const minVal = 1
      const maxVal = 9
      let random = ''
      let table;
      (table = []).length = 10
      table.fill(false)

      let cnt = 0
      while (cnt < 3) {
        console.log(cnt)
        let num = Math.floor((Math.random() * (maxVal - minVal + 1)) + minVal)
        if (table[num]) {
          continue
        } else {
          table[num] = true
          random += num
          cnt++
        }
      }
      console.log(random)
      return random

    } catch (error) {
      alert(error)
    }
  }

  judge(computerInputNumbers, userInputNumbers) {
    try {
      let strike = 0
      let ball = 0
      for (let i = 0; i < 3; i++) {
        if (computerInputNumbers[i] === userInputNumbers[i]) {
          strike++
        } else if (computerInputNumbers.indexOf(userInputNumbers[i]) !== -1) {
          ball++
        }
      }

      return [strike, ball]

    } catch (error) {
      alert(error)
    }

  }



  play(computerInputNumbers, userInputNumbers) {
    try {
      const [strike, ball] = this.judge(computerInputNumbers, userInputNumbers)
      let responseString = ''

      if (ball) {
        responseString += `${ball}볼`
      }

      if (strike) {
        responseString += ` ${strike}스트라이크`
      }

      if (ball === 0 && strike === 0) {
        responseString = '낫싱'
      }

      if (strike === 3) {
        responseString = '🎉정답을 맞추셨습니다!🎉'
      }

      return responseString;
    } catch (error) {
      console.log(error)
    }
  }

  cleanResult() {
    try {
      const result_div = document.getElementById('result')

      while (result_div.hasChildNodes()) {
        result_div.removeChild(result_div.firstChild)
      }
    } catch (error) {
      alert(error)
    }
  }

  restart() {
    try {
      this.cleanResult()
      this.computerInputNumbers = this.getRandom()
    } catch (error) {
      alert(error)
    }
  }

  renderResult(string) {
    try {
      const result_div = document.getElementById('result')
      const response_p = document.createElement('p')
      response_p.innerHTML = string
      result_div.appendChild(response_p)

      if (string === '🎉정답을 맞추셨습니다!🎉') {
        const replay_div = document.createElement('div')
        replay_div.id = 'replay'

        let replay_p = document.createElement('p')
        replay_p.innerHTML = '게임을 새로 시작하시겠습니까?'
        replay_div.appendChild(replay_p)

        const replay_button = document.createElement('button')
        replay_button.innerHTML = '게임 재시작'
        replay_button.id = 'replay-button'
        replay_button.addEventListener('click', this.restart.bind(this))
        replay_div.appendChild(replay_button)

        result_div.appendChild(replay_div)
      }
    } catch (error) {
      alert(error)
    }
  }
}