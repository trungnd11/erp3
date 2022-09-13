import React, { useEffect, useState } from "react";
import Board, { moveCard } from "@lourenci/react-kanban";
import { Row, Col } from "reactstrap";
import CardTaskBox from "../TaskCard";
import RenderCardTitle from "../HeaderComponents";
import apiproject from "../../../api/listproject";

const UncontrolledBoard = (props) => {
  const content = props.board;
  const editRecord = props.editRecord;
  const moveTaskData = props.moveTaskData;
  const openDelRecord = props.openDelRecord;
  const searchData = props.searchData;
  console.log(searchData);

  useEffect(() => {
    // console.log(content)
    const rsContent = getContent(content, searchData);
    console.log(rsContent);
    setBoard(rsContent);
  }, [content, searchData]);

  const [controlledBoard, setBoard] = useState(() => {
    const rs = getContent(content, searchData);
    console.log(rs);
    return rs;
  });

  function handleCardMove(_card, source, destination) {
    console.log(_card);
    if (searchData === "") {
      const updatedBoard = moveCard(controlledBoard, source, destination);
      // const statusFrom = updatedBoard.columns.find(
      //   (el) => el.id === source.fromColumnId
      // );
      // const statusTo = updatedBoard.columns.find(
      //   (el) => el.id === destination.toColumnId
      // );
      // statusFrom.badge--;
      // statusTo.badge++;

      // console.log(updatedBoard)
      // setBoard({ ...updatedBoard });
      moveTaskData(_card, updatedBoard);
      // console.log(updatedBoard);

      apiproject
        .changeStatusTask(_card.id, destination.toColumnId)
        .then((res) => {
          // console.log(res)
          // transitCallback(_card,source,destination)
          // updatedBoard.columns[0]
          // moveTaskData(_card,updatedBoard)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  console.log(controlledBoard);

  return (
    <React.Fragment>
      <Row className="mb-4">
        <Col>
          <Board
            // initialBoard={content}
            renderColumnHeader={({ name, badge, badgeClass }) => (
              <RenderCardTitle
                name={name}
                badge={badge}
                badgeClass={badgeClass}
              />
            )}
            renderCard={(data, { dragging }) => (
              <CardTaskBox
                data={data}
                dragging={dragging}
                editRecord={editRecord}
                openDelRecord={openDelRecord}
              >
                {data}
              </CardTaskBox>
            )}
            onCardDragEnd={handleCardMove}
          >
            {controlledBoard}
          </Board>
        </Col>
      </Row>
    </React.Fragment>
  );
};

const getContent = (content, search) => {
  const tmpData = { ...content };

  const tmpContent = JSON.stringify(tmpData);
  const lastContent = JSON.parse(tmpContent);
  console.log(lastContent);
  for (let i in lastContent.columns) {
    for (let index in lastContent.columns[i].tasks) {
      if (
        lastContent.columns[i].tasks[index].title
          .toUpperCase()
          .indexOf(search.searchText.toUpperCase()) === -1
      ) {
        lastContent.columns[i].tasks.splice(index, 1);
        lastContent.columns[i].cards.splice(index, 1);
      }
    }
  }
  // console.log(content)
  return lastContent;
};

export default UncontrolledBoard;
