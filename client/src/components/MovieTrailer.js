import React from 'react'
import Youtube from 'react-youtube'
import styled from 'styled-components'

import Play from '../play.png'

const Wrapper = styled.div`
  padding: 40px;
  display: grid;
  grid-template-columns: .5fr 1fr;
  gap: 10px;
`

const Cover = styled.div`
  justify-self: end;

  div {
    display: inline-block;
    position: relative;
  }

  img {
    max-width: 100%;
  }

  img:last-child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 96px;
    height: 96px;
    cursor: pointer;
    opacity: .8;

    :hover {
      opacity: 1;
    }
  }
`

const Info = styled.div`
  div {
    margin: 10px 0;
  }
`

const Title = styled.h1`
  margin: 0 auto 5px;
`

const SubTitle = styled.h2`
  margin: 0 auto 3px;
`
const Duration = styled.h3`
  margin: 0 auto 5px;
`

const MovieTrailer = ({ trailer, movie, handleClick, handleReset }) => {
  return (
    <Wrapper>
      {
        trailer
          ? <Youtube videoId={trailer} opts={{ playerVars: { autoplay: 1 } }} />
          : <Cover>
            <div>
              <img src={movie.boxArt} alt={movie.title} />
              <img src={Play} alt="play button" onClick={handleClick} />
            </div>
          </Cover>
      }
      <Info>
        <Title>{movie.title}</Title>
        <SubTitle>{movie.genres.join('/')} - {movie.year}</SubTitle>
        <Duration>{movie.duration}</Duration>
        <div>{movie.synopsis}</div>
        <div><strong>Actors:</strong> {movie.actors && movie.actors.join(', ')}</div>
        <div><strong>Directors:</strong> {movie.directors && movie.directors.join(', ')}</div>
        <div><button onClick={() => handleReset()}>Go Back</button></div>
      </Info>
    </Wrapper>
  )
}

export default MovieTrailer
