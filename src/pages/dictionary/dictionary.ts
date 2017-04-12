  import { Component } from '@angular/core';
  import { NavController, NavParams } from 'ionic-angular';
  import {Http} from '@angular/http';


  /*
    Generated class for the Dictionary page.

    See http://ionicframework.com/docs/v2/components/#navigation for more info on
    Ionic pages and navigation.
  */
  @Component({
    selector: 'page-dictionary',
    templateUrl: 'dictionary.html'
  })
  export class DictionaryPage {

    public langs = {
      "CHR":{
       // "flag":"../../assets/flags/tatar.png"
        "flag":"assets/flags/tatar.png"
      },
      "RU": {
        //"flag":"../../assets/flags/russia.png"
        "flag":"assets/flags/russia.png"
      }
    }

    public items = [];
    public totalItems = 0;
    public fromLang:string = 'CHR';
    public toLang: string = 'RU';

    public  language:string = "CHR_RU";

    public showNotFound:boolean = false;
    public searchWord: string = '';

    constructor(public navCtrl: NavController, public navParams: NavParams,
    private http:Http ) {}

    ionViewDidLoad() {
      console.log('ionViewDidLoad DictionaryPage');
    }

    changeLanguage()
    {
      let langs = this.language.split('_');
      this.fromLang = langs[0];
      this.toLang = langs[1];
      this.searchWords();
    }

    searchWordChanged(ev :any)
    {
      this.searchWords();
    }


    searchWords()
    {
      if(this.searchWord == '')
      {
        this.clearResults();
        return;
      }

      let url = `http://langlearn.softdeveloper.ru/ajax.php?dict=${this.language}&word=${this.searchWord}`;

      this.http.get(url).subscribe(res=>{
        let reso = res.json();
        console.log(reso) ;

        if(reso.status == 'ok')
        {
          this.totalItems = reso.count;
          this.showNotFound = (this.totalItems == 0);
          this.items = reso.data;

        } else {
          this.clearResults();
        }

      })

    }


    clearResults()
    {
      this.items = [];
      this.totalItems = 0;
      this.showNotFound = false;
    }




  }
