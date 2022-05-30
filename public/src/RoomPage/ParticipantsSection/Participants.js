import React from 'react';

const SingleParticipant = ({identity, lastItem}) => {
    const getParticipantName = (identity) => {
        return identity;
    }

    return (
        <>
        {/* Need to do things with tokens here in order to get unique identities */}
        <p className="participants_paragraph">{getParticipantName(identity)}</p>
        {!lastItem && <span className="participants_separator_line"></span>}
        </>
    )
}

//Dummy data
const participants = [
    {
        identity: 'Hannah'
    },
    {
        identity: 'Caleb'
    },
    {
        identity: 'Luke'
    },
    {
        identity: 'Isaac'
    }

]

const Participants = () => {
  return (
    <div className='participants_container'>
      {participants.map((participant, index) => {
          return (
              <SingleParticipant
              key={participant.identity}
              identity={participant.identity}
              lastItem={participant.length === index + 1}
              />
          )
      })}
    </div>
  )
}

export default Participants
