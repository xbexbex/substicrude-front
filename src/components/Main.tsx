import React, { Component } from 'react';
import 'Styles/Main.scss';
import axios from 'axios';
import { serverUrl } from 'Constants/constants'

interface MainProps {
};

interface MainState {
   authState: number,
   loading: boolean,
   inputValue: string
};

export default class Main extends Component<MainProps, MainState> {

   constructor(props: MainProps) {
      super(props)
      this.state = {
         authState: 0,
         loading: false,
         inputValue: ""
      }
   }

   sendPhoneNumber = async () => {
      const response = await axios.get(serverUrl + "/number/?value=" + this.state.inputValue);
      this.setState({
         inputValue: "",
         authState: 1
      })
   }

   sendAuthCode = async () => {
      const response = await axios.get(serverUrl + "/code/?value=" + this.state.inputValue);
      this.setState({
         authState: 2
      })
   }

   updateInput = (event: any) => {
      this.setState({
         inputValue: event.target.value
      });
   }

   render() {
      let view;
      if (this.state.authState === 0) {
         view = (
            <div>
               <input
                  onChange={this.updateInput}
               />
               <button
                  onClick={this.sendPhoneNumber}
                  disabled={this.state.loading}
               >
                  :D
                </button>
            </div>)
      } else if (this.state.authState === 1) {
         view = (
            <div>
               <input
                  onChange={this.updateInput}
               />
               <button
                  onClick={this.sendAuthCode}
                  disabled={this.state.loading}
               >
                  :(
            </button>
            </div>
         )
      } else {
         view = (
            <img
               src={require("Assets/loading.svg")}>
            </img>
         )
      }
      return (
         <div className="main-container">
            <p>Hi</p>
            {view}
         </div>
      )
   }
}
