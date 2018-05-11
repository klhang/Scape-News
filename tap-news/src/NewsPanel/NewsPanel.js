import './NewsPanel.css';

import NewsCard from '../NewsCard/NewsCard';
import React from 'react';


classNewsPanelextendsReact.Component{
   constructor() {
     super();
     // list of NewsCard
     this.state = {news: null};
}
   render() {
     if (this.state.news) {
       return(
         <div>
          {this.renderNews()}
        </div>
      );
    else {
      return (
        <div id='msg-app-loading'>
          Loading...
        </div>
        ) }
      } }

export defaultNewsPanel;
