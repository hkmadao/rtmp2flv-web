import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListIcon from "@material-ui/icons/List";
import { NavLink } from "react-router-dom";
import Play from "./Play";
import CameraEdit from "./CameraEdit";
import API from "../api/Api";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
  },
  dropdown: {
    position: "absolute",
    top: 28,
    right: 0,
    left: 0,
    zIndex: 999,
    border: "0px solid",
    padding: 1,
    backgroundColor: "#f8f8f8",
  },
}));

export default function ActionList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [row, setRow] = React.useState(props.row);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const enabled = () => {
    row.enabled = row.enabled === 1 ? 0 : 1;
    API.cameraEnabled(row).then((res) => {
      if (res.code === 1) {
        setOpen(false);
        if (props.callBack) {
          props.callBack();
        }
        return;
      }
    });
  };

  const saveVideoChange = () => {
    row.saveVideo = row.saveVideo === 1 ? 0 : 1;
    API.cameraSaveVideoChange(row).then((res) => {
      if (res.code === 1) {
        setOpen(false);
        if (props.callBack) {
          props.callBack();
        }
        return;
      }
    });
  };

  const liveChange = () => {
    row.live = row.live === 1 ? 0 : 1;
    API.cameraLiveChange(row).then((res) => {
      if (res.code === 1) {
        setOpen(false);
        if (props.callBack) {
          props.callBack();
        }
        return;
      }
    });
  };

  const playAuthcodeReset = () => {
    API.cameraPlayAuthcodeReset(row).then((res) => {
      if (res.code === 1) {
        setOpen(false);
        if (props.callBack) {
          props.callBack();
        }
        return;
      }
    });
  };

  let playRef = React.createRef();
  function play() {
    setOpen(false);
    playRef.current.handleClickOpen();
  }

  let editRef = React.createRef();
  function edit() {
    setOpen(false);
    editRef.current.handleClickOpen();
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.root}>
        <button type="button" onClick={handleClick}>
          <ListIcon />
        </button>
        {open ? (
          <div className={classes.dropdown}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <button onClick={edit}>编辑</button>
              {props.row.enabled === 1 ? (
                <button onClick={enabled}>禁用</button>
              ) : (
                <button onClick={enabled}>启用</button>
              )}
              <button onClick={play}>播放</button>
              <button>
                <NavLink
                  exact
                  to={{
                    pathname: "/camerashare",
                    search: "?cameraId=" + props.row.id,
                    // hash: "#camerashare",
                    state: { row: props.row },
                  }}
                >
                  分享
                </NavLink>
              </button>
              <button onClick={playAuthcodeReset}>重置播放权限码</button>
              {props.row.saveVideo === 1 ? (
                <button onClick={saveVideoChange}>停止录像</button>
              ) : (
                <button onClick={saveVideoChange}>开启录像</button>
              )}
              {props.row.live === 1 ? (
                <button onClick={liveChange}>停止直播</button>
              ) : (
                <button onClick={liveChange}>开启直播</button>
              )}
            </div>
          </div>
        ) : null}
        <Play
          playParam={{
            playMethod: "permanent",
            cameraCode: props.row.code,
            authCode: props.row.playAuthCode,
          }}
          onRef={playRef}
        />
        <CameraEdit
          row={props.row}
          type="edit"
          callBack={props.callBack}
          onRef={editRef}
        />
      </div>
    </ClickAwayListener>
  );
}
