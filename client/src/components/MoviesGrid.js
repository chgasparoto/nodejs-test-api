import React from 'react'
import styled from 'styled-components'

const Grid = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  gap: 1em;
  justify-content: center;
  margin: 10px;
`

const ImageLink = styled.a`
  :hover {
    opacity: .7;
  }

  img {
    cursor: pointer;
  }
`

const MoviesGrid = ({ movies, handleMovieClick }) => (
  <Grid>
    {movies.map(movie => (
      <ImageLink
        key={movie.id}
        onClick={() => handleMovieClick(movie)}
      >
        <img alt={movie.title} title={movie.title} src={movie.boxArt} />
      </ImageLink>
    ))}
  </Grid>
)

export default MoviesGrid
