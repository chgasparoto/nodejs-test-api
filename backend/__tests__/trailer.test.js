const mockAxios = require('axios')
const controller = require('../controllers/trailer')

describe('trailer controller', () => {
  beforeEach(() => jest.clearAllMocks())

  const request = { params: { id: 123 } }
  const response = { send: (obj) => obj, status: (number) => this }
  const next = () => { }

  const firstCallMock = {
    _embedded: {
      'viaplay:blocks': [
        {
          _embedded: {
            'viaplay:product': {
              type: 'movie',
              publicPath: 'ant-man-and-the-wasp-2018',
              content: {
                duration: {
                  milliseconds: 6794080,
                  readable: '1h 53min',
                },
                images: {
                  boxart: {
                    url: 'https://i-viaplay-com.akamaized.net/viaplay-prod/744/924/1553010619-1ab2c7000c7b9262f459178a43bd27e8d76e8c8a.jpg?width=199&height=298',
                    template: 'https://i-viaplay-com.akamaized.net/viaplay-prod/744/924/1553010619-1ab2c7000c7b9262f459178a43bd27e8d76e8c8a.jpg{?width,height}',
                  },
                },
                parentalRating: '12',
                people: {
                  actors: [
                    'Paul Rudd',
                    'Evangeline Lilly',
                    'Michael Peña',
                    'Walton Goggins',
                    'Bobby Cannavale',
                  ],
                  directors: [
                    'Peyton Reed',
                  ],
                },
                production: {
                  country: 'USA',
                  year: 2018,
                },
                imdb: {
                  id: 'tt5095030',
                  rating: '7.1',
                  votes: '209 358',
                  url: 'http://www.imdb.com/title/tt5095030?ref_ext_viaplay',
                },
                synopsis: 'Scott Lang, som jonglerar familjeliv och superhjälteliv, måste än en gång ge sig ut på uppdrag. Den här gången med The Wasp. Tillsammans ska de avslöja viktiga hemligheter från det förflutna.',
                title: 'Ant-Man and the Wasp',
              },
              _links: {
                'viaplay:genres': [
                  {
                    title: 'Komedi',
                    tagId: '99368193',
                    href: 'https://content.viaplay.se/pc-se/film/komedi',
                  },
                  {
                    title: 'Science Fiction',
                    tagId: '99368202',
                    href: 'https://content.viaplay.se/pc-se/film/science-fiction',
                  },
                ],
              },
            },
          },
        },
      ],
    }
  }
  const secondCallMock = {
    movie_results: [
      {
        adult: false,
        backdrop_path: '/vc8bCGjdVp0UbMNLzHnHSLRbBWQ.jpg',
        genre_ids: [
          28,
          12,
          878,
          18,
        ],
        id: 315635,
        original_language: 'en',
        original_title: 'Spider-Man: Homecoming',
        overview: 'Following the events of Captain America: Civil War, Peter Parker, with the help of his mentor Tony Stark, tries to balance his life as an ordinary high school student in Queens, New York City, with fighting crime as his superhero alter ego Spider-Man as a new threat, the Vulture, emerges.',
        poster_path: '/5x00yQZ3Mcz7duwMKc9GE8oZjFf.jpg',
        release_date: '2017-07-05',
        title: 'Spider-Man: Homecoming',
        video: false,
        vote_average: 7.4,
        vote_count: 10711,
        popularity: 39.933,
      },
    ],
    person_results: [],
    tv_results: [],
    tv_episode_results: [],
    tv_season_results: [],
  }

  const thirdCallMock = {
    id: 363088,
    results: [
      {
        id: '5ab69f28c3a3680a3e00f04c',
        iso_639_1: 'en',
        iso_3166_1: 'US',
        key: '8_rTIAOohas',
        name: 'Official Trailer',
        site: 'YouTube',
        size: 1080,
        type: 'Trailer',
      },
      {
        id: '5ae8a27e0e0a262d1e000a82',
        iso_639_1: 'en',
        iso_3166_1: 'US',
        key: 'UUkn-enk2RU',
        name: 'Official Trailer #2',
        site: 'YouTube',
        size: 1080,
        type: 'Trailer',
      },
    ],
  }

  it('should return a list of trailers', async () => {
    mockAxios.get
    .mockImplementationOnce(() => Promise.resolve({ data: firstCallMock }))
    .mockImplementationOnce(() => Promise.resolve({ data: secondCallMock }))
    .mockImplementationOnce(() => Promise.resolve({ data: thirdCallMock }))

    const actualResult = await controller.getTrailers(request, response, next)

    expect.assertions(7)

    expect(mockAxios.get).toBeCalledTimes(3)
    expect(mockAxios.get).toHaveBeenCalledWith('movie/315635/videos')
    expect(mockAxios.get).toHaveBeenCalledWith('find/tt5095030', { params: { external_source: 'imdb_id' }})
    expect(mockAxios.get).toHaveBeenCalledWith('movie/315635/videos')
    expect(actualResult).toBeObject()
    expect(actualResult).toContainAllKeys(['status', 'data'])
    expect(actualResult.data).toEqual(thirdCallMock)
  })

  it('should return an error', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: [] }))

    const actualResult = await controller.getTrailers(request, response, next)

    expect.assertions(1)

    expect(actualResult).toEqual('Something went wrong. Please contact the administrator.')
  })
})
