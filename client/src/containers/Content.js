import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

import MoviesGrid from '../components/MoviesGrid'
import MovieTrailer from '../components/MovieTrailer'
import Loader from '../components/Loader'

const BASE_URL = 'http://localhost:8088'

const Error = styled.div`
  margin: 20px auto;
  background: red;
  color: #fff;
  border: 1px solid red;
  height: 30px;
  padding: 20px;
`

class Content extends React.Component {

  state = {
    movies: [],
    selectedMovie: null,
    trailer: null,
    error: null,
    loading: true
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  componentDidMount() {
    const types = ['action', 'komedi', 'thriller']
    const type = types[this.getRandomInt(types.length - 1)]

    axios.get(`${BASE_URL}/movies/${type}`)
      .then(res => res.data)
      .then(data => {
        this.setState({
          movies: data.data,
          error: null,
          loading: false
        })
      }).catch(err => {
        this.setState({ error: 'Error to load movies grid', loading: false })
      })
  }

  handleTrailerClik = () => {
    const id = this.state.selectedMovie.slug

    axios.get(`${BASE_URL}/trailers/${id}`)
      .then(res => res.data)
      .then(data => {
        this.setState({
          trailer: data.data.results[0].key,
          error: null,
          loading: false
        })
      }).catch(err => {
        this.setState({ error: 'Error to load trailer video', loading: false })
      })
  }

  handleMovieClick = (movie) => {
    this.setState({ selectedMovie: movie })
  }

  handleReset = () => {
    this.setState({
      selectedMovie: null,
      trailer: null,
    })
  }

  render() {
    const { movies, selectedMovie, trailer, error, loading } = this.state

    return (
      <React.Fragment>
        {error &&
          <Error>{error}</Error>
        }
        {loading && <Loader />}
        {selectedMovie &&
          <MovieTrailer
            trailer={trailer}
            movie={selectedMovie}
            handleClick={this.handleTrailerClik}
            handleReset={this.handleReset}
          />
        }
        {(!selectedMovie && movies) &&
          <MoviesGrid
            movies={movies}
            handleMovieClick={this.handleMovieClick}
          />
        }
      </React.Fragment>
    )
  }
}

export default Content
