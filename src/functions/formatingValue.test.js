import { formatingValue } from './formatingValue';


test('testing the chronometer!', () => {
  expect(formatingValue(0,30,20)).toBe("00:30:20");
});

test('testing the chronometer!', () => {
    expect(formatingValue(2,30,20)).toBe("02:30:20");
  });