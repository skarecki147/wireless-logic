import { sayHello } from './hello';

describe('Hello', () => {
  const name = 'Seweryn'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should say hello', function () {
    const greet = sayHello(name)
    expect(greet).toEqual(`Hello ${name}!`)
  });
})