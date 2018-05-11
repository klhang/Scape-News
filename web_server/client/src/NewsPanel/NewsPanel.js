import './NewsPanel.css';

import NewsCard from '../NewsCard/NewsCard';
import React from 'react';


classNewsPanelextendsReact.Component{
   constructor() {
     super();
     // list of NewsCard
     this.state = {news: null};
   }

   componentDidMount() {
     this.loadMoreNews();

   }

   renderNews() {
      const news_card_list = this.state.news.map(one_news => {
        return(
          <a className='list-group-item' href="#">
            <NewsCard news={one_news} />
          </a>
        );
      });

      return(
        <div className="container-fluid">
          <div className='list-group'>
            {news_card_list}
          </div>
        </div>
      )
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
