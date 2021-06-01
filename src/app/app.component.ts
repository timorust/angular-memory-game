import { Component } from '@angular/core';
import {CardInterface} from "./card.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  // cards
  cardsArray: CardInterface[] = [];


  // state
  score: number = 0;
  steps: number = 0;
  timer: number = 120;
  gameStarted: boolean;
  compare: string[] = [];

  // helpers val
  timerInterval: any;

  startGame() {
    const cardsDuplicate_1 = [
      {
        answer: 'gazelle',
        image:'https://www.hamaarag.org.il/sites/default/files/styles/species_gallery/public/species_images/Aguda/Gazella%20gazella%20-%20Amir%20Ayalon.jpg?itok=DUN85LGa',
        flip: false,
        open: false
      },
      {
        answer: 'wolf',
        image: 'https://s3.eu-central-1.amazonaws.com/mypenhe/articles/243551/1.jpg',
        flip: false,
        open: false
      },
      {
        answer: 'leviathan',
        image: 'https://i.ytimg.com/vi/-NmTVm_bG3U/maxresdefault.jpg',
        flip: false,
        open: false
      },
      {
        answer: 'lion',
        image: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBkk7IK.img?h=552&w=750&m=6&q=60&u=t&o=f&l=f&x=1380&y=944',
        flip: false,
        open: false
      },
      {
        answer: 'eagle',
        image: 'https://sfilev2.f-static.com/image/users/215828/ftp/my_files/sop-resize-600-3442519-american-eagle-wallpapers.jpg',
        flip: false,
        open: false
      },
      {
        answer: 'donkey',
        image: 'https://storage.hidabroot.org/articles_new/120791_tumb_750Xauto.jpg',
        flip: false,
        open: false
      },
    ],
          cardsDuplicate_2 = [
      {
        answer: 'gazelle',
        image:'https://www.hamaarag.org.il/sites/default/files/styles/species_gallery/public/species_images/Aguda/Gazella%20gazella%20-%20Amir%20Ayalon.jpg?itok=DUN85LGa',
        flip: false,
        open: false
      },
      {
        answer: 'wolf',
        image: 'https://s3.eu-central-1.amazonaws.com/mypenhe/articles/243551/1.jpg',
        flip: false,
        open: false
      },
      {
        answer: 'leviathan',
        image: 'https://i.ytimg.com/vi/-NmTVm_bG3U/maxresdefault.jpg',
        flip: false,
        open: false
      },
      {
        answer: 'lion',
        image: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBkk7IK.img?h=552&w=750&m=6&q=60&u=t&o=f&l=f&x=1380&y=944',
        flip: false,
        open: false
      },
      {
        answer: 'eagle',
        image: 'https://sfilev2.f-static.com/image/users/215828/ftp/my_files/sop-resize-600-3442519-american-eagle-wallpapers.jpg',
        flip: false,
        open: false
      },
      {
        answer: 'donkey',
        image: 'https://storage.hidabroot.org/articles_new/120791_tumb_750Xauto.jpg',
        flip: false,
        open: false
      },
    ];
    this.cardsArray = [...cardsDuplicate_1, ...cardsDuplicate_2];
    this.shuffle();
    this.cntDownTimer();
    this.gameStarted = true;
  }

  shuffle() {
    let i = this.cardsArray.length;
    while(i > 0) {
      let count = Math.floor(Math.random() * i);
      i--;
      let temp = this.cardsArray[i];
      this.cardsArray[i] = this.cardsArray[count];
      this.cardsArray[count]= temp;
    }
  }

  cntDownTimer() {
    this.timerInterval = setInterval(() => {
      this.timer--;
      if(this.timer === 0) {
        clearInterval(this.timerInterval);
        this.gameStarted = false;
      }
    },1000);
  }

  checkCard(card: CardInterface) {
    if(card.open || card.flip) return;
    card.flip = true;
    this.compare.push(card.answer);

    if(this.compare.length === 2) {
      let isCorrect: boolean = this.compare[0] === this.compare[1];

      setTimeout(() => {
        this.cardsArray.map((cardItem:CardInterface) => {
          if(isCorrect && cardItem.flip) {
            cardItem.open = isCorrect;
            cardItem.flip = true;
          }
          else {
            cardItem.flip = false
          }
        });
        this.checkGameStatus();
        this.compare = [];
      },800);

      }
    }

    checkGameStatus() {
    this.steps++;
    this.calcScore();
    this.checkIfGameOver();
    }

    calcScore() {
    const ratingBest = (this.cardsArray.length / 2) + 2,
          ratingMedium = this.cardsArray.length,
          ratingLow = (this.cardsArray.length * 1.5),
          isBest = this.steps <= ratingBest,
          isMedium = this.steps >= ratingMedium && this.steps < ratingLow;

    this.score = isBest ? 3 : isMedium ? 2 : 1;
    }

    checkIfGameOver() {
    const openCard = this.cardsArray.filter((cardItem:CardInterface) => cardItem.open).length,
          cardsInBoard = this.cardsArray.length;
    if(openCard === cardsInBoard) {
      clearInterval(this.timerInterval);
      this.gameStarted = false;
    }
    }
}
