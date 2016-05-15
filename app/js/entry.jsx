var HelloPortfolio = React.createClass({
  render: function() {
    return (
      <p>
        Hello, <input type="text" placeholder="Your name here" />!
        It is { this.props.date.toTimeString() }
      </p>
    );
  }
});

setInterval(function() {
  ReactDOM.render(
    <HelloPortfolio date = { new Date() } />,
    document.getElementById('example')
  );
}, 500);

var root = React.DOM.ul({ className: 'my-list' },
  React.DOM.li(null, 'First list item'),
  React.DOM.li(null, 'Second list item')
);

ReactDOM.render(root, document.getElementById('list1'));

var LikeButton = React.createClass({
  getInitialState: function() {
    return { liked: false };
  },
  handleClick: function(event) {
    this.setState({ liked: !this.state.liked });
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={ this.handleClick}>
        You { text } this. Click to toggle.
      </p>
    );
  }
});

ReactDOM.render(
  <LikeButton />,
  document.getElementById('list2')
);

var Avatar = React.createClass({
  render: function() {
    return (
      <div>
        <PageLink pagename={ this.props.pagename } />
      </div>
    );
  }
});

var PagePic = React.createClass({
  render: function() {
    return(
      <img src={ 'https://graph.facebook.com/' + this.props.pagename + '/picture' } />
    );
  }
});

var PageLink = React.createClass({
  render: function() {
    return (
      <a href={ 'https://www.facebook.com/' + this.props.pagename }>
        <PagePic pagename={ this.props.pagename } />
      </a>
    );
  }
});

ReactDOM.render(
  <Avatar pagename="Engineering" />,
  document.getElementById('picture-thing')
);
