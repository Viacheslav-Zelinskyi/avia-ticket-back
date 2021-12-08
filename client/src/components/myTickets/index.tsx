import { Button as ButtonBase, Table } from "antd";
import React, { useState } from "react";
import { TFunction, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { IStore, ITicketStore } from "../../models/redux.interfaces";
import { IPeopleCounter } from "../../models/ticket.interfaces";
import { addTicket, deleteTicket } from "../../redux/reducers/allTickets";
import { getDateFromTimestamp } from "../../utils/date.helpers";
import { exportToJson, uploadJson } from "../../utils/download.helpers";
import EditTicket from "./editTicket";
import "./myTickets.scss";

interface IButton {
  text: string;
  onClick: React.MouseEventHandler<HTMLElement> | undefined;
  danger?: boolean;
}

interface IEditMode {
  id: string | null;
  mode: boolean;
}

type SetEditMode = React.Dispatch<React.SetStateAction<IEditMode>>;

const MyTickets = () => {
  const [editMode, setEditMode] = useState<IEditMode>({
    id: null,
    mode: false,
  });

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const tickets: Array<ITicketStore> = useSelector(
    (store: IStore) => store.allTickets
  );

  const uploadTickets = () => {
    uploadJson((ticket: ITicketStore) => {
      dispatch(addTicket(ticket));
    });
  };

  return (
    <div className="mytickets__wrapper">
      {editMode.mode ? (
        <EditTicket
          id={editMode.id}
          closeEditor={() => setEditMode({ mode: false, id: null })}
        />
      ) : null}
      <div className="mytickets__table">
        <Table dataSource={tickets} columns={columns(t, setEditMode)} />
      </div>
      <div className="mytickets__btnWrapper">
        <div className="mytickets__btnBlock">
          <Button text={t("myTickets.uploadJSON")} onClick={uploadTickets} />
        </div>
      </div>
    </div>
  );
};

const Button = ({ text, onClick, danger = false }: IButton) => (
  <ButtonBase type="primary" onClick={onClick} danger={danger}>
    {text}
  </ButtonBase>
);

const ActionBtnBlock = (
  record: ITicketStore,
  t: TFunction,
  setEditMode: SetEditMode
) => {
  const dispatch = useDispatch();

  return (
    <div className="mytickets__actionBtnBlock">
      <Button
        text={t("myTickets.edit")}
        onClick={() => setEditMode({ mode: true, id: record._id })}
      />
      <Button
        danger
        text={t("common.delete")}
        onClick={() => dispatch(deleteTicket(record._id))}
      />
      <Button
        text={t("myTickets.saveJSON")}
        onClick={() => exportToJson(record)}
      />
    </div>
  );
};

const showPassengers = (passengers: IPeopleCounter, t: TFunction) =>
  `${t("myTickets.adult") + passengers.adult} ${
    t("myTickets.childrens") + passengers.childrens
  } ${t("myTickets.infants") + passengers.infants}`;

const showDepartureDate = (
  timestamp: number | undefined,
  record: ITicketStore
) => {
  if (timestamp) {
    return getDateFromTimestamp(timestamp, record.fromTimezone);
  }
};

const showReturnDate = (
  timestamp: number | undefined,
  record: ITicketStore
) => {
  if (timestamp) {
    return getDateFromTimestamp(timestamp, record.destinationTimezone);
  }
};

const columns = (t: TFunction, setEditMode: SetEditMode) => [
  {
    title: t("myTickets.id"),
    dataIndex: "_id",
    key: "_id",
    editable: true,
  },
  {
    title: t("common.from"),
    dataIndex: "from",
    key: "from",
  },
  {
    title: t("common.to"),
    dataIndex: "to",
    key: "to",
  },
  {
    title: t("myTickets.departureDate"),
    dataIndex: "departureDate",
    key: "departureDate",
    render: showDepartureDate,
  },
  {
    title: t("myTickets.returnDate"),
    dataIndex: "returnDate",
    key: "returnDate",
    render: showReturnDate,
  },
  {
    title: t("myTickets.passengers"),
    dataIndex: "passengers",
    key: "passengers",
    render: (passengers: IPeopleCounter) => showPassengers(passengers, t),
  },
  {
    title: t("myTickets.actions"),
    dataIndex: "action",
    key: "action",
    render: (value: null, record: ITicketStore) =>
      ActionBtnBlock(record, t, setEditMode),
  },
];

export default MyTickets;
