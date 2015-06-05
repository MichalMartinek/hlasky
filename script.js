var TodoList3 = React.createClass({
  render: function() {
    var createItem = function(item, index) {
      return <p>{ item.text }</p>;
    };
    return <ul>{ this.props.items.map(createItem) }</ul>;
  }
});

var TodoApp3 = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    return {items: [], text: ""};
  },

  componentWillMount: function() {
    var firebaseRef = new Firebase(" https://vivid-torch-6633.firebaseio.com/hlasky/");
    this.bindAsArray(firebaseRef.limitToLast(25), "hlasky");
  },

  onChange: function(e) {
    this.setState({text: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    if (this.state.text && this.state.text.trim().length !== 0) {
      this.firebaseRefs["hlasky"].push({
        text: this.state.text
      });
      this.setState({text: ""});
    }
  },

  render: function() {
    return (
      <div>
        <TodoList3 items={ this.state.items } />
        <form onSubmit={ this.handleSubmit }>
          <input onChange={ this.onChange } value={ this.state.text } />
          <button>{ "Add #" + (this.state.items.length + 1) }</button>
        </form>
      </div>
    );
  }
});

React.render(<TodoApp3 />, document.getElementById("q"));