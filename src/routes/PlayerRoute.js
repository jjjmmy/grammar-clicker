import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Row, Col, Alert, Input } from 'reactstrap';

import getPlayer from '../use_cases/getPlayer';
import addAnswer from '../use_cases/addAnswer';
import getGame from '../use_cases/getGame';
import CenteredContainer from '../view_components/CenteredContainer';
import Question from '../view_components/Question';

const PlayerRoute = () => {
  let { gameId, playerId } = useParams();
  const [currentGame, setCurrentGame] = useState();
  const [playerName, setPlayerName] = useState('');
  const [answer, setAnswer] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [answerText, setAnswerText] = useState([]);

  const handleGameChange = (game) => {
    if (game) {
      // workaround to clear answer
      setAnswer(null);
      setCurrentGame(game);
    }
  };

  useEffect(() => {
    if (gameId && playerId) {
      getGame(gameId, handleGameChange);
      getPlayer(playerId, { gameId }).then((player) => setPlayerName(player.name));
    }
  }, [gameId, playerId]);

  const recordAnswer = () => {
    // playerName is for convenience later, though it feels a little like this knows more about the store than it should
    addAnswer({ playerId, playerName, gameId, choice: answerText.join(' ') })
      .then(setAnswer)
      .catch((e) => {
        setErrorMessage(e);
        setTimeout(() => setErrorMessage(''), 5000);
      });
  };

  const getInteractionCounts = (question) => {
    return Array(question.split(' ').length).fill(0);
  };

  const [interactionCounts, setInteractionCounts] = useState([]);

  useEffect(() => {
    if (currentGame && currentGame.question) {
      setInteractionCounts(getInteractionCounts(currentGame.question.text));
      setAnswerText(Array(currentGame.question.text.split(' ').length).fill(''));
    }
  }, [currentGame]);

  const handleWordClick = (index) => {
    const newCounts = [...interactionCounts];
    newCounts[index] += 1;
    setInteractionCounts(newCounts);
  };

  switch (currentGame ? currentGame.state : null) {
    case 'pendingQuestion':
      return (
        <CenteredContainer maxWidth={500} verticalCentered={true}>
          Next question coming up...
        </CenteredContainer>
      );
    case 'showingQuestion':
      if (answer) {
        return (
          <CenteredContainer maxWidth={500} verticalCentered={true}>
            You chose {answer}!
          </CenteredContainer>
        );
      }

      return (
        <CenteredContainer maxWidth={500} verticalCentered={true}>
          {currentGame.question && (
            <Question question={currentGame.question} interactionCounts={interactionCounts} handleWordClick={handleWordClick} />
          )}
          <Row className="mb-4">
            <Col sm={12}>
              <h2>Hi {playerName}!</h2>
              <h3>Please type your answer:</h3>
            </Col>
          </Row>
          {errorMessage && (
            <Col sm={12}>
              <Alert color="danger">{errorMessage}</Alert>
            </Col>
          )}
          <Row>
            {errorMessage && (
              <Col sm={12}>
                <Alert color="danger">{errorMessage}</Alert>
              </Col>
            )}
            <Row>
              {currentGame.question && currentGame.question.text.split(' ').
              map((word, index) => (
              <Col key={index} className="mb-3">
                <Input
                  type="text"
                  value={answerText[index]}
                  onChange={(e) => {
                    const newAnswerText = [...answerText];
                    newAnswerText[index] = e.target.value;
                    setAnswerText(newAnswerText);
                  }}
                  placeholder={word}
                />
              </Col>
                ))}
            </Row>
            <Button color="primary" onClick={recordAnswer}>
              Submit Answer
            </Button>
          </Row>
        </CenteredContainer>
      );
    case 'finished':
      return (
        <CenteredContainer maxWidth={500} verticalCentered={true}>
          Game over! Thanks for playing.
        </CenteredContainer>
      );
    default:
      return (
        <CenteredContainer maxWidth={500} verticalCentered={true}>
          Loading...
        </CenteredContainer>
      );
  }
};

export default PlayerRoute;