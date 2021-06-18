import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'

// importing material ui components
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

// importing components
import Layout from './Layout'
import { actionsSearchWord, actionsGetWord, actionsHandleError } from '../redux/Actions'

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

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
    width: '75vw',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(0,0,0,0.25)',
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2, 4, 3),
  },
}));

const SearchWords = (props) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [noSearch, setNoSearch] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);

    const dispatch = useDispatch()
    const base_url = useSelector(state => state.base_url)
    const words = useSelector(state => state.searchWords)
    const wordDetails = useSelector(state => state.word)
    const error = useSelector(state => state.error)

    const word = props.match.params.name
    useEffect(() => {
        setLoading(true)
        searchFunc(word)
    }, [word])

    const searchFunc = async (word) => {
        if(word) {
            setNoSearch(false)
            const url = `${base_url}/words/search/${word}`
            await axios.get(url)
                .then(res => {
                    if(res.data.length > 0) dispatch(actionsSearchWord(res.data))
                    else dispatch(actionsHandleError("Not Present in DB."))
                    setLoading(false)
                })
                .catch(err => dispatch(actionsHandleError(err)))
        }
        else {
            setNoSearch(true)
            setLoading(false)
        }
    }

    const getWordDetails = async (name) => {
        const url = `${base_url}/words/get/${name}`
        await axios.get(url)
            .then(res => {
                dispatch(actionsGetWord(res.data[0]))
                setModalLoading(false)
            })
            .catch(err => dispatch(actionsHandleError(err)))
    }

    const handleOpen = name => {
        // e.preventDefault()
        setOpen(true);
        setModalLoading(true)
        getWordDetails(name)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const displayModalCont = () => {
      return wordDetails && (
          <div className="modal">
              <div className="modal-title">{wordDetails.wordName}</div>
              <div className="modal-cont">
                  <div className="modal-array">
                        {wordDetails.wordArray && wordDetails.wordArray.map((w1, i) => (
                            <div className="modal-obj" key={i}>
                                <div className="modal-flex modal-obj-language">
                                    <h3 className="modal-flex1">Language</h3> 
                                    <div className="modal-flex2">{w1.language}</div>
                                </div>
                                <div className="modal-obj-lexicalEntries">
                                    {w1.lexicalEntries && w1.lexicalEntries.map((w2, i) => (
                                        <div className="modal-lex" key={i}>
                                            {w2.lexicalCategory && (
                                                <div className="modal-flex modal-lex-lexicalCategory">
                                                    <h3 className="modal-flex1">Category</h3>
                                                <div className="modal-flex2 modal-small-main">{w2.lexicalCategory.text}</div>
                                            </div>
                                            )}
                                            {w2.derivatives && (
                                                <div className="modal-flex modal-lex-derivatives">
                                                    <h3 className="modal-flex1">Derivatives</h3>
                                                    <div className="modal-flex2 modal-inline">
                                                        {w2.derivatives.map(w3 => (
                                                            <div className="modal-derv modal-small-boxs" key={w3.id}>{w3.text}</div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            { w2.entries && (
                                                <div className="modal-flex modal-lex-entries">
                                                    {/* <h3 className="modal-flex1 flex-full">Entries</h3> */}
                                                    <div className="modal-flex2 flex-full">
                                                        {w2.entries.map((w3, i) => (
                                                            <div className="modal-ent" key={i}>
                                                                { w3.etymologies && (
                                                                    <div className="modal-flex modal-ent-ety">
                                                                        <h3 className="modal-flex1">Etymologies</h3> 
                                                                        <div className="modal-flex2">{w3.etymologies[0]}</div>
                                                                    </div>
                                                                ) }
                                                                { w3.pronunciations && (
                                                                    <div className="modal-flex modal-ent-pronunciations">
                                                                        <h3 className="modal-flex1 flex-full">Pronunciations</h3>
                                                                        <div className="modal-flex2 flex-full">
                                                                            { w3.pronunciations.map((w4, i) => (
                                                                                <div className="modal-pronun" key={i}>
                                                                                    {w4.audioFile && (<div className="modal-flex modal-pronun-audio">
                                                                                        <h3 className="modal-flex1">Audio</h3> 
                                                                                        <div className="modal-flex2">
                                                                                            <audio controls>
                                                                                                <source src={w4.audioFile} type="audio/mpeg" />
                                                                                                Your browser does not support the audio element.
                                                                                            </audio>
                                                                                        </div>
                                                                                    </div>)}
                                                                                    {w4.dialects && (<div className="modal-flex modal-pronun-dialects">
                                                                                        <h3 className="modal-flex1">Dialects</h3> 
                                                                                        <div className="modal-flex2">{w4.dialects[0]}</div>
                                                                                    </div>)}
                                                                                    {w4.phoneticNotation && (<div className="modal-flex modal-pronun-phoneticNotation">
                                                                                        <h3 className="modal-flex1">Ponetic Notation</h3> 
                                                                                        <div className="modal-flex2">{w4.phoneticNotation}</div>
                                                                                    </div>)}
                                                                                    {w4.phoneticSpelling && (<div className="modal-flex modal-pronun-phoneticSpelling">
                                                                                        <h3 className="modal-flex1">Phonetic Spelling</h3> 
                                                                                        <div className="modal-flex2">{w4.phoneticSpelling}</div>
                                                                                    </div>)}
                                                                                </div>
                                                                            )) }
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                { w3.senses && (
                                                                    <div className="modal-flex modal-ent-senses">
                                                                        <h3 className="modal-flex1 flex-full">Senses</h3>
                                                                        <div className="modal-flex2 flex-full">
                                                                            { w3.senses.map(w4 => (
                                                                                <div className="modal-sense" key={w4.id}>
                                                                                    {w4.constructions && (
                                                                                        <div className="modal-flex modal-sen-const">
                                                                                            <h3 className="modal-flex1">Constructions</h3>
                                                                                            <div className="modal-flex2">
                                                                                                { w4.constructions.map((w5, i) => (
                                                                                                    <div className="modal-const" key={i}>{w5.text}</div>
                                                                                                ))}
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                    {w4.definitions && (
                                                                                        <div className="modal-flex modal-sen-defini">
                                                                                            <h3 className="modal-flex1">Definitions</h3>
                                                                                            <div className="modal-flex2">
                                                                                                { w4.definitions.map((w5, i) => (
                                                                                                    <div className="modal-defini" key={i}>{w5}</div>
                                                                                                ))}
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                    {w4.examples && (
                                                                                    <div className="modal-flex modal-sen-examples">
                                                                                        <h3 className="modal-flex1">Examples</h3>
                                                                                        <div className="modal-flex2 modal-inline">
                                                                                            { w4.examples.map((w5, i) => (
                                                                                                <div className="modal-example modal-small-boxs" key={i}>{w5.text}</div>
                                                                                            ))}
                                                                                        </div>
                                                                                    </div>
                                                                                    )}
                                                                                    {w4.semanticClasses && (
                                                                                    <div className="modal-flex modal-sen-semanticClasses">
                                                                                        <h3 className="modal-flex1">Semantic Classes</h3>
                                                                                        <div className="modal-flex2 modal-inline">
                                                                                            { w4.semanticClasses.map((w5) => (
                                                                                                <div className="modal-semanticClasse modal-small-boxs" key={w5.id}>{w5.text}</div>
                                                                                            ))}
                                                                                        </div>
                                                                                    </div>
                                                                                    )}
                                                                                    {w4.shortDefinitions && (
                                                                                    <div className="modal-flex modal-sen-shortDefinitions">
                                                                                        <h3 className="modal-flex1">Short Definitions</h3>
                                                                                        <div className="modal-flex2 modal-shortDefinitions">{w4.shortDefinitions[0]}</div>
                                                                                    </div>
                                                                                    )}
                                                                                    {w4.synonyms && (
                                                                                    <div className="modal-flex modal-sen-synonyms">
                                                                                        <h3 className="modal-flex1">Synonyms</h3>
                                                                                        <div className="modal-flex2 modal-inline">
                                                                                            { w4.synonyms.map((w5, i) => (
                                                                                                <div className="modal-synonym modal-small-boxs" key={i}>{w5.text}</div>
                                                                                            ))}
                                                                                        </div>
                                                                                    </div>
                                                                                    )}
                                                                                </div>
                                                                            )) }
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )) }
                                                    </div>
                                                </div>
                                            )}
                                            { w2.phrasalVerbs && (
                                                <div className="modal-flex modal-lex-phrasalVerbs">
                                                    <h3 className="modal-flex1">Phrasal Verbs</h3>
                                                    <div className="modal-flex2 modal-inline">
                                                        {w2.phrasalVerbs.map(w3 => (
                                                                <div className="modal-phrverb modal-small-boxs" key={w3.id}>{w3.text}</div>
                                                            ))}
                                                        </div>
                                                </div>
                                            )}
                                            { w2.phrases && (
                                                <div className="modal-flex modal-lex-phrases">
                                                    <h3 className="modal-flex1">Phrases</h3> 
                                                    <div className="modal-flex2 modal-inline">
                                                        {w2.phrases.map(w3 => (
                                                            <div className="modal-phrase modal-small-boxs" key={w3.id}>{w3.text}</div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
              </div>
          </div>
      )
    }

    const body = (
        <div style={modalStyle} className={`${classes.paper} modal-box`}>
        {modalLoading && (
            <div className="loading">Loading ...</div>
        )}
        {!modalLoading && displayModalCont()}

        </div>
    );

    const displayWord = () => (
        <div className="all-words">
            <div className="back">
                <Link className="btn btn-back" to='/'>
                   <i className="fas fa-chevron-left"></i> &nbsp; All Words
                </Link>
            </div>
            {  (error || noSearch) && (
                    <div className="no-search">
                        Please Search for words in the list only. Thank You.
                    </div>
                )
            }
            <div className="words">
                { !error && !noSearch && words && words.map(w => (
                    <div className="word" key={w._id}>
                        <div className="word-head">
                            <div className="word-title">{w.wordName}</div>
                            <div className="word-lang">
                                {w.wordArray[0] && w.wordArray[0].language}
                            </div>
                        </div>
                        <div className="word-cont">
                            { w.wordArray && w.wordArray.map(
                                w1 => w1.lexicalEntries && w1.lexicalEntries.map(
                                    w2 => w2.entries && w2.entries.map(
                                        w3 => w3.senses && w3.senses.map(
                                            w4 => w4.definitions && w4.definitions.map(
                                                (w5,i) => (
                                                    <div className="word-def" key={i}>{w5}</div>
                                                )
                                            )
                                        )
                                    )
                                )
                            )}
                        </div>
                        <div className="word-btn">
                            <button className="btn" type="button" onClick={() => handleOpen(w.wordName)}>More Info</button>
                        </div>
                    </div>
                ))}
                
                <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                    {body}
                </Modal>
            </div>
        </div>
    )

    return (
        <Layout>
            {loading && (
                <div className="loading">
                    Loading.....
                </div>
            )}
            {!loading && displayWord()}
        </Layout>
    )
}

export default SearchWords
