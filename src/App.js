import './App.css';
import React, { useState } from 'react';
import shortid from 'shortid';

function New(props) {
  const {Component} = props;
  return (
      <div className="wrap-item wrap-item-new">
        <span className="label">New!</span>
        <Component key={shortid.generate()} {...props}/>
      </div>
  )
}

function Popular(props) {
    const {Component} = props;
    return (
      <div className="wrap-item wrap-item-popular">
        <span className="label">Popular!</span>
        <Component key={shortid.generate()} {...props}/>
      </div>
  )
}

function Decision(props) {
    const {views, Component} = props;
    if (views >= 1000) {
        return <Popular key={shortid.generate()} {...props} Component={Component}/>;
    } else if (views <= 100) {
        return <New key={shortid.generate()} {...props} Component={Component}/>;
    } else {
        return <Component key={shortid.generate()} {...props}/>;
    }
}

function Article(props) {
  return (
      <div className="item item-article">
        <h3><a href="#">{props.title}></a></h3>
        <p className="views">Прочтений: {props.views}</p>
      </div>
  )
}

function Video(props) {
  return (
      <div className="item item-video">
        <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen title="iframe"/>
        <p className="views">Просмотров: {props.views}</p>
      </div>
  )
}

function List(props) {
  return props.list.map(item => {
    switch (item.type) {
      case 'video':
        return (
            <>
              <Decision key={shortid.generate()} {...item} Component={Video} />
            </>
        );

      case 'article':
        return (
            <>
              <Decision key={shortid.generate()} {...item} Component={Article}/>
            </>
        );
    }
  });
}

export default function App() {
  const [list] = useState([
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      views: 50
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      views: 12
    },
    {
      type: 'article',
      title: 'Невероятные события в неизвестном поселке...',
      views: 175
    },
    {
      type: 'article',
      title: 'Секретные данные были раскрыты!',
      views: 1532
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      views: 4253
    },
    {
      type: 'article',
      title: 'Кот Бегемот обладает невероятной...',
      views: 12,
    },
  ]);

  return (
      <List list={list} />
  );
}