import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
 myText = '';
  totalWord = 0;
  checkboxCapitalize = false;
  count = 1;
  normalText = '';
  darkMode = false;

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('copiedText')){
      this.myText = localStorage?.getItem('copiedText') || '';
    }
  }

  changeToCapital(){
    this.myText = this.myText.toUpperCase();
  }

  changeToSmall(){
    this.myText = this.myText.toLowerCase();
  }

  downloadText(){
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.myText));
    element.setAttribute('download', 'yourFile.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

   changeStyle(){
    let element = document.getElementById("myText");
    element!.style.fontStyle = "italic";
  }

  reset(){
    // let element = document.getElementById("myText");
    // element!.removeAttribute("style");
    this.myText = '';
    localStorage.removeItem('copiedText');
  }

  countWord(){
    this.totalWord = this.myText.trim().split(/\s+/).length;
  }

  copyText(){
    localStorage.setItem('copiedText', this.myText);
    navigator.clipboard.writeText(this.myText)
  }

  changeMode(){
      let element = document.body;
      let content = document.getElementById("myText");
      if(!this.darkMode){
        element.classList.remove("light-mode");
        content?.classList.remove('light-mode');
        content?.classList.add('dark-mode');
        element.className = "dark-mode";
        this.darkMode = true;
      } else{
        element.classList.remove("dark-mode");
        content?.classList.remove('dark-mode')
        content?.classList.add('light-mode');
        element.className = "light-mode";
        this.darkMode = false;
      }
      // content!.innerText = "Dark Mode is ON";
  }

  checkBoxchecked(){
    if(this.count == 1){
      this.normalText = this.myText;
    }
    if(this.checkboxCapitalize){
      this.capitalize();
    }else{
      this.myText = this.normalText;
    }
    this.count++;
  }

  capitalize(){
    let textArray = this.myText.split('.');
    let newText = [];
    newText.push(textArray[0][0].toUpperCase()+textArray[0].substr(1));
    for(let i=1; i < textArray.length; i++){
      if(textArray[i][0] == ' '){
        newText.push(textArray[i][1].toUpperCase()+textArray[i].substr(1));
      }else{
        if(textArray[i][0] != ' ' && textArray[i][0])
        newText.push(textArray[i][0].toUpperCase()+textArray[i].substr(1));
      }
    }
   this.myText = newText.join(". ")+'.';
  }

}
