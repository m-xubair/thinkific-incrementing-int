import React, { useState, useEffect } from "react";
import {getCurrent} from '../hooks/incrementing/useGetCurrent';
import {resetCurrent} from '../hooks/incrementing/useResetCurrent';
import {getNext} from '../hooks/incrementing/useGetNext';

const Dashboard = (props) => {
    const [showKey, setShowKey] = useState(false);
    const [showReset, setShowReset] = useState(false);
    const [resetInteger, setResetInteger] = useState(1);
    const [myInteger, setMyInteger] = useState('');
    useEffect(() => {
        getCurrent().then((response) => {
            setMyInteger(response.data.current);
        });
    }, []);

    const handleShowHideKey = () => {
        showKey ? setShowKey(false) : setShowKey(localStorage.getItem('_api_key'));
    }
    const handleToggleReset = () => {
        showReset ? setShowReset(false) : setShowReset(true);
    }
    const handleResetInteger = () => {
        setShowReset(false);
        resetCurrent(resetInteger).then((response) => {
            const data = response.data;
            if(data.success) {
                setMyInteger(data.current);
            }
        })
    }

    const handleNextInteger = () => {
        getNext().then((response) => {
            const {data} = response;
            if(data.success) {
                setMyInteger(data.next);
            }
        })
    }


    return (
        <divc className="auth-inner">
                <div className="key-container">
                    <div className="show-key">
                        {
                            showKey === false ? 
                                <>Show API KEY</>
                            :
                                <>{showKey}</>
                        }    
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleShowHideKey}>
                        { showKey === false ? 'Show' : 'Hide'} Key
                    </button>
                </div>
            <h1 className="m-4 text-center">{myInteger}</h1>

            <div className="dashboard-btn-container">
                <button type="button" onClick={handleToggleReset} className="btn btn-secondary">Reset Integer</button>
                <button type="button" onClick={handleNextInteger} className="btn btn-primary">Next Integer</button>
            </div>
            {
                showReset ?
                    <div className="input-group mt-3">
                        <input type="number" min="1" className="form-control" placeholder="Recipient's username" 
                            aria-label="Recipient's username" aria-describedby="basic-addon2" 
                            value={resetInteger} onChange={(e) => setResetInteger(e.target.value)}/>
                        <div className="input-group-append">
                            <span className="input-group-text cursor-pointer" onClick={handleResetInteger}>Reset Integer</span>
                        </div>
                    </div>
                : null
            }
        </divc>
    );
}


export default Dashboard;