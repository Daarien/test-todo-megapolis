import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import { dispatcher, State } from './store/todo';
import { Container, Row, Col } from 'react-bootstrap';
import { Paper, Icon, Flex, Button } from './components/elements';

interface Props extends State {
  getList: () => void;
}

const App: React.FC<Props> = ({ tasks, loading, getList }) => {
  useEffect(() => {
    console.log('useEffect');
    getList();
  }, [getList]);
  useEffect(() => {}, [getList, loading, tasks]);
  function addNewTask() {
    console.log('create');
  }
  function editTask() {}
  function removeTask() {}
  return (
    <Container className="mt-5">
      <Row>
        <Col xs={{ span: '10', offset: '1' }}>
          <Paper>
            <Flex justify="space-between" alignItems="center" className="mb-3">
              <h2>Список задач</h2>
              <Button variant="create" onClick={addNewTask}>
                Добавить
              </Button>
            </Flex>
            <Table bordered>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id}>
                    <td style={{ width: '10%' }}>{task.id}</td>
                    <td>{task.title}</td>
                    <td style={{ width: '20%' }}>
                      <span>
                        <Icon
                          variant="create"
                          icon={['far', 'edit']}
                          size="lg"
                          onClick={editTask}
                        />
                        <Icon
                          variant="remove"
                          icon={['far', 'trash-alt']}
                          size="lg"
                          onClick={removeTask}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Paper>
        </Col>
      </Row>
    </Container>
  );
};

export default connect(
  (state: State) => ({ tasks: state.tasks, loading: state.loading }),
  dispatcher
)(App);
