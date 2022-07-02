import { waitFor } from './waitFor';

describe('waitFor', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should wait for specified duration', async () => {
    const timeoutSpy = jest.spyOn(global, 'setTimeout');
    const duration = 100;

    await waitFor(duration);

    expect(timeoutSpy).toHaveBeenCalledTimes(1);
    expect(timeoutSpy).toHaveBeenLastCalledWith(expect.any(Function), duration);
  });
});
