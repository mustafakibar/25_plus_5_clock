import React from 'react';

const QuoteItem = ({ text, author }) => {
  return (
    <div id='quote-item'>
      <span id='text'>{text}</span>
      <span id='author'>{author}</span>
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      loading: false,
    };
  }

  componentDidMount() {
    fetch('https://type.fit/api/quotes')
      .then((res) => res.json())
      .then((quotes) => this.setState({ quotes, loading: false }));
  }

  render() {
    const { loading = false, quotes = [] } = this.state;

    if (loading || !(quotes && quotes.length > 0)) {
      return <div>Loading, please wait....</div>;
    }

    const { text, author } = quotes[Math.floor(Math.random() * quotes.length)];
    const tweetHref = encodeURI(
      `https://twitter.com/intent/tweet?text=${text}-${author}&hashtags=quotes,freecodecamp &via=kibarpro`
    );

    return (
      <React.Fragment>
        <div id='quote-box'>
          <QuoteItem text={text} author={author} />

          <div id='action-box'>
            <button id='new-quote' onClick={() => this.forceUpdate()}>
              <span className='button_top'>Get another quote</span>
            </button>

            <a href={tweetHref} id='tweet-quote' target='_top'>
              <svg width='32' height='32' viewBox='0 0 32 32'>
                <path d='M2 4c4 4 8 8 13 7a6 6 0 0 1 7-7 6 6 0 0 1 4 2 8 8 0 0 0 5-2 8 8 0 0 1-3 4 8 8 0 0 0 4-1 8 8 0 0 1-4 4 18 18 0 0 1-18 19 18 18 0 0 1-10-3 12 12 0 0 0 8-3 8 8 0 0 1-5-4 8 8 0 0 0 3-.5A8 8 0 0 1 0 12a8 8 0 0 0 3 1 8 8 0 0 1-1-9' />
              </svg>
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
