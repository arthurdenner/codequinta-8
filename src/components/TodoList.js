import React, { Component, Fragment } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import TodoItem from './TodoItem';

class TodoList extends Component {
  state = {
    newTodoText: '',
  };

  addTodo = () => {
    const { newTodoText } = this.state;
    const { addTodo, todos } = this.props;

    addTodo({
      variables: { text: newTodoText },
      update: (proxy, { data: { createTodo } }) => {
        todos.refetch();
        this.setState({ newTodoText: '' });
      },
    });
  };

  render() {
    const { todos } = this.props;
    const { newTodoText } = this.state;

    return (
      <Fragment>
        {todos.loading ? (
          <p>Carregando...</p>
        ) : (
          <div style={{ marginBottom: '0.5em' }}>
            {todos.allTodoes.map((todo, idx) => (
              <TodoItem key={todo.id} idx={idx} todo={todo} />
            ))}
          </div>
        )}

        <input
          type="text"
          value={newTodoText}
          onChange={e => this.setState({ newTodoText: e.target.value })}
        />
        <input type="submit" value="Criar" onClick={this.addTodo} />
      </Fragment>
    );
  }
}

const TodosQuery = gql`
  query {
    allTodoes {
      id
      text
      completed
    }
  }
`;

const TodoMutation = gql`
  mutation($text: String!) {
    createTodo(text: $text) {
      id
      text
      completed
    }
  }
`;

export default compose(
  graphql(TodosQuery, { name: 'todos' }),
  graphql(TodoMutation, { name: 'addTodo' })
)(TodoList);
