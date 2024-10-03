import { Component, computed, DoCheck, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.css']
})
export class SignalsComponent implements DoCheck {

  counter = signal(0);
  message = signal<string[]>([]) //signal is generic type
  doubleCounter = computed(() => this.counter() * 2);

  constructor() {
    effect(() => console.log('effect function is called ' + this.counter()));
    // effect function will only be activated if you use any signal in its callback function
  }

  decrement(){
    this.counter.update((preValue) => preValue -1);

    this.message.mutate((prevMsg) => prevMsg.pop());
  }

  increment(){
    //this.counter.set(this.counter() + 1)
    this.counter.update((prevValue) => prevValue + 1);
    // use update method when the new value is depends on previous value

    this.message.mutate((prevMsg) => prevMsg.push('Current value of counter is '+ this.counter()));
    //update value also possible to update but while array is mutable type so mutate() is recommended
    //this.message.update((prevMsg) => [...prevMsg, 'Current value of counter is '+ this.counter()])
  }

  ngDoCheck() {
      console.log("Angular change detection called")
  }

}
