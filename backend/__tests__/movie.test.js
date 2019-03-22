const mockAxios = require('axios')
const controller = require('../controllers/movie')

describe('movie controller', () => {
  beforeEach(() => jest.clearAllMocks())

  const mockAPI = {
    _embedded: {
      'viaplay:blocks': [
        {
          _embedded: {
            'viaplay:products': [{
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
            }],
          },
        },
      ],
    }
  }

  const expectedResult = {
    status: 200,
    data: [
      {
        actors: ["Paul Rudd", "Evangeline Lilly", "Michael Peña", "Walton Goggins", "Bobby Cannavale"],
        boxArt: "https://i-viaplay-com.akamaized.net/viaplay-prod/744/924/1553010619-1ab2c7000c7b9262f459178a43bd27e8d76e8c8a.jpg?width=199&height=298",
        directors: ["Peyton Reed"],
        duration: "1h 53min",
        genres: ["Komedi", "Science Fiction"],
        id: "tt5095030",
        slug: "ant-man-and-the-wasp-2018",
        synopsis: "Scott Lang, som jonglerar familjeliv och superhjälteliv, måste än en gång ge sig ut på uppdrag. Den här gången med The Wasp. Tillsammans ska de avslöja viktiga hemligheter från det förflutna.",
        title: "Ant-Man and the Wasp",
        year: 2018
      },
    ],
  }

  const request = { params: { type: 'action' } }
  const response = { json: (obj) => obj, status: (number) => this }
  const next = () => {}

  it('should return a list of movies', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: mockAPI }))
    expect.assertions(5)

    const actualResult = await controller.getMovies(request, response, next)

    expect(mockAxios.get).toBeCalledTimes(1)
    expect(mockAxios.get).toHaveBeenCalledWith('film/action')
    expect(actualResult).toBeObject()
    expect(actualResult).toContainAllKeys(['status', 'data'])
    expect(actualResult).toEqual(expectedResult)
  })

  it('should return a list of movies', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: mockAPI }))
    expect.assertions(5)

    const actualResult = await controller.getMovies({ params: {} }, response, next)

    expect(mockAxios.get).toBeCalledTimes(1)
    expect(mockAxios.get).toHaveBeenCalledWith('film')
    expect(actualResult).toBeObject()
    expect(actualResult).toContainAllKeys(['status', 'data'])
    expect(actualResult).toEqual(expectedResult)
  })

  it('should return an error', async () => {
    expect.assertions(1)
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: [] }))
    const actualResult = await controller.getMovies(request, response, next)
    expect(actualResult).toEqual('Something went wrong. Please contact the administrator.')
  })
})
