// import React from 'react'
// import { Card, CardBody, Row, Col, CardTitle, CardText } from 'reactstrap';



// const Question = ({ question, className }) => (
//   <div className={className}>
//     <h2 className="mb-4">{question.text}</h2>
//     <Row>
//       {
//         ['A', 'B', 'C', 'D'].map((ans) =>
//           <Col key={ans} sm={12} md={6} className="mb-4">
//             <Card>
//               <CardBody>
//                 <CardTitle><strong>{ans}</strong></CardTitle>
//                 <CardText>
//                   {question[`answer${ans}`]}
//                 </CardText>
//               </CardBody>
//             </Card>
//           </Col>
//         )
//       }
//     </Row>
//   </div>
// )

// export default Question

import React, { useState } from 'react';
import { Card, CardBody, Row, Col, CardTitle, CardText } from 'reactstrap';

const Question = ({ question, className }) => {
  const [interactionCounts, setInteractionCounts] = useState(Array(question.text.split(' ').length).fill(0));
  const [playerInteractions, setPlayerInteractions] = useState(0);

  const handleWordClick = (index) => {
    const newCounts = [...interactionCounts];
    newCounts[index] += 1;
    setInteractionCounts(newCounts);
    setPlayerInteractions((interactions) => interactions + 1);
  };

  return (
    <div className={className}>
      <h2 className="mb-4">{question.text}</h2>
      <Row>
        {
          question.text.split(' ').map((word, index) => (
            <Col key={index} className="mb-4">
              <Card onClick={() => handleWordClick(index)}>
                <CardBody>
                  <CardTitle><strong>{word}</strong></CardTitle>
                  <CardText>
                    Interaction Count: {interactionCounts[index]}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          ))
        }
      </Row>
      <div className="text-right">
        Player Interactions: {playerInteractions}
      </div>
    </div>
  );
};

export default Question;


