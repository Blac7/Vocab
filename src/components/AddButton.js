import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '50vw',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(0,0,0,0.25)',
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '10px'
  },
}));

const AddButton = ({getAllWords}) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [addWord, setAddWord] = useState('')
    const [check, setCheck] = useState(false)
    const [errorAdd, setErrorAdd] = useState(false)
    const [successAdd, setSuccessAdd] = useState(false)

    const base_url = useSelector(state => state.base_url)
    
    useEffect(() => {
        
    },[])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setErrorAdd(false)
        setSuccessAdd(false)
        setOpen(false);
        setAddWord('')
    };

    const handleAddWord = e => {
        if(errorAdd) setErrorAdd(false)
        if(successAdd) setSuccessAdd(false)
        setAddWord(e.target.value)
    }

    const addWordFunc = async (e) => {
        e.preventDefault()
        setCheck(true)
        if(addWord) {
            const url = `${base_url}/words/add/${addWord}`
            await axios.get(url)
                .then(res => {
                    if(res.data.Msg) {
                        setCheck(false)
                        setErrorAdd(true)
                    }
                    else {
                        setCheck(false)
                        setSuccessAdd(true)
                        getAllWords()
                    }
                })
                .catch(err => console.log("Get all Words: ", err))
        }
    }

    const body = (
        <div style={modalStyle} className={`${classes.paper} add`}>
            {/* <div className="add-title">All a Word to the List</div> */}
                { check && (
                    <div className="add-check">Checking. Please Wait.</div>
                ) }
                { errorAdd && (
                    <div className="add-error">{addWord} is not Present in Dictionary. Please try to add another word.</div>
                ) }
                { successAdd && (
                    <div className="add-success">{addWord} is added to the List.</div>
                ) }
            <div >
                <form className="add-inner" onSubmit={(e) => addWordFunc(e)}>
                    <TextField id="outlined-basic" className="add-input" onChange={(e) => handleAddWord(e)} value={addWord} label="Add Word to the List" variant="outlined" autoFocus />
                {/* <input className="add-input"  type="text"  /> */}
                <button className="btn add-btn" onClick={(e) => addWordFunc(e)}>Add</button>
                </form>
            </div>
        </div>
    );

    return (
        <>
        <div className="add-words">
            <button className="btn btn-add" onClick={handleOpen}>
                Add a Word to List &nbsp; <i className="fas fa-plus"></i>
            </button>
        </div>
        <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title1" aria-describedby="simple-modal-description1">
            {body}
        </Modal>
        </>
    )
}

export default AddButton
