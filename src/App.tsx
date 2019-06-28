import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import { dispatcher, State } from './store/todo';
import { Container, Row, Col } from 'react-bootstrap';
import { Paper, Icon, Flex, Button } from './components/elements';
import AddTaskModal from './components/modules/AddTaskModal';

interface Props extends State {
  getList: () => void;
}

const App: React.FC<Props> = ({ tasks, loading, getList }) => {
  const [showNewTaskModal, setNTMstate] = useState(false);
  const closeNewTaskModal = () => setNTMstate(false);
  useEffect(() => {
    console.log('useEffect');
    if (!tasks.length) getList();
  }, [getList, tasks.length]);
  useEffect(() => {}, [getList, loading, tasks]);
  function addNewTask() {
    setNTMstate(true);
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
              <Button variant="green" onClick={addNewTask}>
                Добавить
              </Button>
            </Flex>
            <Table bordered>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id} className="custom-table-row">
                    <td style={{ width: '10%' }}>{task.id}</td>
                    <td>{task.title}</td>
                    <td style={{ width: '15%' }}>
                      <Flex
                        justify="center"
                        alignItems="center"
                        spacing="8"
                        className="custom-flex-box"
                      >
                        <Icon
                          title="Изменить"
                          variant="green"
                          icon={['far', 'edit']}
                          onClick={editTask}
                        />
                        <Icon
                          title="Удалить"
                          variant="red"
                          icon={['far', 'trash-alt']}
                          onClick={removeTask}
                        />
                      </Flex>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Paper>
        </Col>
      </Row>
      <AddTaskModal show={showNewTaskModal} onHide={closeNewTaskModal} />
    </Container>
  );
};

export default connect(
  (state: State) => ({ tasks: state.tasks, loading: state.loading }),
  dispatcher
)(App);
