import { BrowserRouter, Route, Switch } from "react-router-dom";
import Routing from './route/Routing';

function Rtmp2flv() {
  return (
    <div>
        <BrowserRouter>
            <Routing/>
        </BrowserRouter>
    </div>
  );
} 

export default Rtmp2flv;