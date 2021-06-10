import React, { useImperativeHandle } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Flv from 'flv.js';
import API from '../api/Api';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  videoContainer: {
    width: '90%',
    margin: '0 auto'
  },
}));

export default function Play(props) {
  const classes = useStyles();
  var player = null;

  const getQueryString = (name) => {
    let reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.hash.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    };
    return null;
  }

  const flv_load = (val) => {
    let method = getQueryString("method");
    let code = getQueryString("code");
    let authCode = getQueryString("authCode");
    if(!method || !code || !authCode){
      return
    }
    var mediaDataSource = {
      type: 'flv'
    };
    let videoUrl = API.flvURL+"/live/"+method+"/"+code+"/"+authCode+".flv";
    mediaDataSource['url'] = videoUrl;
    mediaDataSource['hasAudio'] = false;
    mediaDataSource['isLive'] = true;
    console.log('MediaDataSource', mediaDataSource);
    flv_load_mds(mediaDataSource);
  }

  const flv_load_mds = (mediaDataSource) => {
      var element = document.getElementsByClassName('centeredVideo')[0];
    
      if (typeof player !== "undefined") {
          if (player != null) {
              player.unload();
              player.detachMediaElement();
              player.destroy();
              player = null;
          }
      }
      
      player = Flv.createPlayer(mediaDataSource, {
          enableWorker: false,
          lazyLoadMaxDuration: 3 * 60,
          seekType: 'range',
      });
      player.attachMediaElement(element);
      player.load();
      player.play()
  }

  return (
    <div>
      <div>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Button variant="contained" onClick={flv_load}>
              play
            </Button>
            <Typography variant="h6" className={classes.title}>
              
            </Typography>
            {/* <Button autoFocus color="inherit">
              <CloseIcon />
            </Button> */}
          </Toolbar>
        </AppBar>
        <div className={classes.videoContainer}>
            <div>
                <video name="videoElement" className="centeredVideo" controls allow="autoPlay" width="100%" >
                    Your browser is too old which doesn't support HTML5 video.
                </video>
            </div>
        </div>
      </div>
    </div>
  );
}
